import React, { useState } from "react";
import { axios } from "@/server";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import AsyncSelect from "react-select/async";

interface IAutocompleteStock {
  onChange?: (payload: any) => any;
  placeholder?: string;
  style?: React.CSSProperties;
}

const AutocompleteStock = (props: IAutocompleteStock) => {
  const { mutateAsync: handleSearchStock } = useMutation(
    ({ textSearch }: { textSearch: string }) => {
      return axios({
        method: "GET",
        url: "/table",
        params: {
          table: "stocks",
          search: {
            code: textSearch,
          },
        },
      });
    }
  );

  const [selected, setSelected] = useState(null);

  const { onChange, placeholder = "Thêm mã cổ phiếu", style = {} } = props;

  const loadOptions = debounce((inputValue: string, callback: any) => {
    handleSearchStock({ textSearch: inputValue }).then((res: any) => {
      callback(res?.data?.records);
    });
  }, 300);

  return (
    <AsyncSelect
      placeholder={placeholder}
      onChange={(data) => {
        onChange(data);
        setSelected(data);
      }}
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          ...style,
        }),
      }}
      getOptionLabel={(ops: any) => ops?.code}
      getOptionValue={(ops: any) => ops?.code}
      cacheOptions
      loadOptions={loadOptions}
      value={selected}
    />
  );
};

export default React.memo(AutocompleteStock);
