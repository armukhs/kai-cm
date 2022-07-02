import { Dispatch, useContext, useState } from 'react';
import { Box, Checkbox, LoadingOverlay, Paper, Table, Text } from '@mantine/core';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import ButtonXS from 'components/ButtonXS';
import DaftarUnitTerdampak, {
  ITerdampak,
} from 'components/DaftarUnitTerdampak/DaftarUnitTerdampak';
import UnitOrJabatan from 'components/UnitOrJabatan/UnitOrJabatan';
import { useStyles } from './ItemPerubahan.styles';
import { KeyedMutator } from 'swr';
import OrganizationContext from 'components/OrganizationProvider/OrganizationProvider';
import Block from 'components/Block';
import FormPerubahan from 'components/FormPerubahan/FormPerubahan';
import Datum from 'components/Datum/Datum';

export default function ItemPerubahan({
  data,
  index,
  mutate,
  canEdit = false,
  onEdit,
  setActiveTab,
}: {
  data: any;
  index: number;
  canEdit?: boolean;
  onEdit: Dispatch<boolean>;
  mutate: KeyedMutator<any>;
  setActiveTab: Dispatch<number>;
}) {
  const { units, jabatans } = useContext(OrganizationContext);

  const { classes, cx } = useStyles();

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function getJabatan(id: string) {
    return jabatans.find((j: any) => j.id == id);
  }

  async function handleDelete() {
    setSubmitting(true);
    try {
      const url = '/api/auth/post?subject=delete-perubahan';
      await fetchJson(url, createPostData({ id: data.id }));
      mutate();
      setDeleteDialog(false);
      setActiveTab(index > 0 ? index - 1 : 0);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  function daftarUnitTerdampak() {
    const daftar: ITerdampak[] = [];
    if (!units) return daftar; // Prevent missing `units` when refreshed manually
    data.UnitPerubahan.forEach((up: any) => {
      const unit = units.find((u) => u.id == up.unitId);
      if (unit) daftar.push({ kode: unit.kode, nama: unit.nama });
    });
    return daftar;
  }

  return (
    <div style={{ marginBottom: 30, position: 'relative' }}>
      <LoadingOverlay visible={submitting} />

      <Block mode="new" show={editing}>
        <FormPerubahan
          title={`Edit Rencana ${index + 1}`}
          data={data}
          pic={getJabatan(data.picId)}
          setActiveTab={setActiveTab}
          onCancel={() => {
            setEditing(false);
            onEdit(false);
          }}
        />
      </Block>

      <Block mode="new" show={!editing}>
        <Paper
          withBorder
          sx={(theme) => ({ borderColor: theme.colors.gray[5], overflow: 'hidden' })}
        >
          <Text p={14} weight={600}>
            Perubahan {index + 1}
          </Text>
          <Datum borderBottom borderTop label="Kondisi sekarang" value={data.kondisi} />
          <Datum borderBottom label="Bentuk Perubahan" value={data.perubahan} />
          <Datum
            borderBottom
            label="Unit Terdampak"
            value={<DaftarUnitTerdampak daftar={daftarUnitTerdampak()} />}
          />
          <Datum
            borderBottom
            label="PIC Perubahan"
            value={
              getJabatan(data.picId) ? (
                <UnitOrJabatan type="jabatan" uoj={getJabatan(data.picId)} />
              ) : (
                '---'
              )
            }
          />

          {canEdit && !deleteDialog && (
            <Datum
              borderBottom
              value={
                <Box py={5}>
                  <ButtonXS
                    type="dark"
                    label="Edit Rencana"
                    sx={{ marginRight: 10 }}
                    onClick={() => {
                      setEditing(true);
                      onEdit(true);
                    }}
                  />
                  <ButtonXS
                    type="red"
                    label="Delete"
                    sx={{}}
                    onClick={() => setDeleteDialog(true)}
                  />
                </Box>
              }
            />
          )}
          {deleteDialog && (
            <Datum
              borderBottom
              value={
                <Box py={5}>
                  <Checkbox
                    label="Delete rencana ini"
                    checked={confirmDelete}
                    mb={6}
                    onChange={(event) => setConfirmDelete(event.currentTarget.checked)}
                  />
                  <ButtonXS
                    type="red"
                    disabled={!confirmDelete}
                    label="Delete"
                    sx={{ marginRight: 10 }}
                    onClick={handleDelete}
                  />
                  <ButtonXS
                    type="red-outline"
                    label="Cancel"
                    onClick={() => setDeleteDialog(false)}
                  />
                </Box>
              }
            />
          )}
        </Paper>
      </Block>
    </div>
  );
}
