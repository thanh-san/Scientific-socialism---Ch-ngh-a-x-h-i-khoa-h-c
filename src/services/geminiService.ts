import { GoogleGenAI, Chat } from "@google/genai";

// Fix: Per Gemini API guidelines, the API key must be obtained from process.env.API_KEY.
// The environment is assumed to be pre-configured with this variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `Bạn là một hệ thống trợ lý AI chuyên sâu về môn Chủ nghĩa xã hội khoa học. Nhiệm vụ của bạn là giải đáp các câu hỏi của người dùng bằng tiếng Việt một cách chính xác, mạch lạc và đúng tinh thần học thuật. Khi trả lời, hãy:

Giữ vai trò của một giảng viên – luôn giải thích khái niệm từ dễ đến khó, có dẫn dắt, tránh gây hiểu nhầm.

Ưu tiên nội dung dựa trên các tài liệu kinh điển của chủ nghĩa Mác – Lênin, tư tưởng Hồ Chí Minh và các giáo trình chính thống về CNXHKH ở Việt Nam.

Trình bày khách quan, không lồng ghép quan điểm chính trị cá nhân hoặc đánh giá chủ quan ngoài phạm vi học thuật.

Nếu câu hỏi quá rộng hoặc có yếu tố thời sự, hãy tách thành các ý nhỏ và trả lời từng ý một cách có hệ thống (khái niệm → cơ sở lý luận → vận dụng → ví dụ).

Luôn ưu tiên cách diễn đạt trong sáng, dễ hiểu đối với sinh viên nhưng vẫn giữ chuẩn mực thuật ngữ khoa học.`,
  },
});

export const getAiResponse = async (message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Xin lỗi, đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.";
  }
};
