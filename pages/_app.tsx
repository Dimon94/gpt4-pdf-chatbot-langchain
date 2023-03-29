import '@/styles/base.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

/**
 * MyApp组件是整个应用的根组件，它渲染了所有的页面组件。
 * @param {AppProps} props - 包含了组件和页面属性的对象。
 * @param {ReactNode} props.Component - 要渲染的页面组件。
 * @param {Object} props.pageProps - 包含了页面属性的对象。
 * @returns {ReactNode} - 返回渲染后的React节点。
 */
function MyApp({ Component, pageProps }: AppProps) {
  /**
   * 使用Inter字体库中的Inter字体作为整个应用的默认字体。
   */
  const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
  });

  return (
    <>
      {/* 使用Inter字体库中的Inter字体作为整个应用的默认字体。 */}
      <main className={inter.variable}>
        {/* 渲染页面组件 */}
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
