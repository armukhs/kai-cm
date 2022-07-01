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
import ButtonXS from 'components/ButtonXS';

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

  const [theProject, setTheProject] = useState(project);
  const [theData, setTheData] = useState(rencanas);
  const [rencana, setRencana] = useState<any | null>(null);
  const [PIC, setPIC] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);

  const userIsOwner = user.id == project.managerId || user.id == project.staffId;
  const titleHasButton = userIsOwner && theData.length > 0 && !rencana && !editing;

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
      setTheProject(syncData.project);
      setTheData(syncData.rencanas);
    }
    return () => {};
  }, [syncData]);

  if (!theProject.tglKonfirmasi || theData.length == 0) {
    return <RencanaEmpty title={title} ready={theProject.tglKonfirmasi} canCreate={userIsOwner} />;
  }

  return (
    <>
      <PageTitle
        title={title}
        button={titleHasButton ? 'New Rencana' : ''}
        clickHandler={() => {
          setRencana(newRencana());
          setActiveTab(theData.length);
        }}
      />

      <Tabs
        active={activeTab}
        onTabChange={setActiveTab}
        variant="default"
        styles={{
          root: { marginTop: -12 },
          body: { paddingTop: 12 },
          tabLabel: { fontWeight: 500 },
        }}
      >
        {theData.map((item: any, index: number) => (
          <Tabs.Tab key={item.id} disabled={rencana != null || editing} label={`R${index + 1}`}>
            <ItemRencana
              key={item.id}
              data={item}
              mutate={mutate}
              index={index}
              canEdit={userIsOwner}
              onEdit={setEditing}
              setActiveTab={setActiveTab}
            />
          </Tabs.Tab>
        ))}
        {rencana && (
          <Tabs.Tab label="New" color="gray">
            {`NEW`}
            <ButtonXS
              type="red-outline"
              label="Cancel"
              onClick={() => {
                setActiveTab(theData.length - 1);
                setRencana(null);
              }}
            />
          </Tabs.Tab>
        )}
      </Tabs>
    </>
  );
}
