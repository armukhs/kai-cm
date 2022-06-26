import useSWR from 'swr';

export default function useApi(subject: string, option?: string, extra?: string) {
  let path = `/api/get?subject=${subject}`;
  if (option) {
    path += '&option=' + option;
    if (extra) path += '&extra=' + extra;
  }

  const { data, error, mutate } = useSWR(path);

  const isLoading = !data && !error;
  return { data, isLoading, error, mutate };
}
