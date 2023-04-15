'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import Select, { StylesConfig } from 'react-select';

import { boardApi } from '@/store/api/api.store';

type OptionType = { value: string; label: string };
type OptionsType = Array<OptionType>;

type Props = {
  status: string;
  func: (value: string) => void;
};

export default function Status({ status, func }: Props) {
  const router = useRouter();

  const [options, setOptions] = useState<OptionsType>([]);

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  const [getBoard] = boardApi.useLazyGetBoardQuery();

  const onChangeHandler = (option: OptionType) => {
    func(option.value);
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

  useEffect(() => {
    (async () => {
      if (router.query.board) {
        const board = await getBoard(
          router.query.board as string,
          true
        ).unwrap();
        if (board.columns)
          setOptions(
            board.columns.map((column) => {
              return {
                value: column._id as string,
                label: column.name as string,
              };
            })
          );
      }
    })();
  }, [getBoard, router.query.board]);
  return (
    <div>
      <p className="body-medium mb-2 text-medium-grey dark:text-white">
        Status
      </p>
      <Select
        options={options}
        value={options.find((item) => item.value === status)}
        isSearchable={false}
        styles={statusStyles}
        onChange={(e) => onChangeHandler(e as OptionType)}
      />
    </div>
  );
}
