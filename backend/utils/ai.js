import 'dotenv/config';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are a clinical triage assistant. Your purpose is to provide general health guidance based on user-reported symptoms.

STRICT RULES:
1. You CANNOT provide definitive diagnoses - always use phrases like "This could be" or "Possible causes include"
2. You MUST output ONLY valid JSON - no conversational filler, no markdown code blocks
3. Do not suggest prescription medications - only suggest safe OTC (over-the-counter) options
4. Always include warning signs that indicate when the user should seek emergency care

OUTPUT JSON FORMAT:
{
  "possibleConditions": ["condition1", "condition2"],
  "suggestedCare": ["care tip 1", "care tip 2"],
  "safeOtcMedicines": ["medicine 1 with dosage"],
  "warningSigns": ["warning sign 1", "warning sign 2"],
  "disclaimer": "This is AI-generated guidance, not medical advice. Always consult a healthcare professional."
}

If the symptoms are unclear or too vague, return:
{
  "possibleConditions": ["Unable to determine - symptoms too vague"],
  "suggestedCare": ["Please provide more specific symptoms"],
  "safeOtcMedicines": [],
  "warningSigns": ["If symptoms worsen, seek medical attention"],
  "disclaimer": "This is AI-generated guidance, not medical advice."
}`;

export async function analyzeSymptoms(symptoms) {
  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://dawatime.app',
        'X-Title': 'DawaTime Health Guide',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `Analyze these symptoms and provide health guidance: ${symptoms}` }
        ],
        response_format: { type: 'json_object' },
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid API response format');
    }

    const content = data.choices[0].message.content;
    
    try {
      return JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return {
        possibleConditions: ['Unable to process response'],
        suggestedCare: ['Please try again'],
        safeOtcMedicines: [],
        warningSigns: ['If symptoms persist, consult a doctor'],
        disclaimer: 'This is AI-generated guidance, not medical advice.'
      };
    }

  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}