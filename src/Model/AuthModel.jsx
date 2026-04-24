import { useState } from "react";


export default function AuthModal({ mode: initialMode, onClose, onLogin }) {
  const MOCK_ACCOUNTS = {
  "admin@ironforge.com": { password: "admin123", role: "admin", name: "Admin" },
  "raj@ironforge.com": { password: "emp123", role: "employee", name: "Raj Kumar", dept: "Fitness" },
  "rahul@mail.com": { password: "user123", role: "user", name: "Rahul Sharma", plan: "Premium", sessions: 48 },
};
  const INITIAL_USERS = [
  { id: 1, name: "Rahul Sharma", email: "rahul@mail.com", plan: "Premium", status: "active", joined: "Jan 2024", sessions: 48 },
  { id: 2, name: "Anita Gupta", email: "anita@mail.com", plan: "Basic", status: "active", joined: "Mar 2024", sessions: 22 },
  { id: 3, name: "Vivek Patel", email: "vivek@mail.com", plan: "Premium", status: "inactive", joined: "Nov 2023", sessions: 67 },
];

  const [mode, setMode] = useState(initialMode); // login | signup
  const [role, setRole] = useState("user");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", plan: "Basic" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleLogin = async () => {
    setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const acc = MOCK_ACCOUNTS[form.email.toLowerCase()];
    if (!acc || acc.password !== form.password) { setError("Invalid email or password."); setLoading(false); return; }
    if (role !== "admin" && acc.role !== role) { setError(`This account is not a ${role} account.`); setLoading(false); return; }
    onLogin(acc); onClose();
  };

  const handleSignup = async () => {
    setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (!form.name || !form.email || !form.password) { setError("All fields are required."); setLoading(false); return; }
    if (form.password !== form.confirm) { setError("Passwords don't match."); setLoading(false); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
    onLogin({ name: form.name, email: form.email, role: "user", plan: form.plan, sessions: 0 });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>
        <div className="modal-logo">IRON<span style={{ color: "var(--gray)" }}>FORGE</span></div>
        <div className="modal-title">{mode === "login" ? "WELCOME BACK" : "JOIN US"}</div>
        <div className="modal-sub">{mode === "login" ? "Access your portal below" : "Create your account"}</div>

        {mode === "login" && (
          <div className="role-tabs">
            {["user", "employee", "admin"].map(r => (
              <button key={r} className={`role-tab ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>
                {r}
              </button>
            ))}
          </div>
        )}

        {mode === "signup" && (
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} />
        </div>

        {mode === "signup" && (
          <>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className="form-input" type="password" placeholder="••••••••" value={form.confirm} onChange={e => set("confirm", e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Membership Plan</label>
              <select className="form-select" value={form.plan} onChange={e => set("plan", e.target.value)}>
                <option>Basic</option>
                <option>Premium</option>
                <option>Elite</option>
              </select>
            </div>
          </>
        )}

        {error && <span className="error-msg">⚠ {error}</span>}

        <button className="btn-submit" onClick={mode === "login" ? handleLogin : handleSignup} disabled={loading}>
          {loading ? "AUTHENTICATING..." : mode === "login" ? "ACCESS PORTAL →" : "CREATE ACCOUNT →"}
        </button>

        <div className="form-switch">
          {mode === "login" ? (
            <>New to IronForge? <button onClick={() => { setMode("signup"); setError(""); }}>Sign up free</button></>
          ) : (
            <>Already a member? <button onClick={() => { setMode("login"); setError(""); }}>Sign in</button></>
          )}
        </div>

        {mode === "login" && (
          <div style={{ marginTop: "1.5rem", padding: "1rem", border: "1px solid var(--border)", fontSize: "0.7rem", color: "var(--gray)", lineHeight: 1.8 }}>
            <div style={{ marginBottom: "0.25rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", fontSize: "0.65rem" }}>DEMO CREDENTIALS</div>
            Admin: admin@ironforge.com / admin123<br />
            Employee: raj@ironforge.com / emp123<br />
            User: rahul@mail.com / user123
          </div>
        )}
      </div>
    </div>
  );
}