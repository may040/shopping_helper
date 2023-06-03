import { List } from "@mui/joy";
import OneItem from "./OneItem";
import Divider from "@mui/material/Divider";
import { alignProperty } from "@mui/material/styles/cssUtils";

interface Props {
  onToggleItem: (id: string, completed: boolean) => void;
  onDeleteItem: (id: string) => void;
  itemList: {
    id: string;
    title: string;
    categorie: string;
    completed: boolean;
  }[];
}
function ItemList({ onToggleItem, onDeleteItem, itemList }: Props) {

  return (
    <List sx={{ width: '100%', maxWidth:400 }}>
      {itemList.length == 0 && "No Items"}
      {itemList.map((item) => {
        return (
          <>
            <OneItem
              oneItem={item}
              key={item.id}
              onToggleItem={onToggleItem}
              onDeleteItem={onDeleteItem}
            ></OneItem>
          </>
        );
      })}
      <br></br>
    </List>
  );
}

export default ItemList;

