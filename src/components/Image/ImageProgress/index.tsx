import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageErrorEventData,
  ImageLoadEventData,
  ImageProgressEventDataIOS,
  ImageProps,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { IMAGE_URL } from "@/theme";

const styles = StyleSheet.create({
  centered: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F8FC",
  },
});

const DefaultIndicator = ActivityIndicator;

const getSourceKey = (source: any) => (source && source.uri) || String(source);

interface ImageProgressProps extends Omit<ImageProps, "style"> {
  children?: React.ReactNode;
  errorContainerStyle?: StyleProp<ViewStyle>;
  indicator?: React.ComponentType<any>;
  indicatorContainerStyle?: StyleProp<ViewStyle>;
  indicatorProps?: object;
  renderError?: (error: any) => React.ReactNode;
  renderIndicator?: (
    progress: number,
    indeterminate: boolean
  ) => React.ReactNode;
  source: any;
  style?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  threshold?: number;
}

export const createImageProgress = (
  ImageComponent: React.ComponentType<ImageProps>
) => {
  const ImageProgress: React.FC<ImageProgressProps> = ({
    children,
    errorContainerStyle = styles.centered,
    indicator,
    indicatorContainerStyle = styles.centered,
    indicatorProps,
    renderError,
    renderIndicator,
    source,
    style,
    threshold = 10,
    imageStyle,
    ...props
  }) => {
    const [state, setState] = useState<{
      sourceKey: any;
      error: any;
      loading: boolean;
      progress: number;
      thresholdReached: boolean;
      imageStyle: StyleProp<ImageStyle>[];
    }>({
      sourceKey: getSourceKey(source),
      error: null,
      loading: false,
      progress: 0,
      thresholdReached: !threshold,
      imageStyle: [StyleSheet.absoluteFill, imageStyle],
    });
    const ref = useRef<View>(null);
    const thresholdTimer = useRef<any>(null);

    useEffect(() => {
      if (threshold) {
        thresholdTimer.current = setTimeout(() => {
          setState((prevState) => ({
            ...prevState,
            thresholdReached: true,
          }));
        }, threshold);
      }

      return () => {
        if (thresholdTimer.current) {
          clearTimeout(thresholdTimer.current);
        }
      };
    }, [threshold]);

    useEffect(() => {
      const sourceKey = getSourceKey(source);
      if (sourceKey !== state.sourceKey) {
        setState({
          sourceKey,
          error: null,
          loading: false,
          progress: 0,
          thresholdReached: !threshold,
          imageStyle: [StyleSheet.absoluteFill, imageStyle],
        });
      }
      if (imageStyle !== state.imageStyle[1]) {
        setState((prevState) => ({
          ...prevState,
          imageStyle: [StyleSheet.absoluteFill, imageStyle],
        }));
      }
    }, [source, imageStyle, state.sourceKey, threshold]);

    const bubbleEvent = useCallback(
      (
        propertyName: string,
        event?: NativeSyntheticEvent<
          ImageLoadEventData | ImageErrorEventData | ImageProgressEventDataIOS
        >
      ) => {
        // @ts-ignore
        if (typeof props[propertyName] === "function") {
          // @ts-ignore
          props[propertyName](event);
        }
      },
      [props]
    );

    const handleLoadStart = useCallback(() => {
      if (!state.loading && state.progress !== 1) {
        setState((prevState) => ({
          ...prevState,
          error: null,
          loading: true,
          progress: 0,
        }));
      }
      bubbleEvent("onLoadStart");
    }, [state.loading, state.progress, bubbleEvent]);

    const handleProgress = useCallback(
      (event: NativeSyntheticEvent<ImageProgressEventDataIOS>) => {
        const progress = event.nativeEvent.loaded / event.nativeEvent.total;
        if (progress !== state.progress && state.progress !== 1) {
          setState((prevState) => ({
            ...prevState,
            progress,
          }));
        }
        bubbleEvent("onProgress", event);
      },
      [state.progress, bubbleEvent]
    );

    const handleError = useCallback(
      (event: NativeSyntheticEvent<ImageErrorEventData>) => {
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
            error: event.nativeEvent,
          };
        });
        bubbleEvent("onError", event);
      },
      [bubbleEvent]
    );

    const handleLoad = useCallback(
      (event: NativeSyntheticEvent<ImageLoadEventData>) => {
        if (state.progress !== 1) {
          setState((prevState) => ({
            ...prevState,
            error: null,
            progress: 1,
          }));
        }
        bubbleEvent("onLoad", event);
      },
      [state.progress, bubbleEvent]
    );

    const handleLoadEnd = useCallback(() => {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        progress: 1,
      }));
      bubbleEvent("onLoadEnd");
    }, [bubbleEvent]);

    if (!source || !source.uri) {
      return (
        <View style={style} ref={ref}>
          <ImageComponent {...props} source={source} style={state.imageStyle} />
          {children}
        </View>
      );
    }

    const { progress, sourceKey, thresholdReached, loading, error } = state;

    let indicatorElement;

    if (error) {
      if (renderError) {
        indicatorElement = (
          <View style={errorContainerStyle}>{renderError(error)}</View>
        );
      }
    } else if ((loading || progress < 1) && thresholdReached) {
      if (renderIndicator) {
        indicatorElement = renderIndicator(progress, !loading || !progress);
      } else {
        const IndicatorComponent =
          typeof indicator === "function" ? indicator : DefaultIndicator;

        indicatorElement = (
          <IndicatorComponent
            // @ts-ignore
            progress={progress}
            indeterminate={!loading || !progress}
            {...indicatorProps}
          />
        );
      }
      indicatorElement = (
        <View style={indicatorContainerStyle}>{indicatorElement}</View>
      );
    }

    return (
      <View ref={ref}>
        <View style={style}>
          <ImageComponent
            {...props}
            key={sourceKey}
            onLoadStart={handleLoadStart}
            onProgress={handleProgress}
            onError={handleError}
            onLoad={handleLoad}
            onLoadEnd={handleLoadEnd}
            source={source}
            style={state.imageStyle}
            loadingIndicatorSource={IMAGE_URL.avatar}
          />
          {indicatorElement}
          {children}
        </View>
      </View>
    );
  };
  return ImageProgress;
};

export default createImageProgress(Image);
