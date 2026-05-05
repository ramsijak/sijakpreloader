// V1 — Sportsbook energy / NBA. Pop-traffic friendly: one obvious question, big YES/NO.
// Theme: NBA championship futures, no specific game tied. Mobile-first.

const v1Styles = {
  root: {
    width: '100%', height: '100%',
    background: '#0a0a0a',
    color: '#fff',
    fontFamily: 'Archivo, system-ui, sans-serif',
    display: 'flex', flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
};

if (typeof document !== 'undefined' && !document.getElementById('v1-styles')) {
  const s = document.createElement('style');
  s.id = 'v1-styles';
  s.textContent = `
    @keyframes v1-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
    .v1-pulse{ animation: v1-pulse 1.4s ease-in-out infinite }
  `;
  document.head.appendChild(s);
}

function V1Sportsbook({ desktop }) {
  const [pick, setPick] = React.useState(null);
  const yesPct = 68;
  const noPct = 32;

  if (desktop) {
    return (
      <div className="pl" style={v1Styles.root}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'18px 40px', borderBottom:'1px solid #1a1a1a' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <Logo size={28} />
            <span style={{ fontFamily:'Archivo Black', fontSize:22, letterSpacing:'-0.02em' }}>VERDICT</span>
          </div>
          <div style={{ display:'flex', gap:10, alignItems:'center', fontSize:13, color:'#888', fontFamily:'JetBrains Mono, monospace' }}>
            <span className="v1-pulse" style={{ width:8, height:8, background:'#22c55e', borderRadius:'50%', boxShadow:'0 0 12px #22c55e' }} />
            <span>12,418 NBA fans voting now</span>
          </div>
        </div>

        <div style={{ flex:1, display:'grid', gridTemplateColumns:'1.1fr 0.9fr', gap:0 }}>
          <div style={{ padding:'56px 56px', display:'flex', flexDirection:'column', justifyContent:'center', borderRight:'1px solid #1a1a1a' }}>
            <Tag tone="hot">🏀 NBA · PLAYOFF SEASON</Tag>
            <h1 style={{ fontFamily:'Archivo Black', fontSize:88, lineHeight:0.92, margin:'24px 0 18px', letterSpacing:'-0.04em' }}>
              Will the Lakers win the title this year?
            </h1>
            <p style={{ fontSize:20, color:'#9a9a9a', lineHeight:1.45, maxWidth:580, margin:'0 0 36px' }}>
              12,418 fans have already called it. <span style={{ color:'#fff' }}>Make your pick. Win real cash if you're right.</span>
            </p>
            <div style={{ display:'flex', gap:14 }}>
              <SideBtn side="yes" pct={yesPct} active={pick==='yes'} onClick={()=>setPick('yes')} big />
              <SideBtn side="no" pct={noPct} active={pick==='no'} onClick={()=>setPick('no')} big />
            </div>
            {pick && (
              <div style={{ marginTop:32, padding:'18px 22px', background:'#15803d22', border:'1px solid #22c55e55', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div style={{ fontSize:16 }}>You picked <b>{pick.toUpperCase()}</b>. Sign up to lock it in →</div>
                <Cta>Claim my pick →</Cta>
              </div>
            )}
          </div>
          <div style={{ padding:'56px 40px', background:'#070707' }}>
            <div style={{ fontSize:11, letterSpacing:'0.18em', color:'#666', fontFamily:'JetBrains Mono, monospace', marginBottom:18 }}>OTHER TEAMS · LIVE ODDS</div>
            <TeamList />
            <div style={{ marginTop:32 }}>
              <Cta full>Pick a team · Win real cash →</Cta>
              <p style={{ fontSize:12, color:'#555', marginTop:12, textAlign:'center' }}>Free to join · No deposit needed</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile — pop-traffic optimized: one obvious question, two giant buttons.
  return (
    <div className="pl" style={v1Styles.root}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'14px 18px', borderBottom:'1px solid #1a1a1a' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <Logo size={22} />
          <span style={{ fontFamily:'Archivo Black', fontSize:16, letterSpacing:'-0.02em' }}>VERDICT</span>
        </div>
        <div style={{ display:'flex', gap:6, alignItems:'center', fontSize:11, color:'#888', fontFamily:'JetBrains Mono, monospace' }}>
          <span className="v1-pulse" style={{ width:6, height:6, background:'#22c55e', borderRadius:'50%', boxShadow:'0 0 8px #22c55e' }} />
          <span>12,418 LIVE</span>
        </div>
      </div>

      <div style={{ padding:'22px 18px 0', flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <Tag tone="hot">🏀 NBA · PLAYOFFS</Tag>
        <h1 style={{ fontFamily:'Archivo Black', fontSize:42, lineHeight:0.94, margin:'14px 0 12px', letterSpacing:'-0.03em' }}>
          Will the Lakers win the title this year?
        </h1>
        <p style={{ fontSize:15, color:'#9a9a9a', lineHeight:1.45, margin:'0 0 22px' }}>
          12,418 fans already called it. <span style={{ color:'#fff' }}>Make your pick — win cash if you're right.</span>
        </p>

        <div style={{ display:'flex', gap:10, marginBottom:16 }}>
          <SideBtn side="yes" pct={yesPct} active={pick==='yes'} onClick={()=>setPick('yes')} />
          <SideBtn side="no" pct={noPct} active={pick==='no'} onClick={()=>setPick('no')} />
        </div>

        {pick ? (
          <div style={{ padding:'14px 16px', background:'#15803d22', border:'1px solid #22c55e55', borderRadius:8, marginBottom:16 }}>
            <div style={{ fontSize:14, marginBottom:10 }}>You picked <b>{pick.toUpperCase()}</b>. Sign up to lock it in →</div>
            <Cta full>Claim my pick →</Cta>
          </div>
        ) : (
          <div style={{ fontSize:11, color:'#666', textAlign:'center', marginBottom:16, fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.1em' }}>↑ TAP YES OR NO TO CONTINUE</div>
        )}

        <div style={{ borderTop:'1px solid #1a1a1a', paddingTop:14 }}>
          <div style={{ fontSize:10, letterSpacing:'0.18em', color:'#666', fontFamily:'JetBrains Mono, monospace', marginBottom:10 }}>OR PICK ANOTHER TEAM</div>
          <TeamList compact />
        </div>
      </div>

      <div style={{ padding:'12px 18px 18px', borderTop:'1px solid #1a1a1a', background:'#050505' }}>
        <Cta full>Free sign-up · Win real cash →</Cta>
        <p style={{ fontSize:10, color:'#555', marginTop:8, textAlign:'center' }}>No deposit needed to start picking</p>
      </div>
    </div>
  );
}

function Logo({ size=20 }) {
  return (
    <div style={{ width:size, height:size, background:'#22c55e', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'Archivo Black', fontSize:size*0.6, color:'#0a0a0a', borderRadius:size*0.18 }}>V</div>
  );
}

function Tag({ tone='hot', children }) {
  const colors = tone==='hot'
    ? { bg:'#dc262622', fg:'#ef4444', bd:'#dc262655' }
    : { bg:'#22c55e22', fg:'#22c55e', bd:'#22c55e55' };
  return (
    <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 10px', background:colors.bg, border:`1px solid ${colors.bd}`, color:colors.fg, fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.12em', fontWeight:600, borderRadius:4, alignSelf:'flex-start' }}>{children}</span>
  );
}

function SideBtn({ side, pct, active, onClick, big }) {
  const isYes = side==='yes';
  const color = isYes ? '#22c55e' : '#ef4444';
  return (
    <button onClick={onClick} style={{
      flex:1, position:'relative', overflow:'hidden',
      padding: big ? '28px 22px' : '20px 16px',
      background: active ? color : '#141414',
      color: active ? '#0a0a0a' : '#fff',
      border: `1.5px solid ${active ? color : '#222'}`,
      borderRadius: 8,
      fontFamily:'Archivo Black',
      cursor:'pointer',
      textAlign:'left',
      display:'flex', flexDirection:'column', gap: big ? 10 : 6,
      transition:'all .15s',
    }}>
      <div style={{ fontSize: big ? 44 : 32, letterSpacing:'-0.03em', lineHeight:0.9 }}>{isYes ? 'YES' : 'NO'}</div>
      <div style={{ fontSize: big ? 13 : 11, fontFamily:'JetBrains Mono, monospace', opacity:0.75, letterSpacing:'0.05em', fontWeight:500 }}>
        {pct}% AGREE
      </div>
      {!active && (
        <div style={{ position:'absolute', left:0, bottom:0, height:3, width:`${pct}%`, background:color, opacity:0.6 }} />
      )}
    </button>
  );
}

function TeamList({ compact }) {
  const items = [
    { team: 'Boston Celtics', pct: 24, dir: 'up', delta:'+3' },
    { team: 'Denver Nuggets', pct: 18, dir: 'down', delta:'-2' },
    { team: 'Oklahoma City Thunder', pct: 15, dir: 'up', delta:'+5' },
    { team: 'Milwaukee Bucks', pct: 9, dir: 'down', delta:'-1' },
    { team: 'New York Knicks', pct: 7, dir: 'up', delta:'+1' },
  ];
  return (
    <div style={{ display:'flex', flexDirection:'column', gap: compact ? 6 : 8 }}>
      {items.slice(0, compact ? 4 : 5).map((it, i) => (
        <div key={i} style={{
          display:'grid', gridTemplateColumns:'1fr auto auto',
          gap: compact ? 10 : 14, alignItems:'center',
          padding: compact ? '10px 12px' : '14px 16px',
          background:'#101010', border:'1px solid #1a1a1a', borderRadius:6,
        }}>
          <div style={{ overflow:'hidden' }}>
            <div style={{ fontSize: compact ? 13 : 15, fontWeight:600, whiteSpace:'nowrap', textOverflow:'ellipsis', overflow:'hidden' }}>{it.team}</div>
            <div style={{ fontSize: compact ? 10 : 11, color:'#666', fontFamily:'JetBrains Mono, monospace', letterSpacing:'0.05em', marginTop:1 }}>TO WIN IT ALL</div>
          </div>
          <div style={{ fontFamily:'Archivo Black', fontSize: compact ? 20 : 24, letterSpacing:'-0.02em' }}>{it.pct}<span style={{ fontSize: compact?11:13, opacity:0.6 }}>%</span></div>
          <div style={{ fontFamily:'JetBrains Mono, monospace', fontSize: compact ? 10 : 11, color: it.dir==='up'?'#22c55e':'#ef4444', minWidth:30, textAlign:'right' }}>
            {it.dir==='up' ? '▲' : '▼'} {it.delta}
          </div>
        </div>
      ))}
    </div>
  );
}

function Cta({ children, full }) {
  return (
    <button style={{
      width: full ? '100%' : 'auto',
      padding:'15px 22px',
      background:'#22c55e',
      color:'#0a0a0a',
      border:'none',
      borderRadius:8,
      fontFamily:'Archivo Black',
      fontSize:16,
      letterSpacing:'-0.01em',
      cursor:'pointer',
      whiteSpace:'nowrap',
    }}>{children}</button>
  );
}

window.V1Sportsbook = V1Sportsbook;
