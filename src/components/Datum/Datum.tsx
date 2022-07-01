import { createStyles } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  wrap: {
    display: 'flex',
    flexFlow: 'row',
    alignItems: 'start',
    fontSize: 13.5,
    paddingLeft: 14,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },

  borderTop: {
    borderTop: `1px solid ${theme.colors.gray[3]}`,
  },

  borderBottom: {
    borderBottom: `1px solid ${theme.colors.gray[3]}`,
  },

  column: {
    flexFlow: 'column',
  },

  label: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 124,
    flexShrink: 0,
    fontSize: 12.75,
    color: theme.colors.gray[7],
  },

  labelCol: {},

  data: {
    flexGrow: 1,
  },

  dataCol: {
    paddingTop: 0,
  },
}));

export default function Datum({
  label = '',
  value,
  borderTop = false,
  borderBottom = false,
}: {
  label?: string;
  value: any;
  borderTop?: boolean;
  borderBottom?: boolean;
}) {
  const { classes, cx } = useStyles();
  const { ref, width } = useElementSize();
  return (
    <div
      ref={ref}
      className={cx(classes.wrap, {
        [classes.borderTop]: borderTop,
        [classes.borderBottom]: borderBottom,
        [classes.column]: width ? width < 450 : false,
      })}
    >
      {/*
      width ? width < 450 : false
      Ensure width is defined, prevents flickering
      */}
      {label && (
        <div className={cx(classes.label, { [classes.labelCol]: width ? width < 450 : false })}>
          {label}:
        </div>
      )}
      <div className={cx(classes.data, { [classes.dataCol]: width ? width < 450 : false })}>
        {value}
      </div>
    </div>
  );
}
