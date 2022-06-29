import { useElementSize, useResizeObserver } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useStyles } from './DaftarUnitTerdampak.styles';

export default function DaftarUnitTerdampak({ ids, units }: { ids: string[]; units: any[] }) {
  const { classes, cx } = useStyles();
  // const { ref, width } = useElementSize();
  const [ref, rect] = useResizeObserver();

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
          <div className={cx(classes.kode, { [classes.hidden]: rect.width < 380 })}>{d.kode}</div>
          <div className={cx(classes.unit, { [classes.nopad]: rect.width < 380 })}>{d.nama}</div>
        </div>
      ))}
    </div>
  );
}
