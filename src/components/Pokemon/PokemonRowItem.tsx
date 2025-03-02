import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { PokemonInfo } from "@/type";
import React from "react";
import { scale } from "react-native-utils-scale";
import { CImage, CPokemonType, CText } from "@/components";
import { COLORS_LIGHT } from "@/theme";
import { STRING_CONVERTER } from "@/util/function";
import PokemonTypes from "@/type/PokemonType";
import Animated, {
  Easing,
  runOnJS,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

interface Props {
  item: PokemonInfo;
  onPressItem: (item: PokemonInfo) => void;
  index: number;
}

const calculatorDuration = (index: number) => {
  return index * 150;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CPokemonRowItem: React.FC<Props> = (props) => {
  const { item, onPressItem, index } = props;
  const primaryType =
    item.types.find((type) => type.slot === 1)?.type.name || "";
  const colorPrimary = PokemonTypes[primaryType.toUpperCase()].color;

  const colorShareValue = useSharedValue<string>(COLORS_LIGHT.WHITE);
  const scaleShareValue = useSharedValue<number>(1);

  const styleAnimation = useAnimatedStyle(() => {
    return {
      backgroundColor: colorShareValue.value,
      transform: [
        {
          scale: scaleShareValue.value,
        },
      ],
    };
  }, []);

  const renderPokemonType = () => {
    return (
      <FlatList
        data={item.types}
        horizontal={true}
        renderItem={({ item: itemType }) => {
          if (PokemonTypes[itemType.type.name.toUpperCase()]) {
            return (
              <CImage
                source={
                  PokemonTypes[itemType.type.name.toUpperCase()].typeImage
                }
                style={styles.imageType}
              />
            );
          }
          return <CPokemonType type={itemType.type.name} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: scale(4) }} />}
        ListHeaderComponent={() => <View style={{ height: scale(4) }} />}
        ListFooterComponent={() => <View style={{ height: scale(4) }} />}
      />
    );
  };
  return (
    <AnimatedPressable
      entering={SlideInRight.duration(calculatorDuration(index)).easing(
        Easing.ease
      )}
      exiting={SlideOutLeft.duration(calculatorDuration(index)).easing(
        Easing.ease
      )}
      style={[styles.itemContainer, styleAnimation]}
      onPressIn={() => {
        colorShareValue.value = withTiming(colorPrimary, {
          duration: 200,
        });
        scaleShareValue.value = withSpring(1.2, {
          damping: 15,
          mass: 0.2,
          stiffness: 150,
          overshootClamping: true,
          restSpeedThreshold: 0.0001,
          restDisplacementThreshold: 0.001,
        });
      }}
      onPressOut={() => {
        colorShareValue.value = withTiming(COLORS_LIGHT.WHITE, {
          duration: 200,
        });
        scaleShareValue.value = withSpring(
          1,
          {
            damping: 15,
            mass: 0.2,
            stiffness: 150,
            overshootClamping: true,
            restSpeedThreshold: 0.0001,
            restDisplacementThreshold: 0.001,
          },
          (finished) => {
            if (finished) {
              runOnJS(onPressItem)(item);
            }
          }
        );
      }}
    >
      <CImage
        url={item.sprites.front_default}
        resizeMode={"cover"}
        style={styles.imagePokemon}
      />
      <View
        style={{
          paddingHorizontal: scale(4),
          alignItems: "flex-start",
          flex: 1,
        }}
      >
        <CText
          fontSize={14}
          textAlign={"right"}
          fontWeight={"700"}
          distanceBottom={4}
          color={COLORS_LIGHT.BLACK_44}
        >
          {`${item.name.toUpperCase()}`}
        </CText>
        <CText
          fontSize={14}
          textAlign={"right"}
          fontWeight={"700"}
          distanceBottom={4}
          color={COLORS_LIGHT.BLACK_444}
        >
          {`${STRING_CONVERTER.formatId(item.id)}`}
        </CText>
      </View>
      <View>{renderPokemonType()}</View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
  },
  imagePokemon: {
    width: scale(100),
    height: scale(100),
  },
  imageType: {
    width: scale(36),
    height: scale(36),
    alignSelf: "center",
  },
});

export default React.memo(CPokemonRowItem);
