import { Paper, Text } from '@mantine/core';

export default function RencanaNotReady() {
  return (
    <Paper px={16} py={50} mb={28} withBorder sx={{ borderColor: '#ddd', textAlign: 'center' }}>
      <Text size="sm">
        Halaman ini baru dapat diisi setelah mendapat persetujuan dari Petugas CM-KAI.
      </Text>
    </Paper>
  );
}
