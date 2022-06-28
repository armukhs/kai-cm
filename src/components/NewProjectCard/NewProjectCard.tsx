import { KeyedMutator } from 'swr';
import { Box, Button, LoadingOverlay, Paper, Select, Text } from '@mantine/core';
import { LayersIcon } from '@modulz/radix-icons';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { Dispatch, useState } from 'react';
import { useStyles } from './NewProjectCard.styles';
import ButtonXS from 'components/ButtonXS';

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
        <div style={{ marginLeft: 40 }}>
          <Text size="xs" color="gray">
            {project.Unit.nama}
          </Text>
          <Text size="md" weight={400} className={classes.title}>
            {project.judul}
          </Text>
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
