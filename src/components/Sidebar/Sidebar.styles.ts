import { createStyles } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
  anchor: {
    textDecoration: 'none',
  },
  anchorText: {
    display: 'block',
    fontSize: 13.25,
    fontWeight: 400,
    lineHeight: 1.75,
    color: theme.colors.indigo[7],
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '6px 0',
    borderBottom: '1px dotted #ffad91',

    '&:hover': {
      color: theme.colors.orange[8],
    },
  },
  anchorTextActive: {
    fontWeight: 600,
    color: theme.colors.indigo[9],
    '&:hover': {
      color: theme.colors.orange[7],
    },
  },
}));
