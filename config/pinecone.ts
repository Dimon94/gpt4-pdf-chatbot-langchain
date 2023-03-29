/**
 * 将命名空间更改为您想要存储嵌入式的Pinecone命名空间。
 */

if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error('在.env文件中缺少Pinecone索引名称');
}

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? '';

const PINECONE_NAME_SPACE = 'pdf-test'; //命名空间对于您的向量是可选的

export { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE };
