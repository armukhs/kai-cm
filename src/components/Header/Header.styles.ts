import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    paddingTop: 22,
    paddingBottom: 22,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    borderBottom: '1px dotted #aae',

    '@media (min-width: 640px)': {
      // paddingTop: 28,
    },

    '@media (min-width: 800px)': {},
  },

  left: {
    display: 'flex',
    height: 30,
    alignItems: 'start',
    margin: 0,
    flexGrow: 0,
  },

  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    margin: 0,
    flexGrow: 1,
  },

  logoWrap: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  },

  logoText: {
    fontSize: 18,
    fontWeight: 800,
    textTransform: 'uppercase',
    lineHeight: 0.8,
    letterSpacing: -0.8,
    marginLeft: 5,
    paddingTop: 1,
    paddingRight: 5,
    fontStyle: 'oblique',
  },
}));
