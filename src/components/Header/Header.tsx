import { Box } from '@mantine/core';
import useStyles from './Header.styles';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

export default function Header() {
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <HeaderLeft />
      <HeaderRight />
    </Box>
  );
}
