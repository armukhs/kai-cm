import { useContext } from 'react';
import Link from 'next/link';
import { useWindowScroll } from '@mantine/hooks';
import useStyles from './ProjectBar.styles';
import * as layoutStyles from 'components/Layout/Layout.styles';
import Locomotive from 'components/Icons/Locomotive';
import useAuthApi from 'lib/useAuthApi';

export default function ProjectBar({ id }: { id: string }) {
  const { classes, cx } = useStyles();
  const { classes: layout } = layoutStyles.default();
  const { data: project } = useAuthApi('project', id);

  const [scroll] = useWindowScroll();
  return (
    <>
      <div className={cx(classes.projectBar, { [classes.projectBarFixed]: scroll.y > 74 })}>
        <div className={layout.container}>
          <div className={classes.projectBarInner}>
            <div className={classes.flex} style={{ alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  paddingRight: 18,
                  paddingLeft: 18,
                  paddingTop: 10,
                  paddingBottom: 10,
                  marginRight: 16,
                  borderRight: '1px dotted #aae',
                }}
              >
                <Link href="/projects">
                  <a className={classes.homeIcon}>
                    <Locomotive width={32} height={32} />
                  </a>
                </Link>
              </div>
              <div style={{ flexGrow: 1, paddingTop: 4, paddingBottom: 6 }}>
                <table width="100%" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr>
                      <td width={70}>PROYEK:</td>
                      <td>
                        <div className={classes.truncate} style={{ fontWeight: 600 }}>
                          {project ? project.judul : '...'}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td width={70}>UNIT:</td>
                      <td>
                        <div className={classes.truncate}>
                          {project ? project.Unit.nama : 'Unit Name'}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: scroll.y > 74 ? 54 : 0 }}></div>
    </>
  );
}
