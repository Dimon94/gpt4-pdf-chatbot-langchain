/**
 * @description Docxtract 类，用于从文件中提取文本
 */
declare module 'docxtract' {
    import { Document } from 'docx';
  
    export default function docxtract(data: Buffer | Uint8Array): Promise<Document>;
  }
