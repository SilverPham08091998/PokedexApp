import React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CButton, CText } from "@/components";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import Modal from "react-native-modal";
import { scale } from "react-native-utils-scale";
import Animated from "react-native-reanimated";

interface Props {
  isShow: boolean;
  containerStyle?: ViewStyle;
  renderContent?: () => React.ReactNode;
  buttonStyle?: ViewStyle;
  onPress?: () => void;
  textButton?: string;
  isDisableButton?: boolean;
  textButtonStyle?: TextStyle;
  renderHeader?: () => React.ReactNode;
  titleHeader?: string;
  headerStyle?: ViewStyle;
  headerTextStyle?: ViewStyle;
  renderFooter?: () => React.ReactNode;
  onCloseModal: () => void;
  isShowHeader?: boolean;
  isShowFooter?: boolean;
  isSwipeDown?: boolean;
}

const CModal: React.FC<Props> = (props: Props) => {
  const {
    isShow,
    containerStyle = {},
    renderContent = null,
    buttonStyle = {},
    onPress = () => {},
    textButton = "Default",
    isDisableButton = false,
    renderFooter = null,
    renderHeader = null,
    titleHeader = "String",
    headerStyle = {},
    headerTextStyle = {},
    onCloseModal = () => {},
    isShowFooter = true,
    isShowHeader = true,
    isSwipeDown,
  } = props;
  const renderHeaderView = () => {
    if (renderHeader && isShowHeader) {
      return renderHeader();
    }
    if (isShowHeader) {
      return (
        <View style={[styles.header, headerStyle]}>
          <View style={styles.buttonCloseHeader} />
          <CText
            fontSize={18}
            fontWeight={"700"}
            color={GET_COLORS().BLACK_4}
            style={{ flex: 1, ...headerTextStyle }}
            textAlign={"center"}
          >
            {titleHeader}
          </CText>
          <TouchableOpacity
            style={styles.buttonCloseHeader}
            onPress={() => {
              onCloseModal();
            }}
          >
            <MaterialIcon
              name={"close"}
              size={24}
              color={COLORS_LIGHT.BORDER_2}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderFooterView = () => {
    if (renderFooter && isShowFooter) {
      return renderFooter();
    }
    if (isShowFooter) {
      return (
        <View
          style={{
            marginHorizontal: scale(24),
            marginBottom: scale(24),
          }}
        >
          <CButton
            onPress={onPress}
            title={textButton}
            disabled={isDisableButton}
            containerStyle={buttonStyle}
          />
        </View>
      );
    }
    return null;
  };
  const renderContentView = () => {
    if (renderContent != null) {
      return renderContent();
    }
    return <View />;
  };
  return (
    <Modal
      animationOutTiming={300}
      animationInTiming={300}
      isVisible={isShow}
      style={{ margin: 0, justifyContent: "flex-end" }}
      useNativeDriverForBackdrop
      animationIn="slideInUp"
      animationOut="slideOutDown"
      swipeDirection={isSwipeDown ? "down" : undefined}
      propagateSwipe={isSwipeDown}
      onBackdropPress={() => onCloseModal()}
      onBackButtonPress={() => onCloseModal()}
      onSwipeComplete={() => isSwipeDown && onCloseModal()}
    >
      <Animated.View style={{ ...styles.container, ...containerStyle }}>
        {renderHeaderView()}
        {renderContentView()}
        {renderFooterView()}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    borderTopRightRadius: scale(16),
    borderTopLeftRadius: scale(16),
    marginTop: scale(300),
    backgroundColor: GET_COLORS().WHITE,
  },
  viewRow: {
    flex: 1,
    paddingHorizontal: scale(16),
  },
  header: {
    flexDirection: "row",
    borderBottomColor: GET_COLORS().TEXT_LINE,
    alignItems: "center",
    paddingVertical: scale(8),
    paddingHorizontal: scale(4),
  },
  buttonCloseHeader: {
    width: scale(50),
    height: scale(50),
    alignItems: "center",
    justifyContent: "center",
  },
});

export default React.memo(CModal);
