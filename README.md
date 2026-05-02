<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🌐 Live Demo

🚀 **Play the live app here:**
👉 https://neon-groove-snake-1081739759815.asia-southeast1.run.app/

Experience the **Neon Snake Game + Music Player** directly in your browser with no setup required.

⚠️ **Note:** If music is not playing, make sure your browser allows autoplay or click the play button to start audio manually.

---

## 🚀 Run & Deploy Your AI Studio App

This project includes everything you need to run the app locally and test it before deployment.

🔗 **View your app in Google AI Studio:**
https://ai.studio/apps/06723026-321e-4100-ad75-b9beaa938edf

---

## 🖥 Run Locally

### 📌 Prerequisites

* Node.js (v18+ recommended)
* npm or yarn

---

### ⚙️ Setup Instructions

```bash id="fix1"
git clone https://github.com/your-username/neon-snake-beats.git
cd neon-snake-beats
npm install
```

---

### 🔐 Environment Setup

Create a `.env.local` file:

```env id="fix2"
GEMINI_API_KEY=your_gemini_api_key_here
```

---

### ▶️ Start Development Server

```bash id="fix3"
npm run dev
```

Then open:
http://localhost:3000

---

## 🎧 Music Troubleshooting

If music is not working in the app, check the following:

* 🔊 Browser autoplay restrictions (click play button manually)
* 🎵 Ensure audio files are correctly loaded in `/public/music/`
* 🌐 Check console for 404 errors on audio files
* 🔁 Try refreshing the page after starting server

---

## ☁️ Deployment

You can deploy this project using:

* Vercel
* Netlify
* Google Cloud Run

Make sure environment variables are configured before deployment.

---

## 🧠 Notes

* Never expose API keys publicly
* Keep `.env.local` private
* Restart server after changes
* Some browsers block autoplay audio by default
