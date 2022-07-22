import { FormEvent, useContext, useEffect, useState } from 'react';
import { KeyedMutator, mutate } from 'swr';
import { useForm } from '@mantine/form';
import { Button, Group, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import fetchJson, { FetchError } from 'lib/fetchJson';
import { simpleCaptcha } from 'lib/utils';
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
      captcha: '',
    },
    validate: {
      captcha: (value) => (value == captcha ? null : 'Tidak tepat'),
    },
  });

  const theForm = formInput || form;

  const [stack, setStack] = useState<{ value: string; on: boolean }[]>([]);
  const [captcha, setCaptcha] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const { captcha, stack } = simpleCaptcha();
    setStack(stack);
    setCaptcha(captcha);
    return () => {};
  }, []);

  // const submitHandler = async (e: FormEvent) => {
  const submitHandler = async (values: typeof form.values) => {
    // e.preventDefault();
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
      {/* <form onSubmit={handler || submitHandler}> */}
      <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
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

          <div style={{ paddingTop: 10 }}>
            <div style={{ height: 25 }}>
              <Group spacing={2}>
                {stack.map((s, i) => (
                  <div
                    key={`c-${i}`}
                    style={{
                      border: '1px solid #ccc',
                      width: 24,
                      textAlign: 'center',
                      color: s.on ? '' : '#999',
                      fontWeight: s.on ? 800 : 400,
                    }}
                  >
                    {s.value}
                  </div>
                ))}
              </Group>
            </div>
            <Text size="sm" mt={5}>
              Masukkan 5 angka yang tercetak tebal:
            </Text>
          </div>

          <TextInput {...theForm.getInputProps('captcha')} required />

          <Button mt={10} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
}
