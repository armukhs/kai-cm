import { Button, Paper, Text } from '@mantine/core';
import Block from 'components/Block';
import FormPerubahan from 'components/FormPerubahan/FormPerubahan';
import PageTitle from 'components/PageTitle/PageTitle';
import { useState } from 'react';

export default function PerubahanEmpty({
  title,
  data,
  canCreate,
}: {
  title: string;
  data: any;
  canCreate: boolean;
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <PageTitle title={title} />

      <Block show={showForm}>
        <FormPerubahan
          title={`New Rencana`}
          data={data}
          pic={null}
          onCancel={() => setShowForm(!showForm)}
        />
      </Block>

      <Block show={!showForm}>
        <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
          <Text size="sm">Proyek ini belum/tidak memiliki {title}.</Text>

          {canCreate && (
            <Button
              mt={20}
              style={{ fontWeight: 500 }}
              color="indigo"
              radius={0}
              onClick={() => setShowForm(!showForm)}
            >
              Create Perubahan
            </Button>
          )}
        </Paper>
      </Block>
    </>
  );
}
