import { useEffect, useState } from "react";
import * as React from "react";

import "./App.css";
import NewItemForm from "./components/NewItemForm";
import PropTable from "./components/PropTable";
import {
  Box,
  Container,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import ItemList from "./components/ItemList";

const DEFAULT = "DEFAULT";
const ITEMS = "ITEMS";
const CATEGORIES = "CATEGORIES";
const EMPTY = "";


function App() {
  const [items, setItems] = useState<
    {
      id: string;
      title: string;
      categorie: string;
      completed: boolean;
    }[]
  >(() => {
    countItemState;
    const localValue = localStorage.getItem(ITEMS);
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [categories, setCategories] = useState<
    {
      title: string;
    }[]
  >(() => {
    const localValue = localStorage.getItem(CATEGORIES);
    if (localValue == null) return [{ title: DEFAULT }];
    return JSON.parse(localValue);
  });

  const [tableContent, setTableContent] = useState<
    {
      id: string;
      doneItems: number;
      openItems: number;
      countItems: number;
    }[]
  >(countItemState);

  useEffect(() => {
    setTableContent(countItemState);
    localStorage.setItem(ITEMS, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  const addItem = (title: string, categorie: string) => {
    setItems((currentItems) => {
      if (categorie == EMPTY) {
        categorie = DEFAULT;
      }
      return [
        ...currentItems,
        { id: crypto.randomUUID(), title, categorie, completed: false },
      ];
    });
  };

  const addCategories = (title: string) => {
    setCategories((categories) => {
      if (title == EMPTY) return categories;

      if (
        items.filter((item) => item.categorie == title).length > 0 ||
        title == DEFAULT
      )
        return categories;

      return [...categories, { title }];
    });
  };

  const toggleItem = (id: string, completed: boolean) => {
    setItems((currentItems) => {
      return currentItems.map((item) => {
        if (item.id == id) {
          return { ...item, completed };
        }
        return item;
      });
    });
  };

  const deleteItem = (id: string) => {
    setItems((currentItems) => {
      return currentItems.filter((item) => item.id != id);
    });
  };

  function countItemState() {
    let tableContent: {
      id: string;
      doneItems: number;
      openItems: number;
      countItems: number;
    }[] = [];

    categories.map((cat) => {
      let doneItems = items.filter(
        (item) => item.completed && item.categorie == cat.title
      ).length;
      let openItems = items.filter(
        (item) => !item.completed && item.categorie == cat.title
      ).length;
      let countItems = items.filter(
        (item) => item.categorie == cat.title
      ).length;

      tableContent.push({
        id: cat.title,
        doneItems,
        openItems,
        countItems,
      });
    });

    return tableContent;
  }

  return (
    <Container >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={"aaa"}
      >
        <Grid item md={12} border={"4px solid black"} >
          <Paper
            sx={{
              padding: 5,
              textAlign: "center",
              bgcolor:"#1976d2"
            }}
          >
            <Typography variant="h2" color={"#FFFF"} fontFamily={"Helvetica-Bold"} >Your Shopping Helper</Typography>
          </Paper>
        </Grid>

        <Grid item md={6} border={"4px solid black"} alignSelf={"flex-start"} justifyItems={"center"}>
          <Paper
          
            sx={{
              padding: 5,
              textAlign: "center",
              bgcolor:"#1976d2",              
            }}
          >
            <PropTable table={tableContent}></PropTable>
          </Paper>
        </Grid>

        <Grid item md={6} border={"4px solid black"} alignItems={"center"}>
          <Paper
            sx={{
              padding: 5,
              bgcolor:"#1976d2"

            }}
          >
            <NewItemForm
              onItemSubmit={addItem}
              onCategorieSubmit={addCategories}
            ></NewItemForm>
            {categories.map((categorie) => {
              return (
                <>
                  <h1 className="header" >{categorie.title.toUpperCase()}</h1>
                  <ItemList
                    key={categorie.title}
                    onToggleItem={toggleItem}
                    onDeleteItem={deleteItem}
                    itemList={items.filter(
                      (item) => item.categorie == categorie.title
                    )}
                  ></ItemList>
                </>
              );
            })}
          </Paper>
        </Grid>
      </Grid>
      </Container>
  );
}

export default App;
