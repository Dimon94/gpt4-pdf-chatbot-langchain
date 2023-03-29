import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/utils/cn';

/**
 * Accordion组件
 * @component
 */
const Accordion = AccordionPrimitive.Root;

/**
 * AccordionItem组件
 * @component
 * @param {Object} props - 组件属性
 * @param {string} props.className - 组件类名
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'border-b border-b-slate-200 dark:border-b-slate-700',
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

/**
 * AccordionTrigger组件
 * @component
 * @param {Object} props - 组件属性
 * @param {string} props.className - 组件类名
 * @param {React.ReactNode} props.children - 子元素
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

/**
 * AccordionContent组件
 * @component
 * @param {Object} props - 组件属性
 * @param {string} props.className - 组件类名
 * @param {React.ReactNode} props.children - 子元素
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden text-sm transition-all',
      className,
    )}
    {...props}
  >
    <div className="pt-0 pb-4">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
