import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/auth")({
  ssr: false,
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) throw redirect({ to: "/admin" as never });
  },
  head: () => ({
    meta: [
      { title: "Admin sign-in — RSIC" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);
    if (mode === "signup") {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin + "/auth" },
      });
      setLoading(false);
      if (err) return setError(err.message);
      if (data.session) navigate({ to: "/admin" as never, replace: true });
      else setInfo("Check your inbox to confirm your email, then sign in.");
      return;
    }
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) return setError(err.message);
    navigate({ to: "/admin" as never, replace: true });
  }

  return (
    <PageShell>
      <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
        <form
          onSubmit={onSubmit}
          className="w-full rounded-2xl border border-border bg-card p-8 shadow-sm"
        >
          <h1 className="font-display text-2xl font-bold text-primary">
            {mode === "signin" ? "Admin sign-in" : "Create admin account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Restricted area. After signing up, the site owner must grant the admin role.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">Email</label>
              <input
                id="email" type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold">Password</label>
              <input
                id="password" type="password" required minLength={6}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-ring focus:outline-none"
                dir="ltr"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            {info && <p className="text-sm text-primary">{info}</p>}
            <button
              type="submit" disabled={loading}
              className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
            </button>
            <button
              type="button"
              onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setInfo(null); }}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </form>
      </div>
    </PageShell>
  );
}
