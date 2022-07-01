import { SegmentedControl } from '@mantine/core';

interface IRencana {
  id: string | null;
  projectId: string | null;
  picId: string | null;
  type: string | null;
  rencana: string | null;
  audien: string | null;
  waktu: string | null;
  tempat: string | null;
  tolokUkur: string | null;
  monitoring: string | null;
  tglKonfirmasi: string | null;
  created?: string | null;
  updated?: string | null;
}

export default function RencanaItem({ rencana }: { rencana: IRencana }) {
  const x = {} as IRencana;
  return (
    <div style={{ marginBottom: 30, position: 'relative' }}>
      <SegmentedControl
        data={[
          { label: 'React', value: 'react' },
          { label: 'Angular', value: 'ng' },
          { label: 'Vue', value: 'vue' },
          { label: 'Svelte', value: 'svelte' },
        ]}
      />
    </div>
  );
}
