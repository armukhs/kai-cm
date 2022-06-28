// import { useStyles } from './Sidebar.styles';
import SidebarItem from './SidebarItem';

const adminLinks = [
  { href: `/projects`, label: 'Projects' },
  { href: `/users`, label: 'Users' },
  { href: `/invitations`, label: 'Invitations' },
  { href: `/profile`, label: 'Profile' },
];
const userLinks = [
  { href: `/projects`, label: 'Projects' },
  { href: `/profile`, label: 'Profile' },
];

export default function Sidebar({ isAdmin, projectId }: { isAdmin: boolean; projectId?: any }) {
  // const { classes, cx } = useStyles();
  const links = isAdmin ? adminLinks : userLinks;

  if (projectId)
    return (
      <>
        <SidebarItem href={`/csr/${projectId}`} label="Project Info" />
        <SidebarItem href={`/csr/${projectId}/proses`} label="Perubahan Proses" />
        <SidebarItem href={`/csr/${projectId}/teknologi`} label="Perubahan Teknologi" />
        <SidebarItem href={`/csr/${projectId}/struktur`} label="Perubahan Struktur" />
        <SidebarItem href={`/csr/${projectId}/peran`} label="Perubahan Peran" />
        <SidebarItem href={`/csr/${projectId}/budaya`} label="Perubahan Budaya" />
        <SidebarItem href={`/csr/${projectId}/kompetensi`} label="Perubahan Kompetensi" />
        <SidebarItem href={`/csr/${projectId}/lainnya`} label="Perubahan Lainnya" />
        <br />
        <SidebarItem href={`/csr/${projectId}/analisis`} label="Analisis" />
        <br />
        <SidebarItem href={`/csr/${projectId}/komunikasi`} label="Rencana Komunikasi" />
        <SidebarItem href={`/csr/${projectId}/sponsorship`} label="Rencana Sponsorship" />
        <SidebarItem href={`/csr/${projectId}/development`} label="Rencana Development" />
      </>
    );

  return (
    <>
      {links.map((link) => (
        <SidebarItem key={link.href} label={link.label} href={link.href} />
      ))}
    </>
  );
}
