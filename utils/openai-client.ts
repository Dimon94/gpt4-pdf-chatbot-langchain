import { OpenAI } from 'langchain/llms';

// 检查是否存在 OpenAI API 密钥
if (!process.env.OPENAI_API_KEY) {
  throw new Error('缺少 OpenAI 凭据');
}

// 创建 OpenAI 实例
export const openai = new OpenAI({
  temperature: 0,
});
