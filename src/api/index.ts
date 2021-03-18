import { useInfiniteQuery, UseInfiniteQueryOptions } from "react-query";

import {
  ItemListQuery,
  ItemListQueryVariables,
  ItemListDocument,
} from "./generated";

import fetcher from "./fetcher";

export * from "./generated";

export const useItemListInfiniteQuery = <
  TData = ItemListQuery,
  TError = unknown
>(
  variables?: ItemListQueryVariables,
  options?: UseInfiniteQueryOptions<ItemListQuery, TError, TData>
) =>
  useInfiniteQuery<ItemListQuery, TError, TData>(
    ["ItemList", variables],
    fetcher<ItemListQuery, ItemListQueryVariables>(ItemListDocument, variables),
    options
  );
