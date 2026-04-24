
export default function LandingPage({ onLogin, onSignup }) {
    const PROGRAMS = [
  { icon: "⚡", name: "Power Lifting", desc: "Master the big three lifts with expert programming designed for serious strength gains." },
  { icon: "🔥", name: "HIIT Cardio", desc: "High-intensity intervals that torch calories and boost your cardiovascular endurance." },
  { icon: "🧘", name: "Mind & Body", desc: "Yoga, pilates and mobility work to improve flexibility and mental clarity." },
  { icon: "🥊", name: "Combat Sports", desc: "Boxing, kickboxing and MMA classes for all levels. Build real-world fitness." },
  { icon: "🏋️", name: "Olympic Lifting", desc: "Snatch and clean & jerk coaching from certified Olympic weightlifting coaches." },
  { icon: "🚴", name: "Cycling Studio", desc: "Indoor cycling classes with immersive music and precision power tracking." },
];
const TRAINERS = [
  { initials: "RK", name: "Raj Kumar", role: "Strength & Power" },
  { initials: "PD", name: "Priya Devi", role: "Yoga & Mobility" },
  { initials: "AM", name: "Aryan Mehta", role: "Combat Sports" },
  { initials: "SK", name: "Sahil Khan", role: "Olympic Lifting" },
];

const SCHEDULE = {
  MON: [{ name: "HIIT", time: "6:00 AM" }, { name: "Yoga", time: "7:00 PM" }],
  TUE: [{ name: "Boxing", time: "7:00 AM" }, { name: "Lift", time: "6:30 PM" }],
  WED: [{ name: "Cycling", time: "6:00 AM" }, { name: "HIIT", time: "12:00 PM" }],
  THU: [{ name: "Olympic", time: "7:00 AM" }],
  FRI: [{ name: "Combat", time: "6:00 AM" }, { name: "Power", time: "7:00 PM" }],
  SAT: [{ name: "Yoga", time: "8:00 AM" }, { name: "HIIT", time: "10:00 AM" }],
  SUN: [{ name: "Recovery", time: "9:00 AM" }],
};

const INITIAL_USERS = [
  { id: 1, name: "Rahul Sharma", email: "rahul@mail.com", plan: "Premium", status: "active", joined: "Jan 2024", sessions: 48 },
  { id: 2, name: "Anita Gupta", email: "anita@mail.com", plan: "Basic", status: "active", joined: "Mar 2024", sessions: 22 },
  { id: 3, name: "Vivek Patel", email: "vivek@mail.com", plan: "Premium", status: "inactive", joined: "Nov 2023", sessions: 67 },
];

const INITIAL_EMPLOYEES = [
  { id: 1, name: "Raj Kumar", email: "raj@ironforge.com", role: "Head Trainer", dept: "Fitness", status: "active" },
  { id: 2, name: "Priya Devi", email: "priya@ironforge.com", role: "Yoga Instructor", dept: "Wellness", status: "active" },
  { id: 3, name: "Aryan Mehta", email: "aryan@ironforge.com", role: "Combat Coach", dept: "Combat", status: "active" },
];
  return (
    <>
      <div className="hero">
        <div className="hero-eyebrow">Varanasi's Premier Fitness Destination</div>
        <h1 className="hero-title">
          <span className="glitch">IRON</span><br />
          <span className="outline">FORGE</span>
        </h1>
        <p className="hero-sub">Where legends are forged. World-class training, elite coaches, and a community built for those who refuse to settle.</p>
        <div className="hero-cta">
          <button className="btn-hero" onClick={onSignup}>JOIN NOW — FREE</button>
          <button className="btn-hero-outline" onClick={onLogin}>MEMBER LOGIN</button>
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee">
          {Array.from({ length: 2 }).flatMap((_, i) => [
            <span key={`${i}a`}>STRENGTH</span>, <span key={`${i}da`} className="dot">·</span>,
            <span key={`${i}b`}>POWER</span>, <span key={`${i}db`} className="dot">·</span>,
            <span key={`${i}c`}>ENDURANCE</span>, <span key={`${i}dc`} className="dot">·</span>,
            <span key={`${i}d`}>DISCIPLINE</span>, <span key={`${i}dd`} className="dot">·</span>,
            <span key={`${i}e`}>IRON WILL</span>, <span key={`${i}de`} className="dot">·</span>,
            <span key={`${i}f`}>FORGE YOUR BODY</span>, <span key={`${i}df`} className="dot">·</span>,
          ])}
        </div>
      </div>

      <div className="stats-bar">
        {[
          { num: "2800+", label: "Active Members" },
          { num: "48", label: "Weekly Classes" },
          { num: "12+", label: "Elite Trainers" },
          { num: "8", label: "Years Strong" },
        ].map(s => (
          <div key={s.label} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-title">PROGRAMS</div>
        <div className="section-sub">WORLD-CLASS TRAINING FOR EVERY GOAL</div>
        <div className="programs-grid">
          {PROGRAMS.map(p => (
            <div key={p.name} className="program-card">
              <div className="program-icon">{p.icon}</div>
              <div className="program-name">{p.name}</div>
              <div className="program-desc">{p.desc}</div>
              <div className="program-arrow">EXPLORE →</div>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee" style={{ animationDirection: "reverse" }}>
          {Array.from({ length: 2 }).flatMap((_, i) => [
            <span key={`${i}a`}>NO LIMITS</span>, <span key={`${i}da`} className="dot">·</span>,
            <span key={`${i}b`}>PUSH HARDER</span>, <span key={`${i}db`} className="dot">·</span>,
            <span key={`${i}c`}>BREAK RECORDS</span>, <span key={`${i}dc`} className="dot">·</span>,
            <span key={`${i}d`}>ELITE FITNESS</span>, <span key={`${i}dd`} className="dot">·</span>,
            <span key={`${i}e`}>CHAMPION MINDSET</span>, <span key={`${i}de`} className="dot">·</span>,
          ])}
        </div>
      </div>

      <div className="section">
        <div className="section-title">TRAINERS</div>
        <div className="section-sub">CERTIFIED. PASSIONATE. RESULTS-DRIVEN.</div>
        <div className="trainers-grid">
          {TRAINERS.map(t => (
            <div key={t.name} className="trainer-card">
              <div className="trainer-avatar">{t.initials}</div>
              <div className="trainer-name">{t.name}</div>
              <div className="trainer-role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid var(--border)", padding: "3rem 2rem", textAlign: "center" }}>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: "1.2rem", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>IRONFORGE GYM</div>
        <div style={{ fontSize: "0.75rem", color: "var(--gray)", letterSpacing: "0.1em" }}>VARANASI · UTTAR PRADESH · EST. 2016</div>
        <div style={{ fontSize: "0.7rem", color: "var(--muted)", marginTop: "1rem" }}>© 2025 IronForge. All rights reserved.</div>
      </div>
    </>
  );
}
