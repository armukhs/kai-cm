import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStyles } from './Sidebar.styles';

export default function SidebarItem({ label, href }: { label: string; href: string }) {
  const router = useRouter();
  const path = router.asPath;
  const { classes, cx } = useStyles();

  return (
    <Link href={`${href}`}>
      <a className={classes.anchor}>
        <span className={cx(classes.anchorText, { [classes.anchorTextActive]: path == href })}>
          {label}
        </span>
      </a>
    </Link>
  );
}
