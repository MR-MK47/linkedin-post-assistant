const DEFAULT_MODEL = "gemini-3.8-flash";

function getApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY?.trim() || "";
}

export async function generateLinkedInPost({
  imageBase64,
  imageMimeType,
  context,
  audience,
  tone,
  goal,
  apiKey,
  model = DEFAULT_MODEL,
}) {
  const key = apiKey?.trim() || getApiKey();

  if (!key) throw new Error("Add your Gemini API key before generating the post.");

  const prompt = [
    "You are an expert LinkedIn post writer.",
    "Create ONE polished LinkedIn post from the supplied image and user context.",
    "USER CONTEXT:", context,
    "TARGET AUDIENCE:", audience,
    "TONE:", tone,
    "GOAL:", goal,
    "Rules:",
    "- Start with a strong, natural opening.",
    "- Explain what happened without inventing facts.",
    "- Sound human, personal and conversational.",
    "- Use short paragraphs with spacing suitable for LinkedIn.",
    "- Add a useful lesson or reflection when supported by the context.",
    "- End with a conversation-friendly question when appropriate.",
    "- Add 3 to 5 relevant hashtags on the final line.",
    "- Do not mention AI.",
    "- Return ONLY the copy-pastable LinkedIn post."
  ].join("\n\n");

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent",
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{
          role: "user",
          parts: [
            { text: prompt },
            { inline_data: { mime_type: imageMimeType, data: imageBase64 } }
          ]
        }],
        generationConfig: { maxOutputTokens: 1200 }
      })
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.error?.message || "Gemini request failed.");
  }

  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.map((part) => part.text || "").join("").trim();
  if (!text) throw new Error("Gemini returned an empty response.");
  return text;
}
