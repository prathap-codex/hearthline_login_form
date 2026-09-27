import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(email, password) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const nextErrors = validate(email, password);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/login", {
        email: email.trim(),
        password,
      });

      if (response.data?.success) {
        sessionStorage.setItem(
          "hearthline_session",
          JSON.stringify(response.data.user)
        );
        navigate("/dashboard");
      } else {
        setFormError(response.data?.message || "Unable to sign in.");
      }
    } catch (error) {
      const apiMessage = error.response?.data?.message;
      setFormError(
        apiMessage || "Could not reach the studio. Check that the API is running."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-parchment text-ink">
      <div className="min-h-screen">
        <main className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="mt-2 text-sm text-ink/65">
              Enter your studio email and password to continue to the dashboard.
            </p>

            <form
              className="mt-8 space-y-5 rounded-lg border border-ink/15 bg-white p-6"
              onSubmit={handleSubmit}
              noValidate
            >
              {formError ? (
                <div
                  role="alert"
                  className="rounded-lg border border-copper/25 bg-copper/10 px-4 py-3 text-sm text-copper"
                >
                  {formError}
                </div>
              ) : null}

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@studio.mail"
                  className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 text-sm outline-none transition hover:border-ink/30 hover:bg-sand/40 focus:border-moss focus:bg-white"
                />
                {fieldErrors.email ? (
                  <p className="mt-1.5 text-sm text-copper">{fieldErrors.email}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-lg border border-ink/15 bg-white px-4 py-2.5 pr-20 text-sm outline-none transition hover:border-ink/30 hover:bg-sand/40 focus:border-moss focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-moss transition hover:text-ink"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {fieldErrors.password ? (
                  <p className="mt-1.5 text-sm text-copper">{fieldErrors.password}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-parchment transition hover:bg-moss/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Checking studio access…" : "Sign in"}
              </button>
            </form>

            <aside className="mt-8 rounded-lg border border-ink/10 bg-sand/40 px-4 py-4 text-sm transition hover:border-ink/20 hover:bg-sand/70">
              <p className="font-medium">Demo access</p>
              <p className="mt-1 text-ink/70">
                Email: <span className="font-medium text-ink">maker@hearthline.studio</span>
              </p>
              <p className="text-ink/70">
                Password: <span className="font-medium text-ink">Studio@2026</span>
              </p>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
