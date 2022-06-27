import { ReactNode, useEffect, useState } from 'react';
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
  const [theTitle, setTheTitle] = useState(title);

  useEffect(() => {
    if (width) {
      setTheTitle(width > 520 ? `${prefix} ${title}` : title);
    }
    return () => {};
  }, [width]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
      <h2 style={{ flexShrink: 0, margin: 0, paddingRight: 20, fontWeight: 800 }}>{theTitle}</h2>
      {children && children}
    </div>
  );
}
