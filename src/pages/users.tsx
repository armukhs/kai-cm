import { useContext } from 'react';
import useUser from 'lib/useUser';
import Layout from 'components/Layout/Layout';
import SessionContext from 'components/SessionProvider/SessionProvider';
import Pojo from 'components/Pojo';
import PageTitle from 'components/PageTitle/PageTitle';
import { Box, Paper } from '@mantine/core';

export default function Page() {
  const { sessionUser: user } = useContext(SessionContext);
  const { mutateUser } = useUser({ redirectTo: '/' });

  return (
    <Layout title="Users - KAI CM Projects" user={user}>
      <PageTitle title="Users" />

      <Paper
        p={16}
        mb={40}
        sx={(theme) => ({
          minHeight: 200,
          backgroundColor: theme.colors.yellow[4], //'rgba(255,222,0, 1)', // theme.colors.yellow[3],
          borderColor: theme.colors.yellow[9], // 'rgba(205,186,103, 0.15)',
          boxShadow: `rgba(155,136,53, 0.15) 0px 1px 3px 0px, rgba(95,176,93, 0.25) 0px 20px 25px -5px, rgba(155,136,53, 0.04) 0px 10px 10px -5px;
0 1px 3px rgba(155,136,53, 0.05),rgba(155,136,53, 0.25) 0px 20px 25px -5px,rgba(155,136,53, 0.84) 0px 10px 10px -5px`,
        })}
      >
        <Box
          sx={{
            display: 'flex',
            borderRadius: 19,
            backgroundColor: '#fff',
            padding: '6px 18px',
            fontWeight: 900,
            overflow: 'hidden',
            // transform:
            //   'matrix(0.9993908270190958, 0.03489949670250097, -0.03489949670250097, 0.9993908270190958, 0, 0)',
          }}
        >
          <span>LUDRUK</span>
          <span
            style={{
              width: 0,
              marginLeft: 16,
              marginTop: -10,
              marginBottom: -10,
              borderRightStyle: 'solid',
              borderRightWidth: 2,
              borderRightColor: 'rgba(255,222,0, 1)',
              borderLeftStyle: 'solid',
              borderLeftWidth: 2,
              borderLeftColor: '#982', // 'rgba(255,222,0, 1)',
              transform:
                'matrix(0.9993908270190958, 0.23489949670250097, -0.23489949670250097, 0.9993908270190958, 0, 0)',
            }}
          ></span>
        </Box>
      </Paper>

      <Pojo object={user} />
    </Layout>
  );
}
