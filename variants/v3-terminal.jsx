// V3 — REPLACED. Pop-traffic friendly: "swipe-card" style binary question stack.
// One question dominates the screen; tap YES or NO to flip to the next; reveal at end.
// Familiar mental model from Tinder / quiz apps. Zero finance jargon.

const v3Styles = {
  root: {
    width:'100%', height:'100%',
    background:'linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)',
    color:'#fff',
    fontFamily:'"Archivo", system-ui, sans-serif',
    display:'flex', flexDirection:'column',
    overflow:'hidden',
    position:'relative',
  },
};

if (typeof document !== 'undefined' && !document.getElementById('v3-styles')) {
  const s = document.createElement('style');
  s.id = 'v3-styles';
  s.textContent = `
    @keyframes v3-in { from{opacity:0;transform:translateY(20px) scale(0.95)} to{opacity:1;transform:none} }
    .v3-card{ animation: v3-in .35s cubic-bezier(.2,.8,.2,1) }
    @keyframes v3-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
    .v3-cta{ animation: v3-pulse 2.4s ease-in-out infinite }
  `;
  document.head.appendChild(s);
}

const V3_QUESTIONS = [
  { emoji:'🏒', q:'Will the Maple Leafs win the Stanley Cup this year?', yes:21 },
  { emoji:'🥅', q:'Will Connor McDavid score 60+ goals this season?', yes:42 },
  { emoji:'🇨🇦', q:'Will a Canadian team make the Stanley Cup Final?', yes:58 },
];

