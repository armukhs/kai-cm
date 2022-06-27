import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  container: {
    maxWidth: 1024,
    paddingLeft: 48,
    paddingRight: 48,
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (max-width: 639px)': {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },

  withoutNavbar: {
    display: 'block',
    minHeight: 'calc(100vh - 100px)',
  },

  sidebarToggle: {
    display: 'show',
    '@media (min-width: 800px)': {
      display: 'none',
    },
  },

  withSidebar: {
    display: 'flex',
    flexDirection: 'column',

    '@media (min-width: 800px)': {
      flexDirection: 'row',
      borderTop: '0 none',
    },
  },

  sidebarwrap: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 220,
    paddingTop: 20,
    paddingRight: 50,

    '@media (max-width: 799px)': {
      display: 'none',
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 'auto',
      paddingRight: 0,
      width: '100%',
      paddingTop: 0,
      paddingBottom: 20,
      // marginBottom: 25,
      // borderTop: '1px solid #ddd',
      // borderBottom: '1px solid #ddd',
    },
  },

  sidebarInner: {
    position: 'sticky',
    top: 40,
  },

  sidebarInnerWithProject: {
    position: 'sticky',
    top: 71,
  },

  main: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    width: '100%',
    maxWidth: 720,
    marginTop: 0,
    paddingTop: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
    minWidth: 0,
    minHeight: 'calc(100vh - 100px)',

    '@media (min-width: 800px)': {
      // paddingTop: 30,
    },
  },
}));
