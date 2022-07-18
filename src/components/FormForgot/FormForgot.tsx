import { Button, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import fetchJson from 'lib/fetchJson';
import { useState } from 'react';

export default function FormForgot() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm({
    initialValues: {
      email: '',
      baseUrl: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  async function submitHandler(values: typeof form.values) {
    try {
      console.log(values);
      const rs = await fetchJson('/api/post?subject=forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(form.values),
        body: JSON.stringify({
          email: form.values['email'].toLowerCase(),
          baseUrl: window.location.origin,
        }),
      });
      console.log(rs);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <LoadingOverlay visible={submitting} />
      {!submitted && (
        <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
          <Stack spacing="sm">
            <TextInput
              {...form.getInputProps('email')}
              label="Masukkan email Anda"
              autoFocus={true}
              required
            />

            <Button mt={10} type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      )}
      {submitted && (
        <div style={{ margin: '20px 0' }}>
          <Text>Silakan periksa email Anda untuk membuat password baru.</Text>
        </div>
      )}
    </div>
  );
}
