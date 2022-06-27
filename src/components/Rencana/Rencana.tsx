import { Button, Tabs, Text } from '@mantine/core';
import Block from 'components/Block';
import FormRencana from 'components/FormRencana/FormRencana';
import Locomotive from 'components/Icons/Locomotive';
import Layout from 'components/Layout/Layout';
import Pojo from 'components/Pojo';
import { SessionUser } from 'lib/session';
import useApi from 'lib/useApi';
import useAuthApi from 'lib/useAuthApi';
import { useEffect, useState } from 'react';
import ItemRencana from './ItemRencana';
import RencanaEmpty from './RencanaEmpty';
import RencanaNotReady from './RencanaNotReady';

export default function Rencana({
  user,
  project,
  rencanas,
  type,
  title,
}: {
  user: SessionUser;
  project: any;
  rencanas: any[];
  type: string;
  title: string;
}) {
  const { data: syncData, mutate } = useAuthApi('rencana', type, project.id);
  const { data: org } = useApi('organisasi');

  const [data, setData] = useState(rencanas);
  const [rencana, setRencana] = useState<any | null>(null);
  const [PIC, setPIC] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);

  const isReady = project.tglApproval != null;
  const isEmpty = data.length == 0;

  const canEdit = user.id == project.managerId || user.id == project.staffId;
  const allowEdit = !project.tglKonfirmasi;
  const canCreate = canEdit && project.tglApproval != null;

  function newRencana() {
    return {
      id: '',
      picId: '',
      projectId: project.id,
      type: type,
      rencana: '',
      audien: '',
      waktu: '',
      tempat: '',
      tolokUkur: '',
      monitoring: '',
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

  useEffect(() => {
    if (syncData) {
      setData(syncData.rencanas);
    }
  }, [syncData]);
  //
  return (
    <Layout title={`Perubahan ${title} - ${project.judul}`} user={user} project={project}>
      <h2 style={{ marginTop: 0, fontWeight: 500 }}>{title}</h2>

      <Block info="__FORM_VIEW__" show={rencana != null} mode="new">
        <FormRencana
          data={rencana}
          units={org?.units}
          topUnits={org?.parents}
          pic={PIC}
          mutate={setData}
          onSuccess={setActiveTab}
          dataJabatan={org?.jabatans}
          onCancel={() => {
            setRencana(null);
            setPIC(null);
          }}
        />
      </Block>

      <Block info="__NOT_READY__" show={!rencana && !isReady} mode="block">
        <RencanaNotReady />
      </Block>

      <Block info="__IS_EMPTY__IS_READY" show={!rencana && isReady && isEmpty} mode="block">
        <RencanaEmpty
          title={title}
          canCreate={canCreate}
          onClick={() => setRencana(newRencana())}
        />
      </Block>

      <Block info="__NOT_EMPTY__IS_READY" show={!rencana && isReady && !isEmpty} mode="block">
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
            {data.map((rencana: any, index: number) => (
              <Tabs.Tab key={rencana.id} label={`R${index + 1}`}>
                <ItemRencana
                  key={rencana.id}
                  data={rencana}
                  units={org?.units}
                  mutate={mutate}
                  index={index}
                  canEdit={canEdit}
                  pic={getJabatan}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setRencana(rencana);
                    setPIC(getJabatan(rencana.picId));
                  }}
                />
              </Tabs.Tab>
            ))}
          </Tabs>
        )}
        <Button
          style={{ fontWeight: 500 }}
          color="indigo"
          radius={0}
          onClick={() => {
            setRencana(newRencana());
            window.scrollTo(0, 0);
          }}
        >
          Add Perubahan
        </Button>
      </Block>
    </Layout>
  );
}
