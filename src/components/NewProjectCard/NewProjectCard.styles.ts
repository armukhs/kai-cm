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
    cursor: 'default',
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

  truncate: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  anchor: {
    color: theme.colors.gray[9],
    textDecoration: 'none',
    fontWeight: 500,
    // maxWidth: 400,
    ':hover': {
      textDecoration: 'underline',
    },
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
