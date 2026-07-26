import React from 'react';

export const metadata = {
  title: 'Admin - Aurelia',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 p-8 dark:bg-stone-900">
      <div className="mx-auto max-w-6xl">{children}</div>
    </div>
  );
}
