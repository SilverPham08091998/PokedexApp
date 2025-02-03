import React, { forwardRef } from "react";
import { Control, Controller } from "react-hook-form";
import { View } from "react-native";
import { CDropdown } from "@/components";
import { BaseOption } from "@/type";
import { DropdownProps } from "@/components/Dropdown";

interface DropdownHookFormProps<T extends BaseOption>
  extends Omit<DropdownProps<T>, "value"> {
  control: Control<any>;
  name: string;
  defaultValue?: string | number | boolean | any;
  placeholder?: string;
  valueConverter?: (value: any) => T | undefined;
}

const DropdownHookForm = <T extends BaseOption>(
  props: DropdownHookFormProps<T>,
  ref: React.Ref<any>
): React.ReactElement => {
  const { control, name, defaultValue, placeholder, valueConverter } = props;
  return (
    <View ref={ref}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <CDropdown
            onChangeValue={(value) => onChange(value)}
            distanceBottom={16}
            singleValue={valueConverter ? valueConverter(value) : value}
            multipleValues={value}
            placeholder={placeholder}
            {...props}
          />
        )}
        name={name}
        defaultValue={defaultValue}
      />
    </View>
  );
};

export default React.memo(forwardRef(DropdownHookForm)) as <
  T extends BaseOption
>(
  props: DropdownHookFormProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement;
