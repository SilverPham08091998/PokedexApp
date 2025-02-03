import React from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { scale } from "react-native-utils-scale";
import { PaginationType } from "@/type";
import EmptyList, { EmptyListProps } from "@/components/Pagination/EmptyList";

interface Props<T> extends EmptyListProps {
  data: PaginationType<T>;
  renderItem: (item: T, index: number) => React.ReactElement;
  renderFooterComponent?: React.ComponentType;
  renderHeaderComponent?: React.ComponentType;
  renderItemSeparatorComponent?: React.ComponentType;
  onLoadMore?: () => void;
  onRefresh?: () => void;
  onEndReachedThreshold?: number;
  itemSeparatorHeight?: number;
  distanceTop?: number;
  distanceBottom?: number;
  scrollEnable?: boolean;
  loading: boolean;
}

const PaginationList = <T extends any>(props: Props<T>): React.ReactElement => {
  const {
    onRefresh,
    onEndReachedThreshold = 0.1,
    onLoadMore,
    data,
    renderItem,
    distanceTop = 12,
    distanceBottom = 12,
    itemSeparatorHeight = 12,
    renderFooterComponent,
    renderHeaderComponent,
    renderItemSeparatorComponent,
    scrollEnable = true,
    loading,
  } = props;

  const refresh = () => {
    onRefresh && onRefresh();
  };

  const onEndReached = () => {
    if (data.isNext) {
      onLoadMore && onLoadMore();
    }
  };
  return (
    <FlatList
      data={data.list}
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
      ListHeaderComponent={
        renderHeaderComponent ? (
          renderHeaderComponent
        ) : (
          <View style={{ height: scale(distanceTop) }} />
        )
      }
      ListFooterComponent={
        renderFooterComponent ? (
          renderFooterComponent
        ) : (
          <View style={{ height: scale(distanceBottom) }} />
        )
      }
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      ListEmptyComponent={<EmptyList {...props} />}
    />
  );
};

export default React.memo(PaginationList) as <T>(
  props: Props<T>
) => React.ReactElement;
