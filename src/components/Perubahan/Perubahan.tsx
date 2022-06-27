import { Button, Tabs } from '@mantine/core';
import Block from 'components/Block';
import ButtonPrimary from 'components/PageTitle/ButtonPrimary';
import FormPerubahan from 'components/FormPerubahan/FormPerubahan';
import FormKomentar from 'components/Komentar/FormKomentar';
import Komentar from 'components/Komentar/Komentar';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
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
  const [perubahan, setPerubahan] = useState<any>(null);
  const [PIC, setPIC] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (syncData) setData(syncData.perubahans);
    return () => {};
  }, [syncData]);

  return (
    <Layout title={`Perubahan ${title} - ${project.judul}`} user={user} project={project}>
      <PageTitle prefix="Perubahan" title={title}>
        {canCreate && perubahans.length > 0 && !perubahan && (
          <ButtonPrimary label="Add Perubahan" onClick={() => setPerubahan(newPerubahan())} />
        )}
      </PageTitle>

      <Block info="__FORM_VIEW__" show={perubahan != null} mode="new">
        <FormPerubahan
          data={perubahan}
          units={org?.units}
          topUnits={org?.parents}
          pic={PIC}
          mutate={setData}
          onSuccess={() => {}}
          dataJabatan={org?.jabatans}
          onCancel={() => {
            setPerubahan(null);
            setPIC(null);
          }}
        />
      </Block>

      <Block info="__" show={!perubahan && data.length == 0} mode="block">
        <PerubahanEmpty canCreate onClick={() => setPerubahan(newPerubahan())} />
      </Block>

      <Block info="__" show={!perubahan && data.length > 0} mode="block">
        {/* Prevents Tabs being rendered (which cause error if data is empty), since Block parent is server-rendered */}
        {data.length > 0 && (
          <Tabs
            active={activeTab}
            onTabChange={setActiveTab}
            variant="default"
            styles={{
              root: { marginTop: -12 },
              body: { paddingTop: 20 },
              tabLabel: { fontWeight: 500 },
            }}
          >
            {data.map((perubahan: any, index: number) => (
              <Tabs.Tab key={perubahan.id} label={`P${index + 1}`}>
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
                    setPIC(getJabatan(perubahan.picId));
                  }}
                />
              </Tabs.Tab>
            ))}
          </Tabs>
        )}
        <span style={{ display: 'none' }}>AFTER TABS</span>
      </Block>

      <Block info="KOMENTAR" show={!perubahan} mode="block">
        <Komentar projectId={project.id} type={type} />
        {allowEdit && <FormKomentar type={type} projectId={project.id} userId={user.id} />}
      </Block>
    </Layout>
  );
}
