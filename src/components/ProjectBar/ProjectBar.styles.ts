import { createStyles } from '@mantine/core';
export default createStyles((theme) => ({
  projectBar: {
    backgroundColor: 'white',
    // paddingBottom: 10,
    // boxShadow: '0 3px 5px rgba(255,255,255, 0.9)',
  },

  projectBarFixed: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },

  projectBarInner: {
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white',
    borderBottomColor: theme.colors.indigo[3],
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    fontSize: 13,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  homeIcon: {
    display: 'flex',
    color: theme.colors.gray[6],
    ':hover': {
      color: theme.colors.indigo[6],
    },
  },

  flex: {
    display: 'flex',
    alignItems: 'start',
  },

  label: {
    flexBasis: 75,
    flexShrink: 0,
  },

  truncate: {
    width: 'calc(100vw - 200px)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (min-width: 640px)': {
      width: 'calc(100vw - 260px)',
    },
    '@media (min-width: 1000px)': {
      width: 750,
    },
  },
}));
