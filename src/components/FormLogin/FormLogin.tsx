import { FormEvent, useContext, useState } from 'react';
import { KeyedMutator } from 'swr';
import { useForm } from '@mantine/form';
import { Button, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import fetchJson, { FetchError } from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Show from 'components/Show';

export default function FormLogin({
  mutate,
  formInput,
  handler,
}: {
  mutate: KeyedMutator<SessionUser>;
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
    setSubmitting(true);
    try {
      const rs = await fetchJson('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.values),
      });
      setSessionUser(rs as SessionUser);
      mutate(rs as SessionUser);
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
