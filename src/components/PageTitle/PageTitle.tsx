import { ReactNode } from 'react';
import { useViewportSize } from '@mantine/hooks';

export default function PageTitle({
  prefix,
  title,
  children,
}: {
  prefix: string;
  title: string;
  children?: ReactNode;
}) {
  const { width } = useViewportSize();
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
      <h2 style={{ flexShrink: 0, margin: 0, paddingRight: 20, fontWeight: 800 }}>
        {width > 520 ? `${prefix} ${title}` : title}
      </h2>
      {children && children}
    </div>
  );
}
