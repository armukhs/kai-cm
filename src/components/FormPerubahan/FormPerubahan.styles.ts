import { createStyles } from '@mantine/core';
export const useStyles = createStyles((theme) => ({
  label: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 4,
  },

  unitsWrap: {
    padding: 7,
    paddingLeft: 10,
    minHeight: 65,
    borderBottom: '1px solid #d4d4d4',
    fontSize: 14,
  },

  topUnitsWrap: {
    padding: 7,
    borderBottom: '1px solid #d4d4d4',
  },

  scrollArea: {
    height: 168,
    paddingTop: 7,
    paddingLeft: 10,
  },
}));
