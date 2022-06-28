import { Button } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { PlusIcon } from '@modulz/radix-icons';
import { useEffect, useState } from 'react';

export default function ButtonPrimary({ label, onClick }: { label: string; onClick: () => void }) {
  const { ref, width } = useElementSize();
  const [text, setText] = useState(label);

  useEffect(() => {
    // Use `if (width)` to prevent flicker
    if (width) {
      setText(width > 150 ? label : 'Add');
    }
    return () => {};
  }, [width]);

  return (
    <div ref={ref} style={{ display: 'flex', flexGrow: 1, justifyContent: 'end' }}>
      <Button
        leftIcon={<PlusIcon />}
        style={{ fontWeight: 500 }}
        color="indigo"
        radius={0}
        onClick={onClick}
        sx={{ paddingLeft: 12 }}
      >
        {text}
      </Button>
    </div>
  );
}
