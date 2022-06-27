import { useWindowScroll } from '@mantine/hooks';
import useStyles from './ProjectBar.styles';
import * as layoutStyles from 'components/Layout/Layout.styles';

export default function ProjectBar({ project }: { project: any }) {
  const { classes, cx } = useStyles();
  const { classes: layout } = layoutStyles.default();

  const [scroll] = useWindowScroll();
  return (
    <>
      <div className={cx(classes.projectBar, { [classes.projectBarFixed]: scroll.y > 74 })}>
        <div className={layout.container}>
          <div className={classes.projectBarInner}>
            <div className={classes.flex}>
              <span className={classes.label}>PROYEK:</span>
              <strong>{project.judul}</strong>
            </div>
            <div className={classes.flex}>
              <span className={classes.label}>UNIT:</span>
              <span>{project.Unit.nama}</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: scroll.y > 74 ? 55 : 0 }}></div>
    </>
  );
}
