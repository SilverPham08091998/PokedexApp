import React from "react";
import { FlatList, StyleSheet, TouchableHighlight, View } from "react-native";
import { scale } from "react-native-utils-scale";
import { GET_COLORS } from "@/theme";
import { CText } from "@/components";
import { ReactNativeModal } from "react-native-modal";
import { BaseOption } from "@/type";

interface ActionSheetModalProps {
  isVisible: boolean;
  options: Array<BaseOption>;
  onCancel: () => void;
  onSelect: (value: number | string | boolean, index: number) => void;
  message?: string;
  title?: string;
  renderItemComponent?: (item: BaseOption, index: number) => React.ReactNode;
  renderButtonCancelComponent?: () => React.ReactNode;
  renderHeaderComponent?: () => React.ReactNode;
  underlayColor?: string;
}

const ActionSheetModal: React.FC<ActionSheetModalProps> = (
  props: ActionSheetModalProps
) => {
  const {
    isVisible,
    options,
    onCancel,
    onSelect,
    message,
    title,
    renderButtonCancelComponent,
    renderItemComponent,
    renderHeaderComponent,
    underlayColor = "#F4F4F4",
  } = props;

  const renderHeader = () => {
    if (renderHeaderComponent) {
      return renderHeaderComponent();
    }
    if (message || title) {
      return (
        <View>
          {title && (
            <View style={styles.titleBox}>
              <CText color={GET_COLORS().BLACK_3} fontSize={16}>
                {title}
              </CText>
            </View>
          )}
          {message && (
            <View style={styles.messageBox}>
              <CText color={GET_COLORS().BLACK_4} fontSize={14}>
                {message}
              </CText>
            </View>
          )}
          <View
            style={{
              width: "100%",
              backgroundColor: GET_COLORS().BORDER_1,
              height: scale(1),
              alignSelf: "center",
            }}
          />
        </View>
      );
    }
    return <View />;
  };

  const renderItem = (item: BaseOption, index: number) => {
    if (renderItemComponent) {
      return renderItemComponent(item, index);
    }
    return (
      <TouchableHighlight
        key={index}
        activeOpacity={1}
        underlayColor={underlayColor}
        style={styles.buttonAction}
        onPress={() => onSelect(item.value, index)}
      >
        <CText color={GET_COLORS().PRIMARY} fontSize={18} textAlign={"center"}>
          {item.label}
        </CText>
      </TouchableHighlight>
    );
  };

  const renderCancelButton = () => {
    if (renderButtonCancelComponent) {
      return renderButtonCancelComponent();
    }
    return (
      <TouchableHighlight
        activeOpacity={1}
        style={styles.buttonCancel}
        underlayColor={underlayColor}
        onPress={onCancel}
      >
        <CText color={GET_COLORS().RED} fontSize={18}>
          {"Cancel"}
        </CText>
      </TouchableHighlight>
    );
  };

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={styles.container}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      animationInTiming={200}
      animationOutTiming={200}
    >
      <View style={styles.overlay}>
        <View style={styles.containerList}>
          <FlatList
            scrollEnabled={false}
            style={{ borderRadius: scale(12) }}
            data={options}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: "100%",
                  backgroundColor: GET_COLORS().BORDER_1,
                  height: scale(1),
                  alignSelf: "center",
                }}
              />
            )}
            renderItem={({ item, index }) => {
              return <View>{renderItem(item, index)}</View>;
            }}
            ListHeaderComponent={() => <View>{renderHeader()}</View>}
            keyExtractor={(item, index) => `${item.label + index}`}
          />
        </View>
        {renderCancelButton()}
      </View>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {},

  containerList: {
    paddingHorizontal: scale(12),
    marginVertical: scale(12),
  },

  buttonAction: {
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GET_COLORS().WHITE,
  },
  buttonCancel: {
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GET_COLORS().WHITE,
    marginHorizontal: scale(12),
    marginBottom: scale(20),
    borderRadius: scale(12),
  },

  titleBox: {
    height: scale(40),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GET_COLORS().WHITE,
  },
  messageBox: {
    padding: scale(12),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: GET_COLORS().WHITE,
  },
});

export default React.memo(ActionSheetModal);
