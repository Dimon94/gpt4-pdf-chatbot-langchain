import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 生成一个合并后的 CSS 类名字符串。
 * @param inputs - CSS 类名字符串或对象。
 * @returns 合并后的 CSS 类名字符串。
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
