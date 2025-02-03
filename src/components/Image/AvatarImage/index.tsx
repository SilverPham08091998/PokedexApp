import { UserProfileType } from "@/type";
import { ActionSheetModal, CImage, CText } from "@/components";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { STRING_CONVERTER } from "@/util/function";
import React, { useState } from "react";
import { scale } from "react-native-utils-scale";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { GET_COLORS } from "@/theme";
import { ImageStyle } from "react-native-fast-image";

interface Props {
  profile?: UserProfileType;
  onUpload: (image: ImageOrVideo) => void;
  isDisableAvatar: boolean;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  fontSizeTextImage?: number;
  textImageStyle?: TextStyle;
}

const AvatarImage = (props: Props) => {
  const {
    profile,
    isDisableAvatar,
    onUpload,
    containerStyle,
    imageStyle = {},
    fontSizeTextImage,
    textImageStyle,
  } = props;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const fullName = `${profile?.firstName} ${profile?.middleName} ${profile?.lastName}`;

  const handleOnPress = (index: number) => {
    switch (index) {
      case 0:
        ImagePicker.openPicker({
          width: 200,
          height: 200,
          cropping: false,
        }).then((image) => {
          onUpload(image);
        });
        break;

      case 1:
        ImagePicker.openCamera({
          width: 200,
          height: 200,
          cropping: true,
        }).then((image) => {
          onUpload(image);
        });
        break;
      default:
        break;
    }
  };
  const renderAvatar = () => {
    if (profile?.resourceUrl) {
      return (
        <CImage
          source={{ uri: profile.resourceUrl }}
          style={[styles.imageStyle, imageStyle]}
          resizeMode={"cover"}
        />
      );
    }
    return (
      <View
        style={{
          ...styles.imageStyle,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: STRING_CONVERTER.stringHashToHsl(
            STRING_CONVERTER.computedText(fullName)
          ),
          ...imageStyle,
        }}
      >
        <CText
          color={GET_COLORS().BLACK_4}
          fontSize={fontSizeTextImage || 12}
          style={textImageStyle}
        >
          {""}
        </CText>
      </View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        disabled={isDisableAvatar}
        onPress={() => setIsVisible(true)}
      >
        {renderAvatar()}
      </TouchableOpacity>
      <ActionSheetModal
        isVisible={isVisible}
        title={"Which one do you like ?"}
        options={[
          { label: "Choose image library", value: 1 },
          { label: "Choose launch camera", value: 2 },
        ]}
        onSelect={(value, index) => {
          handleOnPress(index);
        }}
        onCancel={() => {
          setIsVisible(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    width: scale(30),
    height: scale(30),
    marginRight: scale(8),
    borderRadius: scale(100),
  },
});

export default React.memo(AvatarImage);
