# 💌 PIN-Locked Love Letter

A romantic, interactive love letter web app — just like the viral TikTok trend!

## 📁 Project Structure

```
love-letter/
├── index.html          ← Main HTML (open this in browser)
├── css/
│   ├── base.css        ← Reset, phone shell, shared screen styles
│   ├── loading.css     ← Screen 1: Loading animation
│   ├── pin.css         ← Screen 2: Heart padlock + PIN spinners
│   ├── unlock.css      ← Screen 3: Envelope reveal
│   └── letter.css      ← Screen 4: Letter paper + decorations
└── js/
    ├── config.js       ← ✏️ ALL your customizations go here!
    ├── screen.js       ← Screen transition manager
    ├── pin.js          ← PIN digit logic & validation
    ├── letter.js       ← Unlock flow & typewriter effect
    └── main.js         ← App entry point
```

## ✏️ How to Customize

Open **`js/config.js`** and edit:

| Setting           | What it does                        |
|-------------------|-------------------------------------|
| `pin`             | 4-digit unlock PIN (default: 1203)  |
| `recipientName`   | Name on the lock screen             |
| `salutation`      | Opening line of the letter          |
| `letterBody`      | The letter content                  |
| `senderName`      | Signature at the bottom             |
| `letterDate`      | Date shown on the letter            |
| `typewriterSpeed` | Speed of text appearing (ms/char)   |
| `loadingDuration` | How long loading screen shows (ms)  |

## 🚀 How to Run

### Option A — Just open it
Double-click `index.html` — it works in any browser, no server needed.

### Option B — VS Code Live Server
1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**

## 🔐 Default PIN
**`1 2 0 3`** — change it in `js/config.js`
