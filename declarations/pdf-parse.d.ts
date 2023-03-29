/**
 * pdf-parse.js模块的声明文件
 * @packageDocumentation
 */

declare module 'pdf-parse/lib/pdf-parse.js' {
  import pdf from 'pdf-parse';

  /**
   * pdf-parse.js模块的默认导出
   * @param data - PDF文件的二进制数据
   * @param options - 解析PDF文件的选项
   * @returns 解析后的PDF文件内容
   */
  export default function pdfParse(data: Buffer | Uint8Array, options?: pdf.Options): Promise<pdf.Result>;
}
