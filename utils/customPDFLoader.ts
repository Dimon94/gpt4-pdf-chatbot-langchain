import { Document } from 'langchain/document';
import { readFile } from 'fs/promises';
import { BaseDocumentLoader } from 'langchain/document_loaders';

/**
 * BufferLoader是一个抽象类，继承自BaseDocumentLoader，用于从文件或Blob中读取数据并解析。
 */
export abstract class BufferLoader extends BaseDocumentLoader {
  constructor(public filePathOrBlob: string | Blob) {
    super();
  }

  /**
   * parse方法是一个抽象方法，用于解析Buffer数据并返回Document对象。
   * @param raw Buffer类型的数据
   * @param metadata Document对象的metadata属性
   * @returns 返回一个Promise<Document[]>类型的对象
   */
  protected abstract parse(
    raw: Buffer,
    metadata: Document['metadata'],
  ): Promise<Document[]>;

  /**
   * load方法用于读取数据并解析。
   * @returns 返回一个Promise<Document[]>类型的对象
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
 * CustomPDFLoader是一个继承自BufferLoader的类，用于解析PDF文件。
 */
export class CustomPDFLoader extends BufferLoader {
  /**
   * parse方法用于解析PDF文件并返回Document对象。
   * @param raw Buffer类型的数据
   * @param metadata Document对象的metadata属性
   * @returns 返回一个Promise<Document[]>类型的对象
   */
  public async parse(
    raw: Buffer,
    metadata: Document['metadata'],
  ): Promise<Document[]> {
    const { pdf } = await PDFLoaderImports();
    const parsed = await pdf(raw);
    return [
      new Document({
        pageContent: parsed.text,
        metadata: {
          ...metadata,
          pdf_numpages: parsed.numpages,
        },
      }),
    ];
  }
}

/**
 * PDFLoaderImports是一个异步函数，用于导入pdf-parse库。
 * @returns 返回一个Promise<{ pdf: any }>类型的对象
 */
async function PDFLoaderImports() {
  try {
    // the main entrypoint has some debug code that we don't want to import
    const { default: pdf } = await import('pdf-parse/lib/pdf-parse.js');
    return { pdf };
  } catch (e) {
    console.error(e);
    throw new Error(
      'Failed to load pdf-parse. Please install it with eg. `npm install pdf-parse`.',
    );
  }
}
