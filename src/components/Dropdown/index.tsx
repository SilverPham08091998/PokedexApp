import React, { forwardRef, useLayoutEffect, useState } from "react";
import { scale } from "react-native-utils-scale";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Modal from "react-native-modal";
import { DEVICE_HEIGHT } from "@/util/constants";
import { GET_COLORS } from "@/theme";
import { BaseOption } from "@/type";
import Animated, {
  Extrapolation,
  interpolate,
  KeyboardState,
  useAnimatedKeyboard,
  useAnimatedStyle,
} from "react-native-reanimated";
import ItemContainer, {
  ItemContainerProps,
} from "@/components/Dropdown/ItemContainer";
import InputValueContainer from "@/components/Dropdown/InputValueContainer";
import HeaderModal from "@/components/Dropdown/HeaderModal";
import InputSearch from "@/components/Dropdown/InputSearch";
import { EmptyList } from "@/components/Pagination";

export interface DropdownProps<T extends BaseOption> {
  data: Array<T>;
  placeholder?: string;
  onChangeValue?: (value: T | undefined) => void;
  backgroundColor?: string;
  singleValue?: T;
  disabled?: boolean;
  isMultiple?: boolean;
  maxLength?: number;
  textStyle?: ViewStyle;
  title?: string;
  titleStyle?: TextStyle;
  distanceBottom?: number;
  textErrorStyle?: TextStyle;
  textError?: string;
  //search
  onSearch?: (search: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  //multiple
  multipleValues?: Array<T>;
  onRemoveMultipleValue?: (item: T) => void;
  onChangeMultipleValue?: (items: Array<T>) => void;
  searchContainerStyle?: ViewStyle;
  titleSearch?: string;

  renderItemContainer?: (props: ItemContainerProps<T>) => React.ReactElement;
}

const DropdownComponent = <T extends BaseOption>(
  props: DropdownProps<T>,
  ref: React.Ref<any>
): React.ReactElement => {
  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => {
    return {
      translateY: -keyboard.height.value,
      height: interpolate(
        keyboard.state.value,
        [
          KeyboardState.CLOSED,
          KeyboardState.CLOSING,
          KeyboardState.OPEN,
          KeyboardState.OPENING,
        ],
        [
          DEVICE_HEIGHT - 300,
          DEVICE_HEIGHT - 400,
          DEVICE_HEIGHT - 400,
          DEVICE_HEIGHT - 400,
        ],
        Extrapolation.CLAMP
      ),
    };
  });

  const {
    data,
    placeholder,
    singleValue,
    disabled = false,
    distanceBottom = 0,
    searchable = false,
    searchPlaceholder,
    onSearch,
    multipleValues,
    isMultiple = false,
    onChangeMultipleValue,
    onChangeValue,
    onRemoveMultipleValue,
    title,
    titleStyle,
    textErrorStyle,
    textError,
    searchContainerStyle,
    titleSearch,
    renderItemContainer,
  } = props;
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Array<T>>(data);
  const [valueSelected, setValueSelected] = useState<Array<T>>([]);
  const [selected, setSelected] = useState<T | undefined>(singleValue);

  useLayoutEffect(() => {
    setItems(data);
  }, [data]);

  useLayoutEffect(() => {
    if (multipleValues) {
      setValueSelected(multipleValues);
    }
  }, [multipleValues]);

  useLayoutEffect(() => {
    if (singleValue) {
      setSelected(singleValue);
    }
  }, [singleValue]);

  const onClose = () => {
    setOpen(false);
    setValueSelected([]);
    setSelected(undefined);
  };

  const onFilterData = (text: string) => {
    if (onSearch) {
      onSearch(text);
    } else {
      const newData = data.filter((item) =>
        item?.label.normalize().toLowerCase().includes(text)
      );
      setItems(newData);
    }
  };

  const onSelectValueMultiple = (item: T) => {
    const arr = [...valueSelected];
    const findIndex = arr.findIndex((value) => value.value === item.value);
    if (findIndex === -1) {
      arr.push(item);
    } else {
      arr.splice(findIndex, 1);
    }
    setValueSelected(arr);
  };
  const onSelectValue = (item: T) => {
    setSelected(item);
  };

  const renderItem = (item: T) => {
    const isSelected = isMultiple
      ? valueSelected.findIndex((i) => i?.value === item.value) !== -1
      : selected?.value === item.value;

    if (renderItemContainer) {
      return renderItemContainer({
        isSelected: isSelected,
        item: item,
        onChooseItem: () => {
          if (isMultiple) {
            onSelectValueMultiple(item);
          } else {
            onSelectValue(item);
          }
        },
        onClearItem: () => {
          if (isMultiple) {
            onSelectValueMultiple(item);
          } else {
            onSelectValue(item);
          }
        },
      });
    }
    return (
      <ItemContainer
        item={item}
        isSelected={isSelected}
        onChooseItem={() => {
          if (isMultiple) {
            onSelectValueMultiple(item);
          } else {
            onSelectValue(item);
          }
        }}
        onClearItem={() => {
          if (isMultiple) {
            onSelectValueMultiple(item);
          } else {
            onSelectValue(item);
          }
        }}
      />
    );
  };

  return (
    <View style={{ marginBottom: scale(distanceBottom) }}>
      <InputValueContainer
        multipleValues={valueSelected}
        singleValue={selected}
        isMultiple={isMultiple}
        placeholder={placeholder}
        disabled={disabled}
        onPressOpen={() => setOpen(true)}
        data={data}
        title={title}
        titleStyle={titleStyle}
        textErrorStyle={textErrorStyle}
        textError={textError}
        onRemoveMultipleValue={(item) => {
          onRemoveMultipleValue && onRemoveMultipleValue(item);
        }}
      />
      <Modal
        style={{ margin: 0, justifyContent: "flex-end" }}
        useNativeDriverForBackdrop
        isVisible={open}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        swipeDirection="down"
        propagateSwipe
        onBackdropPress={() => onClose()}
        onBackButtonPress={() => onClose()}
        onSwipeComplete={() => onClose()}
      >
        <Animated.View style={[{ ...styles.modalContainer }, translateStyle]}>
          <StatusBar
            backgroundColor="rgba(0,0,0,0.7)"
            barStyle="light-content"
          />
          <HeaderModal
            headerTitle={placeholder}
            onPressDone={() => {
              setOpen(false);
              setTimeout(() => {
                if (isMultiple) {
                  onChangeMultipleValue && onChangeMultipleValue(valueSelected);
                } else {
                  onChangeValue && onChangeValue(selected);
                }
              }, 350);
            }}
          />
          <FlatList
            removeClippedSubviews={false}
            data={items}
            renderItem={({ item }) => renderItem(item)}
            ListEmptyComponent={<EmptyList />}
            ListFooterComponent={<View style={{ height: scale(48) }} />}
            ListHeaderComponent={
              <InputSearch
                isSearchable={searchable}
                onFilterData={onFilterData}
                searchPlaceholder={searchPlaceholder}
                searchContainerStyle={searchContainerStyle}
                titleSearch={titleSearch}
              />
            }
          />
        </Animated.View>
      </Modal>
    </View>
  );
};

export default React.memo(forwardRef(DropdownComponent)) as <
  T extends BaseOption
>(
  props: DropdownProps<T> & { ref?: React.Ref<any> }
) => React.ReactElement;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: GET_COLORS().WHITE,
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    height: DEVICE_HEIGHT - 300,
  },
});
