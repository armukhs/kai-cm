import { Button, LoadingOverlay, Modal, Text, useMantineTheme } from '@mantine/core';
import ButtonXS from 'components/ButtonXS';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useState } from 'react';
import { KeyedMutator } from 'swr';

export default function DeactivateUser({
  user,
  setUser,
  mutate,
}: {
  user: any;
  setUser: (param: any) => void;
  mutate: KeyedMutator<any>;
}) {
  const [submitting, setSubmitting] = useState(false);

  async function handleDelete() {
    setSubmitting(true);
    try {
      await fetchJson('/api/auth/post?subject=deactivate-user', createPostData({ id: user?.id }));
      mutate();
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setSubmitting(false);
  }

  const theme = useMantineTheme();

  return (
    <Modal
      opened={user}
      withCloseButton={false}
      overlayColor={theme.colors.dark[2]}
      onClose={() => setUser(null)}
      styles={{
        header: {
          backgroundColor: 'yellow',
          marginTop: -5,
          fontSize: 12,
        },
      }}
    >
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={submitting} />
        <Text size="sm" mt={-5} weight={400}>
          Deactivate User:
        </Text>
        <Text size="sm" mt={10} mb={20} weight={600}>
          {user?.nama}
        </Text>
        <div>
          <ButtonXS label="Deactivate" type="dark" onClick={() => handleDelete()} />
          <ButtonXS
            label="Cancel"
            sx={{ marginLeft: 10 }}
            type="red-outline"
            onClick={() => setUser(null)}
          />
        </div>
      </div>
    </Modal>
  );
}
