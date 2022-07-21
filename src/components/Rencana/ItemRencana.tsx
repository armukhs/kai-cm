import { Dispatch, useContext, useState } from 'react';
import { KeyedMutator } from 'swr';
import { Box, Button, Checkbox, LoadingOverlay, Paper, Tabs, Text } from '@mantine/core';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import Block from 'components/Block';
import ButtonXS from 'components/ButtonXS';
import DaftarUnitTerdampak, {
  ITerdampak,
} from 'components/DaftarUnitTerdampak/DaftarUnitTerdampak';
import Datum from 'components/Datum/Datum';
import FlatTabs from 'components/FlatTabs/FlatTabs';
import FormRencana from 'components/FormRencana/FormRencana';
import OrganizationContext from 'components/OrganizationProvider/OrganizationProvider';
import Pojo from 'components/Pojo';
import UnitOrJabatan from 'components/UnitOrJabatan/UnitOrJabatan';
import Komentar from 'components/Komentar/Komentar';
import Progress from 'components/Progress/Progress';
import SessionContext from 'components/SessionProvider/SessionProvider';

interface IRencana {
  id: string;
  projectId: string;
  picId: string;
  type: string;
  rencana: string;
  audien: string;
  waktu: string;
  tempat: string;
  tolokUkur: string;
  monitoring: string;
  // created: string;
  // updated: string;
}

export default function ItemRencana({
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
  const { sessionUser: user } = useContext(SessionContext);
  const { units, jabatans } = useContext(OrganizationContext);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [checked, setChecked] = useState(data.tglKonfirmasi != null);
  const [selesai, setSelesai] = useState(data.tglSelesai != null);

  function getJabatan(id: string) {
    return jabatans.find((j: any) => j.id == id);
  }

  async function handleDelete() {
    setSubmitting(true);
    try {
      const url = '/api/auth/post?subject=delete-rencana';
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
    data.UnitRencana.forEach((up: any) => {
      const unit = units.find((u) => u.id == up.unitId);
      if (unit) daftar.push({ kode: unit.kode, nama: unit.nama });
    });
    return daftar;
  }

  function parseAsLines(param: string) {
    const lines = param.split('\n');
    if (lines.length > 0) {
      return (
        <ul style={{ margin: 0, paddingLeft: 0, listStylePosition: 'inside' }}>
          {lines.map((l, index) => (
            <li key={index} style={{ marginTop: index == 0 ? 0 : 4 }}>
              {l}
            </li>
          ))}
        </ul>
      );
    }

    return <></>;
  }

  async function confirmRencana() {
    try {
      const url = `/api/auth/post?subject=confirm-rencana`;
      await fetchJson(url, createPostData({ id: data.id, confirm: checked }));
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmProgress() {
    try {
      const url = `/api/auth/post?subject=confirm-progress`;
      await fetchJson(url, createPostData({ id: data.id, confirm: selesai }));
      mutate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ marginBottom: 30, position: 'relative' }}>
      <LoadingOverlay visible={submitting} />

      <Block mode="new" show={editing}>
        <FormRencana
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
        <FlatTabs position="center" grow>
          <Tabs.Tab label="Data Rencana">
            <Paper
              withBorder
              sx={(theme) => ({ borderColor: theme.colors.gray[5], overflow: 'hidden' })}
            >
              <Text p={14} weight={600}>
                Rencana {index + 1}
              </Text>
              <Datum borderBottom borderTop label="Kegiatan" value={data.rencana} />
              <Datum borderBottom label="Audien" value={data.audien} />
              <Datum borderBottom label="Waktu" value={data.waktu} />
              <Datum borderBottom label="Tempat" value={data.tempat} />
              <Datum borderBottom label="Tolok Ukur" value={parseAsLines(data.tolokUkur)} />
              <Datum borderBottom label="Monitoring" value={data.monitoring} />
              <Datum
                borderBottom
                label="PIC"
                value={
                  getJabatan(data.picId) ? (
                    <UnitOrJabatan type="jabatan" uoj={getJabatan(data.picId)} />
                  ) : (
                    '---'
                  )
                }
              />
              <Datum
                borderBottom
                label="Unit Terdampak"
                value={<DaftarUnitTerdampak daftar={daftarUnitTerdampak()} />}
              />

              {canEdit && data.tglKonfirmasi == null && !deleteDialog && (
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

            {user.roles.includes('mentor') && !data.tglKonfirmasi && (
              <div style={{ margin: '20px 0', padding: 15, border: '1px solid #ccc' }}>
                Tandai rencana ini sebagai final: {data.tglKonfirmasi}
                <div style={{ marginTop: 5, display: 'flex', gap: 10 }}>
                  <Checkbox
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                  />
                  <Button
                    size="xs"
                    radius={0}
                    color="dark"
                    disabled={!checked}
                    onClick={() => confirmRencana()}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            )}
            {data.tglKonfirmasi && (
              <div
                style={{
                  margin: '20px 0',
                  padding: 15,
                  border: '1px solid #ccc',
                  backgroundColor: '#eee',
                }}
              >
                Rencana ini telah dikonfirmasi pada: {data.tglKonfirmasi.substring(0, 10)}
              </div>
            )}

            <Komentar
              canAdd={data.tglKonfirmasi == null}
              type={data.type}
              projectId={data.projectId}
              targetId={data.id}
            />
          </Tabs.Tab>
          <Tabs.Tab label="Progress">
            <Progress rencana={data} canAdd={canEdit} />

            {user.roles.includes('mentor') && !data.tglSelesai && (
              <div style={{ margin: '20px 0', padding: 15, border: '1px solid #ccc' }}>
                Tandai progress ini sebagai final: {data.tglSelesai}
                <div style={{ marginTop: 5, display: 'flex', gap: 10 }}>
                  <Checkbox
                    checked={selesai}
                    onChange={(event) => setSelesai(event.currentTarget.checked)}
                  />
                  <Button
                    size="xs"
                    radius={0}
                    color="dark"
                    disabled={!selesai}
                    onClick={() => confirmProgress()}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            )}
            {data.tglSelesai && (
              <div
                style={{
                  margin: '20px 0',
                  padding: 15,
                  border: '1px solid #ccc',
                  backgroundColor: '#eee',
                }}
              >
                Progress ini telah dinyatakan selesai (closed):{' '}
                {data.tglKonfirmasi.substring(0, 10)}
              </div>
            )}

            <Komentar
              canAdd={data.tglSelesai == null}
              type={`progres-${data.type}`}
              projectId={data.projectId}
              targetId={data.id}
            />
          </Tabs.Tab>
        </FlatTabs>
      </Block>
      {/* <Pojo object={data} /> */}
    </div>
  );
}
