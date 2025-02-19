import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { ButtonMaskedView, CPokemonType, CText } from "@/components";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import React, { useState } from "react";
import {
  DEVICE_WIDTH,
  NAVIGATION,
  SCREEN_NAME,
  useAppDispatch,
  useAppSelector,
} from "@/util";
import { scale } from "react-native-utils-scale";
import { PokemonType, ResourceLink } from "@/type";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ReduxAction } from "@/redux";

enum EFFECT {
  SUPER = "SUPER",
  WEAK = "WEAK",
  NONE = "NONE",
}

const CategoriesScreen = () => {
  const dispatch = useAppDispatch();
  const { types } = useAppSelector((state) => {
    return state.home;
  });
  const [value, setValue] = useState<string>(EFFECT.SUPER);

  const renderItem = (item: PokemonType) => {
    const effective = typeEffective(value, item);
    return (
      <TouchableOpacity
        style={{ marginHorizontal: scale(12) }}
        delayLongPress={50}
        onLongPress={() => {
          dispatch(
            ReduxAction.HOME_ACTION.getTypeInfo(item, () => {
              NAVIGATION.navigate(
                SCREEN_NAME.CATEGORIES_STACK,
                SCREEN_NAME.SUB_CATEGORIES_DETAIL,
                {
                  type: item,
                }
              );
            })
          );
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <CText
            lineHeight={20}
            fontWeight={"700"}
            fontSize={18}
            style={{ flex: 1 }}
          >
            {`Type ${item.name}`}
          </CText>
          <CPokemonType
            type={item.name}
            size={styles.typeSize}
            containerStyle={{ marginBottom: scale(12) }}
          />
        </View>

        {renderEffective(
          effective.effectiveFrom,
          effective.effectiveTo,
          value,
          item.name
        )}
      </TouchableOpacity>
    );
  };

  const renderEffective = (
    effectiveFrom: Array<ResourceLink>,
    effectiveTo: Array<ResourceLink>,
    effective: string,
    type: string
  ) => {
    const textEffect = textEffective(effective, type);
    return (
      <View>
        {renderItemEffective(effectiveTo, textEffect?.to)}
        {renderItemEffective(effectiveFrom, textEffect?.from)}
      </View>
    );
  };

  const renderItemEffective = (
    effectiveTypes: Array<ResourceLink>,
    textEffect?: string
  ) => {
    return (
      <View>
        <CText>
          {textEffect} {effectiveTypes.length === 0 && "None types"}
        </CText>
        <View style={styles.wrapperContainer}>
          {effectiveTypes.length !== 0 &&
            effectiveTypes.map((i, index) => {
              return (
                <CPokemonType
                  key={index}
                  type={i.name}
                  size={styles.typeSize}
                />
              );
            })}
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ButtonMaskedView
        data={[
          { label: "Super-effective", value: EFFECT.SUPER },
          { label: "Weak-effective", value: EFFECT.WEAK },
          { label: "No-effect", value: EFFECT.NONE },
        ]}
        widthTab={(DEVICE_WIDTH - 24) / 3}
        defaultValue={{ label: "Tổng tiền đơn hàng", value: value }}
        onPress={(item) => {
          setTimeout(() => {
            setValue(item?.value + "");
          }, 10);
        }}
      />
      <FlatList
        data={types}
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListHeaderComponent={() => <View style={{ height: scale(8) }} />}
        ListFooterComponent={() => <View style={{ height: scale(8) }} />}
      />
    </SafeAreaView>
  );
};

const textEffective = (effective: string, type: string) => {
  switch (effective) {
    case EFFECT.NONE:
      return {
        to: `${type} moves have no effect on:`,
        from: `These types have no effect on ${type} Pokémon`,
      };
    case EFFECT.SUPER:
      return {
        to: `${type} moves are super-effective against:`,
        from: `These types are super-effective against ${type} Pokémon`,
      };
    case EFFECT.WEAK:
      return {
        to: `${type} moves are not very effective against:`,
        from: `These types are not very effective against  ${type} Pokémon`,
      };
  }
};

const typeEffective = (
  effective: string,
  type: PokemonType
): {
  effectiveFrom: Array<ResourceLink>;
  effectiveTo: Array<ResourceLink>;
} => {
  switch (effective) {
    case EFFECT.NONE:
      return {
        effectiveFrom: type.damage_relations?.no_damage_from || [],
        effectiveTo: type.damage_relations?.no_damage_to || [],
      };
    case EFFECT.SUPER:
      return {
        effectiveFrom: type.damage_relations?.double_damage_from || [],
        effectiveTo: type.damage_relations?.double_damage_to || [],
      };
    case EFFECT.WEAK:
      return {
        effectiveFrom: type.damage_relations?.half_damage_to || [],
        effectiveTo: type.damage_relations?.half_damage_to || [],
      };
  }
  return {
    effectiveFrom: [],
    effectiveTo: [],
  };
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GET_COLORS()?.WHITE,
  },
  itemSeparator: {
    height: scale(2),
    backgroundColor: COLORS_LIGHT.LINE,
    marginVertical: scale(6),
    marginHorizontal: scale(12),
  },
  wrapperContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(4),
    marginVertical: scale(8),
    flex: 1,
  },
  typeSize: {
    height: scale(20),
    width: scale(80),
  },
});
