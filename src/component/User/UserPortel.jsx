export default function UserPortal({ user, onLogout, notify }) {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="portal">
      <div className="portal-header">
        <div>
          <div className="portal-greeting">MY FORGE</div>
          <div className="portal-role">MEMBER PORTAL · {user.name}</div>
        </div>
        <div className="portal-actions">
          <button className="btn-solid" onClick={onLogout}>LOGOUT</button>
        </div>
      </div>

      <div className="tabs">
        {["dashboard", "schedule", "progress", "profile"].map(t => (
          <button key={t} className={`tab ${tab === t ? "active" : ""}`} onClick={() => setTab(t)}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <>
          <div className="dashboard-grid">
            {[
              { label: "Sessions Completed", val: user.sessions || 0 },
              { label: "This Week", val: "3" },
              { label: "Streak Days", val: "7" },
              { label: "Calories Burned", val: "12.4K" },
            ].map(d => (
              <div key={d.label} className="dash-card">
                <div className="dash-card-label">{d.label}</div>
                <div className="dash-card-val">{d.val}</div>
              </div>
            ))}
          </div>

          <div className="section-heading">UPCOMING CLASSES</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Class</th><th>Trainer</th><th>Date</th><th>Time</th><th></th></tr></thead>
              <tbody>
                {[
                  { cls: "HIIT Cardio", trainer: "Raj Kumar", date: "Tomorrow", time: "6:00 AM" },
                  { cls: "Power Lifting", trainer: "Raj Kumar", date: "Thu", time: "7:00 PM" },
                  { cls: "Yoga", trainer: "Priya Devi", date: "Sat", time: "8:00 AM" },
                ].map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 500 }}>{c.cls}</td>
                    <td style={{ color: "var(--gray)" }}>{c.trainer}</td>
                    <td>{c.date}</td>
                    <td>{c.time}</td>
                    <td><button className="action-btn" onClick={() => notify("Booking confirmed!")}>BOOK</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="section-heading">ANNOUNCEMENTS</div>
          {["New Zumba classes starting Monday — limited spots!", "Gym will be closed on April 14 for maintenance.", "New equipment installed in Zone B — Olympic platforms."].map((a, i) => (
            <div key={i} style={{ padding: "1rem 1.25rem", borderLeft: "2px solid rgba(255,255,255,0.3)", marginBottom: "0.75rem", background: "rgba(255,255,255,0.03)", fontSize: "0.85rem", color: i === 0 ? "#fff" : "var(--gray)" }}>
              {a}
            </div>
          ))}
        </>
      )}

      {tab === "schedule" && (
        <>
          <div className="section-heading">CLASS SCHEDULE</div>
          <div className="schedule-grid">
            {Object.entries(SCHEDULE).map(([day, classes]) => (
              <div key={day} className="schedule-day">
                <div className="schedule-day-name">{day}</div>
                {classes.map((c, i) => (
                  <div key={i} className="schedule-class" onClick={() => notify("Added to calendar!")}>
                    <div style={{ fontWeight: 600, fontSize: "0.7rem" }}>{c.name}</div>
                    <div style={{ color: "var(--gray)", fontSize: "0.65rem" }}>{c.time}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "progress" && (
        <>
          <div className="section-heading">FITNESS PROGRESS</div>
          {[
            { label: "Strength Goal", pct: 68 },
            { label: "Cardio Goal", pct: 82 },
            { label: "Flexibility Goal", pct: 45 },
            { label: "Weight Goal", pct: 71 },
          ].map(p => (
            <div key={p.label} style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                <span style={{ fontWeight: 500 }}>{p.label}</span>
                <span style={{ color: "var(--gray)", fontSize: "0.85rem" }}>{p.pct}%</span>
              </div>
              <div className="progress-bar" style={{ height: "3px" }}>
                <div className="progress-fill" style={{ width: `${p.pct}%` }} />
              </div>
            </div>
          ))}

          <div className="section-heading">WORKOUT HISTORY</div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Class</th><th>Duration</th><th>Calories</th></tr></thead>
              <tbody>
                {[
                  { date: "Apr 10", cls: "HIIT Cardio", dur: "45 min", cal: "420" },
                  { date: "Apr 8", cls: "Power Lifting", dur: "60 min", cal: "280" },
                  { date: "Apr 6", cls: "Yoga", dur: "75 min", cal: "180" },
                  { date: "Apr 4", cls: "Boxing", dur: "50 min", cal: "510" },
                ].map((r, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--gray)" }}>{r.date}</td>
                    <td style={{ fontWeight: 500 }}>{r.cls}</td>
                    <td>{r.dur}</td>
                    <td>{r.cal} kcal</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "profile" && (
        <div className="profile-grid">
          <div className="profile-card">
            <div className="profile-avatar">{(user.name || "U").split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
            <div className="profile-name">{user.name}</div>
            <div className="profile-since">MEMBER SINCE JAN 2024</div>
            <div style={{ margin: "0.75rem 0" }}><span className="badge badge-active">{user.plan || "Basic"} PLAN</span></div>
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-val">{user.sessions || 0}</div>
                <div className="profile-stat-lbl">Sessions</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-val">7</div>
                <div className="profile-stat-lbl">Streak</div>
              </div>
            </div>
          </div>
          <div>
            <div className="section-heading">ACCOUNT DETAILS</div>
            <div className="table-wrap">
              <table>
                <tbody>
                  {[
                    ["Email", user.email || "rahul@mail.com"],
                    ["Membership", user.plan || "Basic"],
                    ["Renewal", "May 1, 2025"],
                    ["Trainer", "Raj Kumar"],
                    ["Home Branch", "Varanasi Main"],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td style={{ color: "var(--gray)", width: "40%" }}>{k}</td>
                      <td style={{ fontWeight: 500 }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn-outline" style={{ width: "100%", padding: "0.75rem", textAlign: "center", cursor: "pointer" }}
              onClick={() => notify("Profile updated")}>
              UPDATE PROFILE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}