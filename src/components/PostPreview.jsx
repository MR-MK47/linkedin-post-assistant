function PostPreview({ post, onCopy, copied, generated }) {
  const characters = post.length;
  const words = post.trim() ? post.trim().split(/\s+/).length : 0;

  return (
    <div className="preview-card">
      <div className="preview-heading">
        <div><div className="section-label">03 · Your copy-ready post</div><h2>LinkedIn Preview</h2></div>
        {generated && <span className="ready-badge">READY</span>}
      </div>

      {!post ? (
        <div className="empty-preview">
          <div className="empty-mark">✦</div>
          <h3>Your finished post will appear here.</h3>
          <p>Gemini will turn your image and context into a polished, copy-pastable LinkedIn post.</p>
        </div>
      ) : (
        <>
          <div className="linkedin-post">
            <div className="linkedin-author"><div className="avatar">MK</div><div><strong>Your Name</strong><div className="author-meta">You · Just now</div></div></div>
            <div className="post-text">{post}</div>
            <div className="linkedin-actions"><span>♡ Like</span><span>○ Comment</span><span>↗ Repost</span><span>✈ Send</span></div>
          </div>
          <div className="preview-footer">
            <div className="counts"><span>{characters} characters</span><span>{words} words</span></div>
            <button className="btn btn-dark copy-btn" onClick={onCopy}>{copied ? "Copied ✓" : "Copy post"}</button>
          </div>
        </>
      )}
    </div>
  );
}
export default PostPreview;
