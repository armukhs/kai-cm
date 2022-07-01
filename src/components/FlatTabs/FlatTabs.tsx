import { Tabs, TabsProps } from '@mantine/core';

export default function FlatTabs(props: TabsProps) {
  return (
    <Tabs
      variant="unstyled"
      grow
      styles={(theme) => ({
        body: {
          paddingTop: 20,
        },

        tabControl: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
          border: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]
          }`,
          fontSize: 13,
          fontWeight: 500,
          height: '36px',

          '&:not(:first-of-type)': {
            borderLeft: 0,
          },

          '&:first-of-type': {
            borderRight: 0,
            borderTopLeftRadius: theme.radius.sm,
            borderBottomLeftRadius: theme.radius.sm,
          },

          '&:last-of-type': {
            borderLeft: '0 none',
            borderTopRightRadius: theme.radius.sm,
            borderBottomRightRadius: theme.radius.sm,
          },
        },

        tabActive: {
          backgroundColor: theme.colors.gray[6],
          borderColor: theme.colors.gray[6],
          color: theme.white,
        },
      })}
      {...props}
    />
  );
}
