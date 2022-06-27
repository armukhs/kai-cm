import { createStyles } from '@mantine/core';
export default createStyles((theme) => ({
  projectBar: {
    backgroundColor: 'rgba(255,255,255,.95)',
  },

  projectBarFixed: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },

  projectBarInner: {
    paddingTop: 7,
    paddingBottom: 7,
    backgroundColor: 'white',
    borderBottomColor: theme.colors.indigo[3],
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    fontSize: 13,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },

  homeIcon: {
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
}));
