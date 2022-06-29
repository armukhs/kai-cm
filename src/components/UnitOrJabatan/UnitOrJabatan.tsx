import { createStyles } from '@mantine/core';

export default function UnitOrJabatan({
  type = 'unit',
  uoj,
}: {
  type?: 'unit' | 'jabatan';
  uoj: any;
}) {
  const { classes, cx } = useStyles();
  return (
    <div key={uoj.kode} className={classes.wrapper}>
      <div className={cx(classes.kode, { [classes.kodeJabatan]: type == 'jabatan' })}>
        {uoj.kode}
      </div>
      <div className={cx(classes.entity, { [classes.entityJabatan]: type == 'jabatan' })}>
        {uoj.nama}
      </div>
    </div>
  );
}

export const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    fontSize: 12.5,
    fontWeight: 500,
    height: 24,
    // backgroundColor: theme.colors.indigo[0],
    marginBottom: 3,
    borderRadius: 0,
    overflow: 'hidden',
    ':last-child': {
      marginBottom: 0,
    },
  },

  kode: {
    width: 52,
    padding: 3,
    paddingTop: 2,
    paddingLeft: 8,
    paddingRight: 5,
    fontWeight: 500,
    color: theme.colors.indigo[7],
    backgroundColor: theme.colors.indigo[1],
  },

  entity: {
    position: 'absolute',
    top: 0,
    paddingTop: 2,
    left: 52,
    right: 0,
    height: 24,
    paddingLeft: 6,
    paddingRight: 6,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    // color: theme.colors.indigo[8],
  },

  kodeJabatan: {
    width: 64,
    paddingTop: 4,
    backgroundColor: theme.colors.yellow[3],
    color: theme.colors.red[5],
    fontSize: 12,
  },
  entityJabatan: { left: 64, backgroundColor: theme.colors.yellow[1] },
}));
