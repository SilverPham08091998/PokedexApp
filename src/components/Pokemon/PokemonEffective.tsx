import { StyleSheet, View } from "react-native";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import React from "react";
import { PokemonType, ResourceLink } from "@/type";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CPokemonType, CText } from "@/components";

enum EFFECT {
  SUPER = "SUPER",
  WEAK = "WEAK",
  NONE = "NONE",
}

interface Props {
  effectiveType: "SUPER" | "WEAK" | "NONE" | string;
  type?: PokemonType;
  onPressType?: (type: PokemonType) => void;
  disabled?: boolean;
}

const CPokemonEffective: React.FC<Props> = (props: Props) => {
  const { effectiveType, type, onPressType, disabled } = props;

  if (!type) {
    return null;
  }

  const renderEffective = (
    effectiveFrom: Array<ResourceLink>,
    effectiveTo: Array<ResourceLink>,
    effective: string,
    typeName: string
  ) => {
    const textEffect = textEffective(effective, typeName);
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
  const effective = typeEffective(effectiveType, type);
  return (
    <TouchableOpacity
      style={{ marginHorizontal: scale(12) }}
      onPress={() => {
        onPressType && onPressType(type);
      }}
      disabled={disabled}
    >
      <View style={{ flexDirection: "row" }}>
        <CText
          lineHeight={20}
          fontWeight={"700"}
          fontSize={18}
          style={{ flex: 1 }}
        >
          {`Type ${type.name}`}
        </CText>
        <CPokemonType
          type={type.name}
          size={styles.typeSize}
          containerStyle={{ marginBottom: scale(12) }}
        />
      </View>

      {renderEffective(
        effective.effectiveFrom,
        effective.effectiveTo,
        effectiveType,
        type.name
      )}
    </TouchableOpacity>
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

export default React.memo(CPokemonEffective);
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
