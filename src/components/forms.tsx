"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { EnquiryKind } from "@/lib/types";
import { site, whatsappHref } from "@/lib/site";
import { fieldClass, labelClass } from "./container";
import { useSite } from "./site-state";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: string[];
  full?: boolean;
};

export function DeskForm({
  kind,
  subject,
  fields,
  submitLabel,
}: {
  kind: EnquiryKind;
  subject: string;
  fields: Field[];
  submitLabel: string;
}) {
  const { saveEnquiry } = useSite();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<Record<string, string> | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: Record<string, string> = { subject };
    const nextErrors: Record<string, string> = {};
    for (const field of fields) {
      payload[field.name] = String(data.get(field.name) ?? "").trim();
      if (field.required && !payload[field.name]) nextErrors[field.name] = "This is needed.";
    }
    const phone = payload.phone ?? "";
    const email = payload.email ?? "";
    if (!phone && !email) nextErrors.phone = "Leave a phone number or an email.";
    if (phone && phone.replace(/\D/g, "").length < 9) nextErrors.phone = "Enter a phone number we can dial.";
    if (email && !email.includes("@")) nextErrors.email = "That email does not look complete.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    saveEnquiry(kind, payload);
    setDone(payload);
  }

  if (done) {
    const message = `Good day. ${done.name ?? "A client"} wrote about ${subject}.`;
    return (
      <div className="border border-line bg-paper p-6">
        <p className="text-[0.72rem] tracking-[0.18em] text-gold uppercase">Noted on this browser</p>
        <h3 className="mt-3 font-display text-3xl">Thank you{done.name ? `, ${done.name}` : ""}.</h3>
        <p className="mt-3 text-sm leading-7 text-muted">
          This form keeps the note on your device. To reach the desk now, call the showroom or send a WhatsApp on the same line.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={`tel:${site.phoneTel}`} className="bg-forest px-4 py-3 text-sm text-ivory">
            Call {site.phoneDisplay}
          </a>
          <a href={whatsappHref(message)} className="border border-forest px-4 py-3 text-sm">
            WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
      {fields.map((field) => (
        <label key={field.name} className={field.full ? "sm:col-span-2" : undefined}>
          <span className={labelClass}>
            {field.label}
            {field.required ? " *" : ""}
          </span>
          {field.options ? (
            <select name={field.name} defaultValue="" className={fieldClass}>
              <option value="">Select</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "textarea" ? (
            <textarea name={field.name} rows={5} className={fieldClass} />
          ) : (
            <input name={field.name} type={field.type ?? "text"} className={fieldClass} autoComplete={autocomplete(field.name)} />
          )}
          {errors[field.name] ? <span className="mt-1 block text-sm text-clay">{errors[field.name]}</span> : null}
        </label>
      ))}
      <div className="sm:col-span-2">
        <button type="submit" className="bg-forest px-5 py-3 text-sm text-ivory hover:bg-pine">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

function autocomplete(name: string) {
  if (name === "name") return "name";
  if (name === "email") return "email";
  if (name === "phone") return "tel";
  return undefined;
}

export function EnquiryCard({ title }: { title: string }) {
  return (
    <div className="border border-line bg-paper p-5">
      <p className="text-[0.72rem] tracking-[0.18em] text-gold uppercase">Viewing</p>
      <h2 className="mt-2 font-display text-3xl">Ask for {title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">Tell us the day that suits. We confirm by phone before anyone drives across the city.</p>
      <div className="mt-5">
        <DeskForm
          kind="viewing"
          subject={title}
          submitLabel="Request the viewing"
          fields={[
            { name: "name", label: "Name", required: true },
            { name: "phone", label: "Phone", type: "tel", required: true },
            { name: "email", label: "Email", type: "email" },
            { name: "day", label: "Preferred day", options: ["Weekday morning", "Weekday afternoon", "Saturday"] },
            { name: "message", label: "Note", type: "textarea", full: true },
          ]}
        />
      </div>
    </div>
  );
}

export function FormIntro({ children }: { children: ReactNode }) {
  return <div className="mb-6 text-sm leading-7 text-muted">{children}</div>;
}
