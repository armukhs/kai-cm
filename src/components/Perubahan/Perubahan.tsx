import { Button, Text } from '@mantine/core';
import Block from 'components/Block';
import FormPerubahan from 'components/FormPerubahan/FormPerubahan';
import FormKomentar from 'components/Komentar/FormKomentar';
import Komentar from 'components/Komentar/Komentar';
import Layout from 'components/Layout/Layout';
import Pojo from 'components/Pojo';
import { SessionUser } from 'lib/session';
import useApi from 'lib/useApi';
import useAuthApi from 'lib/useAuthApi';
import { useEffect, useState } from 'react';
import ItemPerubahan from './ItemPerubahan';
import PerubahanEmpty from './PerubahanEmpty';

export default function Perubahan({
  user,
  project,
  perubahans,
  type,
  title,
}: {
  user: SessionUser;
  project: any;
  perubahans: any[];
  type: string;
  title: string;
}) {
  const { data: syncData, mutate } = useAuthApi('perubahan', type, project.id);
  const { data: org } = useApi('organisasi');

  const canEdit = user.id == project.managerId || user.id == project.staffId;
  const allowEdit = !project.tglKonfirmasi;
  const isMentor = user.id == project.mentorId;
  const canCreate = canEdit && allowEdit;

  function newPerubahan() {
    return {
      id: null,
      picId: '',
      projectId: project.id,
      type: type,
      kondisi: '',
      perubahan: '',
      unitTerdampak: [],
    };
  }

  function getJabatan(id: string) {
    if (org) {
      const filtered: any[] = org.jabatans.filter((j: any) => j.id == id);
      if (filtered.length > 0) {
        return filtered[0];
      }
    }
    return null;
  }

  const [data, setData] = useState(perubahans);
  const [form, setForm] = useState<string | boolean>(false);
  const [perubahan, setPerubahan] = useState<any>(newPerubahan());
  const [PIC, setPIC] = useState<any>(null);

  useEffect(() => {
    if (syncData) setData(syncData.perubahans);
    return () => {};
  }, [syncData]);

  return (
    <Layout title={`Perubahan ${title} - ${project.judul}`} user={user} project={project}>
      <h2 style={{ marginTop: 0, fontWeight: 500 }}>Perubahan {title}</h2>
      {/* <Pojo object={perubahan} /> */}

      <Block info="__FORM_VIEW__" show={form == 'new'} mode="new">
        <FormPerubahan
          data={newPerubahan()}
          units={org?.units}
          topUnits={org?.parents}
          pic={PIC}
          mutate={mutate}
          dataJabatan={org?.jabatans}
          onCancel={() => {
            setForm(false);
            setPerubahan(null);
            setPIC(null);
          }}
        />
      </Block>

      <Block info="__FORM_VIEW__" show={form == 'edit'} mode="new">
        <FormPerubahan
          data={perubahan}
          units={org?.units}
          topUnits={org?.parents}
          pic={PIC}
          mutate={mutate}
          dataJabatan={org?.jabatans}
          onCancel={() => {
            setForm(false);
            setPerubahan(null);
            setPIC(null);
          }}
        />
      </Block>

      <Block info="__" show={!form && data.length == 0} mode="block">
        <PerubahanEmpty canCreate onClick={setForm} />
      </Block>

      <Block info="__" show={!form && data.length > 0} mode="block">
        {data.map((perubahan: any, index: number) => (
          <ItemPerubahan
            key={perubahan.id}
            data={perubahan}
            units={org?.units}
            mutate={mutate}
            index={index}
            canEdit={canEdit && allowEdit}
            pic={getJabatan}
            onClick={() => {
              window.scrollTo(0, 0);
              setPerubahan(perubahan);
              setForm('edit');
              // Activate PIC
              setPIC(getJabatan(perubahan.picId));
            }}
          />
        ))}
        {canCreate && (
          <Button
            style={{ fontWeight: 500 }}
            color="indigo"
            // variant="outline"
            radius={0}
            onClick={() => {
              setPerubahan(newPerubahan());
              setForm('new');
              window.scrollTo(0, 0);
            }}
          >
            Add Perubahan
          </Button>
        )}
      </Block>

      <Block info="KOMENTAR" show={!form} mode="block">
        <Komentar projectId={project.id} type={type} />
        {allowEdit && <FormKomentar type={type} projectId={project.id} userId={user.id} />}
      </Block>
    </Layout>
  );
}
