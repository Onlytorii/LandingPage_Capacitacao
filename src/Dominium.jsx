import { useState, useEffect, useRef } from "react";

// ─── FONT LOADER ─────────────────────────────────────────────────────────────
function FontAndGlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');
      html { scroll-behavior: smooth; }
      body { background: #0d0d1a; color: #e2e8f0; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: #0d0d1a; }
      ::-webkit-scrollbar-thumb { background: #2d2d50; border-radius: 2px; }

      @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
      @keyframes pulse2   { 0%,100%{opacity:.7;} 50%{opacity:1;} }
      @keyframes gridScroll { from { background-position:0 0; } to { background-position:60px 60px; } }
      @keyframes shimmerGrad {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }

      .font-syne  { font-family: 'Syne', sans-serif; }
      .font-dm    { font-family: 'DM Sans', sans-serif; }

      .anim-fadeup  { animation: fadeUp .9s ease both; }
      .eyebrow-dot  { animation: pulse2 2.2s infinite; }

      .hero-grid-bg {
        position:absolute;inset:0;pointer-events:none;
        background-image: linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
        background-size: 60px 60px;
        animation: gridScroll 12s linear infinite;
        opacity: .5;
      }

      .grad-text {
        background: linear-gradient(120deg, #a78bfa 0%, #818cf8 50%, #60a5fa 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .section-tag-line::before {
        content: '';
        display: inline-block;
        width: 18px; height: 2px;
        background: #a78bfa;
        border-radius: 1px;
        margin-right: 7px;
        vertical-align: middle;
      }

      .reveal { opacity:0; transform:translateY(24px); transition: opacity .65s ease, transform .65s ease; }
      .reveal.visible { opacity:1; transform:translateY(0); }

      .star-shape {
        width:12px; height:12px;
        background: #fbbf24;
        clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);
        display: inline-block;
      }

      .sobre-card-glow::before {
        content:'';position:absolute;top:-60px;right:-60px;
        width:200px;height:200px;border-radius:50%;
        background:#7c3aed0a;filter:blur(40px);pointer-events:none;
      }

      .cta-box-glow::before {
        content:'';position:absolute;top:-100px;left:50%;transform:translateX(-50%);
        width:500px;height:400px;background:#7c3aed09;border-radius:50%;filter:blur(70px);pointer-events:none;
      }

      select option { background: #1a1a35; }
    `}</style>
  );
}

// ─── REVEAL HOOK ─────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const delay = parseFloat(el.dataset.delay || "0") * 1000;
        setTimeout(() => el.classList.add("visible"), delay);
        obs.unobserve(el);
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── SVG LOGO ────────────────────────────────────────────────────────────────
function Logo({ size = 30 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect x="3"  y="12" width="8"  height="20" rx="2" fill="#a78bfa"/>
      <rect x="12" y="6"  width="8"  height="26" rx="2" fill="#7c3aed"/>
      <rect x="21" y="16" width="8"  height="16" rx="2" fill="#a78bfa" opacity=".7"/>
      <rect x="5"  y="16" width="2"  height="3"  rx="1" fill="#fff" opacity=".6"/>
      <rect x="14" y="10" width="2"  height="3"  rx="1" fill="#fff" opacity=".6"/>
      <rect x="14" y="16" width="2"  height="3"  rx="1" fill="#fff" opacity=".6"/>
      <rect x="23" y="20" width="2"  height="3"  rx="1" fill="#fff" opacity=".6"/>
    </svg>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-16 h-[70px] border-b border-white/[0.06]"
         style={{ background: "#0d0d1add", backdropFilter: "blur(20px)" }}>
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <Logo size={30}/>
        <div>
          <div className="font-syne font-extrabold text-xl text-[#e2e8f0] tracking-tight">Dominium</div>
          <div className="text-[10px] text-[#475569] font-medium tracking-[0.8px] uppercase mt-[1px]">Imobiliária · Natal, RN</div>
        </div>
      </a>

      <ul className="hidden md:flex gap-7 list-none">
        {[["#imoveis","Imóveis"],["#sobre","Sobre"],["#equipe","Equipe"],["#depoimentos","Depoimentos"],["#contato","Contato"]].map(([href, label]) => (
          <li key={href}><a href={href} className="text-[#94a3b8] no-underline text-[13px] font-medium hover:text-[#e2e8f0] transition-colors">{label}</a></li>
        ))}
      </ul>

      <div className="flex items-center gap-2.5">
        <span className="hidden md:flex items-center gap-1.5 text-[13px] text-[#94a3b8] font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          (84) 3030-0000
        </span>
        <a href="#contato" className="flex items-center gap-1.5 px-5 py-2.5 rounded-[10px] bg-[#a78bfa] text-white text-[13px] font-semibold no-underline hover:bg-[#9879f7] transition-all hover:-translate-y-px">
          Fale conosco
        </a>
      </div>
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function SearchBar() {
  const ref = useReveal();
  const [query, setQuery] = useState("");
  const [tipo, setTipo] = useState("");
  const [bairro, setBairro] = useState("");

  const buscar = () => {
    document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={ref} className="reveal w-full max-w-[680px] mx-auto flex items-center gap-3 rounded-2xl border border-white/[0.16] px-5 py-1.5 pr-1.5"
         style={{ background: "#13132a" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input
        value={query} onChange={e => setQuery(e.target.value)}
        placeholder="Busque por bairro, tipo ou código do imóvel…"
        className="flex-1 bg-transparent border-none outline-none text-[#e2e8f0] text-[14px] font-dm placeholder-[#475569]"
      />
      <div className="flex border-l border-white/[0.1] pl-3">
        <select value={tipo} onChange={e => setTipo(e.target.value)}
          className="bg-transparent border-none outline-none text-[#94a3b8] text-[13px] cursor-pointer font-dm px-2 py-1">
          <option value="">Tipo</option>
          {["Apartamento","Casa","Cobertura","Loft","Terreno","Comercial"].map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={bairro} onChange={e => setBairro(e.target.value)}
          className="bg-transparent border-none outline-none text-[#94a3b8] text-[13px] cursor-pointer font-dm px-2 py-1">
          <option value="">Bairro</option>
          {["Ponta Negra","Candelária","Lagoa Nova","Petrópolis","Capim Macio"].map(b => <option key={b}>{b}</option>)}
        </select>
      </div>
      <button onClick={buscar}
        className="flex items-center gap-1.5 px-[22px] py-3 rounded-xl bg-[#a78bfa] text-white border-none text-[13px] font-semibold cursor-pointer font-dm whitespace-nowrap hover:bg-[#9879f7] transition-colors">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        Buscar
      </button>
    </div>
  );
}

function HeroStats() {
  const ref = useReveal();
  const stats = [
    { val: "+800", label: "Imóveis vendidos",         color: "#a78bfa" },
    { val: "15",   label: "Anos de experiência",      color: "#34d27b" },
    { val: "98%",  label: "Clientes satisfeitos",     color: "#60a5fa" },
    { val: "12",   label: "Corretores especializados", color: "#fbbf24" },
  ];
  return (
    <div ref={ref} className="reveal flex items-center justify-center flex-wrap mt-12">
      {stats.map((s, i) => (
        <div key={i} className={`px-9 ${i < stats.length - 1 ? "border-r border-white/[0.1]" : ""}`}>
          <div className="font-syne text-[30px] font-extrabold" style={{ color: s.color }}>{s.val}</div>
          <div className="text-[12px] text-[#475569] font-medium mt-0.5 tracking-[0.2px]">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-16 pt-28 pb-20 overflow-hidden text-center">
      <div className="hero-grid-bg"/>
      {/* Orbs */}
      <div className="absolute rounded-full pointer-events-none" style={{ width:600,height:600,top:-160,left:"50%",transform:"translateX(-55%)",background:"#7c3aed12",filter:"blur(90px)" }}/>
      <div className="absolute rounded-full pointer-events-none" style={{ width:280,height:280,bottom:60,right:"8%",background:"#60a5fa0a",filter:"blur(90px)" }}/>
      <div className="absolute rounded-full pointer-events-none" style={{ width:200,height:200,top:"35%",left:"4%",background:"#34d27b09",filter:"blur(90px)" }}/>

      <div className="relative max-w-[820px] anim-fadeup">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-[20px] px-4 py-[5px] text-[12px] font-semibold tracking-[0.4px] mb-7"
             style={{ background:"#a78bfa12", border:"1px solid #a78bfa28", color:"#a78bfa" }}>
          <span className="eyebrow-dot w-[7px] h-[7px] rounded-full bg-[#34d27b] flex-shrink-0"/>
          Natal, RN — Há 15 anos no mercado imobiliário
        </div>

        <h1 className="font-syne font-extrabold text-[#e2e8f0] mb-[22px]"
            style={{ fontSize:"clamp(44px,6.5vw,74px)", lineHeight:1.06, letterSpacing:"-2px" }}>
          O imóvel certo<br/>
          <span className="grad-text">para cada momento</span><br/>
          da sua vida
        </h1>

        <p className="text-[17px] text-[#94a3b8] font-light max-w-[540px] mx-auto mb-10" style={{ lineHeight:1.75 }}>
          Da praia à cidade, do primeiro apartamento à cobertura dos sonhos. A Dominium conecta você ao imóvel perfeito com expertise, transparência e cuidado real.
        </p>

        <SearchBar/>
        <HeroStats/>
      </div>
    </div>
  );
}

// ─── IMÓVEIS ──────────────────────────────────────────────────────────────────
const SVG_COBERTURA = (
  <svg width="100%" height="100%" viewBox="0 0 340 200"><rect width="340" height="200" fill="#0f0f22"/><rect width="340" height="130" fill="#090915"/><circle cx="40" cy="20" r="1" fill="#fff" opacity=".6"/><circle cx="90" cy="35" r=".8" fill="#fff" opacity=".4"/><circle cx="160" cy="15" r="1.2" fill="#fff" opacity=".7"/><circle cx="220" cy="28" r=".8" fill="#fff" opacity=".5"/><circle cx="280" cy="18" r="1" fill="#fff" opacity=".6"/><circle cx="310" cy="40" r=".7" fill="#fff" opacity=".4"/><circle cx="290" cy="30" r="18" fill="#1a1a40"/><circle cx="296" cy="26" r="16" fill="#090915"/><rect x="0" y="60" width="30" height="70" fill="#13132a"/><rect x="35" y="50" width="25" height="80" fill="#1a1a35"/><rect x="65" y="70" width="20" height="60" fill="#13132a"/><rect x="90" y="45" width="40" height="85" fill="#1a1a35"/><rect x="240" y="55" width="35" height="75" fill="#13132a"/><rect x="280" y="48" width="28" height="82" fill="#1a1a35"/><rect x="310" y="65" width="30" height="65" fill="#13132a"/><rect x="40" y="60" width="4" height="4" fill="#fbbf24" opacity=".5"/><rect x="50" y="60" width="4" height="4" fill="#fbbf24" opacity=".3"/><rect x="40" y="70" width="4" height="4" fill="#fbbf24" opacity=".6"/><rect x="95" y="55" width="5" height="5" fill="#a78bfa" opacity=".5"/><rect x="106" y="55" width="5" height="5" fill="#a78bfa" opacity=".4"/><rect x="95" y="66" width="5" height="5" fill="#fbbf24" opacity=".4"/><rect x="248" y="65" width="5" height="5" fill="#60a5fa" opacity=".5"/><rect x="260" y="65" width="5" height="5" fill="#fbbf24" opacity=".4"/><rect x="120" y="30" width="100" height="100" fill="#1e1e42"/><rect x="125" y="35" width="90" height="3" fill="#a78bfa" opacity=".15"/><rect x="125" y="43" width="40" height="30" fill="#13132a" rx="2"/><rect x="175" y="43" width="40" height="30" fill="#a78bfa" opacity=".08" rx="2"/><rect x="130" y="48" width="8" height="10" fill="#a78bfa" opacity=".4"/><rect x="143" y="48" width="8" height="10" fill="#a78bfa" opacity=".3"/><rect x="156" y="48" width="8" height="10" fill="#fbbf24" opacity=".5"/><rect x="180" y="48" width="8" height="10" fill="#a78bfa" opacity=".6"/><rect x="193" y="48" width="8" height="10" fill="#a78bfa" opacity=".4"/><rect x="125" y="83" width="90" height="45" fill="#141430" rx="2"/><rect x="130" y="88" width="25" height="34" fill="#1e1e42" rx="1"/><rect x="163" y="88" width="25" height="34" fill="#a78bfa" opacity=".1" rx="1"/><rect x="196" y="88" width="14" height="34" fill="#1e1e42" rx="1"/><rect x="115" y="28" width="110" height="6" fill="#2d2d5e"/><rect x="118" y="22" width="10" height="8" fill="#2d2d5e"/><rect x="212" y="22" width="10" height="8" fill="#2d2d5e"/><rect x="130" y="18" width="80" height="7" fill="#60a5fa" opacity=".3" rx="3"/><rect x="0" y="130" width="340" height="70" fill="#0a0a1f"/><path d="M0 140 Q85 130 170 138 Q255 146 340 136 L340 200 L0 200Z" fill="#0d1030"/><path d="M0 155 Q85 148 170 155 Q255 162 340 152 L340 200 L0 200Z" fill="#0f1235" opacity=".8"/><line x1="60" y1="145" x2="90" y2="145" stroke="#a78bfa" strokeWidth=".5" opacity=".2"/><line x1="150" y1="148" x2="190" y2="148" stroke="#60a5fa" strokeWidth=".5" opacity=".15"/><line x1="250" y1="143" x2="290" y2="143" stroke="#a78bfa" strokeWidth=".5" opacity=".2"/></svg>
);

const SVG_CASA = (
  <svg width="100%" height="100%" viewBox="0 0 340 200"><rect width="340" height="200" fill="#0e1a0e"/><rect width="340" height="120" fill="#0a1210"/><ellipse cx="80" cy="30" rx="50" ry="18" fill="#121f18" opacity=".8"/><ellipse cx="240" cy="45" rx="60" ry="15" fill="#121f18" opacity=".6"/><rect x="0" y="90" width="340" height="30" fill="#0d1a0d"/><ellipse cx="30" cy="90" rx="28" ry="22" fill="#122212"/><ellipse cx="60" cy="85" rx="22" ry="20" fill="#152615"/><ellipse cx="290" cy="88" rx="30" ry="24" fill="#122212"/><ellipse cx="310" cy="82" rx="22" ry="20" fill="#152615"/><rect x="20" y="110" width="300" height="8" fill="#1a2a1a"/><rect x="20" y="105" width="4" height="5" fill="#1e2e1e"/><rect x="316" y="105" width="4" height="5" fill="#1e2e1e"/><rect x="90" y="60" width="160" height="55" fill="#1a2e1a"/><polygon points="80,62 170,30 260,62" fill="#142214"/><polygon points="82,62 170,32 258,62" fill="#1e3220"/><rect x="95" y="70" width="40" height="44" fill="#152515" rx="1"/><rect x="145" y="70" width="30" height="28" fill="#34d27b" opacity=".08" rx="1"/><rect x="185" y="70" width="40" height="44" fill="#152515" rx="1"/><rect x="100" y="75" width="12" height="14" fill="#34d27b" opacity=".2" rx="1"/><rect x="118" y="75" width="12" height="14" fill="#fbbf24" opacity=".3" rx="1"/><rect x="148" y="75" width="22" height="18" fill="#a78bfa" opacity=".12" rx="1"/><rect x="190" y="75" width="12" height="14" fill="#34d27b" opacity=".2" rx="1"/><rect x="208" y="75" width="12" height="14" fill="#fbbf24" opacity=".25" rx="1"/><rect x="155" y="95" width="30" height="20" fill="#0e1e0e" rx="2"/><circle cx="180" cy="106" r="1.5" fill="#a78bfa" opacity=".7"/><rect x="110" y="125" width="80" height="30" fill="#60a5fa" opacity=".15" rx="4"/><rect x="112" y="127" width="76" height="26" fill="#1a3a5a" opacity=".5" rx="3"/><ellipse cx="150" cy="140" rx="30" ry="8" fill="#60a5fa" opacity=".1"/><rect x="0" y="150" width="340" height="50" fill="#0d1a0d"/><ellipse cx="50" cy="155" rx="20" ry="15" fill="#112011"/><ellipse cx="280" cy="153" rx="22" ry="16" fill="#112011"/><path d="M0 160 Q170 155 340 160 L340 200 L0 200Z" fill="#0f1f0f"/></svg>
);

const SVG_EDIFICIO = (
  <svg width="100%" height="100%" viewBox="0 0 340 200"><rect width="340" height="200" fill="#0d0d22"/><rect x="0" y="40" width="80" height="160" fill="#0f0f28"/><rect x="85" y="20" width="60" height="180" fill="#13132e"/><rect x="150" y="10" width="90" height="190" fill="#0f0f28"/><rect x="245" y="30" width="50" height="170" fill="#13132e"/><rect x="300" y="50" width="40" height="150" fill="#0f0f28"/><line x1="150" y1="10" x2="150" y2="200" stroke="#1a1a40" strokeWidth="1"/><line x1="165" y1="10" x2="165" y2="200" stroke="#1a1a40" strokeWidth="1"/><line x1="180" y1="10" x2="180" y2="200" stroke="#1a1a40" strokeWidth="1"/><line x1="195" y1="10" x2="195" y2="200" stroke="#1a1a40" strokeWidth="1"/><line x1="210" y1="10" x2="210" y2="200" stroke="#1a1a40" strokeWidth="1"/><line x1="225" y1="10" x2="225" y2="200" stroke="#1a1a40" strokeWidth="1"/><rect x="155" y="20" width="8" height="10" fill="#a78bfa" opacity=".4" rx="1"/><rect x="168" y="20" width="8" height="10" fill="#fbbf24" opacity=".3" rx="1"/><rect x="181" y="20" width="8" height="10" fill="#a78bfa" opacity=".25" rx="1"/><rect x="155" y="38" width="8" height="10" fill="#60a5fa" opacity=".4" rx="1"/><rect x="168" y="38" width="8" height="10" fill="#a78bfa" opacity=".5" rx="1"/><rect x="155" y="56" width="8" height="10" fill="#fbbf24" opacity=".4" rx="1"/><rect x="181" y="56" width="8" height="10" fill="#60a5fa" opacity=".3" rx="1"/><rect x="194" y="38" width="8" height="10" fill="#a78bfa" opacity=".35" rx="1"/><rect x="207" y="20" width="8" height="10" fill="#fbbf24" opacity=".3" rx="1"/><rect x="220" y="38" width="8" height="10" fill="#a78bfa" opacity=".4" rx="1"/><rect x="207" y="56" width="8" height="10" fill="#60a5fa" opacity=".35" rx="1"/><rect x="5" y="55" width="8" height="10" fill="#fbbf24" opacity=".25" rx="1"/><rect x="18" y="55" width="8" height="10" fill="#a78bfa" opacity=".2" rx="1"/><rect x="5" y="72" width="8" height="10" fill="#60a5fa" opacity=".3" rx="1"/><rect x="90" y="35" width="9" height="12" fill="#fbbf24" opacity=".3" rx="1"/><rect x="104" y="35" width="9" height="12" fill="#a78bfa" opacity=".25" rx="1"/><rect x="250" y="45" width="9" height="12" fill="#a78bfa" opacity=".3" rx="1"/><rect x="264" y="45" width="9" height="12" fill="#60a5fa" opacity=".25" rx="1"/><rect x="155" y="74" width="68" height="48" fill="#a78bfa" opacity=".08" rx="2"/><rect x="157" y="76" width="29" height="22" fill="#a78bfa" opacity=".2" rx="1"/><rect x="191" y="76" width="29" height="22" fill="#a78bfa" opacity=".15" rx="1"/><rect x="157" y="100" width="63" height="20" rx="1" fill="#1a1a40"/><rect x="0" y="170" width="340" height="30" fill="#0a0a18"/><line x1="0" y1="172" x2="340" y2="172" stroke="#1a1a3a" strokeWidth="1"/></svg>
);

const SVG_LAGOA = (
  <svg width="100%" height="100%" viewBox="0 0 340 200"><rect width="340" height="200" fill="#0d1218"/><rect width="340" height="100" fill="#080e14"/><ellipse cx="170" cy="160" rx="130" ry="60" fill="#0d1a25"/><ellipse cx="170" cy="162" rx="110" ry="48" fill="#0f1f2e"/><line x1="120" y1="155" x2="160" y2="155" stroke="#a78bfa" strokeWidth=".5" opacity=".15"/><line x1="175" y1="158" x2="220" y2="158" stroke="#60a5fa" strokeWidth=".5" opacity=".12"/><ellipse cx="60" cy="140" rx="35" ry="25" fill="#0f1e10"/><ellipse cx="280" cy="138" rx="32" ry="22" fill="#0f1e10"/><ellipse cx="50" cy="130" rx="25" ry="20" fill="#132513"/><ellipse cx="295" cy="128" rx="28" ry="22" fill="#132513"/><rect x="105" y="70" width="130" height="75" fill="#151d28"/><polygon points="98,72 170,40 242,72" fill="#0e161e"/><polygon points="100,72 170,42 240,72" fill="#18232e"/><rect x="112" y="82" width="22" height="18" fill="#60a5fa" opacity=".15" rx="2"/><rect x="142" y="82" width="22" height="18" fill="#fbbf24" opacity=".2" rx="2"/><rect x="176" y="82" width="22" height="18" fill="#60a5fa" opacity=".15" rx="2"/><rect x="206" y="82" width="22" height="18" fill="#a78bfa" opacity=".18" rx="2"/><rect x="115" y="108" width="50" height="36" fill="#0e161e" rx="2"/><rect x="175" y="108" width="50" height="36" fill="#a78bfa" opacity=".06" rx="2"/><rect x="153" y="118" width="34" height="28" fill="#0a1018" rx="2"/><circle cx="181" cy="133" r="2" fill="#a78bfa" opacity=".6"/><rect x="100" y="100" width="140" height="3" fill="#1e2d3d" opacity=".8"/><line x1="85" y1="145" x2="88" y2="80" stroke="#1a2a1a" strokeWidth="2"/><ellipse cx="88" cy="78" rx="14" ry="8" fill="#152515"/><line x1="255" y1="142" x2="252" y2="78" stroke="#1a2a1a" strokeWidth="2"/><ellipse cx="252" cy="76" rx="14" ry="8" fill="#152515"/><path d="M0 155 Q170 148 340 155 L340 200 L0 200Z" fill="#0d1a0d"/></svg>
);

const SVG_FLAT = (
  <svg width="100%" height="200" viewBox="0 0 340 200"><rect width="340" height="200" fill="#150d0d"/><rect width="340" height="110" fill="#100a0a"/><ellipse cx="170" cy="115" rx="140" ry="50" fill="#1f0e08" opacity=".8"/><ellipse cx="170" cy="115" rx="100" ry="35" fill="#2a1208" opacity=".6"/><rect x="0" y="70" width="40" height="130" fill="#1a0d08"/><rect x="45" y="50" width="30" height="150" fill="#1e1008"/><rect x="80" y="80" width="25" height="120" fill="#1a0d08"/><rect x="240" y="65" width="40" height="135" fill="#1a0d08"/><rect x="285" y="55" width="35" height="145" fill="#1e1008"/><rect x="310" y="75" width="30" height="125" fill="#1a0d08"/><rect x="8" y="82" width="6" height="8" fill="#f97316" opacity=".4" rx="1"/><rect x="20" y="82" width="6" height="8" fill="#fbbf24" opacity=".3" rx="1"/><rect x="8" y="98" width="6" height="8" fill="#fbbf24" opacity=".5" rx="1"/><rect x="50" y="62" width="7" height="9" fill="#f97316" opacity=".45" rx="1"/><rect x="62" y="62" width="7" height="9" fill="#fbbf24" opacity=".35" rx="1"/><rect x="248" y="78" width="7" height="9" fill="#fbbf24" opacity=".4" rx="1"/><rect x="260" y="78" width="7" height="9" fill="#f97316" opacity=".3" rx="1"/><rect x="110" y="40" width="120" height="130" fill="#1e1510"/><line x1="110" y1="60" x2="230" y2="60" stroke="#2e2010" strokeWidth="1.5"/><line x1="110" y1="80" x2="230" y2="80" stroke="#2e2010" strokeWidth="1.5"/><line x1="110" y1="100" x2="230" y2="100" stroke="#2e2010" strokeWidth="1.5"/><line x1="110" y1="120" x2="230" y2="120" stroke="#2e2010" strokeWidth="1.5"/><rect x="118" y="44" width="22" height="14" fill="#f97316" opacity=".2" rx="1"/><rect x="148" y="44" width="22" height="14" fill="#fbbf24" opacity=".3" rx="1"/><rect x="178" y="44" width="22" height="14" fill="#f97316" opacity=".2" rx="1"/><rect x="208" y="44" width="16" height="14" fill="#fbbf24" opacity=".25" rx="1"/><rect x="118" y="64" width="22" height="14" fill="#fbbf24" opacity=".35" rx="1"/><rect x="148" y="64" width="22" height="14" fill="#f97316" opacity=".25" rx="1"/><rect x="108" y="38" width="124" height="5" fill="#28180e"/><rect x="0" y="165" width="340" height="35" fill="#0e0808"/></svg>
);

const SVG_LOFT = (
  <svg width="100%" height="200" viewBox="0 0 340 200"><rect width="340" height="200" fill="#0f1220"/><rect x="20" y="20" width="300" height="160" fill="#141728" rx="4"/><rect x="40" y="30" width="120" height="100" fill="#0d1030" rx="3"/><rect x="42" y="32" width="116" height="96" fill="#04060f" rx="2"/><rect x="50" y="50" width="12" height="40" fill="#0f0f28"/><rect x="67" y="42" width="10" height="48" fill="#13132e"/><rect x="82" y="55" width="14" height="35" fill="#0f0f28"/><rect x="100" y="38" width="12" height="52" fill="#13132e"/><rect x="117" y="48" width="10" height="42" fill="#0f0f28"/><rect x="132" y="34" width="20" height="56" fill="#13132e"/><rect x="52" y="55" width="3" height="5" fill="#a78bfa" opacity=".4"/><rect x="69" y="48" width="3" height="5" fill="#fbbf24" opacity=".3"/><rect x="84" y="60" width="4" height="5" fill="#60a5fa" opacity=".4"/><rect x="102" y="44" width="3" height="5" fill="#a78bfa" opacity=".5"/><rect x="119" y="54" width="3" height="5" fill="#fbbf24" opacity=".3"/><rect x="135" y="40" width="4" height="6" fill="#a78bfa" opacity=".35"/><rect x="135" y="52" width="4" height="5" fill="#60a5fa" opacity=".3"/><rect x="40" y="30" width="122" height="102" fill="none" stroke="#1e2240" strokeWidth="2" rx="3"/><rect x="175" y="90" width="130" height="70" fill="#111428" rx="3"/><rect x="185" y="95" width="110" height="60" fill="#0e1124"/><rect x="185" y="125" width="110" height="24" fill="#1a1d38" rx="2"/><rect x="183" y="110" width="10" height="40" fill="#1a1d38" rx="2"/><rect x="287" y="110" width="10" height="40" fill="#1a1d38" rx="2"/><rect x="183" y="107" width="114" height="20" fill="#1e2240" rx="2"/><line x1="260" y1="30" x2="260" y2="95" stroke="#2a2e50" strokeWidth="1.5"/><ellipse cx="260" cy="30" rx="20" ry="6" fill="#1e2240"/><ellipse cx="260" cy="95" rx="25" ry="8" fill="#1e2240"/><ellipse cx="260" cy="93" rx="18" ry="5" fill="#a78bfa" opacity=".1"/><rect x="175" y="35" width="50" height="40" fill="#1a1d38" rx="2"/><rect x="177" y="37" width="46" height="36" fill="#0f1228" rx="1"/><line x1="177" y1="53" x2="223" y2="53" stroke="#a78bfa" strokeWidth=".5" opacity=".3"/><rect x="20" y="155" width="300" height="25" fill="#0e1020"/><line x1="20" y1="155" x2="320" y2="155" stroke="#1a1d38" strokeWidth="1"/></svg>
);

const IMOVEIS = [
  { nome:"Cobertura Vista Mar", local:"Ponta Negra, Natal", preco:"R$ 1.850.000", area:"320 m²", quarto:"4 quartos", extra:"5 banheiros", badges:[{cls:"badge-destaque",lbl:"★ Destaque"},{cls:"badge-disponivel",lbl:"Disponível"}], svg:SVG_COBERTURA, delay:.05 },
  { nome:"Casa Alphaville", local:"Alphaville, Natal", preco:"R$ 1.200.000", area:"280 m²", quarto:"4 quartos", extra:"Piscina", badges:[{cls:"badge-destaque",lbl:"★ Destaque"},{cls:"badge-disponivel",lbl:"Disponível"}], svg:SVG_CASA, delay:.1 },
  { nome:"Edifício Candelária Prime", local:"Candelária, Natal", preco:"A partir de R$ 680.000", area:"142 m²", quarto:"3 quartos", extra:"2 vagas", badges:[{cls:"badge-lancamento",lbl:"Lançamento"},{cls:"badge-disponivel",lbl:"Disponível"}], svg:SVG_EDIFICIO, delay:.15 },
  { nome:"Casa Lagoa Nova", local:"Lagoa Nova, Natal", preco:"R$ 920.000", area:"220 m²", quarto:"4 quartos", extra:"3 vagas", badges:[{cls:"badge-disponivel",lbl:"Disponível"}], svg:SVG_LAGOA, delay:.2 },
  { nome:"Flat Ponta Negra", local:"Ponta Negra, Natal", preco:"R$ 390.000", area:"60 m²", quarto:"1 quarto", extra:"Serviços hotel", badges:[{cls:"badge-reservado",lbl:"Reservado"}], svg:SVG_FLAT, delay:.25 },
  { nome:"Loft Centro Histórico", local:"Cidade Alta, Natal", preco:"R$ 420.000", area:"85 m²", quarto:"1 quarto", extra:"Reformado", badges:[{cls:"badge-destaque",lbl:"★ Destaque"},{cls:"badge-disponivel",lbl:"Disponível"}], svg:SVG_LOFT, delay:.3 },
];

const BADGE_STYLES = {
  "badge-destaque":   { background:"#a78bfa22", color:"#a78bfa", border:"1px solid #a78bfa44" },
  "badge-disponivel": { background:"#34d27b22", color:"#34d27b", border:"1px solid #34d27b44" },
  "badge-reservado":  { background:"#fbbf2422", color:"#fbbf24", border:"1px solid #fbbf2444" },
  "badge-lancamento": { background:"#60a5fa22", color:"#60a5fa", border:"1px solid #60a5fa44" },
};

function ImovelCard({ imovel }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal rounded-[18px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
         data-delay={imovel.delay}
         style={{ background:"#13132a", border:"1px solid rgba(255,255,255,0.06)" }}
         onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.16)"}
         onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
      <div className="relative h-[200px] overflow-hidden flex items-end">
        <div className="absolute inset-0 flex items-center justify-center">{imovel.svg}</div>
        <div className="absolute top-3 left-3 flex gap-1.5">
          {imovel.badges.map((b,i) => (
            <span key={i} className="px-2.5 py-1 rounded-[20px] text-[10px] font-bold tracking-[0.4px] uppercase"
                  style={{ backdropFilter:"blur(8px)", ...BADGE_STYLES[b.cls] }}>{b.lbl}</span>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3"
             style={{ background:"linear-gradient(to top, #0d0d1aee, transparent)" }}>
          <div className="font-syne font-extrabold text-[18px] text-white">{imovel.preco}</div>
        </div>
      </div>
      <div className="px-5 pt-[18px] pb-5">
        <div className="font-syne font-bold text-[15px] mb-1.5">{imovel.nome}</div>
        <div className="flex items-center gap-1.5 text-[12px] text-[#475569] mb-3.5">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {imovel.local}
        </div>
        <div className="flex gap-4">
          {[imovel.area, imovel.quarto, imovel.extra].map((spec,i) => (
            <span key={i} className="flex items-center gap-1 text-[12px] text-[#94a3b8]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22V8l9-6 9 6v14H3z"/></svg>
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTag({ children }) {
  return <div className="inline-flex items-center text-[11px] font-bold tracking-[1.4px] uppercase text-[#a78bfa] mb-3 section-tag-line">{children}</div>;
}

function Imoveis() {
  const headerRef = useReveal();
  return (
    <section id="imoveis" className="px-16 py-24 max-w-[1200px] mx-auto">
      <div ref={headerRef} className="reveal">
        <SectionTag>Imóveis em destaque</SectionTag>
        <h2 className="font-syne font-extrabold text-[#e2e8f0] mb-3" style={{ fontSize:"clamp(28px,4vw,44px)", lineHeight:1.12, letterSpacing:"-1px" }}>Selecionados para você</h2>
        <p className="text-[15px] text-[#94a3b8] font-light max-w-[500px]" style={{ lineHeight:1.7 }}>Oportunidades em Natal e região, selecionadas pelos nossos especialistas para cada perfil e momento de vida.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px] mt-13">
        {IMOVEIS.map((im, i) => <ImovelCard key={i} imovel={im}/>)}
      </div>
      <div className="text-center mt-9">
        <a href="#contato" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border text-[14px] font-semibold no-underline transition-all"
           style={{ background:"transparent", color:"#94a3b8", border:"1px solid rgba(255,255,255,0.16)" }}
           onMouseEnter={e => { e.currentTarget.style.color="#e2e8f0"; e.currentTarget.style.background="#1a1a35"; }}
           onMouseLeave={e => { e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.background="transparent"; }}>
          Ver todos os imóveis
        </a>
      </div>
    </section>
  );
}

// ─── SOBRE ────────────────────────────────────────────────────────────────────
function Sobre() {
  const cardRef = useReveal();
  const textoRef = useReveal();

  const miniStats = [
    { val:"+800", label:"Imóveis vendidos",    color:"#a78bfa" },
    { val:"R$2,1bi", label:"Em negócios realizados", color:"#34d27b" },
    { val:"12",   label:"Corretores CRECI",    color:"#60a5fa" },
    { val:"98%",  label:"Satisfação dos clientes", color:"#fbbf24" },
  ];

  const diferenciais = [
    { icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>, bg:"#a78bfa18", title:"Especialistas por bairro", desc:"Cada corretor domina profundamente a região onde atua — preços reais, potencial de valorização, entorno." },
    { icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d27b" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>, bg:"#34d27b18", title:"Transparência total", desc:"Documentação auditada, avaliação justa e comunicação clara em todas as etapas do processo." },
    { icon:<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, bg:"#60a5fa18", title:"Suporte até o registro", desc:"Não abandonamos você na assinatura. Acompanhamos todo o processo até o registro do imóvel em seu nome." },
  ];

  return (
    <section id="sobre" className="px-16 py-24 max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div ref={cardRef} className="reveal">
        <div className="sobre-card-glow relative rounded-[20px] p-9 overflow-hidden" style={{ background:"#13132a", border:"1px solid rgba(255,255,255,0.1)" }}>
          <div className="font-syne font-extrabold text-[80px] leading-none text-[#a78bfa] opacity-[.15] mb-[-20px]">15</div>
          <div className="font-syne font-extrabold text-[22px] mb-2.5">Anos construindo sonhos em Natal</div>
          <p className="text-[13px] text-[#94a3b8] leading-[1.7] font-light">Desde 2010, a Dominium é referência no mercado imobiliário potiguar. Nascemos para fazer diferente: transparência total, relacionamento genuíno e profundo conhecimento local.</p>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {miniStats.map((s,i) => (
              <div key={i} className="rounded-xl p-3.5" style={{ background:"#1a1a35", border:"1px solid rgba(255,255,255,0.06)" }}>
                <div className="font-syne font-extrabold text-[22px]" style={{ color:s.color }}>{s.val}</div>
                <div className="text-[11px] text-[#475569] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div ref={textoRef} className="reveal">
        <SectionTag>Sobre nós</SectionTag>
        <h2 className="font-syne font-extrabold mb-[18px]" style={{ fontSize:"clamp(26px,3.5vw,40px)", lineHeight:1.15, letterSpacing:"-1px" }}>
          Uma imobiliária feita de<br/>pessoas, para pessoas
        </h2>
        <p className="text-[14px] text-[#94a3b8] leading-[1.8] font-light mb-4">Na Dominium, cada venda é muito mais do que uma transação. É uma história. É a família que finalmente encontrou o lar certo, o investidor que descobriu a oportunidade ideal, o jovem que conquistou o primeiro apartamento.</p>
        <p className="text-[14px] text-[#94a3b8] leading-[1.8] font-light mb-4">Atuamos em Natal e Grande Natal com uma equipe de corretores altamente especializados por região e perfil de imóvel — do popular ao alto padrão, da praia à cidade.</p>
        <div className="flex flex-col gap-2.5 mt-6">
          {diferenciais.map((d,i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl" style={{ background:"#13132a", border:"1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ background:d.bg }}>{d.icon}</div>
              <div>
                <div className="text-[13px] font-semibold mb-0.5">{d.title}</div>
                <div className="text-[12px] text-[#475569] font-light">{d.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── NÚMEROS ──────────────────────────────────────────────────────────────────
function Numeros() {
  const ref = useReveal();
  const nums = [
    { val:"+800", label:"Imóveis vendidos",   color:"#a78bfa" },
    { val:"15",   label:"Anos no mercado",    color:"#34d27b" },
    { val:"12",   label:"Corretores CRECI",   color:"#60a5fa" },
    { val:"98%",  label:"Clientes satisfeitos", color:"#fbbf24" },
  ];
  return (
    <div className="reveal border-t border-b border-white/[0.06] py-16 px-16" ref={ref}
         style={{ background:"#13132a" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {nums.map((n,i) => (
          <div key={i} className={`text-center px-8 ${i < nums.length-1 ? "border-r border-white/[0.06]" : ""}`}>
            <div className="font-syne font-extrabold leading-none mb-2" style={{ fontSize:52, color:n.color }}>{n.val}</div>
            <div className="text-[13px] text-[#94a3b8]">{n.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EQUIPE ───────────────────────────────────────────────────────────────────
const EQUIPE = [
  { ini:"AG", nome:"Ana Gestora",    cargo:"Diretora Comercial",       creci:"CRECI-RN 12.345", vendas:"180+", anos:"12", color:"#a78bfa" },
  { ini:"RS", nome:"Ricardo Santos", cargo:"Alto Padrão · Ponta Negra", creci:"CRECI-RN 23.456", vendas:"140+", anos:"9",  color:"#34d27b" },
  { ini:"JM", nome:"Juliana Medeiros",cargo:"Candelária · Lagoa Nova",  creci:"CRECI-RN 34.567", vendas:"95+",  anos:"7",  color:"#60a5fa" },
  { ini:"CD", nome:"Carlos Dantas",  cargo:"Condomínios · Alphaville",  creci:"CRECI-RN 45.678", vendas:"110+", anos:"8",  color:"#fbbf24" },
];

function Equipe() {
  const headerRef = useReveal();
  return (
    <section id="equipe" className="px-16 py-24 max-w-[1200px] mx-auto">
      <div ref={headerRef} className="reveal">
        <SectionTag>Nossa equipe</SectionTag>
        <h2 className="font-syne font-extrabold mb-3" style={{ fontSize:"clamp(28px,4vw,44px)", lineHeight:1.12, letterSpacing:"-1px" }}>
          Corretores que conhecem<br/>Natal como a palma da mão
        </h2>
        <p className="text-[15px] text-[#94a3b8] font-light max-w-[500px]" style={{ lineHeight:1.7 }}>
          Cada membro da nossa equipe é especializado por região e tipo de imóvel. Você sempre fala com quem realmente entende do assunto.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-13">
        {EQUIPE.map((c,i) => {
          const ref = useReveal();
          return (
            <div key={i} ref={ref} className="reveal text-center rounded-2xl p-6 transition-all duration-200 hover:-translate-y-[3px]"
                 data-delay={i * 0.05}
                 style={{ background:"#13132a", border:"1px solid rgba(255,255,255,0.06)" }}
                 onMouseEnter={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.16)"}
                 onMouseLeave={e => e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
              <div className="w-[72px] h-[72px] rounded-full mx-auto mb-3.5 flex items-center justify-center font-syne text-[22px] font-extrabold"
                   style={{ background:`${c.color}22`, color:c.color, border:`2px solid ${c.color}33` }}>{c.ini}</div>
              <div className="font-syne font-bold text-[14px] mb-1">{c.nome}</div>
              <div className="text-[12px] text-[#475569] mb-3">{c.cargo}</div>
              <div className="text-[11px] font-semibold tracking-[0.3px] text-[#a78bfa] mb-3.5">{c.creci}</div>
              <div className="flex border-t border-white/[0.06] pt-3.5">
                <div className="flex-1 text-center border-r border-white/[0.06]">
                  <div className="font-syne font-extrabold text-[16px]" style={{ color:c.color }}>{c.vendas}</div>
                  <div className="text-[9px] text-[#475569] font-medium tracking-[0.3px] mt-0.5">Vendas</div>
                </div>
                <div className="flex-1 text-center">
                  <div className="font-syne font-extrabold text-[16px]" style={{ color:"#34d27b" }}>{c.anos}</div>
                  <div className="text-[9px] text-[#475569] font-medium tracking-[0.3px] mt-0.5">Anos</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── DEPOIMENTOS ─────────────────────────────────────────────────────────────
const DEPOIMENTOS = [
  { texto:"A equipe da Dominium foi excepcional. Procurei meu apartamento por quase um ano em outras imobiliárias sem sucesso. Em dois meses com eles, fechei o negócio perfeito em Candelária.", ini:"FO", nome:"Fernanda Oliveira", info:"Professora universitária · Natal", imovel:"Comprou: Apto. Candelária", color:"#a78bfa", delay:.05 },
  { texto:"Comprei minha primeira casa através da Dominium. O Ricardo me acompanhou em cada passo, explicou tudo sobre financiamento e negociou um preço que eu não esperava conseguir.", ini:"MC", nome:"Marcos Costa", info:"Engenheiro civil · Parnamirim", imovel:"Comprou: Casa Lagoa Nova", color:"#34d27b", delay:.1 },
  { texto:"Invisto em imóveis há 10 anos e a Dominium é sem dúvida a melhor imobiliária com quem já trabalhei. Conhecimento de mercado, agilidade e total transparência na documentação.", ini:"PL", nome:"Patricia Lima", info:"Investidora imobiliária · Natal", imovel:"Comprou: Cobertura Ponta Negra", color:"#fbbf24", delay:.15 },
];

function Depoimentos() {
  const headerRef = useReveal();
  return (
    <section id="depoimentos" className="px-16 py-24 max-w-[1200px] mx-auto">
      <div ref={headerRef} className="reveal">
        <SectionTag>Depoimentos</SectionTag>
        <h2 className="font-syne font-extrabold mb-3" style={{ fontSize:"clamp(28px,4vw,44px)", lineHeight:1.12, letterSpacing:"-1px" }}>
          Histórias reais de quem<br/>encontrou o lar certo
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-13">
        {DEPOIMENTOS.map((d,i) => {
          const ref = useReveal();
          return (
            <div key={i} ref={ref} className="reveal rounded-2xl p-7" data-delay={d.delay}
                 style={{ background:"#13132a", border:"1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex gap-[3px] mb-3.5">
                {Array(5).fill(0).map((_,j) => <span key={j} className="star-shape"/>)}
              </div>
              <div className="font-syne font-extrabold text-[42px] leading-[.8] text-[#a78bfa] opacity-30 mb-3">"</div>
              <p className="text-[14px] text-[#94a3b8] italic leading-[1.75] font-light mb-5">{d.texto}</p>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold flex-shrink-0"
                     style={{ background:`${d.color}22`, color:d.color }}>{d.ini}</div>
                <div>
                  <div className="text-[13px] font-semibold">{d.nome}</div>
                  <div className="text-[11px] text-[#475569]">{d.info}</div>
                  <div className="text-[11px] font-medium text-[#a78bfa] mt-0.5">{d.imovel}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── CONTATO ──────────────────────────────────────────────────────────────────
const SVG_MAPA = (
  <svg width="100%" height="100%" viewBox="0 0 400 180"><rect width="400" height="180" fill="#13132a"/><rect x="0" y="80" width="400" height="12" fill="#1a1a35"/><rect x="0" y="110" width="400" height="8" fill="#1a1a35"/><rect x="0" y="140" width="400" height="6" fill="#1a1a35"/><rect x="60" y="0" width="10" height="180" fill="#1a1a35"/><rect x="120" y="0" width="8" height="180" fill="#1a1a35"/><rect x="200" y="0" width="12" height="180" fill="#1a1a35"/><rect x="280" y="0" width="8" height="180" fill="#1a1a35"/><rect x="340" y="0" width="10" height="180" fill="#1a1a35"/><rect x="10" y="10" width="45" height="65" fill="#161628" rx="3"/><rect x="75" y="10" width="40" height="65" fill="#161628" rx="3"/><rect x="130" y="10" width="65" height="65" fill="#161628" rx="3"/><rect x="215" y="10" width="60" height="65" fill="#161628" rx="3"/><rect x="290" y="10" width="45" height="65" fill="#161628" rx="3"/><rect x="10" y="97" width="45" height="38" fill="#161628" rx="3"/><rect x="75" y="97" width="40" height="38" fill="#161628" rx="3"/><rect x="290" y="97" width="45" height="38" fill="#161628" rx="3"/><rect x="0" y="152" width="400" height="28" fill="#0d1a2a" rx="2"/><ellipse cx="200" cy="155" rx="180" ry="15" fill="#112030" opacity=".6"/><circle cx="200" cy="80" r="18" fill="#7c3aed" opacity=".25"/><circle cx="200" cy="80" r="10" fill="#a78bfa"/><circle cx="200" cy="80" r="5" fill="#fff"/><line x1="200" y1="90" x2="200" y2="105" stroke="#a78bfa" strokeWidth="2" strokeDasharray="3 2"/><rect x="155" y="108" width="90" height="20" fill="#1e1e42" rx="4"/><text x="200" y="121" textAnchor="middle" fontFamily="DM Sans,sans-serif" fontSize="9" fill="#a78bfa" fontWeight="600">Dominium Imobiliária</text></svg>
);

function Contato() {
  const formRef = useReveal();
  const infoRef = useReveal();
  const [form, setForm] = useState({ nome:"", tel:"", email:"", tipo:"", valor:"", msg:"" });
  const [enviado, setEnviado] = useState(false);

  const enviar = () => {
    if (!form.nome || !form.tel || !form.email) { alert("Por favor, preencha nome, telefone e e-mail."); return; }
    setEnviado(true);
  };

  const inputCls = "w-full rounded-[10px] px-3.5 py-2.5 text-[13px] text-[#e2e8f0] font-dm outline-none transition-all";
  const inputStyle = { background:"#1a1a35", border:"1px solid rgba(255,255,255,0.1)" };
  const onFocus = e => e.target.style.borderColor="#a78bfa";
  const onBlur  = e => e.target.style.borderColor="rgba(255,255,255,0.1)";

  return (
    <section id="contato" className="px-16 pb-24 pt-20 max-w-[1200px] mx-auto">
      <div className="reveal" ref={useReveal()}>
        <SectionTag>Contato</SectionTag>
        <h2 className="font-syne font-extrabold mb-3" style={{ fontSize:"clamp(28px,4vw,44px)", lineHeight:1.12, letterSpacing:"-1px" }}>
          Encontre seu imóvel<br/>com quem entende
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-13 items-start">
        {/* Formulário */}
        <div ref={formRef} className="reveal rounded-[20px] p-9" style={{ background:"#13132a", border:"1px solid rgba(255,255,255,0.1)" }}>
          <div className="font-syne font-extrabold text-[18px] mb-1.5">Fale com um corretor</div>
          <div className="text-[13px] text-[#475569] mb-7">Preencha o formulário e entraremos em contato em até 2 horas úteis.</div>

          {!enviado ? (
            <div className="grid grid-cols-2 gap-3.5">
              <label className="flex flex-col gap-1.5 text-[12px] text-[#94a3b8] font-medium">
                Nome completo
                <input className={inputCls} style={inputStyle} placeholder="Seu nome" value={form.nome}
                       onChange={e=>setForm(p=>({...p,nome:e.target.value}))} onFocus={onFocus} onBlur={onBlur}/>
              </label>
              <label className="flex flex-col gap-1.5 text-[12px] text-[#94a3b8] font-medium">
                Telefone / WhatsApp
                <input className={inputCls} style={inputStyle} placeholder="(84) 9 9999-9999" value={form.tel}
                       onChange={e=>setForm(p=>({...p,tel:e.target.value}))} onFocus={onFocus} onBlur={onBlur}/>
              </label>
              <label className="col-span-2 flex flex-col gap-1.5 text-[12px] text-[#94a3b8] font-medium">
                E-mail
                <input type="email" className={inputCls} style={inputStyle} placeholder="seu@email.com" value={form.email}
                       onChange={e=>setForm(p=>({...p,email:e.target.value}))} onFocus={onFocus} onBlur={onBlur}/>
              </label>
              <label className="flex flex-col gap-1.5 text-[12px] text-[#94a3b8] font-medium">
                Tipo de imóvel
                <select className={inputCls} style={inputStyle} value={form.tipo}
                        onChange={e=>setForm(p=>({...p,tipo:e.target.value}))} onFocus={onFocus} onBlur={onBlur}>
                  <option value="">Selecione…</option>
                  {["Apartamento","Casa","Cobertura","Loft / Flat","Terreno","Comercial"].map(t=><option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-[12px] text-[#94a3b8] font-medium">
                Faixa de investimento
                <select className={inputCls} style={inputStyle} value={form.valor}
                        onChange={e=>setForm(p=>({...p,valor:e.target.value}))} onFocus={onFocus} onBlur={onBlur}>
                  <option value="">Selecione…</option>
                  {["Até R$ 300.000","R$ 300 a 600 mil","R$ 600 mil a 1 mi","R$ 1 a 2 milhões","Acima de R$ 2 milhões"].map(v=><option key={v}>{v}</option>)}
                </select>
              </label>
              <label className="col-span-2 flex flex-col gap-1.5 text-[12px] text-[#94a3b8] font-medium">
                Mensagem
                <textarea className={inputCls} style={{ ...inputStyle, resize:"vertical", minHeight:100 }}
                          placeholder="Conte um pouco sobre o que você procura…" value={form.msg}
                          onChange={e=>setForm(p=>({...p,msg:e.target.value}))} onFocus={onFocus} onBlur={onBlur}/>
              </label>
              <div className="col-span-2">
                <button onClick={enviar} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#a78bfa] text-white border-none font-semibold text-[14px] cursor-pointer font-dm transition-colors hover:bg-[#9879f7]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  Enviar mensagem
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-7 rounded-xl mt-4" style={{ background:"#34d27b12", border:"1px solid #34d27b33" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#34d27b" strokeWidth="2" strokeLinecap="round" className="mx-auto mb-2.5"><circle cx="12" cy="12" r="10"/><polyline points="20 6 9 17 4 12"/></svg>
              <div className="font-syne font-extrabold text-[16px] text-[#34d27b] mb-1.5">Mensagem enviada!</div>
              <div className="text-[13px] text-[#94a3b8]">Um de nossos corretores entrará em contato em breve. Obrigado pela preferência.</div>
            </div>
          )}
        </div>

        {/* Info */}
        <div ref={infoRef} className="reveal flex flex-col gap-4" data-delay={.1}>
          <div className="font-syne font-extrabold text-[26px] tracking-tight mb-2">Estamos em Natal</div>
          <p className="text-[14px] text-[#94a3b8] font-light leading-[1.7] mb-6">Nossa equipe atende de segunda a sábado, das 8h às 18h. Para atendimento imediato, use o WhatsApp.</p>

          {[
            { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, bg:"#a78bfa18", label:"Endereço", val:"Av. Engenheiro Roberto Freire, 1560\nPonta Negra, Natal — RN" },
            { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, bg:"#60a5fa18", label:"Telefone", val:"(84) 3030-0000" },
            { icon:<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d27b" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>, bg:"#34d27b18", label:"E-mail", val:"contato@dominiumimoveis.com.br" },
          ].map((info,i) => (
            <div key={i} className="flex items-center gap-3.5 p-[18px] rounded-[14px] transition-colors"
                 style={{ background:"#13132a", border:"1px solid rgba(255,255,255,0.06)" }}
                 onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}
                 onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
              <div className="w-[42px] h-[42px] rounded-[11px] flex items-center justify-center flex-shrink-0" style={{ background:info.bg }}>{info.icon}</div>
              <div>
                <div className="text-[11px] text-[#475569] font-semibold tracking-[0.3px] uppercase mb-1">{info.label}</div>
                <div className="text-[14px] font-medium whitespace-pre-line">{info.val}</div>
              </div>
            </div>
          ))}

          <a href="https://wa.me/5584999990000" className="flex items-center gap-3.5 p-[18px] rounded-[14px] no-underline transition-all hover:-translate-y-0.5"
             style={{ background:"#25d366", color:"#0a1f12" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a1f12"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            <div>
              <div className="font-semibold text-[14px]">Chamar no WhatsApp</div>
              <div className="text-[11px] opacity-80 mt-0.5">Resposta em até 15 minutos</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a1f12" strokeWidth="2.5" strokeLinecap="round" style={{ marginLeft:"auto", opacity:.7 }}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>

          <div className="rounded-[14px] h-[180px] mt-1 overflow-hidden" style={{ background:"#1a1a35", border:"1px solid rgba(255,255,255,0.06)" }}>
            {SVG_MAPA}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA FINAL ────────────────────────────────────────────────────────────────
function CtaFinal() {
  const ref = useReveal();
  return (
    <div className="px-16 pb-24">
      <div ref={ref} className="reveal cta-box-glow relative max-w-[1200px] mx-auto rounded-[24px] px-20 py-[72px] text-center overflow-hidden"
           style={{ background:"#13132a", border:"1px solid #a78bfa28" }}>
        <h2 className="font-syne font-extrabold mb-4 relative" style={{ fontSize:"clamp(28px,4vw,50px)", lineHeight:1.1, letterSpacing:"-1.5px" }}>
          Pronto para encontrar<br/>seu próximo lar?
        </h2>
        <p className="text-[15px] text-[#94a3b8] font-light max-w-[480px] mx-auto mb-9 relative" style={{ lineHeight:1.7 }}>
          Fale agora com um de nossos corretores. Sem compromisso, sem pressão — só o imóvel certo para você.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap relative">
          <a href="#contato" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#a78bfa] text-white no-underline text-[14px] font-semibold transition-all hover:bg-[#9879f7] hover:-translate-y-px">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Falar com um corretor
          </a>
          <a href="https://wa.me/5584999990000" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl no-underline text-[14px] font-semibold transition-all hover:-translate-y-px"
             style={{ background:"#34d27b", color:"#0d1a11" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            WhatsApp direto
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const footerLinks = [
    { title:"Imóveis",  links:["Apartamentos","Casas","Coberturas","Lofts e Flats","Comerciais","Lançamentos"] },
    { title:"Empresa",  links:["Sobre nós","Nossa equipe","Depoimentos","Blog imobiliário","Trabalhe conosco"] },
    { title:"Contato",  links:["(84) 3030-0000","WhatsApp","contato@dominiumimoveis.com.br","Av. Roberto Freire, 1560 · Ponta Negra · Natal, RN"] },
  ];
  return (
    <footer className="border-t border-white/[0.06] px-16 pt-12 pb-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
        <div className="flex flex-col gap-3.5">
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <Logo size={26}/>
            <span className="font-syne font-extrabold text-[18px] text-[#e2e8f0]">Dominium</span>
          </a>
          <p className="text-[13px] text-[#475569] font-light leading-[1.6] max-w-[260px]">Imobiliária especializada em Natal e Grande Natal. Transparência, expertise local e acompanhamento completo do início ao registro.</p>
          <div className="text-[11px] text-[#475569]">CRECI-RN · J-0001234 · Registro ativo</div>
        </div>
        {footerLinks.map((col,i) => (
          <div key={i}>
            <div className="text-[11px] font-bold tracking-[1px] uppercase text-[#475569] mb-3.5">{col.title}</div>
            <div className="flex flex-col gap-2">
              {col.links.map((l,j) => (
                <a key={j} href="#" className="text-[13px] text-[#94a3b8] no-underline hover:text-[#e2e8f0] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="max-w-[1200px] mx-auto pt-6 border-t border-white/[0.06] flex justify-between items-center flex-wrap gap-2.5">
        <div className="text-[12px] text-[#475569]">© 2025 Dominium Imobiliária · Todos os direitos reservados</div>
        <div className="text-[12px] text-[#475569]">Política de Privacidade · Termos de Uso</div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function DominiumLanding() {
  return (
    <>
      <FontAndGlobalStyles/>
      <Nav/>
      <Hero/>
      <Imoveis/>
      <Sobre/>
      <Numeros/>
      <Equipe/>
      <div style={{ height:1, background:"rgba(255,255,255,0.06)", margin:"0 64px" }}/>
      <Depoimentos/>
      <Contato/>
      <CtaFinal/>
      <Footer/>
    </>
  );
}