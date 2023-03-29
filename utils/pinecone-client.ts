import { PineconeClient } from '@pinecone-database/pinecone';

// 检查环境变量是否存在
if (!process.env.PINECONE_ENVIRONMENT || !process.env.PINECONE_API_KEY) {
  throw new Error('Pinecone environment or api key vars missing');
}

// 初始化 Pinecone 客户端
async function initPinecone() {
  try {
    const pinecone = new PineconeClient();

    // 初始化 Pinecone 客户端
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT ?? '', // 这是在 Pinecone 仪表板中设置的
      apiKey: process.env.PINECONE_API_KEY ?? '',
    });

    return pinecone;
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to initialize Pinecone Client');
  }
}

// 导出 Pinecone 客户端
export const pinecone = await initPinecone();
