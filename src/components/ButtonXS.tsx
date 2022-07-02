import { Button, DefaultProps, Sx } from '@mantine/core';

export default function ButtonXS({
  label,
  sx,
  type = 'primary',
  submit = false,
  disabled = false,
  onClick,
}: {
  label: string;
  submit?: boolean;
  type?:
    | 'primary'
    | 'outline'
    | 'primary-outline'
    | 'dark'
    | 'dark-outline'
    | 'red'
    | 'red-outline';
  sx?: Sx | undefined;
  disabled?: boolean;
  onClick?: () => void;
}) {
  const type_ = type == 'outline' ? 'primary-outline' : type;
  const color = type_.includes('-') ? type_.split('-')[0] : type_;
  const variant = type_.includes('outline') ? 'outline' : 'filled';
  return (
    <Button
      disabled={disabled}
      size="xs"
      type={submit ? 'submit' : 'button'}
      radius={0}
      color={color}
      variant={variant}
      sx={sx}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
