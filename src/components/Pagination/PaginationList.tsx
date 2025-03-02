import React from "react";
import {
  FlatList,
  FlatListProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-utils-scale";
import { ListCommon } from "@/type";
import EmptyList, { EmptyListProps } from "@/components/Pagination/EmptyList";
import Ionicons from "react-native-vector-icons/Ionicons";
import { COLORS_LIGHT, GET_COLORS, rgba } from "@/theme";
import { CText } from "@/components";

interface Props<T>
  extends EmptyListProps,
    Omit<
      FlatListProps<T>,
      | "data"
      | "renderItem"
      | "scrollEnable"
      | "ItemSeparatorComponent"
      | "ListHeaderComponent"
      | "ListFooterComponent"
    > {
  data: ListCommon<T> | undefined | null;
  renderItem: (item: T, index: number) => React.ReactElement;
  renderFooterComponent?: React.ComponentType;
  renderHeaderComponent?: React.ComponentType;
  renderItemSeparatorComponent?: React.ComponentType;
  onPressPagination: (url?: string, page?: number) => void;
  itemSeparatorHeight?: number;
  distanceTop?: number;
  distanceBottom?: number;
  scrollEnable?: boolean;
}

const PaginationList = <T extends any>(props: Props<T>): React.ReactElement => {
  const {
    data,
    renderItem,
    distanceTop = 12,
    itemSeparatorHeight = 12,
    renderFooterComponent,
    renderHeaderComponent,
    renderItemSeparatorComponent,
    scrollEnable = true,
    onPressPagination,
    ...rest
  } = props;

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => {
            if (data?.previous) {
              onPressPagination(data.previous, data?.page - 1);
            }
          }}
          style={styles.buttonContainer}
          disabled={!data?.previous}
        >
          <Ionicons name={"play-back"} size={24} color={GET_COLORS().PRIMARY} />
        </TouchableOpacity>
        <CText
          style={styles.textPage}
          fontSize={18}
          color={COLORS_LIGHT.PRIMARY}
          fontWeight={"bold"}
        >
          {data?.page}
        </CText>
        <TouchableOpacity
          onPress={() => {
            if (data?.next) {
              onPressPagination(data.next, data.page + 1);
            }
          }}
          style={styles.buttonContainer}
          disabled={!data?.next}
        >
          <Ionicons
            name={"play-forward"}
            size={24}
            color={GET_COLORS().PRIMARY}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={data?.data}
      scrollEnabled={scrollEnable}
      nestedScrollEnabled={true}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={({ item, index }) => renderItem(item, index)}
      ItemSeparatorComponent={
        renderItemSeparatorComponent
          ? renderItemSeparatorComponent
          : () => <View style={{ height: scale(itemSeparatorHeight) }} />
      }
      ListFooterComponent={
        renderHeaderComponent ? (
          renderHeaderComponent
        ) : (
          <View style={{ height: scale(distanceTop) }} />
        )
      }
      ListHeaderComponent={
        renderFooterComponent ? renderFooterComponent : renderPagination()
      }
      ListEmptyComponent={<EmptyList {...props} />}
      {...rest}
    />
  );
};

export default React.memo(PaginationList) as <T>(
  props: Props<T>
) => React.ReactElement;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: scale(24),
  },
  buttonContainer: {
    alignItems: "center",
    borderColor: GET_COLORS().PRIMARY,
    borderRadius: scale(6),
    borderWidth: scale(1),
    justifyContent: "center",
    height: scale(40),
    width: scale(40),
  },
  textPage: {
    height: scale(35),
    width: scale(35),
    marginHorizontal: scale(24),
    backgroundColor: rgba(COLORS_LIGHT.PRIMARY, 0.1),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(12),
  },
});
