import { Stack } from '@mantine/core';
import ProjectCard from 'components/ProjectCard/ProjectCard';

export default function Projects({ projects }: { projects: any[] }) {
  if (projects.length == 0) return <p>KOSONG</p>;

  return (
    <div style={{ marginBottom: 40 }}>
      <Stack spacing="sm">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Stack>
    </div>
  );
}
