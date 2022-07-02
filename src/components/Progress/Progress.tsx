import { Box, Text, Timeline } from '@mantine/core';
import Block from 'components/Block';
import ButtonXS from 'components/ButtonXS';
import useAuthApi from 'lib/useAuthApi';
import { useEffect, useState } from 'react';
import { GitBranch, Plus, X } from 'tabler-icons-react';
import FormProgress from './FormProgress';

export default function Progress({ rencanaId, canAdd }: { rencanaId: string; canAdd: boolean }) {
  const { data, error, mutate } = useAuthApi('progress', rencanaId);
  const [form, setForm] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let score = 0;
    if (data) {
      data.forEach((d: any) => {
        if (d.progress > score) score = d.progress;
      });
    }
    setProgress(score);
  }, [data]);

  if (!data) return <></>;

  function Label({ item }: { item: any }) {
    return (
      <Box
        sx={(theme) => ({
          fontSize: 13,
          color: item.type == 'kemajuan' ? '#333' : '#d33',
        })}
      >
        {item.created.substring(0, 10)}
        {item.type == 'kemajuan' && (
          <span style={{ marginLeft: 6, color: '#333', fontWeight: 600 }}>
            Progress {item.progress}%
          </span>
        )}
        {item.type != 'kemajuan' && (
          <span style={{ marginLeft: 6, color: '#d33', fontWeight: 600 }}>(Masalah)</span>
        )}
      </Box>
    );
  }

  return (
    <div style={{ marginTop: 16 }}>
      <Block show={data.length == 0}>
        <Text>Belum ada</Text>
      </Block>
      <Block show={data.length > 0}>
        <Timeline color="gray" active={data.length - 1} bulletSize={20} lineWidth={1}>
          {data.map((item: any, index: number) => (
            <Timeline.Item
              key={item.id}
              bullet={item.type == 'kemajuan' ? <Plus size={12} /> : <X size={12} />}
              title={<Label item={item} />}
            >
              <Text
                sx={(theme) => ({
                  fontSize: 13.5,
                  // color: item.type == 'kemajuan' ? '' : theme.colors.orange[6],
                })}
              >
                {item.laporan}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Block>
      {!form && (
        <Box mt={20}>
          <ButtonXS type="dark" label="Create Progress" onClick={() => setForm(true)} />
        </Box>
      )}
      <Block show={canAdd && form}>
        <FormProgress
          rencanaId={rencanaId}
          progress={progress}
          mutate={mutate}
          onCancel={() => setForm(false)}
        />
      </Block>
    </div>
  );
}
