import { Button, Tabs, Text } from '@mantine/core';
import Block from 'components/Block';
import ButtonPrimary from 'components/PageTitle/ButtonPrimary';
import FormRencana from 'components/FormRencana/FormRencana';
import Locomotive from 'components/Icons/Locomotive';
import Layout from 'components/Layout/Layout';
import PageTitle from 'components/PageTitle/PageTitle';
import Pojo from 'components/Pojo';
import { SessionUser } from 'lib/session';
import useApi from 'lib/useApi';
import useAuthApi from 'lib/useAuthApi';
import { useEffect, useState } from 'react';
import ItemRencana from './ItemRencana';
import RencanaEmpty from './RencanaEmpty';
import RencanaNotReady from './RencanaNotReady';
import { KeyedMutator } from 'swr';

export default function Rencana({
  type,
  title,
  user,
  project,
  rencanas,
}: {
  user: SessionUser;
  type: string;
  title: string;
  project: any;
  rencanas: any[];
}) {
  const { data: syncData, mutate } = useAuthApi('rencana', type, project.id);
  const { data: org } = useApi('organisasi');

  const [data, setData] = useState(rencanas);
  const [rencana, setRencana] = useState<any | null>(null);
  const [PIC, setPIC] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);

  const userIsOwner = user.id == project.managerId || user.id == project.staffId;
  const titleHasButton = userIsOwner && data.length > 0 && !rencana;

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
      return org.jabatans.find((j: any) => j.id == id);
    }
    return null;
  }

  useEffect(() => {
    if (syncData) {
      setData(syncData.rencanas);
    }
    return () => {};
  }, [syncData]);

  // Project analysis hasnt been confirmed
  if (!project.tglKonfirmasi || !syncData.project.tglKonfirmasi) {
    return (
      <>
        <PageTitle title={title} />
        <RencanaNotReady />
      </>
    );
  }

  return (
    <>
      <PageTitle
        title={title}
        button={titleHasButton ? 'New Rencana' : ''}
        clickHandler={() => setRencana(newRencana())}
      />

      {/* <Pojo object={syncData.project.tglKonfirmasi} /> */}
      {/* <Pojo object={data.length} /> */}

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

      <Block info="__IS_EMPTY__IS_READY" show={data.length == 0 && !rencana} mode="block">
        <RencanaEmpty
          title={title}
          canCreate={userIsOwner}
          onClick={() => setRencana(newRencana())}
        />
      </Block>

      <Block info="__NOT_EMPTY__IS_READY" show={data.length > 0 && !rencana} mode="block">
        {data.length == 1 && (
          <ItemRencana
            data={data[0]}
            units={org?.units}
            mutate={mutate}
            index={0}
            canEdit={userIsOwner}
            pic={getJabatan}
            onDelete={setActiveTab}
            onClick={() => {
              window.scrollTo(0, 0);
              setRencana(data[0]);
              setPIC(getJabatan(data[0].picId));
            }}
          />
        )}
        {data.length > 1 && (
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
                  canEdit={userIsOwner}
                  pic={getJabatan}
                  onDelete={setActiveTab}
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
      </Block>
    </>
  );
}
