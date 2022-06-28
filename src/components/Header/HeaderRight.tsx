import { Button, Group, Text } from '@mantine/core';
import SessionContext from 'components/SessionProvider/SessionProvider';
import fetchJson from 'lib/fetchJson';
import useUser from 'lib/useUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import useStyles from './Header.styles';

export default function HeaderRight() {
  const router = useRouter();
  const { sessionUser } = useContext(SessionContext);
  const { mutateUser } = useUser();
  const { classes } = useStyles();

  return (
    <div className={classes.right}>
      <Group position="right" spacing="sm">
        <Text size="sm" weight={500}>
          {sessionUser.isLoggedIn && <>{sessionUser.nama}</>}
        </Text>
        {sessionUser.isLoggedIn && (
          <Link href="/api/logout" passHref>
            <Button
              component="a"
              size="xs"
              variant="outline"
              color="gray"
              onClick={async (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                mutateUser(await fetchJson('/api/logout', { method: 'POST' }));
                // await fetchJson('/api/logout', { method: 'POST' });
                router.push('/');
              }}
            >
              Logout
            </Button>
          </Link>
        )}
      </Group>
    </div>
  );
}
