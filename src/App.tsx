import { useMemo, useState, type ReactNode } from "react";

type IconName =
  | "home"
  | "library"
  | "compass"
  | "bookmark"
  | "settings"
  | "search"
  | "bell"
  | "arrow"
  | "play"
  | "more"
  | "close"
  | "sun"
  | "moon"
  | "type"
  | "chevron";

const paths: Record<IconName, ReactNode> = {
  home: <><path d="M3.5 10.7 12 3.5l8.5 7.2" /><path d="M5.5 9.5v10h13v-10M9 19.5v-6h6v6" /></>,
  library: <><path d="M5 4v16M10 4v16M15 5v15" /><path d="m15 5 3.5-1 2 15-3.5 1Z" /></>,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
  bookmark: <path d="M6.5 4.5h11v16L12 17l-5.5 3.5Z" />,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M18.5 5.5l-1.4 1.4M6.9 17.1l-1.4 1.4" /></>,
  search: <><circle cx="10.7" cy="10.7" r="6.5" /><path d="m15.5 15.5 4.2 4.2" /></>,
  bell: <><path d="M6.5 10.5c0-3.5 2-6 5.5-6s5.5 2.5 5.5 6v4l2 2h-15l2-2Z" /><path d="M9.5 19h5" /></>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  play: <path d="m9 7 8 5-8 5Z" />,
  more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  sun: <><circle cx="12" cy="12" r="3.5" /><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" /></>,
  moon: <path d="M19 15.2A8 8 0 0 1 8.8 5 8.2 8.2 0 1 0 19 15.2Z" />,
  type: <><path d="M4 6V4h16v2M12 4v16M8 20h8" /></>,
  chevron: <path d="m9 6 6 6-6 6" />,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function IconButton({ label, icon, onClick, className = "" }: { label: string; icon: IconName; onClick?: () => void; className?: string }) {
  return <button className={`icon-button ${className}`} aria-label={label} onClick={onClick}><Icon name={icon} /></button>;
}

const books = [
  { title: "Klara y el Sol", author: "Kazuo Ishiguro", cover: "sun", color: "gold", category: "Ficción" },
  { title: "La biblioteca de la medianoche", author: "Matt Haig", cover: "midnight", color: "blue", category: "Ficción" },
  { title: "El infinito en un junco", author: "Irene Vallejo", cover: "reed", color: "rust", category: "Ensayo" },
  { title: "Una educación", author: "Tara Westover", cover: "education", color: "cream", category: "Biografías" },
  { title: "Los astronautas", author: "Laura Ferrero", cover: "astronauts", color: "pink", category: "Ficción" },
  },
  { title: "Revelación de la cruz", author: "César Castellanos", cover: "sun", color: "cream", category: "Ensayo" },
  ];

function BookCover({ kind, size = "regular" }: { kind: string; size?: "regular" | "small" }) {
  return (
    <div className={`book-cover cover-${kind} ${size === "small" ? "book-cover-small" : ""}`}>
      {kind === "sun" && <><span className="cover-kicker">KAZUO<br />ISHIGURO</span><span className="cover-title">KLARA<br /><i>y el</i> SOL</span><span className="cover-orb" /></>}
      {kind === "midnight" && <><span className="cover-kicker">MATT HAIG</span><span className="cover-title">LA BIBLIOTECA<br />DE LA<br />MEDIANOCHE</span><span className="cover-moon">✦</span></>}
      {kind === "reed" && <><span className="cover-kicker">IRENE VALLEJO</span><span className="cover-title">EL INFINITO<br />EN UN JUNCO</span><span className="cover-lines" /></>}
      {kind === "education" && <><span className="cover-kicker">TARA WESTOVER</span><span className="cover-title">UNA<br />EDUCACIÓN</span><span className="cover-mountain" /></>}
      {kind === "astronauts" && <><span className="cover-kicker">LAURA FERRERO</span><span className="cover-title">LOS<br />ASTRONAUTAS</span><span className="cover-circle" /></>}
    </div>
  );
}

