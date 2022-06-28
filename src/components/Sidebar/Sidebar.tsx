import cfg from 'lib/config';
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
  const id = projectId;
  const links = isAdmin ? adminLinks : userLinks;

  if (projectId)
    return (
      <>
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}`} label="Project Info" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/proses`} label="Perubahan Proses" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/teknologi`} label="Perubahan Teknologi" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/struktur`} label="Perubahan Struktur" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/peran`} label="Perubahan Peran" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/budaya`} label="Perubahan Budaya" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/kompetensi`} label="Perubahan Kompetensi" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/lainnya`} label="Perubahan Lainnya" />
        <br />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/analisis`} label="Analisis" />
        <br />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/komunikasi`} label="Rencana Komunikasi" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/sponsorship`} label="Rencana Sponsorship" />
        <SidebarItem href={`${cfg.PROJECTPATH}/${id}/development`} label="Rencana Development" />
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
