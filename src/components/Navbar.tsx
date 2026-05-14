import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/workflows", label: "Workflows" },
  { to: "/services", label: "Services" },
  { to: "/tools", label: "Tools" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-sm font-semibold tracking-tight">
          Dennis Gathonjia
        </Link>
        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[status=active]:text-foreground data-[status=active]:font-medium"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
