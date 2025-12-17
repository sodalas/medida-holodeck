import type { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div>
      <header>Medida Holodeck</header>
      <main>{children}</main>
    </div>
  );
}
