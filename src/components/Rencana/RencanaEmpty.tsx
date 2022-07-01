import { Button, Paper, Text } from '@mantine/core';
import Block from 'components/Block';
import PageTitle from 'components/PageTitle/PageTitle';
import { Dispatch, useState } from 'react';

export default function RencanaEmpty({
  title,
  ready,
  canCreate,
}: {
  title: string;
  ready: boolean;
  canCreate: boolean;
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <PageTitle title={title} />

      <Block show={showForm}>
        <div>FORM</div>
      </Block>

      <Block show={!showForm}>
        <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
          {!ready && (
            <Text size="sm">
              Halaman ini baru dapat diisi setelah mendapat persetujuan dari Petugas CM-KAI.
            </Text>
          )}
          {ready && <Text size="sm">Proyek ini belum/tidak memiliki Rencana {title}.</Text>}

          {canCreate && (
            <Button
              mt={20}
              style={{ fontWeight: 500 }}
              color="indigo"
              radius={0}
              onClick={() => setShowForm(!showForm)}
            >
              Create Rencana
            </Button>
          )}
        </Paper>
      </Block>
    </>
  );
}
