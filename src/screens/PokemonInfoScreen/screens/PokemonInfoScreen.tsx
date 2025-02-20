import React, { useEffect } from "react";
import { FlatList, Image, View } from "react-native";
import { CHeader, CImage, CText } from "@/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREEN_NAME, useAppDispatch } from "@/util";
import { PokemonInfoStackParamList } from "@/navigator/PokemonInfoNavigator/PokemonInfoStackParamList";
import { PokemonTypeColors } from "@/type";
import { COLORS_LIGHT, GET_COLORS, IMAGE_URL, rgba } from "@/theme";
import { scale } from "react-native-utils-scale";
import TabViewPokemonInfo from "@/screens/PokemonInfoScreen/components/TabViewPokemonInfo";
import { ReduxAction } from "@/redux";
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface Props
  extends NativeStackScreenProps<
    PokemonInfoStackParamList,
    SCREEN_NAME.POKEMON_INFO
  > {}

const PokemonInfoScreen: React.FC<Props> = (props: Props) => {
  const { pokemon } = props.route.params;
  const dispatch = useAppDispatch();
  const primaryType =
    pokemon.types.find((type) => type.slot === 1)?.type.name || "";
  const colorPrimary = PokemonTypeColors[primaryType.toUpperCase()];

  useEffect(() => {
    dispatch(ReduxAction.HOME_ACTION.getPokemonInfo(pokemon));
  }, []);

  const rotation = useSharedValue<string>("0deg");
  useEffect(() => {
    rotation.value = withRepeat(
      withTiming("360deg", {
        duration: 9000,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.System,
      }),
      -1,
      false,
      () => {},
      ReduceMotion.System
    );
  }, []);

  const renderPokemonType = () => {
    return (
      <FlatList
        style={{ padding: scale(8) }}
        data={pokemon.types}
        horizontal={true}
        renderItem={({ item: itemType }) => {
          const colorType = PokemonTypeColors[itemType.type.name.toUpperCase()];
          return (
            <View
              style={{
                backgroundColor: rgba(colorType, 0.6),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: scale(6),
                width: scale(70),
                paddingVertical: scale(1),
              }}
            >
              <CText
                fontSize={12}
                fontWeight={"400"}
                color={GET_COLORS().WHITE}
              >
                {`${itemType.type.name.toUpperCase()}`}
              </CText>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ width: scale(4) }} />}
        ListHeaderComponent={() => <View style={{ height: scale(8) }} />}
        ListFooterComponent={() => <View style={{ height: scale(8) }} />}
      />
    );
  };

  const styleAnimation = useAnimatedStyle(() => {
    return {
      width: 250,
      height: 250,
      transform: [
        {
          rotate: rotation.value,
        },
      ],
    };
  });

  return (
    <View style={{ backgroundColor: rgba(colorPrimary, 0.6), flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CHeader
          title={pokemon.name}
          colorHeader={COLORS_LIGHT.WHITE}
          titleStyle={{
            color: COLORS_LIGHT.WHITE,
            zIndex: 1,
            textAlign: "left",
          }}
        />
        <View>{renderPokemonType()}</View>
        <Image
          style={{
            width: scale(200),
            height: scale(200),
            position: "absolute",
            top: scale(150),
            left: scale(12),
            transform: [{ rotate: "90deg" }, { translateY: 100 }],
          }}
          source={IMAGE_URL.pokeball}
          tintColor={rgba(colorPrimary, 0.6)}
        />

        <View
          style={{
            position: "absolute",
            top: scale(50),
            right: scale(12),
          }}
        >
          <Animated.Image
            style={{
              ...styleAnimation,
            }}
            source={IMAGE_URL.pokeball}
            tintColor={rgba(colorPrimary, 0.6)}
          />
          <CImage
            url={pokemon.sprites.front_default}
            resizeMode={"cover"}
            style={{
              width: scale(250),
              height: scale(250),
              zIndex: 1,
              position: "absolute",
            }}
          />
        </View>
      </View>

      <View
        style={{
          flex: 2,
          backgroundColor: COLORS_LIGHT.WHITE,
        }}
      >
        <TabViewPokemonInfo />
      </View>
    </View>
  );
};

export default PokemonInfoScreen;
