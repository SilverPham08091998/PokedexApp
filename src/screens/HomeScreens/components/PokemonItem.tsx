import React from "react";
import { PokemonInfo, PokemonTypeColors } from "@/type";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { GET_COLORS, IMAGE_URL, rgba } from "@/theme";
import { CImage, CPokemonType, CText } from "@/components";
import { scale } from "react-native-utils-scale";
import { DEVICE_WIDTH, NAVIGATION, SCREEN_NAME, useAppDispatch } from "@/util";
import Animated, {
  Easing,
  StretchInX,
  StretchOutY,
} from "react-native-reanimated";
import { ReduxAction } from "@/redux";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface Props {
  item: PokemonInfo;
}

const PokemonItem: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const { item } = props;
  const primaryType =
    item.types.find((type) => type.slot === 1)?.type.name || "";
  const colorPrimary = PokemonTypeColors[primaryType.toUpperCase()];

  const renderPokemonType = () => {
    return (
      <FlatList
        data={item.types}
        renderItem={({ item: itemType }) => {
          return <CPokemonType type={itemType.type.name} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: scale(4) }} />}
        ListHeaderComponent={() => <View style={{ height: scale(4) }} />}
        ListFooterComponent={() => <View style={{ height: scale(4) }} />}
      />
    );
  };

  return (
    <AnimatedTouchableOpacity
      entering={StretchInX.springify()
        .damping(30)
        .mass(5)
        .stiffness(10)
        .overshootClamping(1)
        .restDisplacementThreshold(0.1)
        .restSpeedThreshold(5)
        .easing(Easing.ease)
        .duration(500)}
      exiting={StretchOutY.springify()
        .damping(30)
        .mass(5)
        .stiffness(10)
        .overshootClamping(1)
        .restDisplacementThreshold(0.1)
        .restSpeedThreshold(5)
        .easing(Easing.ease)
        .duration(100)}
      onPress={() => {
        dispatch(
          ReduxAction.HOME_ACTION.getPokemonInfo(item, () => {
            NAVIGATION.navigate(
              SCREEN_NAME.POKEMON_INFO_STACK,
              SCREEN_NAME.POKEMON_INFO,
              { pokemon: item }
            );
          })
        );
      }}
      activeOpacity={0.5}
      style={{ ...styles.container, backgroundColor: rgba(colorPrimary, 0.6) }}
    >
      <View style={{ paddingHorizontal: scale(4), alignItems: "flex-start" }}>
        <CText
          fontSize={14}
          textAlign={"right"}
          fontWeight={"700"}
          distanceBottom={4}
          color={GET_COLORS().WHITE}
        >
          {`${item.name.toUpperCase()}`}
        </CText>
        {renderPokemonType()}
      </View>
      <ImageBackground
        style={styles.imageBackground}
        source={IMAGE_URL.pokeball}
        tintColor={rgba(colorPrimary, 0.6)}
      >
        <CImage
          url={item.sprites.front_default}
          resizeMode={"contain"}
          style={styles.imagePokemon}
        />
      </ImageBackground>
    </AnimatedTouchableOpacity>
  );
};

export default React.memo(PokemonItem);

const styles = StyleSheet.create({
  container: {
    height: scale(120),
    padding: scale(8),
    width: DEVICE_WIDTH / 2 - scale(8),
    borderRadius: scale(12),
  },
  imageBackground: {
    flex: 1,
    position: "absolute",
    right: scale(4),
    bottom: scale(4),
  },
  imagePokemon: {
    width: scale(100),
    height: scale(100),
  },
  typeContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(6),
    width: scale(70),
    paddingVertical: scale(1),
  },
});
