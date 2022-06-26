import { Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Dispatch } from 'react';

export default function PerubahanEmpty({
  canCreate,
  onClick,
}: {
  canCreate: boolean;
  onClick: Dispatch<any>;
}) {
  const router = useRouter();

  function formPath() {
    const segments = router.asPath.split('/');
    segments.shift();
    const type = segments.pop();
    segments.push('new');
    return '/' + segments.join('/') + '?type=' + type;
  }

  return (
    <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
      <Text size="sm">Tidak ada data perubahan teknlogi dalam proyek ini.</Text>

      {canCreate && (
        <Button
          mt={20}
          style={{ fontWeight: 500 }}
          color="indigo"
          // variant="outline"
          radius={0}
          onClick={() => onClick('new')}
        >
          Create Perubahan
        </Button>
      )}
    </Paper>
  );
}
