import { useElementSize, useResizeObserver } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useStyles } from './DaftarUnitTerdampak.styles';

export default function DaftarUnitTerdampak({ ids, units }: { ids: string[]; units: any[] }) {
  const { classes, cx } = useStyles();
  const { ref, width } = useElementSize();
  // const [ref, rect] = useResizeObserver();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const [daftar, setDaftar] = useState<{ kode: string; nama: string }[]>([]);

  useEffect(() => {
    if (units) {
      setDaftar(units.filter((u) => ids.includes(u.id)));
    }
    return () => {};
  }, [ids]);

  return (
    <div>
      {daftar.map((d) => (
        <div ref={ref} key={d.kode} className={classes.wrapper}>
          <div className={cx(classes.kode)}>{d.kode}</div>
          <div className={cx(classes.unit)}>{d.nama}</div>
        </div>
      ))}
    </div>
  );
}
