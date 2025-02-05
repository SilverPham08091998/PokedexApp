import React from "react";
import { PokemonInfo, PokemonTypeColors } from "@/type";
import { FlatList, ImageBackground, View } from "react-native";
import { GET_COLORS, IMAGE_URL, rgba } from "@/theme";
import { CImage, CText } from "@/components";
import { scale } from "react-native-utils-scale";
import { DEVICE_WIDTH, NAVIGATION, SCREEN_NAME } from "@/util";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  item: PokemonInfo;
}

const PokemonItem: React.FC<Props> = (props: Props) => {
  const { item } = props;
  const primaryType =
    item.types.find((type) => type.slot === 1)?.type.name || "";
  const colorPrimary = PokemonTypeColors[primaryType.toUpperCase()];

  const renderPokemonType = () => {
    return (
      <FlatList
        data={item.types}
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
        ItemSeparatorComponent={() => <View style={{ height: scale(4) }} />}
        ListHeaderComponent={() => <View style={{ height: scale(4) }} />}
        ListFooterComponent={() => <View style={{ height: scale(4) }} />}
      />
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        NAVIGATION.navigate(
          SCREEN_NAME.POKEMON_INFO_STACK,
          SCREEN_NAME.POKEMON_INFO,
          { pokemon: item }
        );
      }}
      activeOpacity={0.5}
      style={{
        backgroundColor: rgba(colorPrimary, 0.6),
        height: scale(120),
        padding: scale(8),
        width: DEVICE_WIDTH / 2 - scale(8),
        borderRadius: scale(12),
      }}
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
        style={{
          flex: 1,
          position: "absolute",
          right: scale(4),
          bottom: scale(4),
        }}
        source={IMAGE_URL.pokeball}
        tintColor={rgba(colorPrimary, 0.6)}
      >
        <CImage
          url={item.sprites.front_default}
          resizeMode={"contain"}
          style={{
            width: scale(100),
            height: scale(100),
          }}
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default React.memo(PokemonItem);
