import gmail from "@/assets/contact/gmail.svg";
import linkedin from "@/assets/contact/linkedin.svg";
import github from "@/assets/contact/github-dark.svg";
import upwork from "@/assets/contact/upwork.svg";

type Social = {
  href: string;
  label: string;
  src: string;
};

const socials: Social[] = [
  { href: "mailto:gathonjiadennis@gmail.com", label: "Email", src: gmail },
  { href: "https://www.linkedin.com/in/dennis-gathonjia-b54a63252", label: "LinkedIn", src: linkedin },
  { href: "https://github.com/64860", label: "GitHub", src: github },
  { href: "https://www.upwork.com/freelancers/~0119c08e78d3853c0d?mp_source=share", label: "Upwork", src: upwork },
];

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target={s.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          aria-label={s.label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-all hover:-translate-y-0.5 hover:shadow-sm"
        >
          <img src={s.src} alt="" className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export const contactLinks = socials;
