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
  mutate,
}: {
  user: SessionUser;
  type: string;
  title: string;
  project: any;
  rencanas: any[];
  mutate: KeyedMutator<any>;
}) {
  // const { data: syncData, mutate } = useAuthApi('rencana', type, project.id);
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
  const titleHasButton = canCreate && data.length > 0 && !rencana;

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

  // useEffect(() => {
  //   if (syncData) {
  //     setData(syncData.rencanas);
  //   }
  // }, [syncData]);
  //
  return (
    <>
      <PageTitle
        title={title}
        button={titleHasButton ? 'New Perubahan' : ''}
        clickHandler={() => setRencana(newRencana())}
      />

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
      </Block>
    </>
  );
}
