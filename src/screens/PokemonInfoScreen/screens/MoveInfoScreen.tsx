import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import {
  CHeader,
  CImage,
  CPokemonType,
  CText,
  LabelValueComponent,
  PaginationList,
} from "@/components";
import React from "react";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  useAppDispatch,
  useAppSelector,
} from "@/util";
import { PokemonInfo } from "@/type";
import { scale } from "react-native-utils-scale";
import { STRING_CONVERTER } from "@/util/function";
import { COLORS_LIGHT } from "@/theme";
import { ReduxAction } from "@/redux";

const MoveInfoScreen = () => {
  const dispatch = useAppDispatch();
  const { info, learnedByPokemon } = useAppSelector((state) => {
    return state.home.moveInfo;
  });
  const renderPokemonType = (item: PokemonInfo) => {
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
  const renderMoveData = () => {
    return (
      <View style={styles.moveDataContainer}>
        <LabelValueComponent
          label={"Type"}
          valueComponent={() => (
            <CPokemonType
              type={info?.type.name.toUpperCase() || ""}
              size={{
                width: scale(100),
                height: scale(20),
              }}
            />
          )}
          isLine={true}
        />
        <LabelValueComponent
          label={"Category"}
          value={info?.damage_class.name.toUpperCase()}
          isLine={true}
        />
        <LabelValueComponent
          label={"Power"}
          value={info?.power || "--"}
          isLine={true}
        />
        <LabelValueComponent
          label={"Accuracy"}
          value={info?.accuracy || "--"}
          isLine={true}
        />
        <LabelValueComponent
          label={"PP"}
          value={info?.pp || "--"}
          isLine={true}
        />
        <LabelValueComponent
          label={"Makes contest?"}
          value={info?.contest_type?.name.toUpperCase() || "--"}
          isLine={true}
        />

        <LabelValueComponent
          label={"Introduced"}
          value={info?.generation.name.toUpperCase()}
        />
      </View>
    );
  };
  const renderItem = (pokemon: PokemonInfo) => {
    return (
      <View style={styles.itemContainer}>
        <CImage
          url={pokemon.sprites.front_default}
          resizeMode={"contain"}
          style={styles.imagePokemon}
        />
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <CText fontSize={12} numberOfLines={2}>
            {STRING_CONVERTER.formatId(pokemon.id)}
          </CText>
          <CText fontSize={12} numberOfLines={2}>
            {pokemon.name}
          </CText>
          {renderPokemonType(pokemon)}
        </View>
      </View>
    );
  };
  const renderEffect = () => {
    if (info?.effect_entries && info?.effect_entries.length > 0) {
      return (
        <View style={styles.effectContainer}>
          <CText fontSize={18} fontWeight={"bold"} distanceBottom={8}>
            {"Effect"}
          </CText>
          <CText color={COLORS_LIGHT.BLACK_3} distanceBottom={8}>
            {info.effect_entries[0].effect}
          </CText>
          <CText color={COLORS_LIGHT.BLACK_3} distanceBottom={8}>
            {info.effect_entries[0].short_effect}
          </CText>
        </View>
      );
    }
    return null;
  };
  const onPressPagination = (page: number) => {
    dispatch(ReduxAction.HOME_ACTION.getPageLearntByPokemon(page));
  };

  return (
    <View style={styles.container}>
      <CHeader title={info?.name || ""} />
      <ScrollView style={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {renderEffect()}
        {renderMoveData()}
        <PaginationList<PokemonInfo>
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          data={learnedByPokemon}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          windowSize={DEVICE_HEIGHT * 3}
          removeClippedSubviews={true}
          numColumns={2}
          renderItem={(item) => renderItem(item)}
          onPressPagination={(url, page) => {
            if (page) {
              onPressPagination(page);
            }
          }}
        />
      </ScrollView>
    </View>
  );
};

export default MoveInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  effectContainer: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
  },
  moveDataContainer: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
  },
  itemContainer: {
    flexDirection: "row",
    width: DEVICE_WIDTH / 2 - 24,
  },
  imageBackground: {
    flex: 1,
    position: "absolute",
    right: scale(4),
    bottom: scale(4),
  },
  imagePokemon: {
    width: scale(80),
    height: scale(80),
  },
  typeContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(6),
    width: scale(70),
    paddingVertical: scale(1),
  },
});
