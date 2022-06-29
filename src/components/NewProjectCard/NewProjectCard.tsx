import { KeyedMutator } from 'swr';
import { Box, Button, LoadingOverlay, Paper, Select, Text } from '@mantine/core';
import { LayersIcon } from '@modulz/radix-icons';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { Dispatch, useState } from 'react';
import { useStyles } from './NewProjectCard.styles';
import ButtonXS from 'components/ButtonXS';
import Link from 'next/link';
import cfg from 'lib/config';
import { useElementSize } from '@mantine/hooks';

export default function NewProjectCard({
  project,
  mentors,
  selected,
  onSelect,
  mutate,
}: {
  project: any;
  mentors: any[];
  selected: boolean;
  onSelect: Dispatch<any>;
  mutate: KeyedMutator<any>;
}) {
  const { classes, cx } = useStyles();

  const [showForm, setShowForm] = useState(false);
  const [mentorId, setMentorId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function saveProjectMentor() {
    if (!mentorId) return false;

    setSubmitting(true);
    const body = { projectId: project.id, mentorId: mentorId };
    onSelect(null);
    try {
      await fetchJson('/api/auth/post?subject=save-mentor', createPostData(body));
      setMentorId('');
      mutate();
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  const { ref, width } = useElementSize();

  return (
    <Paper
      withBorder
      className={cx(classes.wrapper, { [classes.expanded]: selected })}
      onClick={() => {
        onSelect(selected ? null : project);
        setShowForm(!showForm);
      }}
    >
      <LoadingOverlay visible={submitting} />
      <div>
        <Box className={classes.iconWrap}>
          <LayersIcon width={26} height={26} />
        </Box>
        <div ref={ref} style={{ marginLeft: 40 }}>
          <Text size="xs" color="gray" className={classes.truncate}>
            {project.Unit.nama}
          </Text>
          <div style={{ display: 'flex' }}>
            <Link href={`${cfg.PROJECTPATH}/${project.id}`}>
              <a
                className={classes.anchor}
                style={{ maxWidth: width - 10 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Text className={classes.truncate}>
                  {project.judul} - dibikin panjang untuk mencoba{' '}
                  <span style={{ color: 'orange', fontWeight: 700 }}>fitur ellipsis</span>{' '}
                  preloading the data when the user
                </Text>
              </a>
            </Link>
            <div style={{ flexGrow: 1 }}>&nbsp;</div>
          </div>
        </div>
      </div>

      <div
        className={cx(classes.formHidden, { [classes.formWrap]: selected })}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes.formInner}>
          <div className={classes.inputWrap}>
            <Select
              classNames={{
                input: classes.selectInput,
                wrapper: classes.selectWrapper,
                root: classes.selectRoot,
                item: classes.selectItem,
              }}
              data={mentors}
              clearable
              value={mentorId}
              disabled={submitting}
              onChange={setMentorId}
            />
          </div>
          <ButtonXS
            label="Save"
            type={mentorId ? 'primary' : 'outline'}
            onClick={() => {
              if (!submitting) saveProjectMentor();
            }}
          />
        </div>
      </div>
    </Paper>
  );
}
