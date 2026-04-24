import { useState, useEffect, useRef } from "react";
import LandingPage from "./pages/LandingPage"
import Particles from "./component/Particles";
import Notification from "./component/Notification";
import AuthModal from "./Model/AuthModel";
import UserPortal from"./component/User/UserPortel";
// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Grotesk:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #000;
    --fg: #fff;
    --gray: #888;
    --border: rgba(255,255,255,0.12);
    --border-hover: rgba(255,255,255,0.4);
    --card: rgba(255,255,255,0.04);
    --card-hover: rgba(255,255,255,0.08);
    --accent: #fff;
    --muted: #444;
  }

  body { background: #000; color: #fff; font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }

  /* PARTICLES */
  .particles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .particle {
    position: absolute;
    width: 1px; height: 1px;
    background: #fff;
    border-radius: 50%;
    animation: float linear infinite;
    opacity: 0;
  }
  @keyframes float {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.2; }
    100% { transform: translateY(-10px) scale(1.5); opacity: 0; }
  }

  /* GRID LINES */
  .grid-bg {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridPulse 8s ease-in-out infinite;
  }
  @keyframes gridPulse {
    0%,100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  /* SCAN LINE */
  .scanline {
    position: fixed; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    z-index: 1; pointer-events: none;
    animation: scan 6s linear infinite;
  }
  @keyframes scan {
    0% { top: -2px; }
    100% { top: 100vh; }
  }

  /* NAVBAR */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 64px;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    animation: slideDown 0.6s ease;
  }
  @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .logo {
    font-family: 'Orbitron', sans-serif;
    font-weight: 900; font-size: 1.4rem; letter-spacing: 0.15em;
    cursor: pointer; user-select: none;
    background: linear-gradient(135deg, #fff 30%, #888);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  }
  .logo span { color: #fff; -webkit-text-fill-color: #fff; }

  .nav-links { display: flex; gap: 0.25rem; }
  .nav-btn {
    background: none; border: none; color: rgba(255,255,255,0.6);
    font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.5rem 1rem; cursor: pointer; border-radius: 4px;
    transition: all 0.2s; position: relative; overflow: hidden;
  }
  .nav-btn:hover { color: #fff; background: rgba(255,255,255,0.06); }
  .nav-btn.active { color: #fff; }
  .nav-btn.active::after {
    content: ''; position: absolute; bottom: 0; left: 50%; transform: translateX(-50%);
    width: 60%; height: 1px; background: #fff;
  }

  .nav-auth { display: flex; gap: 0.5rem; }
  .btn-outline {
    background: none; border: 1px solid var(--border);
    color: #fff; font-family: 'Space Grotesk', sans-serif;
    font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.4rem 1.2rem; cursor: pointer; border-radius: 3px;
    transition: all 0.3s;
  }
  .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.06); }

  .btn-solid {
    background: #fff; border: 1px solid #fff; color: #000;
    font-family: 'Space Grotesk', sans-serif; font-weight: 600;
    font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.4rem 1.2rem; cursor: pointer; border-radius: 3px;
    transition: all 0.3s;
  }
  .btn-solid:hover { background: transparent; color: #fff; }

  /* CONTENT */
  .content { position: relative; z-index: 2; min-height: 100vh; padding-top: 64px; }

  /* HERO */
  .hero {
    min-height: calc(100vh - 64px);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; padding: 4rem 2rem; position: relative;
  }
  .hero-eyebrow {
    font-family: 'Orbitron', sans-serif; font-size: 0.7rem; letter-spacing: 0.4em;
    color: var(--gray); text-transform: uppercase; margin-bottom: 2rem;
    animation: fadeUp 1s ease 0.3s both;
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif; font-size: clamp(5rem, 15vw, 12rem);
    line-height: 0.9; letter-spacing: 0.02em;
    animation: fadeUp 1s ease 0.5s both;
  }
  .hero-title .outline {
    -webkit-text-stroke: 1px rgba(255,255,255,0.3);
    -webkit-text-fill-color: transparent;
  }
  .hero-sub {
    font-size: 1rem; color: var(--gray); max-width: 520px; line-height: 1.7;
    margin: 2rem auto; animation: fadeUp 1s ease 0.7s both;
  }
  .hero-cta { display: flex; gap: 1rem; justify-content: center; animation: fadeUp 1s ease 0.9s both; }
  .btn-hero {
    background: #fff; color: #000; font-family: 'Space Grotesk', sans-serif;
    font-weight: 700; font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 1rem 2.5rem; border: none; cursor: pointer; border-radius: 2px;
    transition: all 0.3s; position: relative; overflow: hidden;
  }
  .btn-hero::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.1));
    opacity: 0; transition: opacity 0.3s;
  }
  .btn-hero:hover::before { opacity: 1; }
  .btn-hero:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(255,255,255,0.2); }
  .btn-hero-outline {
    background: none; color: #fff; border: 1px solid rgba(255,255,255,0.3);
    font-family: 'Space Grotesk', sans-serif; font-weight: 600;
    font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 1rem 2.5rem; cursor: pointer; border-radius: 2px;
    transition: all 0.3s;
  }
  .btn-hero-outline:hover { border-color: #fff; background: rgba(255,255,255,0.05); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* STATS */
  .stats-bar {
    display: flex; justify-content: center; gap: 0; flex-wrap: wrap;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    margin: 0; background: rgba(255,255,255,0.02);
  }
  .stat-item {
    flex: 1; min-width: 160px; padding: 2rem; text-align: center;
    border-right: 1px solid var(--border); position: relative;
    transition: background 0.3s;
  }
  .stat-item:last-child { border-right: none; }
  .stat-item:hover { background: var(--card-hover); }
  .stat-num {
    font-family: 'Bebas Neue', sans-serif; font-size: 3rem;
    line-height: 1; letter-spacing: 0.05em;
  }
  .stat-label { font-size: 0.7rem; letter-spacing: 0.2em; color: var(--gray); text-transform: uppercase; margin-top: 0.25rem; }

  /* SECTION */
  .section { padding: 6rem 2rem; max-width: 1200px; margin: 0 auto; }
  .section-title {
    font-family: 'Bebas Neue', sans-serif; font-size: clamp(2.5rem, 6vw, 5rem);
    letter-spacing: 0.05em; margin-bottom: 0.5rem;
  }
  .section-sub { color: var(--gray); font-size: 0.9rem; letter-spacing: 0.05em; margin-bottom: 3rem; }

  /* PROGRAMS */
  .programs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); }
  .program-card {
    background: #000; padding: 2.5rem 2rem; cursor: pointer;
    transition: background 0.3s; position: relative; overflow: hidden;
  }
  .program-card::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.04), transparent);
    opacity: 0; transition: opacity 0.4s;
  }
  .program-card:hover { background: rgba(255,255,255,0.04); }
  .program-card:hover::before { opacity: 1; }
  .program-icon { font-size: 2rem; margin-bottom: 1.5rem; }
  .program-name { font-family: 'Orbitron', sans-serif; font-size: 0.9rem; letter-spacing: 0.1em; margin-bottom: 0.75rem; }
  .program-desc { font-size: 0.85rem; color: var(--gray); line-height: 1.6; }
  .program-arrow { margin-top: 1.5rem; font-size: 0.75rem; letter-spacing: 0.2em; color: var(--gray); transition: color 0.3s; }
  .program-card:hover .program-arrow { color: #fff; }

  /* TRAINERS */
  .trainers-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; }
  .trainer-card {
    border: 1px solid var(--border); padding: 2rem 1.5rem; text-align: center;
    transition: all 0.3s; cursor: pointer;
  }
  .trainer-card:hover { border-color: rgba(255,255,255,0.4); transform: translateY(-4px); }
  .trainer-avatar {
    width: 80px; height: 80px; border-radius: 50%; background: rgba(255,255,255,0.08);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif; font-size: 2rem;
    margin: 0 auto 1.25rem; border: 1px solid var(--border);
  }
  .trainer-name { font-weight: 600; font-size: 0.95rem; margin-bottom: 0.25rem; }
  .trainer-role { font-size: 0.75rem; color: var(--gray); letter-spacing: 0.1em; text-transform: uppercase; }

  /* AUTH MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.9); z-index: 200;
    display: flex; align-items: center; justify-content: center; padding: 1rem;
    backdrop-filter: blur(10px);
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .modal {
    background: #0a0a0a; border: 1px solid var(--border);
    width: 100%; max-width: 440px; padding: 2.5rem;
    animation: modalIn 0.4s cubic-bezier(0.34,1.56,0.64,1);
    position: relative; max-height: 90vh; overflow-y: auto;
  }
  @keyframes modalIn { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  .modal-close {
    position: absolute; top: 1rem; right: 1rem;
    background: none; border: 1px solid var(--border); color: var(--gray);
    width: 32px; height: 32px; cursor: pointer; font-size: 1rem;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; border-radius: 2px;
  }
  .modal-close:hover { border-color: #fff; color: #fff; }
  .modal-logo { font-family: 'Orbitron', sans-serif; font-weight: 900; font-size: 1.1rem; letter-spacing: 0.2em; margin-bottom: 2rem; }
  .modal-title { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; letter-spacing: 0.05em; margin-bottom: 0.25rem; }
  .modal-sub { font-size: 0.8rem; color: var(--gray); margin-bottom: 2rem; }

  .role-tabs { display: flex; gap: 0; margin-bottom: 2rem; border: 1px solid var(--border); }
  .role-tab {
    flex: 1; padding: 0.6rem; background: none; border: none; color: var(--gray);
    font-family: 'Space Grotesk', sans-serif; font-size: 0.75rem; letter-spacing: 0.1em;
    text-transform: uppercase; cursor: pointer; transition: all 0.2s;
  }
  .role-tab.active { background: #fff; color: #000; font-weight: 600; }
  .role-tab:not(:last-child) { border-right: 1px solid var(--border); }

  .form-group { margin-bottom: 1.25rem; }
  .form-label { display: block; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); margin-bottom: 0.5rem; }
  .form-input {
    width: 100%; background: rgba(255,255,255,0.04);
    border: 1px solid var(--border); color: #fff;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem;
    padding: 0.75rem 1rem; outline: none; transition: border-color 0.2s;
    border-radius: 2px;
  }
  .form-input:focus { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.06); }
  .form-input::placeholder { color: rgba(255,255,255,0.2); }

  .form-select {
    width: 100%; background: rgba(255,255,255,0.04);
    border: 1px solid var(--border); color: #fff;
    font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem;
    padding: 0.75rem 1rem; outline: none; transition: border-color 0.2s;
    border-radius: 2px; cursor: pointer;
    -webkit-appearance: none; appearance: none;
  }
  .form-select:focus { border-color: rgba(255,255,255,0.5); }
  .form-select option { background: #111; }

  .btn-submit {
    width: 100%; background: #fff; color: #000; border: none;
    font-family: 'Space Grotesk', sans-serif; font-weight: 700;
    font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase;
    padding: 0.875rem; cursor: pointer; margin-top: 0.5rem;
    transition: all 0.3s; border-radius: 2px;
  }
  .btn-submit:hover { background: #e0e0e0; transform: translateY(-1px); }
  .btn-submit:active { transform: translateY(0); }

  .form-switch { text-align: center; margin-top: 1.25rem; font-size: 0.8rem; color: var(--gray); }
  .form-switch button { background: none; border: none; color: #fff; cursor: pointer; font-size: 0.8rem; text-decoration: underline; font-family: 'Space Grotesk', sans-serif; }

  .error-msg { font-size: 0.75rem; color: #ff6b6b; margin-top: 0.5rem; display: block; }
  .success-msg { font-size: 0.75rem; color: #6bff9e; margin-top: 0.5rem; display: block; }

  /* PORTALS */
  .portal { min-height: calc(100vh - 64px); padding: 2rem; }
  .portal-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; }
  .portal-greeting { font-family: 'Bebas Neue', sans-serif; font-size: 3rem; letter-spacing: 0.05em; line-height: 1; }
  .portal-role { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray); margin-top: 0.25rem; }
  .portal-actions { display: flex; gap: 0.5rem; }

  .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 2rem; }
  .dash-card {
    background: #000; padding: 1.5rem 1.75rem;
    transition: background 0.3s; cursor: default;
  }
  .dash-card:hover { background: rgba(255,255,255,0.04); }
  .dash-card-label { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray); margin-bottom: 0.75rem; }
  .dash-card-val { font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem; line-height: 1; }
  .dash-card-trend { font-size: 0.75rem; color: var(--gray); margin-top: 0.5rem; }
  .dash-card-trend.up { color: rgba(255,255,255,0.7); }

  .section-heading { font-family: 'Orbitron', sans-serif; font-size: 0.8rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray); margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.75rem; }

  .table-wrap { border: 1px solid var(--border); overflow: hidden; margin-bottom: 2rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  th { text-align: left; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); padding: 0.875rem 1.25rem; border-bottom: 1px solid var(--border); font-weight: 500; }
  td { padding: 0.875rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.04); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.02); }

  .badge {
    display: inline-block; padding: 0.2rem 0.6rem; font-size: 0.65rem;
    letter-spacing: 0.1em; text-transform: uppercase; border-radius: 2px; font-weight: 600;
  }
  .badge-active { background: rgba(255,255,255,0.1); color: #fff; }
  .badge-inactive { background: rgba(255,255,255,0.04); color: var(--gray); }
  .badge-pending { background: rgba(255,200,0,0.1); color: rgba(255,200,0,0.8); }

  .action-btn {
    background: none; border: 1px solid var(--border); color: var(--gray);
    font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.3rem 0.75rem; cursor: pointer; border-radius: 2px;
    transition: all 0.2s; font-family: 'Space Grotesk', sans-serif;
  }
  .action-btn:hover { border-color: #fff; color: #fff; }

  /* SCHEDULE */
  .schedule-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); margin-bottom: 2rem; }
  .schedule-day { background: #000; min-height: 100px; padding: 0.75rem; }
  .schedule-day-name { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); margin-bottom: 0.5rem; }
  .schedule-class {
    font-size: 0.7rem; padding: 0.3rem 0.5rem; margin-bottom: 0.25rem;
    border-left: 2px solid rgba(255,255,255,0.4); background: rgba(255,255,255,0.04);
    cursor: pointer; transition: background 0.2s;
  }
  .schedule-class:hover { background: rgba(255,255,255,0.08); }

  /* USER PROFILE */
  .profile-grid { display: grid; grid-template-columns: 280px 1fr; gap: 1.5rem; }
  .profile-card { border: 1px solid var(--border); padding: 2rem; text-align: center; }
  .profile-avatar {
    width: 100px; height: 100px; border-radius: 50%;
    background: rgba(255,255,255,0.06); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Bebas Neue', sans-serif; font-size: 2.5rem;
    margin: 0 auto 1.25rem;
  }
  .profile-name { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; letter-spacing: 0.05em; }
  .profile-since { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); margin-bottom: 1.5rem; }
  .profile-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); border-top: 1px solid var(--border); }
  .profile-stat { background: #000; padding: 1rem; text-align: center; }
  .profile-stat-val { font-family: 'Bebas Neue', sans-serif; font-size: 1.8rem; line-height: 1; }
  .profile-stat-lbl { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); margin-top: 0.25rem; }

  /* GLITCH TEXT */
  .glitch {
    position: relative;
    animation: glitch 10s infinite;
  }
  @keyframes glitch {
    0%, 90%, 100% { transform: none; clip-path: none; }
    92% { transform: skew(-1deg); }
    94% { transform: skew(0.5deg) translateX(-2px); }
    96% { transform: none; }
    98% { transform: skew(2deg) translateX(1px); }
  }

  /* MARQUEE */
  .marquee-wrap { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); overflow: hidden; background: rgba(255,255,255,0.02); }
  .marquee { display: flex; gap: 3rem; padding: 0.75rem 0; animation: marquee 20s linear infinite; white-space: nowrap; }
  .marquee span { font-family: 'Orbitron', sans-serif; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gray); flex-shrink: 0; }
  .marquee span.dot { color: rgba(255,255,255,0.3); }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }

  /* TABS */
  .tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 2rem; }
  .tab {
    padding: 0.75rem 1.5rem; background: none; border: none; color: var(--gray);
    font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem;
    letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer;
    transition: all 0.2s; border-bottom: 2px solid transparent; margin-bottom: -1px;
  }
  .tab.active { color: #fff; border-bottom-color: #fff; }
  .tab:hover:not(.active) { color: rgba(255,255,255,0.6); }

  /* PROGRESS BAR */
  .progress-bar { height: 2px; background: rgba(255,255,255,0.1); margin-top: 0.5rem; }
  .progress-fill { height: 100%; background: #fff; transition: width 1s ease; }

  /* NOTIFICATION */
  .notification {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 300;
    background: #fff; color: #000; padding: 1rem 1.5rem;
    font-size: 0.85rem; font-weight: 600; border-radius: 2px;
    animation: slideInRight 0.4s cubic-bezier(0.34,1.56,0.64,1);
    max-width: 300px;
  }
  @keyframes slideInRight {
    from { transform: translateX(120%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .profile-grid { grid-template-columns: 1fr; }
    .schedule-grid { grid-template-columns: repeat(3, 1fr); }
    .nav-links { display: none; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────




// Mock DB
const MOCK_ACCOUNTS = {
  "admin@ironforge.com": { password: "admin123", role: "admin", name: "Admin" },
  "raj@ironforge.com": { password: "emp123", role: "employee", name: "Raj Kumar", dept: "Fitness" },
  "rahul@mail.com": { password: "user123", role: "user", name: "Rahul Sharma", plan: "Premium", sessions: 48 },
};
export default function App() {
  const [modal, setModal] = useState(null); // null | "login" | "signup"
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const notify = msg => {
    setNotification(msg);
  };

  const handleLogin = acc => {
    setUser(acc);
  };

  const handleLogout = () => {
    setUser(null);
    notify("Logged out successfully");
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <Particles />
      <div className="grid-bg" />
      <div className="scanline" />

      <nav className="navbar">
        <div className="logo" onClick={() => setUser(null)}>IRON<span style={{ color: "rgba(255,255,255,0.4)" }}>FORGE</span></div>

        {!user && (
          <div className="nav-links">
            {["Programs", "Trainers", "Pricing", "About"].map(l => (
              <button key={l} className="nav-btn">{l}</button>
            ))}
          </div>
        )}

        {user && (
          <div style={{ fontSize: "0.75rem", color: "var(--gray)", letterSpacing: "0.1em" }}>
            {user.role.toUpperCase()} PORTAL — <span style={{ color: "#fff" }}>{user.name}</span>
          </div>
        )}

        {!user && (
          <div className="nav-auth">
            <button className="btn-outline" onClick={() => setModal("login")}>LOGIN</button>
            <button className="btn-solid" onClick={() => setModal("signup")}>JOIN FREE</button>
          </div>
        )}
      </nav>

      <div className="content">
        {!user && <LandingPage onLogin={() => setModal("login")} onSignup={() => setModal("signup")} />}
        {user?.role === "admin" && <AdminPortal user={user} onLogout={handleLogout} notify={notify} />}
        {user?.role === "employee" && <EmployeePortal user={user} onLogout={handleLogout} notify={notify} />}
        {user?.role === "user" && <UserPortal user={user} onLogout={handleLogout} notify={notify} />}
      </div>

      {modal && (
        <AuthModal mode={modal} onClose={() => setModal(null)} onLogin={handleLogin} />
      )}

      {notification && (
        <Notification msg={notification} onDone={() => setNotification(null)} />
      )}
    </>
  );
}