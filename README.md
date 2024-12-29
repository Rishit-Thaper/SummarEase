# SummarEase: Ek Webpage Summarizer Extension

Yeh extension React, Vite aur Google Gemini API ka use karke banaya hai.

## Kaise use karna hai, aao batata hu:

### Ekdum simple hai:

1. Sabse pehle, iss repo ko clone karo.

2. Phir yeh command run karo dependencies install karne ke liye:

   ```bash
   pnpm install
   ```

3. `.env` file bana lo jisme tum apni API key store karoge. Dhyaan rahe ki API key ka naam **VITE\_** se start hona chahiye. Maine **VITE_GEMINI_API_KEY** use kiya hai.

4. Ab extension ko build karne ke liye yeh command run karo:

   ```bash
   pnpm build
   ```

5. Fir browser mein jaake **chrome://extensions/** search karo.

6. Waha **Developer mode** ko on karo, aur **Load unpacked** option mein apne project ki build directory ko import kar lo.

7. Bas, ab extension ko apne browser mein use kar sakte ho!

Ab tum kisi bhi webpage ka summary dekh sakte ho, bas extension icon pe click karna hai!

and **All Set 🚀😁**
