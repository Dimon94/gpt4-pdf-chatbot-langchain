/**
 * Layout组件
 * @param {React.ReactNode} children - 子组件
 * @returns {JSX.Element} - 返回JSX元素
 */
interface LayoutProps {
  children?: React.ReactNode;
}

import { useState } from 'react';
import Modal from './Modal';

export default function Layout({ children }: LayoutProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="mx-auto flex flex-col space-y-4">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="h-16 border-b border-b-slate-200 py-4">
          <nav className="ml-4 pl-6">
            <a href="#" className="hover:text-slate-600 cursor-pointer">
              Home
            </a>
            <a href="#" className="hover:text-slate-600 cursor-pointer ml-4" onClick={() => setShowModal(true)}>
              Config
            </a>
          </nav>
        </div>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
