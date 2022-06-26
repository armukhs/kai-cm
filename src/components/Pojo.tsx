export default function Pojo({ object }: { object: any }) {
  return (
    <pre
      style={{
        display: 'block',
        color: 'red',
        backgroundColor: '#ffd',
        fontSize: 12,
        maxHeight: 400,
        overflowX: 'auto',
        overflowY: 'auto',
      }}
    >
      {JSON.stringify(object, null, 2)}
    </pre>
  );
}
