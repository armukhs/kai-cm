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
  const [PIC, setPIC] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (data) {
      setTheData(data.perubahans);
      setTheProject(data.project);
    }
    return () => {};
  }, [data, setTheData, setTheProject]);

  const userIsOwner = user.id == theProject.managerId || user.id == theProject.staffId;
  const isConfirmed = theProject.tglKonfirmasi != null && theProject.tglKonfirmasi != '';
  const titleHasButton = userIsOwner && theData.length > 0 && !isConfirmed && !perubahan;

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
      return org.jabatans.find((j: any) => j.id == id);
    }
    return null;
  }

  // if (theData.length == 0) {
  //   return (

  //   )
  // }

  return (
    <>
      <PageTitle
        title={title}
        button={titleHasButton ? 'New Perubahan' : ''}
        clickHandler={() => setPerubahan(newPerubahan())}
      />

      <Block info="__FORM_VIEW__" show={perubahan != null} mode="new">
        <FormPerubahan
          data={perubahan}
          units={org?.units}
          topUnits={org?.parents}
          pic={PIC}
          mutate={setTheData}
          onSuccess={setActiveTab}
          dataJabatan={org?.jabatans}
          onCancel={() => {
            setPerubahan(null);
            setPIC(null);
          }}
        />
      </Block>

      <Block info="__" show={!perubahan && theData.length == 0} mode="block">
        <PerubahanEmpty
          canCreate={userIsOwner && !isConfirmed}
          onClick={() => setPerubahan(newPerubahan())}
        />
      </Block>

      <Block info="__" show={!perubahan && theData.length > 0} mode="block">
        {theData.length == 1 && (
          <ItemPerubahan
            data={theData[0]}
            units={org?.units}
            mutate={mutate}
            index={0}
            canEdit={userIsOwner && !isConfirmed}
            pic={getJabatan}
            onClick={() => {
              window.scrollTo(0, 0);
              setPerubahan(theData[0]);
              setPIC(getJabatan(theData[0].picId));
            }}
          />
        )}
        {/* Prevents <Tabs> being rendered (which cause error if data is empty), since Block parent is server-rendered */}
        {theData.length > 1 && (
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
            {theData.map((perubahan: any, index: number) => (
              <Tabs.Tab key={perubahan.id} label={`P${index + 1}`}>
                <ItemPerubahan
                  key={perubahan.id}
                  data={perubahan}
                  units={org?.units}
                  mutate={mutate}
                  index={index}
                  canEdit={userIsOwner && !isConfirmed}
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
        {/* <Komentar projectId={theProject.id} type={type} /> */}
        {/* {!isConfirmed && <FormKomentar type={type} projectId={theProject.id} userId={user.id} />} */}
      </Block>
    </>
  );
}
