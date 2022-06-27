import { Avatar } from '@mantine/core';

export default function BobotNilai({ info, nilai }: { info: string; nilai: number }) {
  return (
    <div
      style={{
        margin: 20,
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div style={{ flexShrink: 0, marginRight: 20 }}>
        <Avatar
          color="indigo"
          size={64}
          radius="xl"
          styles={{ placeholder: { fontSize: 20, fontWeight: 800 } }}
        >
          {nilai.toPrecision(3)}
        </Avatar>
      </div>
      <div style={{ flexGrow: 1 }}>{info}</div>
    </div>
  );
}
