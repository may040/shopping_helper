import Add from "@mui/icons-material/Add";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@mui/joy";
import { FormGroup, InputLabel } from "@mui/material";
import React, { FormEvent, useState } from "react";

interface Props {
  onItemSubmit: (item: string, categorie: string) => void;
  onCategorieSubmit: (item: string) => void;
}
function NewItemForm({ onItemSubmit, onCategorieSubmit }: Props) {
  const [newItem, setNewItem] = useState("");
  const [newCategorie, setNewCategorie] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newItem == "") return;

    onItemSubmit(newItem, newCategorie);
    onCategorieSubmit(newCategorie);

    setNewItem("");
    setNewCategorie("");
  };

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <FormGroup sx={{ width: "100%", maxWidth: 400 }}>
        <FormControl sx={{ margin: 3 }}>
          <FormLabel component="legend" sx={{ color: "white" }}>
            Enter new item!
          </FormLabel>
          <Input
            id="newItem"
            aria-describedby="newItem-text"
            value={newItem}
            onChange={(input) => setNewItem(input.target.value)}
            type="text"
            placeholder="New Item"
            variant="soft"
            color="primary"
          />
          <FormHelperText id="newItem-text" sx={{ color: "white" }}>
            Enter your new item to a categorie!
          </FormHelperText>
        </FormControl>
        <FormControl sx={{ margin: 3 }}>
          <FormLabel component="legend" sx={{ color: "white" }}>
            Enter a categorie!
          </FormLabel>
          <Input
            id="categorie"
            aria-describedby="categorie-text"
            value={newCategorie}
            onChange={(input) => setNewCategorie(input.target.value)}
            type="text"
            placeholder="Categorie"
            variant="soft"
            color="primary"
          />
          <FormHelperText id="categorie-text" sx={{ color: "white" }}>
            Enter categorie of the item!
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            color: "white",
            ":hover": {
              border: "1px solid #82b1ff",
              color: "white",
              backgroundColor: "#81d4fa",
            },
          }}
          startDecorator={<Add />}
        >
          Add
        </Button>
      </FormGroup>
    </form>
  );
}

export default NewItemForm;
