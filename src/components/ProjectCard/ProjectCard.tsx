import Link from 'next/link';
import useSWR from 'swr';
import { Box, Paper, Text } from '@mantine/core';
import { LayersIcon } from '@modulz/radix-icons';
import cfg from 'lib/config';

export default function ProjectCard({ project }: { project: any }) {
  // Prefetch project basic data
  useSWR(`/api/auth/get?subject=project&option=${project.id}`);

  return (
    <div>
      <Link href={`${cfg.PROJECTPATH}/${project.id}`}>
        <a style={{ display: 'block', textDecoration: 'none', borderWidth: 0 }}>
          <Paper
            key={project.id}
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
            <Box sx={(theme) => ({ float: 'left', paddingTop: 6, color: theme.colors.indigo[5] })}>
              <LayersIcon width={26} height={26} />
            </Box>
            <div style={{ marginLeft: 40 }}>
              <Text size="xs" color="gray">
                {project.Unit.nama}
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
                {project.judul}
              </Text>
            </div>
          </Paper>
        </a>
      </Link>
    </div>
  );
}
