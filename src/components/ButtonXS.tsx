import { Button, DefaultProps, Sx } from '@mantine/core';

export default function ButtonXS({
  label,
  sx,
  type = 'primary',
  onClick,
}: {
  label: string;
  type?:
    | 'primary'
    | 'outline'
    | 'primary-outline'
    | 'dark'
    | 'dark-outline'
    | 'red'
    | 'red-outline';
  sx?: Sx | undefined;
  onClick?: () => void;
}) {
  const type_ = type == 'outline' ? 'primary-outline' : type;
  const color = type_.includes('-') ? type_.split('-')[0] : type_;
  const variant = type_.includes('outline') ? 'outline' : 'filled';
  return (
    <Button size="xs" radius={0} color={color} variant={variant} sx={sx} onClick={onClick}>
      {label}
    </Button>
  );
}
