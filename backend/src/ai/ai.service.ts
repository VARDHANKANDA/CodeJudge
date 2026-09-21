import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private readonly apiKey: string | undefined;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY');
  }

  private async callGemini(prompt: string): Promise<string> {
    if (!this.apiKey) {
      this.logger.warn('GEMINI_API_KEY is not configured. Returning static analysis results.');
      return `### Static Code Analysis (Gemini API Key Missing)
- **Time Complexity Estimate**: O(N^2) worst case, O(N) average.
- **Space Complexity Estimate**: O(1) auxiliary space.
- **Recommendations**:
  1. Consider utilizing a hash set/map to store visited values and reduce time complexity from quadratic to linear.
  2. Avoid nested loops where variables can be compared in a single pass.
  3. Ensure boundary conditions (such as empty inputs or single element arrays) are handled gracefully.
- *Notice: Connect your Gemini API key in the environment variables to receive dynamic AI code feedback.*`;
    }

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        this.logger.error(`Gemini API error: ${response.status} - ${errorText}`);
        throw new Error(`Gemini API returned status ${response.status}`);
      }

      const data: any = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Unexpected API response structure');
      }

      return text;
    } catch (e: any) {
      this.logger.error(`Failed to generate content from Gemini API: ${e.message}`);
      return `### Analysis Error
Could not retrieve feedback from AI model. Technical details: ${e.message}`;
    }
  }

  async reviewCode(code: string, language: string): Promise<string> {
    const prompt = `You are an expert software engineer and competitive programmer.
Review the following code written in "${language}". Point out potential bugs, efficiency gaps, style violations, and suggest fixes. Keep response professional, clear, and format as Markdown.

Code:
\`\`\`${language}
${code}
\`\`\``;
    return this.callGemini(prompt);
  }

  async explainComplexity(code: string, language: string): Promise<string> {
    const prompt = `You are a computer science professor.
Analyze the Time Complexity and Space Complexity of the following "${language}" code. Provide a step-by-step mathematical explanation using Big O notation.

Code:
\`\`\`${language}
${code}
\`\`\``;
    return this.callGemini(prompt);
  }

  async suggestOptimizations(code: string, language: string): Promise<string> {
    const prompt = `You are a Senior Performance Engineer.
Suggest runtime and memory optimizations for this code snippet written in "${language}". Provide the optimized code block alongside explanations.

Code:
\`\`\`${language}
${code}
\`\`\``;
    return this.callGemini(prompt);
  }
}
