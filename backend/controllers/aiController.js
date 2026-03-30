import { analyzeSymptoms } from '../utils/ai.js';

export const healthGuide = async (req, res) => {
  try {
    const { symptoms, language } = req.body;

    if (!symptoms || typeof symptoms !== 'string') {
      return res.status(400).json({ 
        error: 'Symptoms are required',
        message: 'Please describe your symptoms'
      });
    }

    const trimmedSymptoms = symptoms.trim();
    
    if (trimmedSymptoms.length < 5) {
      return res.status(400).json({ 
        error: 'Symptoms too short',
        message: 'Please provide more details (at least 5 characters)'
      });
    }

    if (trimmedSymptoms.length > 500) {
      return res.status(400).json({ 
        error: 'Symptoms too long',
        message: 'Please keep your description under 500 characters'
      });
    }

    const result = await analyzeSymptoms(trimmedSymptoms, language || 'en');
    
    res.json(result);

  } catch (error) {
    console.error('Health Guide Error:', error);
    
    if (error.message.includes('timeout') || error.message.includes('ECONNREFUSED')) {
      return res.status(503).json({ 
        error: 'Service temporarily unavailable',
        message: 'Please try again in a few moments'
      });
    }

    res.status(500).json({ 
      error: 'Analysis failed',
      message: 'Unable to analyze symptoms. Please try again.'
    });
  }
};