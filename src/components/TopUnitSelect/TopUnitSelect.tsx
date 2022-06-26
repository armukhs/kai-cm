import { Button, Group } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

export default function TopUnitSelect({
  parents,
  selected,
  callback,
  effect,
}: {
  parents: any[];
  selected: string;
  callback: Dispatch<SetStateAction<string>>;
  effect?: () => void;
}) {
  return (
    <Group spacing={4}>
      {parents &&
        parents.map((unit) => (
          <Button
            key={unit.kode}
            color={unit.kode == selected ? 'blue' : 'gray'}
            size="xs"
            sx={{ width: 32, paddingLeft: 4, paddingRight: 4 }}
            onClick={() => {
              callback(unit.kode);
              if (effect) effect();
            }}
          >
            {unit.kode}
          </Button>
        ))}
    </Group>
  );
}
