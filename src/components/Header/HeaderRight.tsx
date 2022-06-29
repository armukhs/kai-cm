import { Avatar, Button, Divider, Group, Menu, Text } from '@mantine/core';
import SessionContext from 'components/SessionProvider/SessionProvider';
import fetchJson from 'lib/fetchJson';
import { SessionUser } from 'lib/session';
import useUser from 'lib/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Settings, Search, Photo, MessageCircle, Trash, ArrowsLeftRight } from 'tabler-icons-react';
import useStyles from './Header.styles';

export default function HeaderRight() {
  const router = useRouter();
  const { sessionUser } = useContext(SessionContext);
  const { mutateUser } = useUser();
  const { classes } = useStyles();

  return (
    <div className={classes.right}>
      <Group position="right" spacing="sm">
        <Text
          size="sm"
          weight={600}
          color="indigo"
          sx={{
            '@media (max-width: 500px)': {
              display: 'none',
            },
          }}
        >
          {sessionUser.isLoggedIn && <>{sessionUser.nama}</>}
        </Text>

        <Menu
          control={<Avatar src={null} size={30} alt="User menu" color="indigo" />}
          sx={{
            '@media (max-width: 320px)': {
              display: 'none',
            },
          }}
        >
          <Menu.Label>Application</Menu.Label>
          <Menu.Item icon={<Settings size={14} />} onClick={() => router.push('/profile')}>
            Change Password
          </Menu.Item>

          <Divider />

          {/* <Menu.Label>Danger zone</Menu.Label> */}
          <Menu.Item
            color="red"
            icon={<Trash size={14} />}
            onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              mutateUser(await fetchJson('/api/logout', { method: 'POST' }));
              router.push('/');
            }}
          >
            Logout
          </Menu.Item>
        </Menu>

        {/* {sessionUser.isLoggedIn && (
          <Link href="/api/logout" passHref>
            <Button
              component="a"
              size="xs"
              variant="outline"
              color="gray"
              onClick={async (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                mutateUser(await fetchJson('/api/logout', { method: 'POST' }));
                router.push('/');
              }}
            >
              Logout
            </Button>
          </Link>
        )} */}
      </Group>
    </div>
  );
}
