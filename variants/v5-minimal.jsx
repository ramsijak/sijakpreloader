// V5 — Minimal / techy. Probability slider as the interaction.
// User drags slider to set their estimate; reveals delta vs. crowd; CTA to "lock in".

const v5Styles = {
  root: {
    width:'100%', height:'100%',
    background:'#fafafa',
    color:'#0a0a0a',
    fontFamily:'Inter, system-ui, sans-serif',
    display:'flex', flexDirection:'column',
    overflow:'hidden',
    position:'relative',
  },
};

function V5Minimal() {
  const [val, setVal] = React.useState(50);
  const [touched, setTouched] = React.useState(false);
  const crowd = 64;
  const delta = val - crowd;

  return (
    <div className="pl" style={v5Styles.root}>
      <div style={{ padding:'18px 22px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ width:18, height:18, background:'#0a0a0a' }} />
          <span style={{ fontWeight:600, fontSize:14, letterSpacing:'-0.01em' }}>verdict</span>
        </div>
        <div style={{ fontSize:11, color:'#888', fontFeatureSettings:'"tnum"' }}>8,200 fans · live</div>
      </div>

      <div style={{ flex:1, padding:'30px 26px 0', display:'flex', flexDirection:'column' }}>
        <div style={{ fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:14 }}>⚽️ Champions League · Final</div>
        <h1 style={{ fontSize:32, lineHeight:1.1, margin:0, fontWeight:600, letterSpacing:'-0.025em' }}>
          Will Real Madrid lift the Champions League trophy this season?
        </h1>
        <p style={{ fontSize:14, color:'#666', lineHeight:1.5, marginTop:14, marginBottom:0 }}>
          Slide your gut feeling. See what 8,200 fans are saying.
        </p>

        {/* Slider */}
        <div style={{ marginTop:38 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:14 }}>
            <span style={{ fontSize:11, color:'#888', letterSpacing:'0.1em', textTransform:'uppercase' }}>Your estimate</span>
            <span style={{ fontSize:48, fontWeight:600, letterSpacing:'-0.04em', fontFeatureSettings:'"tnum"', lineHeight:1 }}>
              {val}<span style={{ fontSize:18, color:'#888', fontWeight:400 }}>%</span>
            </span>
          </div>
          <div style={{ position:'relative' }}>
            <div style={{ height:4, background:'#e5e5e5', borderRadius:99, position:'relative' }}>
              <div style={{ position:'absolute', left:0, top:0, height:4, width:`${val}%`, background:'#0a0a0a', borderRadius:99 }} />
              {/* crowd marker */}
              <div style={{ position:'absolute', left:`${crowd}%`, top:-6, width:2, height:16, background:'#dc2626', transform:'translateX(-50%)' }} title="market" />
            </div>
            <input
              type="range" min="0" max="100" value={val}
              onChange={e => { setVal(+e.target.value); setTouched(true); }}
              style={{ position:'absolute', inset:0, opacity:0, cursor:'pointer', width:'100%' }}
            />
            <div style={{ position:'absolute', left:`${val}%`, top:-7, width:18, height:18, background:'#fff', border:'2px solid #0a0a0a', borderRadius:'50%', transform:'translateX(-50%)', pointerEvents:'none', boxShadow:'0 2px 6px rgba(0,0,0,0.12)' }} />
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, fontSize:11, color:'#aaa', fontFeatureSettings:'"tnum"' }}>
            <span>0% impossible</span>
            <span>50%</span>
            <span>100% certain</span>
          </div>
        </div>

        {/* Reveal */}
        <div style={{ marginTop:34, padding:'18px 18px', background:'#fff', border:'1px solid #e5e5e5', borderRadius:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
            <span style={{ fontSize:12, color:'#888' }}>The market says</span>
            <span style={{ fontSize:24, fontWeight:600, letterSpacing:'-0.02em', fontFeatureSettings:'"tnum"' }}>{crowd}%</span>
          </div>
          {touched && (
            <div style={{ marginTop:10, paddingTop:10, borderTop:'1px solid #f0f0f0', fontSize:13, color:'#444', lineHeight:1.5 }}>
              {Math.abs(delta) < 5
                ? <>You're <b>aligned with the crowd</b> — within {Math.abs(delta)}pp.</>
                : delta > 0
                  ? <>You're <b>{delta}pp more bullish</b> than the market. If you're right, you'd win <b>${(100/crowd).toFixed(2)}</b> per $1 on YES.</>
                  : <>You're <b>{Math.abs(delta)}pp more bearish</b>. If you're right, you'd win <b>${(100/(100-crowd)).toFixed(2)}</b> per $1 on NO.</>
              }
            </div>
          )}
        </div>
      </div>

      <div style={{ padding:'18px 22px', borderTop:'1px solid #ececec' }}>
        <button style={minCta}>Lock in your call →</button>
        <p style={{ fontSize:11, color:'#999', textAlign:'center', marginTop:8 }}>Free · 30 seconds · Win cash if you're right</p>
      </div>
    </div>
  );
}

const minCta = {
  width:'100%',
  padding:'14px 22px',
  background:'#0a0a0a',
  color:'#fff',
  border:'none',
  borderRadius:8,
  fontFamily:'Inter, sans-serif',
  fontWeight:500,
  fontSize:14,
  letterSpacing:'-0.005em',
  cursor:'pointer',
};

window.V5Minimal = V5Minimal;
