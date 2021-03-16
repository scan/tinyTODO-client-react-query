/* eslint-disable */
import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(endpoint: string, requestInit: RequestInit, query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(endpoint, {
      method: 'POST',
      ...requestInit,
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: Date;
  Cursor: unknown;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly addItem?: Maybe<Item>;
  readonly removeItem: Scalars['Boolean'];
};


export type MutationAddItemArgs = {
  item: NewItem;
};


export type MutationRemoveItemArgs = {
  id: Scalars['ID'];
};

export type Item = Node & {
  readonly __typename?: 'Item';
  readonly id: Scalars['ID'];
  readonly title: Scalars['String'];
  readonly content?: Maybe<Scalars['String']>;
  readonly createdAt: Scalars['Time'];
};


export type Query = {
  readonly __typename?: 'Query';
  readonly items: ItemConnection;
};


export type QueryItemsArgs = {
  first?: Scalars['Int'];
  after?: Maybe<Scalars['Cursor']>;
};

export type NewItem = {
  readonly title: Scalars['String'];
  readonly content?: Maybe<Scalars['String']>;
};

export type ItemEdge = {
  readonly __typename?: 'ItemEdge';
  readonly node: Item;
  readonly cursor: Scalars['Cursor'];
};

export type PageInfo = {
  readonly __typename?: 'PageInfo';
  readonly hasNextPage: Scalars['Boolean'];
  readonly hasPreviousPage: Scalars['Boolean'];
  readonly endCursor: Scalars['Cursor'];
  readonly startCursor: Scalars['Cursor'];
};

export type Node = {
  readonly id: Scalars['ID'];
};


export type ItemConnection = {
  readonly __typename?: 'ItemConnection';
  readonly edges: ReadonlyArray<ItemEdge>;
  readonly pageInfo: PageInfo;
};

export type CreateItemMutationVariables = Exact<{
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
}>;


export type CreateItemMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly addItem?: Maybe<(
    { readonly __typename?: 'Item' }
    & Pick<Item, 'id'>
  )> }
);

export type ItemListQueryVariables = Exact<{
  count?: Scalars['Int'];
  cursor?: Maybe<Scalars['Cursor']>;
}>;


export type ItemListQuery = (
  { readonly __typename?: 'Query' }
  & { readonly items: (
    { readonly __typename?: 'ItemConnection' }
    & { readonly edges: ReadonlyArray<(
      { readonly __typename?: 'ItemEdge' }
      & { readonly node: (
        { readonly __typename?: 'Item' }
        & Pick<Item, 'id'>
        & ListItemFragment
      ) }
    )>, readonly pageInfo: (
      { readonly __typename?: 'PageInfo' }
      & Pick<PageInfo, 'endCursor' | 'hasNextPage'>
    ) }
  ) }
);

export type ListItemFragment = (
  { readonly __typename?: 'Item' }
  & Pick<Item, 'title' | 'content'>
);

export const ListItemFragmentDoc = `
    fragment ListItem on Item {
  title
  content
}
    `;
export const CreateItemDocument = `
    mutation CreateItem($title: String!, $content: String) {
  addItem(item: {title: $title, content: $content}) {
    id
  }
}
    `;
export const useCreateItemMutation = <
      TError = unknown,
      TContext = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit }, 
      options?: UseMutationOptions<CreateItemMutation, TError, CreateItemMutationVariables, TContext>
    ) => 
    useMutation<CreateItemMutation, TError, CreateItemMutationVariables, TContext>(
      (variables?: CreateItemMutationVariables) => fetcher<CreateItemMutation, CreateItemMutationVariables>(dataSource.endpoint, dataSource.fetchParams || {}, CreateItemDocument, variables)(),
      options
    );
export const ItemListDocument = `
    query ItemList($count: Int! = 5, $cursor: Cursor) {
  items(first: $count, after: $cursor) {
    edges {
      node {
        id
        ...ListItem
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${ListItemFragmentDoc}`;
export const useItemListQuery = <
      TData = ItemListQuery,
      TError = unknown
    >(
      dataSource: { endpoint: string, fetchParams?: RequestInit }, 
      variables?: ItemListQueryVariables, 
      options?: UseQueryOptions<ItemListQuery, TError, TData>
    ) => 
    useQuery<ItemListQuery, TError, TData>(
      ['ItemList', variables],
      fetcher<ItemListQuery, ItemListQueryVariables>(dataSource.endpoint, dataSource.fetchParams || {}, ItemListDocument, variables),
      options
    );