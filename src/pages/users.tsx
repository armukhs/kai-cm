import { useContext, useState } from 'react';
import useUser from 'lib/useUser';
import Layout from 'components/Layout/Layout';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Pojo from 'components/Pojo';
import PageTitle from 'components/PageTitle/PageTitle';
import useAuthApi from 'lib/useAuthApi';
import { createStyles } from '@mantine/core';
import ButtonXS from 'components/ButtonXS';
import ActivateUser from 'components/Users/ActivateUser';
import DeactivateUser from 'components/Users/DeactivateUser';

const title = 'Users - KAI CM Projects';

const useStyles = createStyles((theme) => ({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    borderTop: `1px solid ${theme.colors.gray[4]}`,
  },

  td: {
    padding: 4,
    borderBottom: `1px solid ${theme.colors.gray[4]}`,
  },

  td1: {
    color: theme.colors.gray[6],
  },

  tdx: {
    paddingRight: 0,
    verticalAlign: 'middle',
    textAlign: 'right',
  },
}));

export default function Page() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });
  const { data, error, mutate } = useAuthApi('users');
  const { classes, cx } = useStyles();

  const [activate, setActivate] = useState<any>(null);
  const [deactivate, setDeactivate] = useState<any>(null);

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
    <Layout title="Users - KAI CM Projects" user={user}>
      <PageTitle title="Users" />

      <ActivateUser user={activate} setUser={setActivate} mutate={mutate} />
      <DeactivateUser user={deactivate} setUser={setDeactivate} mutate={mutate} />

      <table className={classes.table}>
        <tbody style={{ fontSize: 14, verticalAlign: 'top' }}>
          {data.map((user: any, index: number) => (
            <tr id={user.id}>
              <td width={30} className={cx(classes.td, classes.td1)}>
                {index + 1}
              </td>
              <td width="" className={classes.td}>
                <span style={{ fontWeight: 600 }}>{user.nama}</span> (
                {user.roles.split(' ').join(', ')})
                <div style={{ fontSize: 12.25, color: '#789' }}>
                  {user.Jabatan.nama}, {user.Unit.nama}
                </div>
              </td>
              <td className={cx(classes.td, classes.tdx)}>
                {!user.roles.includes('admin') && user.deleted && (
                  <ButtonXS type="dark" label="Reactivate" onClick={() => setActivate(user)} />
                )}
                {!user.roles.includes('admin') && !user.deleted && (
                  <ButtonXS type="red" label="Deactivate" onClick={() => setDeactivate(user)} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Pojo object={deactivate} /> */}
    </Layout>
  );
}
