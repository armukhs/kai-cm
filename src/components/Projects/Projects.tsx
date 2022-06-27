import { Box, Paper, Stack, Text } from '@mantine/core';
import { LayersIcon } from '@modulz/radix-icons';
import Link from 'next/link';

export default function Projects({ projects }: { projects: any[] }) {
  if (projects.length == 0) return <p>KOSONG</p>;

  return (
    <div style={{ marginBottom: 40 }}>
      <Stack spacing="sm">
        {projects.map((p) => (
          <Link key={p.id} href={`/project/${p.id}`}>
            <a style={{ display: 'block', textDecoration: 'none', borderWidth: 0 }}>
              <Paper
                key={p.id}
                withBorder
                sx={(theme) => ({
                  overflow: 'hidden',
                  paddingLeft: 16,
                  paddingRight: 16,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderColor: theme.colors.gray[3],
                  ':hover': {
                    borderColor: theme.colors.indigo[5],
                  },
                })}
              >
                <Box
                  sx={(theme) => ({ float: 'left', paddingTop: 6, color: theme.colors.indigo[5] })}
                >
                  <LayersIcon width={26} height={26} />
                </Box>
                <div style={{ marginLeft: 40 }}>
                  <Text size="xs" color="gray">
                    {p.Unit.nama}
                  </Text>
                  <Text
                    size="md"
                    weight={400}
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {p.judul}
                  </Text>
                </div>
              </Paper>
            </a>
          </Link>
        ))}
      </Stack>
    </div>
  );
}
