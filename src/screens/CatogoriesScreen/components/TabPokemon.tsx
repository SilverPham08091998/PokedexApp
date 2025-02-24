import { CPokemonItem, PaginationList } from "@/components";
import React from "react";
import { DEVICE_HEIGHT, useAppDispatch, useAppSelector } from "@/util";
import { PokemonInfo } from "@/type";
import { ReduxAction } from "@/redux";

const TabPokemon = () => {
  const dispatch = useAppDispatch();
  const { pokemons } = useAppSelector((state) => {
    return state.home.typeInfo;
  });

  const onPressPagination = (page: number) => {
    dispatch(ReduxAction.HOME_ACTION.getPagePokemonOfType(page));
  };

  return (
    <PaginationList<PokemonInfo>
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      data={pokemons}
      columnWrapperStyle={{ justifyContent: "space-around" }}
      windowSize={DEVICE_HEIGHT * 3}
      removeClippedSubviews={true}
      numColumns={2}
      renderItem={(item) => <CPokemonItem item={item} />}
      onPressPagination={(url, page) => {
        if (page) {
          onPressPagination(page);
        }
      }}
    />
  );
};
export default TabPokemon;
