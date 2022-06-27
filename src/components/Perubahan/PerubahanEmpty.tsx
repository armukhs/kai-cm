import { Button, Paper, Text } from '@mantine/core';
import { Dispatch } from 'react';

export default function PerubahanEmpty({
  canCreate,
  onClick,
}: {
  canCreate: boolean;
  onClick: Dispatch<any>;
}) {
  return (
    <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
      <Text size="sm">Tidak ada data perubahan teknlogi dalam proyek ini.</Text>

      {canCreate && (
        <Button
          mt={20}
          style={{ fontWeight: 500 }}
          color="indigo"
          radius={0}
          onClick={() => onClick('new')}
        >
          Create Perubahan
        </Button>
      )}
    </Paper>
  );
}
