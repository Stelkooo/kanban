'use client';

import { useEffect, Dispatch, SetStateAction } from 'react';

import Select, { StylesConfig } from 'react-select';

import { useAppSelector } from '@/store/hooks';
import { selectCurrentColumns } from '@/store/kanban/kanban.selector';

type OptionType = { value: number; label: string };
type OptionsType = Array<OptionType>;

const statusStyles: StylesConfig = {
  control: (base, { isFocused }) => ({
    ...base,
    backgroundColor: 'transparent',
    border: isFocused ? '1px solid #635fc7' : '1px solid #E4EBFA',
    boxShadow: 'none',
    fontSize: 'calc((13 / 16) * 1rem)',
    lineHeight: 'calc((23 / 16) * 1rem)',
    cursor: 'pointer',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
  }),
  option: (base) => ({
    ...base,
    color: '#828FA3',
    background: 'transparent',
    fontSize: 'calc((13 / 16) * 1rem)',
    lineHeight: 'calc((23 / 16) * 1rem)',
    cursor: 'pointer',
  }),
  singleValue: (base) => ({
    ...base,
    color: '#000112',
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: '#635fc7',
  }),
  indicatorSeparator: (base) => ({
    ...base,
    backgroundColor: '#E4EBFA',
  }),
};

type Props = {
  setStatus: Dispatch<SetStateAction<number>>;
};

export default function Status({ setStatus }: Props) {
  const columns = useAppSelector(selectCurrentColumns);

  const options: OptionsType = [];
  columns?.forEach((column) =>
    options.push({ value: column.id, label: column.name })
  );

  const onChangeHandler = (e: OptionType) => {
    setStatus(e.value);
  };

  useEffect(() => {
    if (options) setStatus(options[0].value);
  }, []);
  return (
    <div>
      <p className="body-medium mb-2 text-medium-grey">Status</p>
      <Select
        options={options}
        defaultValue={options[0]}
        isSearchable={false}
        styles={statusStyles}
        onChange={(e) => onChangeHandler(e as OptionType)}
      />
    </div>
  );
}
