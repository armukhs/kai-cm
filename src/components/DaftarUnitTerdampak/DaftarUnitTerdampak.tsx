import UnitOrJabatan from 'components/UnitOrJabatan/UnitOrJabatan';

export interface ITerdampak {
  kode: string;
  nama: string;
}

export default function DaftarUnitTerdampak({ daftar }: { daftar: ITerdampak[] }) {
  if (!daftar || daftar.length == 0) return <>--</>;
  return <div>{daftar && daftar.map((d) => <UnitOrJabatan key={d.kode} uoj={d} />)}</div>;
}
