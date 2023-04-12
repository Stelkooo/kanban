import { BeatLoader } from 'react-spinners';

type Props = {
  children: JSX.Element | JSX.Element[];
  btnStyle:
    | 'clear'
    | 'primaryLarge'
    | 'primarySmall'
    | 'secondary'
    | 'destructive'
    | 'disabledLight'
    | 'disabledDark';
  isDisabled?: boolean;
  isSubmit?: boolean;
  onClickFunc?: <T>(value?: T) => void;
  isLoading?: boolean;
};

export default function Button({
  children,
  btnStyle,
  isDisabled,
  isSubmit,
  onClickFunc,
  isLoading,
}: Props) {
  // base button style
  const classNames: string[] = [
    'inline-flex',
    'items-center',
    'justify-center',
    'gap-2',
  ];
  // add padding
  if (btnStyle !== 'clear') {
    classNames.push('rounded-3xl');
    if (btnStyle === 'primaryLarge') {
      classNames.push('py-3.5', 'px-4.5');
    } else {
      classNames.push('py-2.5', 'px-4.5');
    }
  }
  // adding colour
  if (btnStyle === 'primarySmall' || btnStyle === 'primaryLarge')
    classNames.push(
      'bg-purple',
      'text-white',
      'disabled:opacity-25',
      'hover:bg-purple-hover'
    );
  if (btnStyle === 'secondary') classNames.push('bg-light-grey', 'text-purple');
  if (btnStyle === 'destructive')
    classNames.push('bg-red', 'text-white', 'hover:bg-red-hover');
  // if disabled
  if (isDisabled) classNames.push('cursor-not-allowed');
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      disabled={isDisabled}
      className={classNames.join(' ')}
      onClick={onClickFunc}
    >
      {isLoading ? (
        <BeatLoader size={11} color="white" aria-label="Loading Spinner" />
      ) : (
        children
      )}
    </button>
  );
}

Button.defaultProps = {
  isDisabled: false,
  isSubmit: false,
  onClickFunc: null,
  isLoading: false,
};
