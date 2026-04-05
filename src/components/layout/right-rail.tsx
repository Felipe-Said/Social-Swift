import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search, Video, Store, Calendar, Clock3, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const shortcuts = [
  { label: "Marketplace", icon: Store, href: "/app/marketplace" },
  { label: "Dashboard", icon: Calendar, href: "/app/dashboard" },
  { label: "Mensagens", icon: Search, href: "/app/social/chats" },
  { label: "Projetos", icon: Bookmark, href: "/app/projetos" },
];

const contacts = [
  { name: "Swift Finance", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face" },
  { name: "Felipe Said", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face" },
  { name: "Said LAB", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face" },
  { name: "Marketplace Team", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face" },
];

export function RightRail() {
  return (
    <aside className="sticky top-[72px] hidden w-[320px] shrink-0 self-start xl:block">
      <div className="space-y-4 px-3 pb-6">
        <div className="fb-card p-4">
          <h3 className="mb-3 text-[17px] font-semibold text-text">Seus atalhos</h3>
          <div className="space-y-1">
            {shortcuts.map((shortcut) => (
              <Link
                key={shortcut.href}
                to={shortcut.href}
                className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-text transition-colors hover:bg-[hsl(var(--accent))]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--accent))] text-brand">
                  <shortcut.icon className="h-4 w-4" />
                </div>
                <span>{shortcut.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="fb-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[17px] font-semibold text-text">Contatos</h3>
            <div className="flex items-center gap-2 text-text-dim">
              <Video className="h-4 w-4" />
              <Search className="h-4 w-4" />
              <Clock3 className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            {contacts.map((contact) => (
              <button
                key={contact.name}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[hsl(var(--accent))]"
              >
                <div className="relative">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[hsl(var(--surface))] bg-emerald-500" />
                </div>
                <span className="text-sm font-medium text-text">{contact.name}</span>
              </button>
            ))}
          </div>
          <Button variant="ghost" className="mt-3 w-full justify-start text-text-dim">
            Ver todos os contatos
          </Button>
        </div>
      </div>
    </aside>
  );
}
