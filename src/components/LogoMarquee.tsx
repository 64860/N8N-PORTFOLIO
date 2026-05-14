import { featuredStack } from "./BrandLogos";

export function LogoMarquee() {
  const items = [...featuredStack, ...featuredStack];
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-logo-marquee items-center gap-12">
        {items.map((l, i) => (
          <div key={i} className="flex h-10 items-center gap-2 opacity-70 transition-opacity hover:opacity-100">
            <img src={l.src} alt={l.name} className="h-6 w-6 object-contain" />
            <span className="text-sm font-medium text-muted-foreground">{l.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
