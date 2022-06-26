import { ReactNode } from 'react';

type ShowType = 'none' | 'block' | 'flex' | 'inline-block' | 'new';

export default function Show({
  when,
  display,
  children,
}: {
  when: boolean;
  display: ShowType;
  children: ReactNode;
}) {
  if (!when && display == 'new') return <></>;
  if (when && display == 'new') return <>{children}</>;
  return <div style={{ display: when ? display : 'none' }}>{children}</div>;
}
