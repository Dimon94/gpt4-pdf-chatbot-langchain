import { Document } from 'langchain/document';
import { readFile } from 'fs/promises';
import { BaseDocumentLoader } from 'langchain/document_loaders';

/**
 * BufferLoader 是一个抽象类，继承自 BaseDocumentLoader。它用于从文件路径或 Blob 中加载文档。
 */
export abstract class BufferLoader extends BaseDocumentLoader {
  /**
   * BufferLoader 的构造函数。
   * @param filePathOrBlob 表示文件路径或 Blob 对象的字符串。
   */
  constructor(public filePathOrBlob: string | Blob) {
    super();
  }

  /**
   * 必须由子类实现的抽象方法。它用于将原始缓冲区数据和元数据解析为文档数组。
   * @param raw 原始缓冲区数据。
   * @param metadata 文档相关的元数据。
   * @returns 文档数组。
   */
  protected abstract parse(
    raw: Buffer,
    metadata: Document['metadata'],
  ): Promise<Document[]>;

  /**
   * 从文件路径或 Blob 中加载文档的方法。
   * @returns 文档数组。
   */
  public async load(): Promise<Document[]> {
    let buffer: Buffer;
    let metadata: Record<string, string>;

    if (typeof this.filePathOrBlob === 'string') {
      buffer = await readFile(this.filePathOrBlob);
      metadata = { source: this.filePathOrBlob };
    } else {
      buffer = await this.filePathOrBlob
        .arrayBuffer()
        .then((ab) => Buffer.from(ab));
      metadata = { source: 'blob', blobType: this.filePathOrBlob.type };
    }

    return this.parse(buffer, metadata);
  }
}

/**
 * CustomDOCLoader 是 BufferLoader 的子类。它用于加载 DOCX 文档。
 */
export class CustomDOCLoader extends BufferLoader {
  /**
   * 将原始缓冲区数据和元数据解析为文档数组的方法。
   * @param raw 原始缓冲区数据。
   * @param metadata 文档相关的元数据。
   * @returns 文档数组。
   */
  public async parse(
    raw: Buffer,
    metadata: Document['metadata'],
  ): Promise<Document[]> {
    /**
     * 异步加载docxtract库
     */
    const { doc } = await DOCLoaderImports();
    /**
     * 解析文档
     */
    const parsed = await doc(raw);
    /**
     * 返回文档数组
     */
    return [
      new Document({
        pageContent: parsed.text,
        metadata: {
          ...metadata,
          doc_numpages: parsed.numPages
        },
      })
    ]
  }
}

/**
 * DOCLoaderImports是一个异步函数，用于加载DOC文档并返回提取的文本。
 * @returns 返回一个Promise对象，该对象解析为一个包含提取文本的字符串。
 */
async function DOCLoaderImports() {
    try {
      /**
       * 动态导入docxtract库
       */
      const { default: doc } = await import('docxtract');
      return { doc };
    } catch (e) {
      console.error(e);
      throw new Error(
        'Failed to load docxtract. Please install it with eg. `npm install docxtract`.',
      );
    }
}



