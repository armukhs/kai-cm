import { Button, Paper, Text } from '@mantine/core';
import { Dispatch } from 'react';

export default function RencanaEmpty({
  title,
  canCreate,
  onClick,
}: {
  title: string;
  canCreate: boolean;
  onClick: Dispatch<any>;
}) {
  return (
    <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
      <Text size="sm">Proyek ini belum/tidak memiliki {title}.</Text>

      {canCreate && (
        <Button mt={20} style={{ fontWeight: 500 }} color="indigo" radius={0} onClick={onClick}>
          Create Rencana
        </Button>
      )}
    </Paper>
  );
}
