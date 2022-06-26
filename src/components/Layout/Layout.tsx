import { ReactNode, useEffect } from 'react';
import Head from 'next/head';
import Header from 'components/Header/Header';
import useStyles from './Layout.styles';
import ProjectBar from 'components/ProjectBar/ProjectBar';
import Sidebar from 'components/Sidebar/Sidebar';
import { useViewportSize } from '@mantine/hooks';
import { Divider } from '@mantine/core';
import { SessionUser } from 'lib/session';

export default function Layout({
  title,
  user,
  project,
  children,
}: {
  title: string;
  user: SessionUser;
  project?: any;
  children: ReactNode;
}) {
  const { classes, cx } = useStyles();
  const { width } = useViewportSize();
  const isAdmin = user.roles.includes('admin');

  useEffect(() => {
    const elm = document.getElementById('sidebarwrap');
    if (elm == null) return () => {};

    if (width >= 800) {
      elm.style.display = 'block';
    } else {
      elm.style.display = 'none';
    }

    return () => {};
  }, [width]);

  function toggleSidebar() {
    const elm = document.getElementById('sidebarwrap');
    if (elm == null) return;
    if (elm?.style.display == 'block') elm.style.display = 'none';
    else elm.style.display = 'block';
  }

  return (
    <>
      <Head>
        <title>{title ? title : 'KAI Change Management'}</title>
      </Head>
      <div className={classes.container}>
        <Header />
      </div>

      {project && <ProjectBar title={project.judul} />}

      <div className={classes.container} style={{ paddingBottom: 100 }}>
        <div className={classes.sidebarToggle}>
          <Divider
            mt="xs"
            variant="dashed"
            labelPosition="center"
            label={<span>Show/Hide Menu</span>}
            style={{ cursor: 'pointer' }}
            onClick={() => toggleSidebar()}
          />
        </div>
        <div className={classes.withSidebar}>
          <div id="sidebarwrap" className={classes.sidebarwrap}>
            <div className={project ? classes.sidebarInnerWithProject : classes.sidebarInner}>
              <Sidebar isAdmin={isAdmin} project={project} />
            </div>
          </div>
          <main className={classes.main}>{children}</main>
        </div>
      </div>
    </>
  );
}
