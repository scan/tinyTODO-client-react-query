import * as React from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { useItemListQuery } from "~/api";

import Item from "./Item";
import CreateItemButton from "./CreateItemButton";

const ItemList: React.FC = () => {
  const [result, refetch] = useItemListQuery();

  const { data, fetching: loading, error } = result;

  const handleLoadMore = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      refetch();
    },
    [refetch]
  );

  const handleCreationSuccess = React.useCallback(() => {
    refetch();
  }, [refetch]);

  if (error) {
    return <p>Error loading items</p>;
  }

  if (loading || !data) {
    return null;
  }

  return (
    <>
      <Grid container direction="column">
        <Grid item container spacing={2}>
          {data.items.edges.map((edge) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={edge.node.id}>
              <Item item={edge.node} />
            </Grid>
          ))}
        </Grid>
        {data?.items?.pageInfo.hasNextPage && (
          <Grid item>
            <Button fullWidth onClick={handleLoadMore} disabled={loading}>
              Load more
            </Button>
          </Grid>
        )}
      </Grid>
      <CreateItemButton onSuccess={handleCreationSuccess} />
    </>
  );
};

export default ItemList;
