// V7 — Live ticker stack. Three live questions stacked, each with mini sparkline + odds.
// Hook: pure FOMO from movement; users tap any one to convert.

const v7Styles = {
  root: {
    width:'100%', height:'100%',
    background:'#0e0f12',
    color:'#fff',
    fontFamily:'Inter, system-ui, sans-serif',
    display:'flex', flexDirection:'column',
    overflow:'hidden',
    position:'relative',
  },
};

function V7Ticker() {
  const cards = [
    { tag:'CLIMATE', q:'Hottest July ever recorded in the UK?', pct:71, delta:'+9', up:true, traders:2840, color:'#f97316' },
    { tag:'GEO', q:'Russia–Ukraine ceasefire by September?', pct:22, delta:'-3', up:false, traders:6841, color:'#3b82f6' },
    { tag:'SPORTS', q:'England wins the Ashes in 2026?', pct:38, delta:'+4', up:true, traders:4217, color:'#22c55e' },
  ];

  return (
    <div className="pl" style={v7Styles.root}>
      <div style={{ padding:'18px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid #1f2024' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:22, height:22, background:'#fff', color:'#0e0f12', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:13, borderRadius:5 }}>V</div>
          <span style={{ fontWeight:700, fontSize:15, letterSpacing:'-0.01em' }}>verdict</span>
        </div>
        <div style={{ fontSize:10, color:'#888', fontFamily:'"DM Mono", monospace', letterSpacing:'0.1em' }}>
          <span style={{ color:'#22c55e' }}>●</span> 4,217 LIVE · 480 OPEN
        </div>
      </div>

      <div style={{ padding:'22px 22px 6px' }}>
        <h1 style={{ fontSize:30, lineHeight:1.05, margin:0, fontWeight:700, letterSpacing:'-0.025em' }}>
          Three questions.<br/>Three answers worth real money.
        </h1>
        <p style={{ fontSize:13, color:'#888', margin:'10px 0 0', lineHeight:1.5 }}>
          Pick one. Set your side. We'll tell you what the crowd thinks.
        </p>
      </div>

      <div style={{ flex:1, padding:'14px 22px 10px', display:'flex', flexDirection:'column', gap:10, overflow:'hidden' }}>
        {cards.map((c, i) => <TickerCard key={i} {...c} />)}
      </div>

      <div style={{ padding:'14px 22px 18px', borderTop:'1px solid #1f2024' }}>
        <button style={tickCta}>See all 480 markets →</button>
        <p style={{ fontSize:10, color:'#666', textAlign:'center', marginTop:8 }}>Free account · No deposit to browse</p>
      </div>
    </div>
  );
}

function TickerCard({ tag, q, pct, delta, up, traders, color }) {
  // Tiny sparkline data
  const seed = pct;
  const pts = Array.from({ length:14 }, (_, i) => seed + Math.sin(i*0.7 + seed*0.1)*4 + (i*0.3*(up?1:-1)));
  const max = Math.max(...pts), min = Math.min(...pts);
  const path = pts.map((p,i) => {
    const x = (i/(pts.length-1))*100;
    const y = 30 - ((p-min)/(max-min || 1))*30;
    return `${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div style={{
      flex:1, minHeight:0,
      background:'#15171b',
      border:'1px solid #1f2024',
      borderRadius:10,
      padding:'14px 16px',
      display:'grid',
      gridTemplateColumns:'1fr auto',
      gap:14,
      alignItems:'center',
      position:'relative',
      overflow:'hidden',
      cursor:'pointer',
    }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:color }} />
      <div style={{ minWidth:0 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
          <span style={{ fontSize:9, color, letterSpacing:'0.18em', fontFamily:'"DM Mono", monospace', fontWeight:600 }}>{tag}</span>
          <span style={{ fontSize:9, color:'#666', fontFamily:'"DM Mono", monospace' }}>· {traders.toLocaleString()} traders</span>
        </div>
        <div style={{ fontSize:15, fontWeight:600, lineHeight:1.25, letterSpacing:'-0.01em', marginBottom:8 }}>{q}</div>
        <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width:120, height:24, display:'block' }}>
          <path d={path} fill="none" stroke={up?'#22c55e':'#ef4444'} strokeWidth="1.4" />
        </svg>
      </div>
      <div style={{ textAlign:'right' }}>
        <div style={{ fontSize:30, fontWeight:700, letterSpacing:'-0.03em', lineHeight:1, fontFeatureSettings:'"tnum"' }}>{pct}<span style={{ fontSize:14, color:'#888' }}>%</span></div>
        <div style={{ fontSize:11, color: up?'#22c55e':'#ef4444', marginTop:4, fontFamily:'"DM Mono", monospace' }}>{up?'▲':'▼'} {delta}</div>
        <button style={{ marginTop:10, padding:'6px 12px', background:'transparent', border:`1px solid ${color}`, color, fontSize:11, fontWeight:600, borderRadius:5, cursor:'pointer' }}>Trade →</button>
      </div>
    </div>
  );
}

const tickCta = {
  width:'100%',
  padding:'14px 22px',
  background:'#fff',
  color:'#0e0f12',
  border:'none',
  borderRadius:8,
  fontFamily:'Inter, sans-serif',
  fontWeight:600,
  fontSize:14,
  letterSpacing:'-0.005em',
  cursor:'pointer',
};

window.V7Ticker = V7Ticker;
