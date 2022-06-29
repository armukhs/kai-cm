import { useState } from 'react';
import { Box, Checkbox, LoadingOverlay, Paper, Table } from '@mantine/core';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import ButtonXS from 'components/ButtonXS';
import DaftarUnitTerdampak, {
  ITerdampak,
} from 'components/DaftarUnitTerdampak/DaftarUnitTerdampak';
import UnitOrJabatan from 'components/UnitOrJabatan/UnitOrJabatan';
import { useStyles } from './ItemPerubahan.styles';
import { KeyedMutator } from 'swr';

export default function ItemPerubahan({
  data,
  units,
  index,
  pic,
  mutate,
  canEdit = false,
  onClick,
}: {
  data: any;
  units: any[];
  index: number;
  pic: (id: string) => any;
  canEdit?: boolean;
  mutate: KeyedMutator<any>;
  onClick: () => void;
}) {
  const { classes, cx } = useStyles();

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleDelete() {
    setSubmitting(true);
    try {
      const url = '/api/auth/post?subject=delete-perubahan';
      await fetchJson(url, createPostData({ id: data.id }));
      mutate();
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
      <Paper withBorder sx={(theme) => ({ borderColor: theme.colors.gray[5], overflow: 'hidden' })}>
        <Table fontSize={13.5}>
          <tbody style={{ verticalAlign: 'top' }}>
            <tr>
              <td colSpan={2} style={{ paddingLeft: 14, paddingRight: 14 }}>
                <Box my={5}>
                  <strong>Perubahan {index + 1}</strong>
                </Box>
              </td>
            </tr>
            {data.kondisi && (
              <tr>
                <td className={classes.tdLeft}>Kondisi sekarang:</td>
                <td>{data.kondisi}</td>
              </tr>
            )}
            <tr>
              <td className={classes.tdLeft}>Bentuk Perubahan:</td>
              <td>{data.perubahan}</td>
            </tr>
            <tr>
              <td className={classes.tdLeft}>Unit Terdampak:</td>
              <td>
                <DaftarUnitTerdampak daftar={daftarUnitTerdampak()} />
              </td>
            </tr>
            <tr>
              <td className={classes.tdLeft}>PIC Perubahan:</td>
              <td>
                {pic(data.picId) ? <UnitOrJabatan type="jabatan" uoj={pic(data.picId)} /> : '---'}
              </td>
            </tr>
            {canEdit && !deleteDialog && (
              <tr style={{ backgroundColor: '#f8f8f8' }}>
                <td></td>
                <td>
                  <Box py={5}>
                    <ButtonXS
                      type="dark"
                      label="Edit Perubahan"
                      sx={{ marginRight: 10, marginBottom: 10 }}
                      onClick={onClick}
                    />
                    <ButtonXS
                      type="red"
                      label="Delete"
                      sx={{ marginBottom: 10 }}
                      onClick={() => setDeleteDialog(true)}
                    />
                  </Box>
                </td>
              </tr>
            )}
            {deleteDialog && (
              <tr style={{ backgroundColor: '#f8f8f8' }}>
                <td></td>
                <td>
                  <Box py={5}>
                    <Checkbox
                      label="Delete perubahan ini"
                      checked={confirmDelete}
                      mb={8}
                      onChange={(event) => setConfirmDelete(event.currentTarget.checked)}
                    />
                    <ButtonXS
                      type="red"
                      disabled={!confirmDelete}
                      label="Delete"
                      sx={{ marginRight: 10, marginBottom: 10 }}
                      onClick={handleDelete}
                    />
                    <ButtonXS
                      type="red-outline"
                      label="Cancel"
                      sx={{ marginBottom: 10 }}
                      onClick={() => {
                        setConfirmDelete(false);
                        setDeleteDialog(false);
                      }}
                    />
                  </Box>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Paper>
    </div>
  );
}
