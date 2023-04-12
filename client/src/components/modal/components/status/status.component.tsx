'use client';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import Select, { StylesConfig } from 'react-select';

import { boardApi } from '@/store/api/api.store';
import { Dispatch, SetStateAction } from 'react';

type OptionType = { value: string; label: string };
type OptionsType = Array<OptionType>;

type Props = {
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
};

export default function Status({ status, setStatus }: Props) {
  const router = useRouter();

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const { data: board } = boardApi.endpoints.getBoard.useQueryState(
    router.query.board as string
  );
  const options: OptionsType = [];

  if (board) {
    board.columns.forEach((column) =>
      options.push({
        value: column.id as string,
        label: column.name as string,
      })
    );
  }
  const onChangeHandler = (option: OptionType) => {
    setStatus(option.value);
  };

  const statusStyles: StylesConfig = {
    control: (base, { isFocused }) => ({
      ...base,
      backgroundColor: 'transparent',
      border: isFocused
        ? '1px solid #635fc7'
        : `1px solid ${currentTheme === 'dark' ? '#3E3F4E' : '#E4EBFA'}`,
      boxShadow: 'none',
      fontSize: 'calc((13 / 16) * 1rem)',
      lineHeight: 'calc((23 / 16) * 1rem)',
      cursor: 'pointer',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: `${currentTheme === 'dark' ? '#20212C' : '#ffffff'}`,
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
      color: `${currentTheme === 'dark' ? '#ffffff' : '#000112'}`,
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#635fc7',
    }),
    indicatorSeparator: (base) => ({
      ...base,
      backgroundColor: `${currentTheme === 'dark' ? '#3E3F4E' : '#E4EBFA'}`,
    }),
  };
  return (
    <div>
      <p className="body-medium mb-2 text-medium-grey dark:text-white">
        Status
      </p>
      <Select
        options={options}
        defaultValue={options.find((item) => item.value === status)}
        isSearchable={false}
        styles={statusStyles}
        onChange={(e) => onChangeHandler(e as OptionType)}
      />
    </div>
  );
}
