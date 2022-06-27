import { Button, Paper, Text } from '@mantine/core';
import Link from 'next/link';
import { Dispatch } from 'react';

export default function ProjectsEmpty({
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
        <Link href="/new" passHref>
          <Button
            component="a"
            mt={20}
            style={{ fontWeight: 500 }}
            color="indigo"
            radius={0}
            onClick={() => {}}
          >
            Create Perubahan
          </Button>
        </Link>
      )}
    </Paper>
  );
}
