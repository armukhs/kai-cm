import { Text } from '@mantine/core';
import useStyles from './Header.styles';
import KAI from './KAI';

export default function Logo() {
  const { classes } = useStyles();

  return (
    <div className={classes.logoWrap}>
      <div style={{ width: 70 }}>
        <KAI />
      </div>

      <Text
        component="span"
        variant="gradient"
        gradient={{ from: 'indigo', to: 'pink', deg: 85 }}
        className={classes.logoText}
      >
        Change
        <br />
        Management
      </Text>
    </div>
  );
}
