import { Box, Button, Checkbox, LoadingOverlay, Paper, Table, Text } from '@mantine/core';
import ButtonXS from 'components/ButtonXS';
import DaftarUnitTerdampak from 'components/DaftarUnitTerdampak/DaftarUnitTerdampak';
import Pojo from 'components/Pojo';
import UnitOrJabatan from 'components/UnitOrJabatan/UnitOrJabatan';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import Link from 'next/link';
import { Dispatch, useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';

export default function ItemRencana({
  data,
  units,
  index,
  pic,
  mutate,
  canEdit = false,
  onClick,
  onDelete,
}: {
  data: any;
  units: any[];
  index: number;
  pic: (id: string) => any;
  canEdit?: boolean;
  mutate: KeyedMutator<any>;
  onClick: () => void;
  onDelete: Dispatch<number>;
}) {
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleDelete() {
    setSubmitting(true);
    try {
      const url = '/api/auth/post?subject=delete-rencana';
      await fetchJson(url, createPostData({ id: data.id }));
      mutate();
      setDeleteDialog(false);
      onDelete(index > 0 ? index - 1 : 0);
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  function daftarIdTerdampak() {
    const array: string[] = [];
    data.UnitRencana.forEach((unit: { unitId: string }) => array.push(unit.unitId));
    return array;
  }

  function parseAsLines(param: string) {
    const lines = param.split('\n');
    if (lines.length > 0) {
      return (
        <>
          {lines.map((l, index) => (
            <Text size="sm" my={5} key={index}>
              {l}
            </Text>
          ))}
        </>
      );
    }

    return <></>;
  }

  return (
    <div style={{ marginBottom: 30, position: 'relative' }}>
      <LoadingOverlay visible={submitting} />
      <Paper withBorder sx={(theme) => ({ borderColor: theme.colors.gray[5], overflow: 'hidden' })}>
        <Table fontSize={13.5}>
          <tbody style={{ verticalAlign: 'top' }}>
            <tr>
              <td colSpan={2} style={{ paddingLeft: 14, paddingRight: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Box my={5} style={{ flexGrow: 1 }}>
                    <strong>Rencana {index + 1}</strong>
                  </Box>
                  <div>
                    <Link href={`/progress/${data.id}`}>
                      <a style={{ color: 'blue' }}>Progress</a>
                    </Link>{' '}
                    ({data._count.Progress})
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ width: 120, paddingLeft: 14, whiteSpace: 'nowrap' }}>Kegiatan:</td>
              <td>{data.rencana}</td>
            </tr>
            <tr>
              <td style={{ width: 120, paddingLeft: 14, whiteSpace: 'nowrap' }}>Audien:</td>
              <td>{data.audien}</td>
            </tr>
            <tr>
              <td style={{ width: 120, paddingLeft: 14, whiteSpace: 'nowrap' }}>Waktu:</td>
              <td>{data.waktu}</td>
            </tr>
            <tr>
              <td style={{ width: 120, paddingLeft: 14, whiteSpace: 'nowrap' }}>Tempat:</td>
              <td>{data.tempat}</td>
            </tr>
            <tr>
              <td style={{ width: 120, paddingLeft: 14, whiteSpace: 'nowrap' }}>Tolok Ukur:</td>
              <td>{parseAsLines(data.tolokUkur)}</td>
            </tr>
            <tr>
              <td style={{ width: 120, paddingLeft: 14, whiteSpace: 'nowrap' }}>Unit Terdampak:</td>
              <td>
                <DaftarUnitTerdampak ids={daftarIdTerdampak()} units={units} />
              </td>
            </tr>
            <tr>
              <td style={{ width: 120, paddingLeft: 14, whiteSpace: 'nowrap' }}>Monitoring:</td>
              <td>{data.monitoring}</td>
            </tr>
            <tr>
              <td style={{ width: 120, paddingLeft: 14, whiteSpace: 'nowrap' }}>PIC Kegiatan:</td>
              <td>
                {/* {pic(data.picId) ? pic(data.picId)?.nama : '(belum ditentukan)'} */}
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
                      label="Edit Rencana"
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
