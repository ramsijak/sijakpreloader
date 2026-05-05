// V2 — Editorial / NYT-magazine. Serif headline, prediction-as-journalism.
// Hook: a single big question framed as the day's lede; "the market" as the byline.

const v2Styles = {
  root: {
    width:'100%', height:'100%',
    background:'#f5f1e8',
    color:'#1a1a1a',
    fontFamily:'"Instrument Serif", Georgia, serif',
    display:'flex', flexDirection:'column',
    overflow:'hidden',
    position:'relative',
  },
  small: { fontFamily:'"DM Mono", "JetBrains Mono", monospace', fontSize:10, letterSpacing:'0.18em', textTransform:'uppercase' },
};

function V2Editorial({ desktop }) {
  const today = 'Tuesday, May 5 · 2026';

  if (desktop) {
    return (
      <div className="pl" style={v2Styles.root}>
        {/* Masthead */}
        <div style={{ borderBottom:'1.5px solid #1a1a1a', padding:'18px 56px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={v2Styles.small}>{today}</div>
          <div style={{ fontFamily:'"Instrument Serif", serif', fontSize:38, letterSpacing:'-0.01em' }}>The&nbsp;<i>Verdict</i></div>
          <div style={v2Styles.small}>Vol. III · No. 124</div>
        </div>

        <div style={{ flex:1, display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:0 }}>
          <div style={{ padding:'40px 56px', borderRight:'1px solid #1a1a1a44', display:'flex', flexDirection:'column' }}>
            <div style={{ ...v2Styles.small, color:'#a04a1f' }}>Geopolitics · The Lede</div>
            <h1 style={{ fontFamily:'"Instrument Serif", serif', fontSize:88, lineHeight:0.98, margin:'12px 0 14px', letterSpacing:'-0.025em', fontWeight:400 }}>
              Will Russia and Ukraine sign a ceasefire <i>before September?</i>
            </h1>
            <p style={{ fontSize:19, lineHeight:1.5, color:'#3a3a3a', maxWidth:560, fontFamily:'Georgia, serif', margin:'0 0 22px' }}>
              The market says <b style={{ color:'#1a1a1a' }}>22 percent</b>, down four points this week. 6,841 traders are reading the same headlines you are — and putting money behind their answer.
            </p>
            <ProbBar pct={22} label="Ceasefire by Sept 1" />
            <div style={{ marginTop:32, display:'flex', alignItems:'center', gap:14 }}>
              <button style={editorialCta}>Read the market →</button>
              <span style={{ ...v2Styles.small, color:'#666' }}>Free · 30s sign-up</span>
            </div>
          </div>

          <div style={{ padding:'40px 40px', display:'flex', flexDirection:'column', gap:18 }}>
            <div style={v2Styles.small}>Also today</div>
            <Story tag="Climate" pct={71} delta="+9">Will July 2026 be the hottest July ever recorded in the UK?</Story>
            <Story tag="Sports" pct={38} delta="+4">Will England take back the Ashes from Australia this winter?</Story>
            <Story tag="Climate" pct={56} delta="+1">Will Arctic sea-ice minimum drop below 4 million km²?</Story>
            <Story tag="Geo" pct={47} delta="-2">Will the EU admit a new member state by year-end?</Story>
          </div>
        </div>

        <div style={{ padding:'14px 56px', borderTop:'1.5px solid #1a1a1a', background:'#1a1a1a', color:'#f5f1e8', display:'flex', justifyContent:'space-between', alignItems:'center', ...v2Styles.small }}>
          <span>Markets · 480 open · Updated continuously</span>
          <span>verdict.markets</span>
        </div>
      </div>
    );
  }

  // Mobile
  return (
    <div className="pl" style={v2Styles.root}>
      <div style={{ borderBottom:'1.5px solid #1a1a1a', padding:'14px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ ...v2Styles.small, fontSize:9 }}>{today}</div>
        <div style={{ fontFamily:'"Instrument Serif", serif', fontSize:24, letterSpacing:'-0.01em' }}>The&nbsp;<i>Verdict</i></div>
        <div style={{ ...v2Styles.small, fontSize:9 }}>№ 124</div>
      </div>

      <div style={{ padding:'22px 20px 14px', flex:1, overflow:'hidden', display:'flex', flexDirection:'column' }}>
        <div style={{ ...v2Styles.small, color:'#a04a1f' }}>Geopolitics · The Lede</div>
        <h1 style={{ fontFamily:'"Instrument Serif", serif', fontSize:46, lineHeight:0.98, margin:'10px 0 12px', letterSpacing:'-0.02em', fontWeight:400 }}>
          Will Russia and Ukraine sign a ceasefire <i>before September?</i>
        </h1>
        <p style={{ fontSize:14.5, lineHeight:1.5, color:'#3a3a3a', fontFamily:'Georgia, serif', margin:'0 0 16px' }}>
          The market says <b style={{ color:'#1a1a1a' }}>22 percent</b>, down four points this week. 6,841 traders are putting money behind an answer.
        </p>
        <ProbBar pct={22} label="Ceasefire by Sept 1" />

        <div style={{ marginTop:18, paddingTop:16, borderTop:'1px solid #1a1a1a22' }}>
          <div style={{ ...v2Styles.small, marginBottom:10 }}>Also today</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <Story tag="Climate" pct={71} delta="+9" compact>Hottest July ever in the UK?</Story>
            <Story tag="Sports" pct={38} delta="+4" compact>England takes back the Ashes?</Story>
            <Story tag="Climate" pct={56} delta="+1" compact>Arctic ice min &lt; 4M km²?</Story>
          </div>
        </div>
      </div>

      <div style={{ padding:'14px 20px 18px', borderTop:'1.5px solid #1a1a1a', background:'#1a1a1a' }}>
        <button style={{ ...editorialCta, width:'100%' }}>Read the market →</button>
        <p style={{ ...v2Styles.small, color:'#888', textAlign:'center', marginTop:8 }}>Free · 30-second sign-up</p>
      </div>
    </div>
  );
}

const editorialCta = {
  padding:'13px 22px',
  background:'#a04a1f',
  color:'#f5f1e8',
  border:'none',
  borderRadius:0,
  fontFamily:'"Instrument Serif", serif',
  fontSize:18,
  letterSpacing:'-0.01em',
  cursor:'pointer',
};

function ProbBar({ pct, label }) {
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:6, fontFamily:'"DM Mono", monospace', fontSize:11, color:'#666', letterSpacing:'0.08em', textTransform:'uppercase' }}>
        <span>{label}</span>
        <span style={{ color:'#1a1a1a', fontFamily:'"Instrument Serif", serif', fontSize:30, letterSpacing:'-0.02em' }}>{pct}<span style={{ fontSize:14 }}>%</span></span>
      </div>
      <div style={{ height:6, background:'#1a1a1a15', position:'relative' }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`, background:'#a04a1f' }} />
      </div>
    </div>
  );
}

function Story({ tag, pct, delta, children, compact }) {
  const up = !delta.startsWith('-');
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:14, alignItems:'baseline', borderBottom:'1px solid #1a1a1a22', paddingBottom: compact ? 10 : 14 }}>
      <div>
        <div style={{ fontFamily:'"DM Mono", monospace', fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', color:'#a04a1f', marginBottom:4 }}>{tag}</div>
        <div style={{ fontFamily:'"Instrument Serif", serif', fontSize: compact ? 19 : 22, lineHeight:1.1, letterSpacing:'-0.01em' }}>{children}</div>
      </div>
      <div style={{ textAlign:'right' }}>
        <div style={{ fontFamily:'"Instrument Serif", serif', fontSize: compact ? 26 : 32, letterSpacing:'-0.02em', lineHeight:1 }}>{pct}<span style={{ fontSize:12 }}>%</span></div>
        <div style={{ fontFamily:'"DM Mono", monospace', fontSize:10, color: up?'#0d6e3a':'#a04a1f' }}>{delta}</div>
      </div>
    </div>
  );
}

window.V2Editorial = V2Editorial;
