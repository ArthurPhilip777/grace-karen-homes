"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import type { Currency, Enquiry, EnquiryKind } from "@/lib/types";

type SiteContextValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  saved: string[];
  toggleSaved: (slug: string) => void;
  isSaved: (slug: string) => boolean;
  compare: string[];
  toggleCompare: (slug: string) => void;
  isCompared: (slug: string) => boolean;
  clearCompare: () => void;
  notice: string | null;
  saveEnquiry: (kind: EnquiryKind, payload: Record<string, string>) => void;
};

type Store = {
  currency: Currency;
  saved: string[];
  compare: string[];
};

const SiteContext = createContext<SiteContextValue | null>(null);
const savedKey = "gkh-saved";
const compareKey = "gkh-compare";
const currencyKey = "gkh-currency";
const notesKey = "gkh-notes";
const serverStore: Store = { currency: "GHS", saved: [], compare: [] };

let store: Store = serverStore;
let hydrated = false;
const listeners = new Set<() => void>();

function readList(key: string) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  const storedCurrency = localStorage.getItem(currencyKey);
  store = {
    currency: storedCurrency === "USD" ? "USD" : "GHS",
    saved: readList(savedKey),
    compare: readList(compareKey),
  };
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrate();
  return store;
}

function getServerSnapshot() {
  return serverStore;
}

function commit(next: Store) {
  store = next;
  localStorage.setItem(currencyKey, next.currency);
  localStorage.setItem(savedKey, JSON.stringify(next.saved));
  localStorage.setItem(compareKey, JSON.stringify(next.compare));
  listeners.forEach((listener) => listener());
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [notice, setNotice] = useState<string | null>(null);

  const setCurrency = useCallback((currency: Currency) => {
    commit({ ...getSnapshot(), currency });
  }, []);

  const toggleSaved = useCallback((slug: string) => {
    const current = getSnapshot();
    const saved = current.saved.includes(slug)
      ? current.saved.filter((item) => item !== slug)
      : [...current.saved, slug];
    commit({ ...current, saved });
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    const current = getSnapshot();
    if (current.compare.includes(slug)) {
      commit({ ...current, compare: current.compare.filter((item) => item !== slug) });
      return;
    }
    if (current.compare.length >= 3) {
      setNotice("Compare holds three houses. Remove one first.");
      window.setTimeout(() => setNotice(null), 3200);
      return;
    }
    commit({ ...current, compare: [...current.compare, slug] });
  }, []);

  const clearCompare = useCallback(() => {
    commit({ ...getSnapshot(), compare: [] });
  }, []);

  const saveEnquiry = useCallback((kind: EnquiryKind, payload: Record<string, string>) => {
    const note: Enquiry = {
      id: crypto.randomUUID(),
      kind,
      at: new Date().toISOString(),
      payload,
    };
    try {
      const raw = localStorage.getItem(notesKey);
      const existing = raw ? (JSON.parse(raw) as Enquiry[]) : [];
      const next = Array.isArray(existing) ? [...existing, note] : [note];
      localStorage.setItem(notesKey, JSON.stringify(next));
    } catch {
      localStorage.setItem(notesKey, JSON.stringify([note]));
    }
  }, []);

  const value = useMemo<SiteContextValue>(
    () => ({
      currency: snapshot.currency,
      setCurrency,
      saved: snapshot.saved,
      toggleSaved,
      isSaved: (slug: string) => snapshot.saved.includes(slug),
      compare: snapshot.compare,
      toggleCompare,
      isCompared: (slug: string) => snapshot.compare.includes(slug),
      clearCompare,
      notice,
      saveEnquiry,
    }),
    [snapshot, setCurrency, toggleSaved, toggleCompare, clearCompare, notice, saveEnquiry],
  );

  return (
    <SiteContext.Provider value={value}>
      <div className={snapshot.compare.length > 0 ? "pb-24" : undefined}>{children}</div>
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used within SiteProvider");
  return context;
}
