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
    borderBottom: '1px solid #aac',
    fontSize: 13,
    // color: theme.colors.gray[7],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
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
