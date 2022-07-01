import { createContext, ReactNode, useState, useEffect } from 'react';
import useApi from 'lib/useApi';

interface IOrganizationContext {
  units: {
    id: string;
    parentid: string | null;
    kode: string;
    level: number;
    nama: string;
    value: string;
    label: string;
  }[];
  parents: {
    id: string;
    parentid: string | null;
    kode: string;
    level: number;
    nama: string;
  }[];
  jabatans: {
    id: string;
    unitid: string;
    kode: string;
    nama: string;
    value: number;
    label: number;
  }[];
}

const defaultValue: IOrganizationContext = {
  units: [],
  parents: [],
  jabatans: [],
};

const OrganizationContext = createContext<IOrganizationContext>(defaultValue);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { data } = useApi('organisasi');
  const [units, setUnits] = useState([]);
  const [parents, setParents] = useState([]);
  const [jabatans, setJabatans] = useState([]);

  useEffect(() => {
    if (data) {
      setUnits(data.units);
      setParents(data.parents);
      setJabatans(data.jabatans);
    }
    return () => {};
  }, [data]);

  return (
    <OrganizationContext.Provider value={{ units, parents, jabatans }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export default OrganizationContext;
