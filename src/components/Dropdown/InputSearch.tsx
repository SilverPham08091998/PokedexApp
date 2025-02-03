import React, { useEffect } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { scale } from "react-native-utils-scale";
import { InputHookForm } from "@/components";
import { GET_COLORS } from "@/theme";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useForm } from "react-hook-form";

interface Props {
  isSearchable: boolean;
  searchContainerStyle?: ViewStyle;
  titleSearch?: string;
  searchPlaceholder?: string;
  onFilterData?: (search: string) => void;
  defaultValues?: string;
}

const InputSearch: React.FC<Props> = (props: Props) => {
  const {
    isSearchable,
    searchContainerStyle,
    titleSearch = "Tìm kiếm",
    searchPlaceholder,
    onFilterData,
    defaultValues = "",
  } = props;

  const { control, getValues, setValue } = useForm({
    defaultValues: { search: defaultValues },
  });

  useEffect(() => {
    setValue("search", defaultValues);
  }, [defaultValues]);
  const onFilter = () => {
    onFilterData && onFilterData(getValues().search.toLowerCase());
  };
  if (isSearchable) {
    return (
      <View style={{ marginHorizontal: scale(24) }}>
        <InputHookForm
          titleStyle={{ color: GET_COLORS().BLACK_4 }}
          defaultValue={""}
          title={titleSearch}
          control={control}
          name={"search"}
          clearButton={true}
          onBlur={onFilter}
          onEndEditing={onFilter}
          onClearButton={() => {
            setValue("search", "");
            onFilter();
          }}
          leading={
            <Ionicons
              name="search"
              size={scale(20)}
              color={GET_COLORS().BLACK_4}
            />
          }
          placeholder={searchPlaceholder}
          enableFocusChangeBorder={false}
          containerStyle={[styles.container, searchContainerStyle]}
          distanceBottom={4}
          inputStyle={{ paddingHorizontal: scale(12) }}
        />
      </View>
    );
  }
  return <View style={{ height: scale(12) }} />;
};

export default InputSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GET_COLORS().BACKGROUND_GRAY,
    borderBottomWidth: 0,
    paddingHorizontal: scale(8),
    marginTop: scale(4),
    borderRadius: scale(12),
    alignItems: "center",
  },
});
