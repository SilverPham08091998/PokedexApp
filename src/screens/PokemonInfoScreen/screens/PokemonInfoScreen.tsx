import React from "react";
import { FlatList, ImageBackground, View } from "react-native";
import { CHeader, CImage, CText } from "@/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DEVICE_WIDTH, SCREEN_NAME } from "@/util";
import { PokemonInfoStackParamList } from "@/navigator/PokemonInfoNavigator/PokemonInfoStackParamList";
import { PokemonTypeColors } from "@/type";
import { COLORS_LIGHT, GET_COLORS, IMAGE_URL, rgba } from "@/theme";
import { scale } from "react-native-utils-scale";
import TabViewPokemonInfo from "@/screens/PokemonInfoScreen/components/TabViewPokemonInfo";

interface Props
  extends NativeStackScreenProps<
    PokemonInfoStackParamList,
    SCREEN_NAME.POKEMON_INFO
  > {}

const PokemonInfoScreen: React.FC<Props> = (props: Props) => {
  const { pokemon } = props.route.params;
  const primaryType =
    pokemon.types.find((type) => type.slot === 1)?.type.name || "";
  const colorPrimary = PokemonTypeColors[primaryType.toUpperCase()];
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

  return (
    <View style={{ backgroundColor: rgba(colorPrimary, 0.6), flex: 1 }}>
      <View style={{ flex: 1 }}>
        <CHeader
          title={pokemon.name}
          titleStyle={{ color: COLORS_LIGHT.WHITE }}
        />
        <View>{renderPokemonType()}</View>

        <ImageBackground
          style={{
            width: scale(200),
            height: scale(200),
            justifyContent: "flex-end",
            alignSelf: "flex-end",
            position: "absolute",
            top: scale(100),
            right: scale(12),
          }}
          source={IMAGE_URL.pokeball}
          tintColor={rgba(colorPrimary, 0.6)}
        />
      </View>
      <CImage
        url={pokemon.sprites.front_default}
        resizeMode={"contain"}
        style={{
          width: scale(250),
          height: scale(250),
          position: "absolute",
          top: DEVICE_WIDTH / 4,
          right: scale(DEVICE_WIDTH / 2 - 125),
          left: scale(DEVICE_WIDTH / 2 - 125),
          zIndex: 1,
        }}
      />
      <View
        style={{
          flex: 2,
          backgroundColor: COLORS_LIGHT.WHITE,
          borderTopLeftRadius: scale(12),
          borderTopRightRadius: scale(12),
        }}
      >
        <View style={{ paddingVertical: scale(24), flex: 1 }}>
          <TabViewPokemonInfo />
        </View>
      </View>
    </View>
  );
};

export default PokemonInfoScreen;
