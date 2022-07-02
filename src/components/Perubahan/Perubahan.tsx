import { Tabs } from '@mantine/core';
import Block from 'components/Block';
import FormPerubahan from 'components/FormPerubahan/FormPerubahan';
import FormKomentar from 'components/Komentar/FormKomentar';
import Komentar from 'components/Komentar/Komentar';
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
  const { data, mutate } = useAuthApi('perubahan', type, project.id);
  const { data: org } = useApi('organisasi');

  const [theProject, setTheProject] = useState(project);
  const [theData, setTheData] = useState(perubahans);
  const [perubahan, setPerubahan] = useState<any>(null);
  // const [PIC, setPIC] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);

  const userIsOwner = user.id == theProject.managerId || user.id == theProject.staffId;
  const isConfirmed = theProject.tglKonfirmasi != null && theProject.tglKonfirmasi != '';
  const titleHasButton = userIsOwner && theData.length > 0 && !perubahan && !editing;

  function newPerubahan() {
    return {
      id: null,
      picId: '',
      projectId: project.id,
      type: type,
      kondisi: '',
      perubahan: '',
      // unitTerdampak: [],
    };
  }

  useEffect(() => {
    if (data) {
      setTheData(data.perubahans);
      setTheProject(data.project);
    }
    return () => {};
  }, [data, setTheData, setTheProject]);

  function getJabatan(id: string) {
    if (org) {
      return org.jabatans.find((j: any) => j.id == id);
    }
    return null;
  }

  if (theData.length == 0) {
    return <PerubahanEmpty title={title} data={newPerubahan()} canCreate={userIsOwner} />;
  }

  return (
    <>
      <PageTitle
        title={title}
        button={titleHasButton ? 'New Perubahan' : ''}
        clickHandler={() => {
          setPerubahan(newPerubahan());
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
          <Tabs.Tab key={item.id} disabled={perubahan != null || editing} label={`R${index + 1}`}>
            <ItemPerubahan
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
        {perubahan && (
          <Tabs.Tab label="New" color="gray">
            <FormPerubahan
              title={`New Perubahan`}
              data={perubahan}
              pic={null}
              setActiveTab={setActiveTab}
              onSuccess={() => {
                setPerubahan(null);
              }}
              onCancel={() => {
                setPerubahan(null);
                setActiveTab(0);
              }}
            />
          </Tabs.Tab>
        )}
      </Tabs>
    </>
  );
}
