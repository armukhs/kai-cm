import { createStyles } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    fontSize: 12.5,
    fontWeight: 500,
    height: 24,
    backgroundColor: theme.colors.indigo[0],
    marginBottom: 3,
    borderRadius: 0,
    overflow: 'hidden',
    ':last-child': {
      marginBottom: 0,
    },
  },

  kode: {
    width: 52,
    padding: 3,
    paddingLeft: 8,
    paddingRight: 5,
    fontWeight: 500,
    color: theme.colors.indigo[7],
    backgroundColor: theme.colors.indigo[1],
  },
  hidden: { display: 'none' },

  unit: {
    position: 'absolute',
    top: 3,
    left: 52,
    right: 0,
    paddingLeft: 6,
    paddingRight: 6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    // color: theme.colors.indigo[8],
  },

  nopad: {
    left: 0,
  },
}));
