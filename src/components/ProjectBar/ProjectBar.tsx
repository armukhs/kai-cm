import { useWindowScroll } from '@mantine/hooks';
import useStyles from './ProjectBar.styles';
import * as layoutStyles from 'components/Layout/Layout.styles';

export default function ProjectBar({ title }: { title: string }) {
  const { classes, cx } = useStyles();
  const { classes: layout } = layoutStyles.default();

  const [scroll] = useWindowScroll();
  return (
    <>
      <div className={cx(classes.projectBar, { [classes.projectBarFixed]: scroll.y > 74 })}>
        <div className={layout.container}>
          <div className={classes.projectBarInner}>
            PROYEK:{` `}
            <strong>{title}</strong>
          </div>
        </div>
      </div>
      <div style={{ height: scroll.y > 74 ? 41 : 0 }}></div>
    </>
  );
}
