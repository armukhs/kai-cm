import { useContext, useState } from 'react';
import useUser from 'lib/useUser';
import Layout from 'components/Layout/Layout';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Pojo from 'components/Pojo';
import PageTitle from 'components/PageTitle/PageTitle';
import useAuthApi from 'lib/useAuthApi';
import { Button, LoadingOverlay, Table } from '@mantine/core';
import { PlusIcon } from '@modulz/radix-icons';
import Block from 'components/Block';
import FormInvitation from 'components/FormInvitation/FormInvitation';

const title = 'Invitations - KAI CM Projects';
export default function Page() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });
  const { data, error, mutate } = useAuthApi('invitations');

  const [showForm, setShowForm] = useState(false);

  if (!data) {
    return (
      <Layout title={title} user={user}>
        <PageTitle title={title} />
      </Layout>
    );
  }

  if (!user.roles.includes('admin')) {
    return (
      <Layout title="Unauthorized Access" user={user}>
        <PageTitle title="Unauthorized Access" />
      </Layout>
    );
  }

  return (
    <Layout title={title} user={user}>
      <PageTitle title="Invitations" />

      <Block show={!showForm} mode="new">
        <Button
          leftIcon={<PlusIcon />}
          color="indigo"
          sx={{
            fontWeight: 500,
            paddingLeft: 12,
            borderRadius: 0,
          }}
          onClick={() => setShowForm(!showForm)}
        >
          Invite User
        </Button>
      </Block>

      <Block show={!showForm}>
        <LoadingOverlay visible={!data} />
        <Table sx={{ marginTop: 30 }}>
          <tbody>
            <tr style={{ fontWeight: 500 }}>
              <td>Tanggal</td>
              <td>Nama &amp; Jabatan</td>
            </tr>
            {data &&
              data.map((item: any) => (
                <tr
                  key={item.id}
                  style={{ backgroundColor: item.token.length < 5 ? '#f4f4fc' : '' }}
                >
                  <td>{item.created.substring(0, 10)}</td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{item.nama}</span>
                    {` `}
                    <span style={{ color: 'gray' }}>({item.email})</span>
                    <br />
                    {item.jabatan}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Block>

      <Block show={showForm}>
        <FormInvitation mutate={mutate} onCancel={() => setShowForm(false)} />
      </Block>
      {/* <Pojo object={data} /> */}
    </Layout>
  );
}
