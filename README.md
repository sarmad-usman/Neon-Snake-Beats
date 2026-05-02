<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 🚀 Run & Deploy Your AI Studio App

This project includes everything you need to run the app locally and test it before deployment.

🔗 **View your app in Google AI Studio:**
https://ai.studio/apps/06723026-321e-4100-ad75-b9beaa938edf

---

## 🖥 Run Locally

### 📌 Prerequisites

Make sure you have the following installed:

* Node.js (v18 or higher recommended)
* npm or yarn

---

### ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/neon-snake-beats.git
cd neon-snake-beats
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory and add:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Run the development server**

```bash
npm run dev
```

---

### 🌐 Open in Browser

Once the server is running, open:

http://localhost:3000

---

## ☁️ Deployment (Optional)

You can deploy this app using platforms like:

* Vercel
* Netlify
* Google Cloud Run

Make sure to add your `GEMINI_API_KEY` in the environment variables section of your hosting platform.

---

## 🧠 Notes

* Keep your API key secure — never expose it in public repositories
* Use `.env.local` for local development only
* Restart the server after updating environment variables
