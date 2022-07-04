import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { AppProps } from 'next/app';
import { getCookie, setCookies } from 'cookies-next';
import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SWRConfig } from 'swr';
import fetchJson from 'lib/fetchJson';
import { SessionProvider } from 'components/SessionProvider/SessionProvider';
import { OrganizationProvider } from 'components/OrganizationProvider/OrganizationProvider';

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };

  return (
    <>
      <Head>
        <title>KAI Change Management</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.log(err);
          },
        }}
      >
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{
              colorScheme,
              primaryColor: 'indigo',
              colors: {
                yellow: [
                  '#FFFBE5',
                  '#FFF5B8',
                  '#FFEE8A',
                  '#FFE85C',
                  '#FFE12E',
                  '#FFDA00',
                  '#CCAF00',
                  '#998300',
                  '#665700',
                  '#332c00',
                ],
              },
              fontSizes: {
                sm: 13.75,
                md: 14.5,
                lg: 16,
              },
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>
              <SessionProvider>
                <OrganizationProvider>
                  <Component {...pageProps} />
                </OrganizationProvider>
              </SessionProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SWRConfig>
    </>
  );
}

// App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
//   colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
// });
