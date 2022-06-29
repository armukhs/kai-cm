import { Box, Button, Checkbox, LoadingOverlay, Paper, Table } from '@mantine/core';
import ButtonXS from 'components/ButtonXS';
import DaftarUnitTerdampak from 'components/DaftarUnitTerdampak/DaftarUnitTerdampak';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useEffect, useState } from 'react';
import { useStyles } from './ItemPerubahan.styles';

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
  mutate: () => void;
  onClick: () => void;
}) {
  const { classes, cx } = useStyles();

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handelDelete() {
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

  function daftarIdTerdampak() {
    const array: string[] = [];
    data.UnitPerubahan.forEach((unit: { unitId: string }) => array.push(unit.unitId));
    return array;
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
                <DaftarUnitTerdampak ids={daftarIdTerdampak()} units={units} />
              </td>
            </tr>
            <tr>
              <td className={classes.tdLeft}>PIC Perubahan:</td>
              <td style={{ fontWeight: 500 }}>
                {pic(data.picId) ? pic(data.picId)?.nama : '(belum ditentukan)'}
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
                      onClick={handelDelete}
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
