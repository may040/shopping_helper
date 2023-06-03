import {
  Box,
  Checkbox,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Divider, Icon, ListItem } from "@mui/material";
import { useState } from "react";

interface Props {
  onToggleItem: (id: string, completed: boolean) => void;
  onDeleteItem: (id: string) => void;
  oneItem: { id: string; title: string; categorie: string; completed: boolean };
}

function OneItem({ onToggleItem, onDeleteItem, oneItem }: Props) {
  const [checked, setChecked] = useState(oneItem.completed);

  const handleCheck = () => {
    setChecked(!checked);
    oneItem.completed = !checked;
  };

  return (
    <>
      <ListItem
        
        key={oneItem.id}
        divider={true}
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => onDeleteItem(oneItem.id)}
            color="warning"
          >
            <DeleteIcon />
          </IconButton>
        }
        // onClick={handleCheck}
        disablePadding
      >
        <ListItemButton role={undefined} dense sx={{color:"#81d4fa"}}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={oneItem.completed}
              tabIndex={-1}
              disableRipple
              onChange={(e) => onToggleItem(oneItem.id, e.target.checked)}
              sx={{color:"white"}}
              style ={{
                color: "#81d4fa",
              }}
            />
          </ListItemIcon>
          <ListItemText id={oneItem.id} primary={oneItem.title} />
        </ListItemButton>
      </ListItem>
    </>
  );
}

export default OneItem;

{
  /* <Stack direction="row" spacing={2}>
        <FormControlLabel
          control={
            <Checkbox
              checked={oneItem.completed}
              onChange={(e) => onToggleItem(oneItem.id, e.target.checked)}
            />
          }
          label={oneItem.title}
        />
        <Button
          type="submit"
          onClick={() => onDeleteItem(oneItem.id)}
          endIcon={<DeleteIcon />}
          variant="outlined"
          color="warning"
        >
          Delete
        </Button>
      </Stack>
      <Divider variant="inset" component="li" /> */
}
