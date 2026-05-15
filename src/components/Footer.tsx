import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Dennis Gathonjia
        </p>
        <SocialIcons />
      </div>
    </footer>
  );
}
