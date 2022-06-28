import { FormEvent, useContext, useState } from 'react';
import { KeyedMutator, mutate } from 'swr';
import { useForm } from '@mantine/form';
import { Button, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import fetchJson, { FetchError } from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Show from 'components/Show';

export default function FormLogin({
  mutateUser,
  formInput,
  handler,
}: {
  mutateUser: KeyedMutator<SessionUser>;
  formInput?: typeof form;
  handler?: (e: FormEvent) => void;
}) {
  const { sessionUser, setSessionUser } = useContext(SessionContext);
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const theForm = formInput || form;

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    console.log(new Date(), Date.now(), 'Sending login...');

    setSubmitting(true);
    try {
      const rs: SessionUser = await fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.values),
      });

      console.log(new Date(), Date.now(), 'Login response received');

      setSessionUser(rs as SessionUser);
      // Experiment fetching right during login
      console.log(new Date(), Date.now(), `mutate('/api/auth/get?subject=projects')`);
      mutate('/api/auth/get?subject=projects', fetchJson('/api/auth/get?subject=projects'));

      if (rs.roles.includes('admin')) {
        console.log(new Date(), Date.now(), `mutate('/api/auth/get?subject=admin-projects');`);
        mutate(
          '/api/auth/get?subject=admin-projects',
          fetchJson('/api/auth/get?subject=admin-projects')
        );
      }

      console.log(new Date(), Date.now(), 'Mutating user');
      mutateUser(rs as SessionUser);
      console.log(new Date(), Date.now(), 'After mutating user (should redirect)');
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.log('O Boy, an unexpected error happened:', error);
      }
    }
    setSubmitting(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={submitting} />
      <form onSubmit={handler || submitHandler}>
        <Stack spacing="sm">
          <TextInput
            {...theForm.getInputProps('username')}
            placeholder="NIPP atau email"
            label="Username"
            autoFocus={true}
            required
          />

          <TextInput
            {...theForm.getInputProps('password')}
            placeholder="Password"
            label="Password"
            type="password"
            required
          />

          <Show when={errorMsg != null} display="block">
            <Text size="sm" color="red">
              {errorMsg}
            </Text>
          </Show>

          <Button mt={10} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}
