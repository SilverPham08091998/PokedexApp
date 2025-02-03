import { Controller } from "react-hook-form";
import { View } from "react-native";
import React from "react";
import { DateTimerPicker } from "@/components";
import { DateTimePickerProps } from "@/components/DateTimePicker";

interface DateTimeHookFormProps extends Omit<DateTimePickerProps, "value"> {
  control: any;
  name: string;
  defaultValue?: any;
  placeholder?: string;
}

const DateTimeHookForm = (props: DateTimeHookFormProps) => {
  const { control, name, defaultValue, placeholder } = props;

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <DateTimerPicker
            onConfirm={onChange}
            distanceBottom={16}
            value={value}
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

export default React.memo(DateTimeHookForm);
