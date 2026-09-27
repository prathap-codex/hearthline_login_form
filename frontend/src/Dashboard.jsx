import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const session = JSON.parse(sessionStorage.getItem("hearthline_session") || "null");

  useEffect(() => {
    if (!session) {
      navigate("/", { replace: true });
    }
  }, [session, navigate]);

  if (!session) {
    return null;
  }

  function handleSignOut() {
    sessionStorage.removeItem("hearthline_session");
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-parchment text-ink">
      <header className="border-b border-ink/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-base font-semibold">Hearthline</p>
            <p className="text-xs text-ink/55">Studio dashboard</p>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-ink/15 px-3 py-1.5 text-sm transition hover:border-ink/30 hover:bg-sand/70"
          >
            Sign out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm text-moss">Dummy dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold">Good to have you back, {session.name}.</h1>
        <p className="mt-3 max-w-2xl text-sm text-ink/70">
          This page is a placeholder so the login flow has a clear destination. In a later sprint it
          would hold briefs, comments, and file drops.
        </p>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <article className="rounded-lg border border-ink/10 bg-white p-5 transition hover:border-ink/20 hover:bg-sand/40">
            <p className="text-xs text-ink/50">Signed in as</p>
            <p className="mt-2 font-medium">{session.email}</p>
          </article>
          <article className="rounded-lg border border-ink/10 bg-white p-5 transition hover:border-ink/20 hover:bg-sand/40">
            <p className="text-xs text-ink/50">Role</p>
            <p className="mt-2 font-medium">{session.role}</p>
          </article>
          <article className="rounded-lg border border-ink/10 bg-white p-5 transition hover:border-ink/20 hover:bg-sand/40">
            <p className="text-xs text-ink/50">Active boards</p>
            <p className="mt-2 font-medium">3 open briefs</p>
          </article>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
