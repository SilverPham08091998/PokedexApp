import { PaginationList } from "@/components";
import React from "react";
import { DEVICE_HEIGHT, useAppDispatch, useAppSelector } from "@/util";
import { ReduxAction } from "@/redux";
import { PokemonMove } from "@/type";
import MoveItem from "@/components/Pokemon/MoveItem";
import HeaderMove from "@/components/Pokemon/HeaderMove";
import { scale } from "react-native-utils-scale";

const TabMove: React.FC<any> = () => {
  const { typeInfo } = useAppSelector((state) => {
    return state.home;
  });
  const dispatch = useAppDispatch();
  const onPressPagination = (page: number) => {
    dispatch(ReduxAction.HOME_ACTION.getPageMoveOfType(page));
  };

  return (
    <PaginationList<PokemonMove>
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}
      data={typeInfo.moves}
      windowSize={DEVICE_HEIGHT * 3}
      removeClippedSubviews={true}
      renderItem={(item: PokemonMove) => (
        <MoveItem
          move={item.move}
          versionGroup={item.version_group_details}
          moveLearntBy={"MACHINE"}
          currentVersion={""}
        />
      )}
      onPressPagination={(url, page) => {
        if (page) {
          onPressPagination(page);
        }
      }}
      renderHeaderComponent={() => (
        <HeaderMove
          moveLearntBy={"MACHINE"}
          headerContainerStyle={{ paddingVertical: scale(0) }}
        />
      )}
    />
  );
};
export default TabMove;
