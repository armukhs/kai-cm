import { createStyles } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    overflow: 'hidden',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: theme.colors.gray[3],
    cursor: 'pointer',
    ':hover': {
      borderColor: theme.colors.indigo[2],
    },
  },

  expanded: {
    borderColor: theme.colors.indigo[4],
    ':hover': {
      borderColor: theme.colors.indigo[4],
    },
  },

  iconWrap: {
    float: 'left',
    paddingTop: 6,
    color: theme.colors.indigo[5],
  },

  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  formHidden: {
    display: 'none',
    marginLeft: -16,
    marginRight: -16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },

  formWrap: {
    display: 'block',
  },

  formInner: {
    display: 'flex',
    alignItems: 'center',
  },

  inputWrap: { flexGrow: 1, marginRight: 10 },

  selectInput: {
    fontSize: 13,
    height: 32,
    minHeight: 32,
    lineHeight: '32px',
  },

  selectRoot: {
    // lineHeight: 1.2,
  },

  selectWrapper: {
    // lineHeight: 1.2,
  },
  selectItem: {
    fontSize: 13,
    // lineHeight: 1,
  },
}));
