import React from "react";
import {
  ImageProperties,
  StyleProp,
  TouchableWithoutFeedback,
} from "react-native";
import FastImage, { ImageStyle } from "react-native-fast-image";

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

const defaultImage = require("../../../assets/images/health-shohi.png");

interface ImageProps {
  source?: any;
  url?: string;
  style?: StyleProp<ImageStyle>;
  resizeMode?: "contain" | "cover" | "stretch" | "repeat" | "center";
  onPress?: any;
  touch?: boolean;
  defaultImg?: any;
  disableDefault?: boolean;
  tintColor?: string;
}

type Props = Merge<ImageProperties, ImageProps>;

const ComponentImage = (props: Props) => {
  const [url, setUrl] = React.useState<any>("");
  const {
    style,
    source,
    resizeMode,
    onPress,
    touch,
    url: propsUrl,
    defaultImg,
    disableDefault,
    tintColor,
  } = props;

  const defImg = disableDefault ? null : defaultImg || defaultImage;

  React.useEffect(() => {
    let data = defImg;
    if (propsUrl && propsUrl !== "null") {
      if (propsUrl.includes("http") || propsUrl.includes("https")) {
        data = {
          uri: propsUrl,
        };
      }
    }
    if (source) {
      data = source;
    }
    setUrl(data);
  }, [propsUrl, source]);

  const image = (
    <FastImage
      style={style}
      source={url}
      resizeMode={
        resizeMode === "cover"
          ? FastImage.resizeMode.cover
          : FastImage.resizeMode.contain
      }
      onError={() => {
        setUrl(defImg);
      }}
      tintColor={tintColor ? tintColor : undefined}
    />
  );

  if (touch) {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {image}
      </TouchableWithoutFeedback>
    );
  }
  return image;
};

export default React.memo(ComponentImage);
