import React from "react";
import * as CK from "@chakra-ui/react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

import "react-day-picker/dist/style.css";

interface IDatePicker {
  onSelected?: (date: Date) => any;
}

const DatePicker = (props: IDatePicker) => {
  const { onSelected } = props;
  const [selected, setSelected] = React.useState<any>();

  return (
    <CK.Popover>
      <CK.PopoverTrigger>
        <CK.Button>
          {selected ? format(selected, "dd/MM/yyyy") : "Chọn ngày"}
        </CK.Button>
      </CK.PopoverTrigger>
      <CK.PopoverContent>
        <CK.PopoverArrow />
        <CK.PopoverBody>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              setSelected(date);
              onSelected?.(date);
            }}
          />
        </CK.PopoverBody>
      </CK.PopoverContent>
    </CK.Popover>
  );
};

export default React.memo(DatePicker);
