const { Configuration, OpenAIApi } = require("openai");

class GPTService {
    constructor(apiKey) {
        // OpenAI API 설정
        this.configuration = new Configuration({
            apiKey: apiKey
        });
        this.openai = new OpenAIApi(this.configuration);
    }

    // 텍스트 요약
    async summarizeText(text) {
        try {
            const response = await this.openai.createCompletion({
                model: "text-davinci-003", // 이 부분은 사용 가능한 최신 모델로 업데이트될 수 있습니다.
                prompt: `Summarize the following text:\n\n${text}`,
                max_tokens: 150
            });
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error("Failed to summarize text:", error);
            throw error;
        }
    }

    // 사용자 프롬프트에 대한 응답 생성
    async generateResponse(prompt) {
        try {
            const response = await this.openai.createCompletion({
                model: "text-davinci-003", // 이 부분은 사용 가능한 최신 모델로 업데이트될 수 있습니다.
                prompt: prompt,
                max_tokens: 150
            });
            return response.data.choices[0].text.trim();
        } catch (error) {
            console.error("Failed to generate response:", error);
            throw error;
        }
    }
}

module.exports = GPTService;
