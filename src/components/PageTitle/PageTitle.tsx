import { Button } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { PlusIcon } from '@modulz/radix-icons';
import { useStyles } from './PageTitle.styles';

export default function PageTitle({
  title,
  button,
  clickHandler,
}: {
  title: string;
  button?: string;
  clickHandler?: () => void;
}) {
  const { classes, cx } = useStyles();
  const { ref, width } = useElementSize(); // 450
  const buttonText = () => {
    if (!width) return button;
    const array = button ? button.trim().split(' ') : [];
    const text1 = array.length > 0 ? array[0] : '';
    return width > 450 ? button : text1;
  };

  return (
    <div ref={ref} id="page-title" className={classes.wrapper}>
      <h2 className={classes.title}>{title}</h2>
      {button && (
        <div className={classes.buttonWrap}>
          <Button
            leftIcon={<PlusIcon />}
            color="indigo"
            className={classes.button}
            onClick={clickHandler}
          >
            {buttonText()}
          </Button>
        </div>
      )}
    </div>
  );
}
