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

export default function Sidebar({ isAdmin, project }: { isAdmin: boolean; project?: any }) {
  // const { classes, cx } = useStyles();
  const links = isAdmin ? adminLinks : userLinks;

  if (project)
    return (
      <>
        <SidebarItem href={`/project/${project.id}`} label="Project Info" />
        <SidebarItem href={`/project/${project.id}/proses`} label="Perubahan Proses" />
        <SidebarItem href={`/project/${project.id}/teknologi`} label="Perubahan Teknologi" />
        <SidebarItem href={`/project/${project.id}/struktur`} label="Perubahan Struktur" />
        <SidebarItem href={`/project/${project.id}/peran`} label="Perubahan Peran" />
        <SidebarItem href={`/project/${project.id}/budaya`} label="Perubahan Budaya" />
        <SidebarItem href={`/project/${project.id}/kompetensi`} label="Perubahan Kompetensi" />
        <SidebarItem href={`/project/${project.id}/lainnya`} label="Perubahan Lainnya" />
        <br />
        <SidebarItem href={`/project/${project.id}/analisis`} label="Analisis" />
        <br />
        <SidebarItem href={`/project/${project.id}/komunikasi`} label="Rencana Komunikasi" />
        <SidebarItem href={`/project/${project.id}/sponsorship`} label="Rencana Sponsorship" />
        <SidebarItem href={`/project/${project.id}/development`} label="Rencana Development" />
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
