import React, { useCallback, useState } from "react";

import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import CreateItemFormDialog from "./CreateItemFormDialog";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

interface Props {
  onSuccess?: () => void;
}

const CreateItemButton: React.FC<Props> = ({ onSuccess }) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();

      setDialogOpen(true);
    },
    [setDialogOpen]
  );

  const handleClose = useCallback(() => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  return (
    <>
      <Fab
        color="primary"
        onClick={handleClick}
        aria-label="Add Item"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>

      <CreateItemFormDialog
        open={dialogOpen}
        onClose={handleClose}
        onSuccess={onSuccess}
      />
    </>
  );
};

CreateItemButton.displayName = "CreateItemButton";

export default CreateItemButton;
