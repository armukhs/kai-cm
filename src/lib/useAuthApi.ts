import useSWR from 'swr';

export default function useAuthApi(subject: string, option?: string, extra?: string) {
  let path = `/api/auth/get?subject=${subject}`;
  if (option) {
    path += '&option=' + option;
    if (extra) path += '&extra=' + extra;
  }
  // console.log('PATH', path);

  const { data, error, mutate } = useSWR(path);

  const isLoading = !data && !error;
  return { data, isLoading, error, mutate };
}
