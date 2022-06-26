import { ReactNode } from 'react';

type BlockType = 'none' | 'block' | 'flex' | 'inline-block' | 'new';

export default function Block({
  info,
  show,
  mode = 'block',
  children,
}: {
  info?: string;
  show: boolean;
  mode: BlockType;
  children: ReactNode;
}) {
  const desc = <span style={{ display: 'none', height: 0, width: 0 }}>{info}</span>;

  if (!show && mode == 'new') return <>{desc}</>;
  if (show && mode == 'new') {
    return (
      <>
        {desc}
        {children}
      </>
    );
  }

  return (
    <>
      {desc}
      <div style={{ display: show ? mode : 'none' }}>{children}</div>
    </>
  );
}
