import { BottomNav } from "@/components/dashboard/bottom-nav";
import AgentChat from "@/components/dashboard/agent-chat";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 pb-20">{children}</main>
      <AgentChat />
      <BottomNav />
    </div>
  );
}
