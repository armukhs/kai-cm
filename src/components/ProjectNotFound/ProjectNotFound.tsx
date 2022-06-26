import Head from 'next/head';
import Header from 'components/Header/Header';
import useStyles from 'components/Layout/Layout.styles';
import { Center, Divider } from '@mantine/core';

export default function ProjectNotFound() {
  const { classes, cx } = useStyles();

  return (
    <>
      <Head>
        <title>Project Not Found</title>
      </Head>
      <div className={classes.container}>
        <Header />
      </div>

      <div className={classes.container} style={{ paddingBottom: 100 }}>
        <Center my={30}>
          <h1 style={{ fontWeight: 400 }}>Not Found</h1>
        </Center>
      </div>
    </>
  );
}
