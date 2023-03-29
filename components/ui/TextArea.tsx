import * as React from 'react';
import { cn } from '@/utils/cn';

/**
 * @component Textarea
 * @description 多行文本输入框
 * @param {TextareaProps} props - 继承自TextareaHTMLAttributes的props
 * @returns {React.ReactElement} - 返回多行文本输入框组件
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    /**
     * @function cn
     * @description 生成组件的className
     * @param {string} className - 组件的className
     * @returns {string} - 返回生成的className
     */
    return (
      <textarea
        className={cn(
          'flex h-20 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