function Reader({ onClose }: { onClose: () => void }) {
  const [theme, setTheme] = useState<"paper" | "night">("paper");
  const [fontSize, setFontSize] = useState(1);
  return (
    <div className={`reader ${theme === "night" ? "reader-night" : ""}`}>
      <header className="reader-header">
        <button className="reader-back" onClick={onClose}><Icon name="close" /><span>Volver a la biblioteca</span></button>
        <div className="reader-book"><strong>Klara y el Sol</strong><span>Kazuo Ishiguro</span></div>
        <div className="reader-tools">
          <IconButton label="Ajustar texto" icon="type" onClick={() => setFontSize((fontSize + 1) % 3)} />
          <IconButton label="Cambiar tema" icon={theme === "paper" ? "moon" : "sun"} onClick={() => setTheme(theme === "paper" ? "night" : "paper")} />
          <IconButton label="Añadir marcador" icon="bookmark" />
        </div>
      </header>
      <main className={`reading-page reading-size-${fontSize}`}>
        <div className="chapter-label">CAPÍTULO CUATRO</div>
        <h1>El sol siempre encontraba<br />la manera de alcanzarnos</h1>
        <p className="drop-cap">Cuando llegué a la tienda, el sol de la mañana dibujaba rectángulos luminosos sobre el suelo. Desde mi lugar junto al escaparate podía observar a las personas que apresuraban el paso por la acera, cada una concentrada en un destino que yo solo podía imaginar.</p>
        <p>Rosa estaba a mi lado, pero aquel día permanecía más callada que de costumbre. Ambas sabíamos que Gerente podía cambiarnos de sitio en cualquier momento. Aun así, mientras la luz siguiera cayendo sobre nosotras, sentía que todo iría bien.</p>
        <blockquote>«El sol era bondadoso. Siempre encontraba una forma de llegar hasta nosotros.»</blockquote>
        <p>Al otro lado del cristal, una niña se detuvo. No tendría más de catorce años. Me miró durante unos segundos y entonces sonrió con una familiaridad que me sorprendió.</p>
      </main>
      <footer className="reader-footer"><span>32</span><div className="reader-progress"><i /></div><span>41 min restantes</span></footer>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Inicio");
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [reading, setReading] = useState(false);

  const visibleBooks = useMemo(() => books.filter((book) =>
    (filter === "Todos" || book.category === filter) &&
    `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase())
  ), [filter, search]);

  if (reading) return <Reader onClose={() => setReading(false)} />;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">m</span><span>marea</span></div>
        <nav className="nav-list">
          {[
            ["Inicio", "home"], ["Mi biblioteca", "library"], ["Descubrir", "compass"], ["Guardados", "bookmark"],
          ].map(([label, icon]) => (
            <button key={label} onClick={() => setActiveNav(label)} className={`nav-item ${activeNav === label ? "active" : ""}`}>
              <Icon name={icon as IconName} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-spacer" />
        <div className="reading-goal">
          <div className="goal-heading"><span>Meta de lectura</span><strong>2024</strong></div>
          <div className="goal-number"><strong>18</strong><span>/ 24 libros</span></div>
          <div className="goal-track"><i /></div>
          <p>¡Ya casi! Has leído 3 libros<br />más que el mes pasado.</p>
        </div>
        <button className="nav-item settings"><Icon name="settings" /><span>Ajustes</span></button>
        <div className="profile">
          <div className="avatar">LV</div>
          <div><strong>Lucía Vega</strong><span>Plan lector</span></div>
          <Icon name="more" />
        </div>
      </aside>

      <main className="dashboard">
        <header className="topbar">
          <div className="search">
            <Icon name="search" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Busca por título, autor o ISBN" aria-label="Buscar libros" />
            <kbd>⌘ K</kbd>
          </div>
          <IconButton label="Notificaciones" icon="bell" className="notification" />
        </header>

        <section className="content">
          <div className="welcome">
            <div><span className="eyebrow">MIÉRCOLES, 12 DE JUNIO</span><h1>Buenas tardes, Lucía.</h1><p>¿Qué historia continuamos hoy?</p></div>
            <div className="weekly"><span>Esta semana</span><strong>4h 26m</strong><small>+18% respecto a la anterior</small></div>
          </div>

          <section className="continue-card">
            <div className="hero-cover-wrap"><BookCover kind="sun" /><span className="cover-shadow" /></div>
            <div className="continue-copy">
              <span className="eyebrow">CONTINUAR LEYENDO</span>
              <h2>Klara y el Sol</h2>
              <p className="author">Kazuo Ishiguro</p>
              <p className="synopsis">Una inolvidable historia sobre el amor, la soledad y lo que significa ser humano, narrada a través de los ojos de una Amiga Artificial.</p>
              <div className="book-progress"><div><span>Progreso</span><strong>38%</strong></div><div className="progress-track"><i /></div><small>Página 116 de 304 · 4h 12m restantes</small></div>
              <button className="primary-button" onClick={() => setReading(true)}><span className="play-dot"><Icon name="play" size={17} /></span>Seguir leyendo<Icon name="arrow" /></button>
            </div>
            <button className="quiet-button" aria-label="Más opciones"><Icon name="more" /></button>
          </section>

          <div className="section-heading">
            <div><h2>Tu biblioteca</h2><p>Los libros que has guardado para después.</p></div>
            <button className="link-button">Ver todos <Icon name="arrow" size={17} /></button>
          </div>
          <div className="filters">
            {["Todos", "Ficción", "Ensayo", "Biografías"].map((item) => <button key={item} onClick={() => setFilter(item)} className={filter === item ? "selected" : ""}>{item}</button>)}
          </div>
          <div className="book-grid">
            {visibleBooks.map((book) => (
              <article className="book-item" key={book.title}>
                <div className="book-cover-wrap"><BookCover kind={book.cover} /><button aria-label={`Opciones para ${book.title}`}><Icon name="more" /></button></div>
                <h3>{book.title}</h3><p>{book.author}</p>
              </article>
            ))}
            {visibleBooks.length === 0 && <p className="empty">No encontramos libros que coincidan con tu búsqueda.</p>}
          </div>
        </section>
      </main>

      <aside className="right-panel">
        <div className="right-heading"><h2>Tu rincón de lectura</h2><IconButton label="Ocultar panel" icon="chevron" /></div>
        <div className="quote-card">
          <span className="quote-mark">“</span><p>Un lector vive mil vidas antes de morir. Aquel que nunca lee vive solo una.</p><span>— George R. R. Martin</span>
        </div>
        <div className="stats-title"><h3>Tu ritmo</h3><button>Últimos 7 días <Icon name="chevron" size={14} /></button></div>
        <div className="chart">
          {[44, 64, 38, 82, 57, 72, 32].map((height, index) => <div key={index} className={index === 3 ? "highlight" : ""}><i style={{ height: `${height}%` }} /><span>{["L", "M", "X", "J", "V", "S", "D"][index]}</span></div>)}
        </div>
        <div className="streak"><span className="flame">12</span><div><strong>12 días seguidos</strong><p>Tu mejor racha: 21 días</p></div></div>
        <div className="recent-title"><h3>Actividad reciente</h3><button>Ver todo</button></div>
        <div className="activity">
          <BookCover kind="midnight" size="small" /><div><strong>Terminaste un libro</strong><p>La biblioteca de la medianoche</p><span>Hace 2 días</span></div>
        </div>
        <div className="activity activity-note">
          <div className="note-icon"><Icon name="bookmark" /></div><div><strong>Nuevo marcador</strong><p>El infinito en un junco</p><span>Hace 4 días</span></div>
        </div>
      </aside>
    </div>
  );
}
