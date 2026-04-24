export default function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 0.5}px`,
          height: `${Math.random() * 2 + 0.5}px`,
          animationDuration: `${Math.random() * 15 + 10}s`,
          animationDelay: `${Math.random() * 10}s`,
        }} />
      ))}
    </div>
  );
}
