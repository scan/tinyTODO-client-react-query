import * as React from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import type { ListItemFragment } from "~/api";

interface Props {
  item: ListItemFragment;
}

const Item: React.FC<Props> = ({ item: { title, content } }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="h2">
        {title}
      </Typography>
      <Typography variant="body2" component="p">
        {content}
      </Typography>
    </CardContent>
    <CardActions>
      <IconButton color="secondary">
        <DeleteIcon />
      </IconButton>
    </CardActions>
  </Card>
);

Item.displayName = "Item";

export default Item;
