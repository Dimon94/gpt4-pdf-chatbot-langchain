import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OpenAIEmbeddings } from 'langchain/embeddings';
import { PineconeStore } from 'langchain/vectorstores';
import { pinecone } from '@/utils/pinecone-client';
import { CustomPDFLoader } from '@/utils/customPDFLoader';
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from '@/config/pinecone';
import { DirectoryLoader } from 'langchain/document_loaders';
import { CustomDOCLoader } from '../utils/customDOCLoader';

/* Name of directory to retrieve your files from */
const filePath = 'docs';
/**
 * 从指定目录加载PDF文件，将其转换为文本，并将其嵌入Pinecone存储库中。
 * @function
 * @async
 * @returns {Promise<void>}
 * @throws {Error} 如果数据摄取失败，则抛出错误。
 * @example
 * await run();
 */
export const run = async () => {
  try {
    /* 从指定目录加载原始文档 */
    const directoryLoader = new DirectoryLoader(filePath, {
      '.pdf': (path) => new CustomPDFLoader(path),
      '.docx': (path) => new CustomDOCLoader(path),
    });


    const rawDocs = await directoryLoader.load();

    /* 将文本拆分成块 */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');
    /* 创建并存储嵌入向量 */
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME);

    // 将PDF文档嵌入向量
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

/**
 * 从指定目录加载PDF文件，将其转换为文本，并将其嵌入Pinecone存储库中。
 * @function
 * @async
 * @returns {Promise<void>}
 * @throws {Error} 如果数据摄取失败，则抛出错误。
 * @example
 * await run();
 */
(async () => {
  await run();
  console.log('ingestion complete');
})();
