import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout/PageShell";
import { LayoutDashboard, FileText, LogOut, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const uid = userRes.user?.id;
      if (!uid) {
        navigate({ to: "/auth", replace: true });
        return;
      }
      const { data, error } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" });
      if (cancelled) return;
      if (error || !data) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
      setChecking(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (checking) {
    return (
      <PageShell>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </PageShell>
    );
  }

  if (!isAdmin) {
    return (
      <PageShell>
        <div className="mx-auto max-w-lg px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold text-foreground">Not authorized</h1>
          <p className="mt-3 text-muted-foreground">
            Your account is signed in but does not have the admin role. Contact the site owner to
            request access.
          </p>
          <button
            onClick={signOut}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-1">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Admin
            </p>
            <NavItem to="/_authenticated/admin" icon={<LayoutDashboard className="h-4 w-4" />}>
              Dashboard
            </NavItem>
            <NavItem
              to="/_authenticated/admin/posts"
              icon={<FileText className="h-4 w-4" />}
            >
              Posts
            </NavItem>
            <button
              onClick={signOut}
              className="mt-6 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </aside>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </PageShell>
  );
}

function NavItem({
  to,
  icon,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to as never}
      activeOptions={{ exact: true }}
      activeProps={{ className: "bg-primary/10 text-primary font-semibold" }}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-secondary"
    >
      {icon}
      {children}
    </Link>
  );
}
