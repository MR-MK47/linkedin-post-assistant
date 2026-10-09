# AI LinkedIn Post Assistant

A beginner-friendly React + Bootstrap project that takes an image and your context, sends both to Gemini, and returns a copy-pastable LinkedIn post.

## Why this project matches the FEDL material

The provided experiments teach React with Vite, Bootstrap, functional components, JSX, props, `useState`, event handling, conditional rendering, list/object handling, and `useEffect` for side effects and API calls. This project deliberately stays inside that teaching boundary instead of adding Tailwind, TypeScript, Redux, Axios, or a second frontend framework.

## Flow

Browser → `index.html` → `main.jsx` → `App.jsx` → child components → Gemini API → state update → React re-render.

The image is read in the browser, converted to base64, and sent to Gemini as `inline_data` together with the text prompt. Google’s current Gemini API documentation shows this multimodal REST pattern, and `gemini-3.8-flash` is currently documented by Google as generally available. See the source links in the project explanation from ChatGPT.

## Run

~~~bash
npm install
npm run dev
~~~

Create `.env` from `.env.example` and set `VITE_GEMINI_API_KEY=...`, or paste the key into the UI for the current browser session.

Never commit a real API key. This direct-browser setup is for learning/demo use; production should keep the key behind a backend.

## Concepts used

`useState`: stores image data, form values, generated post, loading state, copied state and errors.

Props: `App` passes values and event functions into `ImageUploader`, `PostForm` and `PostPreview`.

Event handling: `onChange` handles form/file inputs and `onClick` handles buttons.

Conditional rendering: the preview shows an empty state before generation and the LinkedIn preview after generation.

`useEffect`: sets the page title after the component mounts.

`fetch`: sends the POST request to Gemini and reads the JSON response.

Bootstrap: provides the responsive container/grid/form/button utilities; custom CSS gives the product look.

## Important note

A `VITE_*` variable is exposed to browser code after the Vite build. Do not treat it as a secret in a production app. Keep the key server-side when deploying a real public product.
