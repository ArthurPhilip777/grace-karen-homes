import Link from "next/link";
import { Container } from "@/components/container";
import { agents } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata = {
  title: "Agents",
  description: "The Grace Karen Homes desk in Accra and Kumasi.",
};

export default function AgentsPage() {
  return (
    <Container className="py-14 md:py-20">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">People</p>
      <h1 className="mt-3 max-w-3xl font-display text-5xl leading-tight md:text-6xl">Four people. One standard.</h1>
      <p className="mt-5 max-w-2xl text-base leading-8 text-muted">
        You will not be passed around a call centre. The person who walks the house is the person who knows the file.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {agents.map((agent) => {
          const phone = agent.phone === "kumasi" ? site.kumasiPhoneDisplay : site.phoneDisplay;
          const tel = agent.phone === "kumasi" ? site.kumasiPhoneTel : site.phoneTel;
          const initials = agent.name.split(" ").slice(0, 2).map((part) => part[0]).join("");
          return (
            <article key={agent.id} className="border border-line bg-paper p-6 md:p-8">
              <div className="grid h-16 w-16 place-items-center border border-gold font-display text-2xl text-gold">{initials}</div>
              <h2 className="mt-6 font-display text-4xl">{agent.name}</h2>
              <p className="mt-1 text-sm tracking-[0.14em] text-gold uppercase">{agent.role}</p>
              <p className="mt-4 text-sm leading-7 text-muted">{agent.focus}</p>
              <p className="mt-4 text-base leading-7">{agent.bio}</p>
              <a href={`tel:${tel}`} className="mt-5 inline-block text-sm text-gold">{phone}</a>
            </article>
          );
        })}
      </div>
      <Link href="/contact" className="mt-10 inline-flex bg-forest px-5 py-3 text-sm text-ivory">
        Write to the desk
      </Link>
    </Container>
  );
}
