import { Controller } from "react-hook-form";
import { View } from "react-native";
import React from "react";
import { CInput } from "@/components";
import { InputProps } from "@/components/TextInput";

interface InputHookFormProps extends Omit<InputProps, "value"> {
  control: any;
  name: string;
  defaultValue?: any;
  placeholder?: string;
  valueConverter?: (value: any) => string;
}

const InputHookForm = React.forwardRef((props: InputHookFormProps, ref) => {
  const { control, name, defaultValue, placeholder, valueConverter } = props;

  return (
    <View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <CInput
              value={valueConverter ? valueConverter(value) : value?.toString()}
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder={placeholder}
              enableFocusChangeBorder={true}
              distanceBottom={8}
              {...props}
            />
          );
        }}
        name={name}
        defaultValue={defaultValue}
      />
    </View>
  );
});

export default React.memo(InputHookForm);
