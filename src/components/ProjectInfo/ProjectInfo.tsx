import { Button, Paper, Table } from '@mantine/core';
import FormProject from 'components/FormProject/FormProject';
import Layout from 'components/Layout/Layout';
import { SessionUser } from 'lib/session';
import useAuthApi from 'lib/useAuthApi';
import { useEffect, useState } from 'react';

export default function ProjectInfo({ user, project }: { user: SessionUser; project: any }) {
  const canEdit = user.id == project.managerId || user.id == project.staffId;
  const allowEdit = canEdit && project.tglKonfirmasi == null;
  const { data: syncData } = useAuthApi('project', project.id);

  const [data, setData] = useState(project);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (syncData) setData(syncData);
    return () => {};
  }, [syncData]);

  function fmDate(d: string) {
    const tgl = new Date(d);
    return tgl.toLocaleString('id-ID', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  return (
    <Layout title={`Project: ${project.judul}`} user={user} project={project}>
      <h2 style={{ marginTop: 0 }}>Project Info</h2>

      {!showForm && (
        <>
          <Paper withBorder sx={(theme) => ({ borderColor: theme.colors.gray[5] })}>
            <Table>
              <tbody style={{ verticalAlign: 'top' }}>
                <tr>
                  <td>Judul Proyek:</td>
                  <td>{data.judul}</td>
                </tr>
                <tr>
                  <td>Deskripsi:</td>
                  <td>{data.deskripsi}</td>
                </tr>
                <tr>
                  <td>Tanggal Mulai:</td>
                  <td>{data.tglMulai ? fmDate(data.tglMulai) : '-'}</td>
                  {/* toLocaleString('id-ID', {month:'long', day:'numeric', year:'numeric'}) */}
                </tr>
                <tr>
                  <td width={130}>Tanggal&nbsp;Selesai:</td>
                  <td>{data.tglSelesai ? fmDate(data.tglSelesai) : '-'}</td>
                  {/* <td>{data.tglMulai ? String(data.tglSelesai).substring(0, 10) : '-'}</td> */}
                </tr>
                <tr>
                  <td>Unit&nbsp;Pengampu:</td>
                  <td>{data.Unit.nama}</td>
                </tr>
                <tr>
                  <td width={130}>Manajer:</td>
                  <td>{data.Manager.nama}</td>
                </tr>
                <tr>
                  <td width={130}>Staf:</td>
                  <td>{data.Staff ? data.Staff.nama : '-'}</td>
                </tr>
                <tr>
                  <td width={130}>Pengawas:</td>
                  <td>{data.Mentor ? data.Mentor.nama : '-'}</td>
                </tr>
                <tr>
                  <td width={130}>Tujuan:</td>
                  <td>{data.tujuan || '-'}</td>
                </tr>
                <tr>
                  <td width={130}>Target:</td>
                  <td>{data.target || '-'}</td>
                </tr>
              </tbody>
            </Table>
          </Paper>
          {allowEdit && (
            <div style={{ marginTop: 20 }}>
              <Button
                style={{ fontWeight: 500 }}
                color="dark"
                radius={0}
                onClick={() => {
                  setShowForm(true);
                  window.scrollTo(0, 1);
                }}
              >
                Edit Project Info
              </Button>
            </div>
          )}
        </>
      )}

      {showForm && (
        <FormProject
          user={user}
          data={data}
          onCancel={() => {
            window.scrollTo(0, 0);
            setShowForm(false);
          }}
          callback={setData}
        />
      )}
    </Layout>
  );
}
