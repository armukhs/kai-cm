import { Box, Button, Checkbox, LoadingOverlay, Paper, Table } from '@mantine/core';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useEffect, useState } from 'react';

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
      {/* <Overlay opacity={0.4} color="#000" p={16}>
        <Box color="white">asas</Box>
      </Overlay> */}
      <LoadingOverlay visible={submitting} />
      <Paper withBorder sx={{ borderColor: '#ddd' }}>
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
                <td style={{ width: 150, paddingLeft: 14, whiteSpace: 'nowrap' }}>
                  Kondisi sekarang:
                </td>
                <td>{data.kondisi}</td>
              </tr>
            )}
            <tr>
              <td style={{ width: 150, paddingLeft: 14, whiteSpace: 'nowrap' }}>
                Bentuk Perubahan:
              </td>
              <td>{data.perubahan}</td>
            </tr>
            <tr>
              <td style={{ width: 150, paddingLeft: 14, whiteSpace: 'nowrap' }}>Unit Terdampak:</td>
              <td>
                <DaftarUnitTerdampak ids={daftarIdTerdampak()} units={units} />
              </td>
            </tr>
            <tr>
              <td style={{ width: 150, paddingLeft: 14, whiteSpace: 'nowrap' }}>PIC Perubahan:</td>
              <td>{pic(data.picId) ? pic(data.picId)?.nama : '(belum ditentukan)'}</td>
            </tr>
            {canEdit && !deleteDialog && (
              <tr style={{ backgroundColor: '#f8f8f8' }}>
                <td></td>
                <td>
                  <Box py={5}>
                    <Button size="xs" radius={0} color="dark" variant="filled" onClick={onClick}>
                      Edit Perubahan
                    </Button>
                    <Button
                      size="xs"
                      ml={10}
                      color="red"
                      sx={{ backgroundColor: 'white' }}
                      radius={0}
                      variant="outline"
                      onClick={() => {
                        setDeleteDialog(true);
                      }}
                    >
                      Delete Perubahan
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
                      label="Delete perubahan ini"
                      checked={confirmDelete}
                      onChange={(event) => setConfirmDelete(event.currentTarget.checked)}
                    />
                    <Button
                      disabled={!confirmDelete}
                      size="xs"
                      mt={6}
                      color="red"
                      variant="filled"
                      onClick={handelDelete}
                    >
                      Delete
                    </Button>
                    <Button
                      size="xs"
                      mt={6}
                      ml={10}
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
