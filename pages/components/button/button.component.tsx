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
};

export default function Button({
  children,
  btnStyle,
  isDisabled,
  isSubmit,
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
  if (btnStyle === 'secondary') classNames.push('bg-white', 'text-purple');
  if (btnStyle === 'destructive')
    classNames.push('bg-red', 'text-white', 'hover:bg-red-hover');
  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      disabled={isDisabled}
      className={classNames.join(' ')}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  isDisabled: false,
  isSubmit: false,
};
