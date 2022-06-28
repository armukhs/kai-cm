import { createStyles } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    margin: 0,
    paddingRight: 20,
    fontWeight: 800,
    textTransform: 'capitalize',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    // '@media (max-width: 450px)': {},
  },

  suffix: {
    // display: 'none',
    textTransform: 'capitalize',
  },

  hidden: {
    textTransform: 'capitalize',
    display: 'none',
  },

  buttonWrap: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'end',
  },

  button: {
    fontWeight: 500,
    paddingLeft: 12,
    borderRadius: 0,
  },
}));
