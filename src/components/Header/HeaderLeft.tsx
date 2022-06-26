import Link from 'next/link';
import useStyles from './Header.styles';
import Logo from './Logo';

export default function HeaderLeft() {
  const { classes } = useStyles();
  return (
    <div className={classes.left}>
      <Link href="/projects">
        <a style={{ textDecoration: 'none' }}>
          <Logo />
        </a>
      </Link>
    </div>
  );
}
