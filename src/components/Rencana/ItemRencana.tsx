import { Box, Button, Checkbox, LoadingOverlay, Paper, Table, Text } from '@mantine/core';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ItemRencana({
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
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handelDelete() {
    setSubmitting(true);
    try {
      const url = '/api/auth/post?subject=delete-rencana';
      await fetchJson(url, createPostData({ id: data.id }));
      mutate();
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
              <td>{pic(data.picId) ? pic(data.picId)?.nama : '(belum ditentukan)'}</td>
            </tr>
            {canEdit && !deleteDialog && (
              <tr style={{ backgroundColor: '#f8f8f8' }}>
                <td></td>
                <td>
                  <Box py={5}>
                    <Button size="xs" radius={0} color="dark" variant="filled" onClick={onClick}>
                      Edit Rencana
                    </Button>
                    <Button
                      size="xs"
                      ml={10}
                      color="red"
                      radius={0}
                      variant="filled"
                      onClick={() => {
                        setDeleteDialog(true);
                      }}
                    >
                      Delete Rencana
                    </Button>
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
                      onChange={(event) => setConfirmDelete(event.currentTarget.checked)}
                    />
                    <Button
                      disabled={!confirmDelete}
                      size="xs"
                      mt={6}
                      color="red"
                      radius={0}
                      variant="filled"
                      onClick={handelDelete}
                    >
                      Delete
                    </Button>
                    <Button
                      size="xs"
                      mt={6}
                      ml={10}
                      radius={0}
                      color="red"
                      variant="outline"
                      onClick={() => {
                        setConfirmDelete(false);
                        setDeleteDialog(false);
                      }}
                    >
                      Cancel
                    </Button>
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

function DaftarUnitTerdampak({ ids, units }: { ids: string[]; units: any[] }) {
  const [daftar, setDaftar] = useState<{ kode: string; nama: string }[]>([]);
  useEffect(() => {
    if (units) {
      setDaftar(units.filter((u) => ids.includes(u.id)));
    }
  }, [ids]);

  return (
    <div>
      {daftar.map((d) => (
        <div key={d.kode}>
          {d.kode} - {d.nama}
        </div>
      ))}
    </div>
  );
}
