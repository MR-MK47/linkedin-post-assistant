function PostForm(props) {
  const {
    context, setContext, audience, setAudience, tone, setTone, goal, setGoal,
    apiKey, setApiKey, onGenerate, onClear, loading, hasImage
  } = props;

  return (
    <div className="form-card">
      <div className="section-label">02 · Tell Gemini the story</div>
      <label className="form-label" htmlFor="context">What happened?</label>
      <textarea
        id="context"
        className="form-control story-input"
        value={context}
        onChange={(event) => setContext(event.target.value)}
        placeholder="Example: I attended my first hackathon, our team built a study assistant in 24 hours, and we received positive feedback from the judges..."
        rows="7"
      />

      <div className="row g-3 mt-1">
        <div className="col-md-6">
          <label className="form-label" htmlFor="audience">Audience</label>
          <select id="audience" className="form-select" value={audience} onChange={(event) => setAudience(event.target.value)}>
            <option>Students & early-career builders</option>
            <option>Recruiters & hiring managers</option>
            <option>Tech professionals</option>
            <option>Entrepreneurs & founders</option>
            <option>General LinkedIn audience</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="tone">Tone</label>
          <select id="tone" className="form-select" value={tone} onChange={(event) => setTone(event.target.value)}>
            <option>Human & authentic</option>
            <option>Confident & professional</option>
            <option>Reflective & thoughtful</option>
            <option>Excited & energetic</option>
            <option>Simple & conversational</option>
          </select>
        </div>
        <div className="col-12">
          <label className="form-label" htmlFor="goal">Main goal</label>
          <select id="goal" className="form-select" value={goal} onChange={(event) => setGoal(event.target.value)}>
            <option>Share an achievement</option>
            <option>Tell a learning story</option>
            <option>Build my personal brand</option>
            <option>Share an event or experience</option>
            <option>Start a conversation</option>
          </select>
        </div>
      </div>

      <div className="api-box mt-4">
        <div>
          <div className="api-title">Gemini API key</div>
          <div className="api-help">Paste it for this session or use VITE_GEMINI_API_KEY.</div>
        </div>
        <input className="form-control api-input" type="password" value={apiKey} onChange={(event) => setApiKey(event.target.value)} placeholder="Paste API key" autoComplete="off" />
      </div>

      <div className="action-row mt-4">
        <button className="btn btn-primary generate-btn" onClick={onGenerate} disabled={loading || !hasImage}>
          {loading ? <><span className="spinner-border spinner-border-sm me-2" />Writing...</> : "Generate LinkedIn Post →"}
        </button>
        <button className="btn btn-link clear-btn" onClick={onClear} disabled={loading}>Clear</button>
      </div>
      {!hasImage && <p className="helper-text mb-0 mt-3">Upload an image first. Gemini will use the image plus your context.</p>}
    </div>
  );
}
export default PostForm;
