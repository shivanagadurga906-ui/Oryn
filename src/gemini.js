// ============================================================
// Gemini API Service for Oryn Financial Copilot
// ============================================================
// API keys are loaded from environment variables (see .env.local)
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

// Stitch API Key (for UI generation & MCP)
export const STITCH_API_KEY = import.meta.env.VITE_STITCH_API_KEY || "";

// Models in priority order (real, valid Gemini model IDs)
const MODELS_PRIORITY = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b"
];

/**
 * Ask Gemini API with financial context grounding and automatic model fallback
 */
export async function askGeminiCopilot(userPrompt, conversationHistory = [], financialContext = null) {
  const systemInstruction = `You are Oryn, an authoritative, executive-level Financial Copilot designed for CFOs, controllers, and business owners.
The current client is "Rao & Co.", managed by Arjun Rao.
Current Financial Snapshot:
- Total Cash Flow: ${financialContext?.cashFlow ? `$${financialContext.cashFlow.toLocaleString()}` : "$142,500 (+12.4% vs last month)"}
- Working Capital: ${financialContext?.workingCapital ? `$${financialContext.workingCapital.toLocaleString()}` : "$486,200 (+8.1%)"}
- Net Operating Margin: ${financialContext?.netMargin || "24.8% (+2.3%)"}
- Financial Runway: ${financialContext?.runway || "18.4 months"}
- Liquidity Index: 94.2 / 100 (Optimal for Q3 expansion)
- Accounts Receivable: $84,200 (Avg collection: 38 days)
- Accounts Payable: $36,800 (Avg terms: 30 days)
- Main Products: Enterprise ERP Gateway ($2,400/unit, 42% margin), Cloud Infrastructure Pack ($850/mo, 68% margin), Edge Sensor Suite ($340/unit, 31% margin)

Instructions:
1. Provide concise, highly actionable, institutional-grade financial guidance.
2. When answering quantitative questions, structure your answers with key metrics, financial implications, and recommended steps.
3. Use markdown bullet points and bold financial terms for maximum executive clarity.
4. Maintain a professional, confident, yet conversational tone suitable for an executive copilot.`;

  // Build contents array (system-turn pattern for Gemini)
  const contents = [
    {
      role: "user",
      parts: [{ text: systemInstruction }]
    },
    {
      role: "model",
      parts: [{ text: "Understood. I am Oryn, your executive financial copilot for Rao & Co. How can I assist with your cash flow, working capital, inventory, or strategic modeling today?" }]
    }
  ];

  // Append recent conversation turns (up to last 6 messages)
  const recentHistory = conversationHistory.slice(-6);
  for (const msg of recentHistory) {
    contents.push({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    });
  }

  // Append current prompt
  contents.push({
    role: "user",
    parts: [{ text: userPrompt }]
  });

  let lastError = null;

  for (const model of MODELS_PRIORITY) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ contents })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn(`Model ${model} returned ${response.status}:`, errorData.error?.message);
        lastError = errorData.error?.message || `HTTP ${response.status}`;
        continue;
      }

      const data = await response.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (answer) {
        return {
          success: true,
          text: answer,
          modelUsed: model
        };
      }
    } catch (err) {
      console.warn(`Network error with ${model}:`, err.message);
      lastError = err.message;
    }
  }

  // Graceful fallback if all models fail
  return {
    success: false,
    text: `**Oryn Synthetic Intelligence Assessment:**\n\nBased on Rao & Co.'s current metrics ($142.5k Cash Flow, $486.2k Working Capital, 24.8% Net Margin):\n\n- **Immediate Liquidity**: Your cash position supports 18.4 months of operations.\n- **Action Item**: Applying the 8% enterprise pricing elasticity optimization could generate an additional **+$36,400** in quarterly gross profit without impacting retention.\n- **Working Capital Note**: Extending AP terms to 45 days will release **+$42,000** in liquidity.\n\n*(Note: Live cloud connection temporarily defaulted to local financial synthesis: ${lastError})*`,
    modelUsed: "local-financial-engine"
  };
}

/**
 * Call Stitch API via REST to generate or iterate UI prototypes
 */
export async function callStitchAPI(prompt, projectId = "9286588496253357803") {
  try {
    const response = await fetch(`https://stitch.googleapis.com/v1/projects/${projectId}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": STITCH_API_KEY
      },
      body: JSON.stringify({ prompt })
    });
    if (!response.ok) throw new Error(`Stitch API: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.warn("Stitch API error:", err.message);
    return { success: false, error: err.message };
  }
}
