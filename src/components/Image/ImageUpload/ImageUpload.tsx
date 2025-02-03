import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ActionSheetModal, CImage, CText } from "@/components";
import React, { useCallback, useEffect, useState } from "react";
import { scale } from "react-native-utils-scale";
import { DEVICE_WIDTH } from "@/util/constants";
import { GET_COLORS, TYPE } from "@/theme";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";

interface Props {
  url: string | null;
  sortOrder: number;
  height: number;
  width: number;
  reasons?: string;
  isApproved?: boolean;
  onUploadImage: (image: ImageOrVideo) => void;
}

const ImageUpload: React.FC<Props> = (props: Props) => {
  const { url, isApproved, sortOrder, width, height, reasons, onUploadImage } =
    props;

  const [uri, setUri] = useState<string | null>(url);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  useEffect(() => {
    setUri(url);
  }, [url]);

  const renderImage = useCallback(() => {
    if (uri != null) {
      return (
        <TouchableOpacity
          disabled={isApproved}
          onPress={() => {
            setActionSheetVisible(true);
          }}
        >
          <CImage
            style={[styles.image, { width: width, height: height }]}
            source={{ uri: uri }}
            resizeMode={"cover"}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={[styles.button, { width: width, height: height }]}
        onPress={() => {
          setActionSheetVisible(true);
        }}
      >
        <CImage style={{ width: 24, height: 24 }} />
      </TouchableOpacity>
    );
  }, [uri]);

  const renderNote = (
    titleName: string,
    content: string | number | undefined,
    textColor: string,
    dotColor: string
  ) => {
    return (
      <View style={{ flexDirection: "row", marginBottom: scale(4) }}>
        <View style={{ ...styles.dot, backgroundColor: dotColor }} />
        <CText distanceBottom={8} distanceTop={8}>
          <CText
            textDecorationLine={"underline"}
            color={textColor}
            fontFamily={TYPE.ITALIC}
          >
            {titleName}
          </CText>
          <CText color={textColor} fontFamily={TYPE.ITALIC}>
            {content}
          </CText>
        </CText>
      </View>
    );
  };

  const handleCancel = () => {
    setActionSheetVisible(false);
  };

  const handleOnPress = (index: number) => {
    switch (index) {
      case 0:
        ImagePicker.openPicker({
          width: 200,
          height: 200,
          cropping: false,
        }).then((image) => {
          onUploadImage(image);
        });
        break;

      case 1:
        ImagePicker.openCamera({
          width: 200,
          height: 200,
          cropping: true,
        }).then((image) => {
          onUploadImage(image);
        });
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {renderImage()}
      {renderNote(
        "Hình:",
        ` ${sortOrder}`,
        GET_COLORS().BLACK_3,
        GET_COLORS().BLACK_4
      )}
      {reasons &&
        renderNote("Lý do:", reasons, GET_COLORS().RED, GET_COLORS().RED)}
      <ActionSheetModal
        isVisible={actionSheetVisible}
        message={"Which one do you like ?"}
        options={[
          { label: "Choose image library", value: 0 },
          { label: "Choose launch camera", value: 1 },
        ]}
        onCancel={handleCancel}
        onSelect={(value, index) => handleOnPress(index)}
      />
    </View>
  );
};

export default React.memo(ImageUpload);

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(24),
    borderBottomWidth: 1,
    borderColor: GET_COLORS().TEXT_LINE,
  },
  image: {
    width: scale(DEVICE_WIDTH - 48),
    height: scale(250),
    alignSelf: "center",
  },
  button: {
    borderStyle: "dashed",
    borderWidth: 1,
    width: scale(DEVICE_WIDTH - 48),
    height: scale(250),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(12),
    alignSelf: "center",
  },
  dot: {
    width: scale(4),
    height: scale(4),
    backgroundColor: GET_COLORS().BLACK_4,
    marginHorizontal: scale(4),
    borderRadius: scale(32),
    marginTop: scale(15),
  },
});