function V3Terminal({ desktop }) {
  const [idx, setIdx] = React.useState(0);
  const [picks, setPicks] = React.useState([]);

  const handlePick = (side) => {
    const newPicks = [...picks, side];
    setPicks(newPicks);
    if (idx < V3_QUESTIONS.length - 1) {
      setTimeout(() => setIdx(idx + 1), 220);
    }
  };

  const done = picks.length === V3_QUESTIONS.length;
  const current = V3_QUESTIONS[idx];

  return (
    <div className="pl" style={v3Styles.root}>
      <div style={{ padding: desktop ? '20px 40px' : '14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width: desktop?26:20, height: desktop?26:20, background:'#fbbf24', color:'#1e1b4b', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Archivo Black', fontSize: desktop?16:13, borderRadius:5 }}>V</div>
          <span style={{ fontFamily:'Archivo Black', fontSize: desktop?18:15, letterSpacing:'-0.02em' }}>VERDICT</span>
        </div>
        <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize:11, color:'rgba(255,255,255,0.6)', letterSpacing:'0.12em' }}>
          {done ? 'DONE!' : `${idx+1} OF ${V3_QUESTIONS.length}`}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display:'flex', gap:6, padding: desktop ? '0 40px 8px' : '0 18px 8px' }}>
        {V3_QUESTIONS.map((_, i) => (
          <div key={i} style={{
            flex:1, height:3, borderRadius:99,
            background: i < picks.length ? '#fbbf24' : 'rgba(255,255,255,0.15)',
            transition:'background .3s',
          }} />
        ))}
      </div>

      {!done ? (
        <>
          <div style={{ flex:1, padding: desktop ? '20px 40px' : '20px 22px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
            <div className="v3-card" key={idx} style={{
              width:'100%', maxWidth: desktop ? 600 : '100%',
              background:'rgba(255,255,255,0.08)',
              border:'1px solid rgba(255,255,255,0.15)',
              borderRadius:20,
              padding: desktop ? '48px 40px' : '32px 24px',
              backdropFilter:'blur(20px)',
            }}>
              <div style={{ fontSize: desktop ? 80 : 60, lineHeight:1, marginBottom: desktop?24:16 }}>{current.emoji}</div>
              <div style={{ fontSize:11, color:'#fbbf24', letterSpacing:'0.18em', fontFamily:'JetBrains Mono, monospace', marginBottom:14 }}>QUICK · TAKE A GUESS</div>
              <h1 style={{ fontFamily:'Archivo Black', fontSize: desktop ? 52 : 32, lineHeight:1.0, letterSpacing:'-0.03em', margin:'0 0 12px' }}>
                {current.q}
              </h1>
              <p style={{ fontSize: desktop ? 16 : 13, color:'rgba(255,255,255,0.65)', margin:'0 0 28px' }}>
                Your gut answer. No wrong answers.
              </p>

              <div style={{ display:'flex', gap:12 }}>
                <SwipeBtn label="NO" sub="👎 Doubt it" color="#ef4444" onClick={()=>handlePick('no')} desktop={desktop} />
                <SwipeBtn label="YES" sub="👍 For sure" color="#22c55e" onClick={()=>handlePick('yes')} desktop={desktop} />
              </div>
            </div>
          </div>
          <div style={{ padding: desktop ? '0 40px 20px' : '0 22px 18px', textAlign:'center' }}>
            <div style={{ fontSize:11, color:'rgba(255,255,255,0.5)', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em' }}>
              {picks.length === 0 ? '↑ TAP TO ANSWER' : `${V3_QUESTIONS.length - picks.length} MORE TO GO`}
            </div>
          </div>
        </>
      ) : (
        <div style={{ flex:1, padding: desktop ? '20px 40px' : '20px 22px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center' }}>
          <div className="v3-card" style={{
            width:'100%', maxWidth: desktop ? 600 : '100%',
            background:'rgba(255,255,255,0.08)',
            border:'1px solid rgba(255,255,255,0.15)',
            borderRadius:20,
            padding: desktop ? '40px 36px' : '28px 22px',
            backdropFilter:'blur(20px)',
          }}>
            <div style={{ fontSize: desktop?72:54, marginBottom:14 }}>🎯</div>
            <h2 style={{ fontFamily:'Archivo Black', fontSize: desktop?40:30, letterSpacing:'-0.03em', margin:'0 0 8px', lineHeight:1 }}>
              You're a natural.
            </h2>
            <p style={{ fontSize: desktop?16:14, color:'rgba(255,255,255,0.7)', margin:'0 0 22px', lineHeight:1.5 }}>
              See how your picks compare to <b style={{ color:'#fff' }}>14,820 hockey fans</b>.<br/>
              Sign up free to lock in your calls.
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
              {V3_QUESTIONS.map((q, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', background:'rgba(0,0,0,0.25)', borderRadius:10 }}>
                  <span style={{ fontSize:22 }}>{q.emoji}</span>
                  <span style={{ fontSize: desktop?14:12, flex:1, textAlign:'left', color:'rgba(255,255,255,0.85)' }}>{q.q}</span>
                  <span style={{ fontFamily:'Archivo Black', fontSize: desktop?16:13, color: picks[i]==='yes'?'#22c55e':'#ef4444', letterSpacing:'-0.02em' }}>
                    {picks[i].toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
            <button className="v3-cta" style={popCta(desktop)}>See how you did →</button>
            <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)', marginTop:12 }}>Free · 30-second sign-up</p>
          </div>
        </div>
      )}
    </div>
  );
}

function SwipeBtn({ label, sub, color, onClick, desktop }) {
  return (
    <button onClick={onClick} style={{
      flex:1,
      padding: desktop ? '24px 18px' : '18px 14px',
      background:'#fff',
      color:'#1e1b4b',
      border:`3px solid ${color}`,
      borderRadius:14,
      cursor:'pointer',
      fontFamily:'Archivo Black',
      transition:'transform .12s, box-shadow .12s',
      boxShadow:`0 4px 0 ${color}`,
    }}
    onMouseDown={e => { e.currentTarget.style.transform='translateY(2px)'; e.currentTarget.style.boxShadow=`0 2px 0 ${color}`; }}
    onMouseUp={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=`0 4px 0 ${color}`; }}
    onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=`0 4px 0 ${color}`; }}
    >
      <div style={{ fontSize: desktop?40:30, letterSpacing:'-0.04em', lineHeight:0.9, color }}>{label}</div>
      <div style={{ fontSize: desktop?13:11, marginTop:6, color:'#666', fontFamily:'Archivo, sans-serif', fontWeight:500 }}>{sub}</div>
    </button>
  );
}

const popCta = (desktop) => ({
  width:'100%',
  padding: desktop ? '16px 22px' : '14px 22px',
  background:'#fbbf24',
  color:'#1e1b4b',
  border:'none',
  borderRadius:10,
  fontFamily:'Archivo Black',
  fontSize: desktop ? 17 : 15,
  letterSpacing:'-0.01em',
  cursor:'pointer',
});

window.V3Terminal = V3Terminal;
