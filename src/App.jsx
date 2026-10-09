import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ImageUploader from "./components/ImageUploader";
import PostForm from "./components/PostForm";
import PostPreview from "./components/PostPreview";
import { generateLinkedInPost } from "./gemini";

function App() {
  const [imagePreview, setImagePreview] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [imageMimeType, setImageMimeType] = useState("");
  const [fileName, setFileName] = useState("");
  const [context, setContext] = useState("");
  const [audience, setAudience] = useState("Students & early-career builders");
  const [tone, setTone] = useState("Human & authentic");
  const [goal, setGoal] = useState("Share an achievement");
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || "");
  const [post, setPost] = useState("");
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { document.title = "PostPilot · LinkedIn Post Assistant"; }, []);

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (file.size > 5 * 1024 * 1024) { setError("Please keep the image below 5 MB."); return; }

    setError("");
    setPost("");
    setGenerated(false);
    setCopied(false);
    setFileName(file.name);
    setImageMimeType(file.type);
    setImagePreview(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      const comma = result.indexOf(",");
      setImageBase64(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => setError("The image could not be read. Please choose another image.");
    reader.readAsDataURL(file);
  }

  async function handleGenerate() {
    setError("");
    setCopied(false);
    if (!imageBase64) { setError("Please upload an image first."); return; }
    if (!context.trim()) { setError("Tell Gemini what happened so it can write a specific post."); return; }

    setLoading(true);
    try {
      const result = await generateLinkedInPost({ imageBase64, imageMimeType, context, audience, tone, goal, apiKey });
      setPost(result);
      setGenerated(true);
    } catch (generationError) {
      setError(generationError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(post);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { setError("Copy failed. Please select the post text and copy it manually."); }
  }

  function handleClear() {
    setImagePreview(""); setImageBase64(""); setImageMimeType(""); setFileName("");
    setContext(""); setPost(""); setGenerated(false); setCopied(false); setError("");
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="container py-5">
        <section className="hero-section">
          <span className="eyebrow">FROM MOMENT → MESSAGE</span>
          <h1>Turn your <span>moment</span> into a LinkedIn post people want to read.</h1>
          <p>Upload the image, explain what happened, and let Gemini handle the wording. You get a polished post you can copy straight into LinkedIn.</p>
        </section>

        {error && <div className="alert alert-danger app-alert" role="alert"><strong>Something needs attention:</strong> {error}</div>}

        <section className="workspace">
          <div className="left-column">
            <ImageUploader imagePreview={imagePreview} fileName={fileName} onImageChange={handleImageChange} />
            <PostForm
              context={context} setContext={setContext}
              audience={audience} setAudience={setAudience}
              tone={tone} setTone={setTone}
              goal={goal} setGoal={setGoal}
              apiKey={apiKey} setApiKey={setApiKey}
              onGenerate={handleGenerate} onClear={handleClear}
              loading={loading} hasImage={Boolean(imageBase64)}
            />
          </div>
          <PostPreview post={post} onCopy={handleCopy} copied={copied} generated={generated} />
        </section>

        <section className="how-it-works">
          <div className="section-label">THE SIMPLE FLOW</div>
          <div className="row g-3 mt-1">
            <div className="col-md-4"><div className="flow-step"><span>01</span><strong>Upload</strong><p>Add the image from your achievement, event, project or experience.</p></div></div>
            <div className="col-md-4"><div className="flow-step"><span>02</span><strong>Explain</strong><p>Give Gemini the context, audience, tone and goal for the post.</p></div></div>
            <div className="col-md-4"><div className="flow-step"><span>03</span><strong>Copy</strong><p>Review the generated result and paste it directly into LinkedIn.</p></div></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
