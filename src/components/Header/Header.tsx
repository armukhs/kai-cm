import { Box } from '@mantine/core';
import Logo from './Logo';
import useStyles from './Header.styles';
import { useContext } from 'react';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';

export default function Header() {
  // const { sessionUser } = useContext(SessionContext);
  const { classes } = useStyles();

  return (
    <Box className={classes.wrapper}>
      <HeaderLeft />
      <HeaderRight />
    </Box>
  );
}
