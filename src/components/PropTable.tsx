import { Box, TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const header: GridColDef[] = [
  { field: "id", headerName: "Categorie",    headerClassName: 'super-app-theme--header',
  minWidth: 90 },
  { field: "doneItems", headerName: "#Done items",    headerClassName: 'super-app-theme--header',
  minWidth: 90 },
  { field: "openItems", headerName: "#Open items",    headerClassName: 'super-app-theme--header',
  minWidth: 90 },
  { field: "countItems", headerName: "#Items",    headerClassName: 'super-app-theme--header',
  minWidth: 90 },
];

interface Prop {
  table: {
    id: string;
    doneItems: number;
    openItems: number;
    countItems: number;
  }[];
}

function PropTable({ table }: Prop) {
  return (
    <Box>
      <DataGrid
        sx={{
          boxShadow: 2,
          width:400,
          border: 2,
          color:"white",
          borderColor: "white",
          "& .MuiDataGrid-cell:hover": {
            color: "red",
          },
          '& .super-app-theme--header': {
            backgroundColor: '#42a5f5',
          },
          marginTop: 3,
        }}
        hideFooter={true}
        rows={table}
        columns={header}
      ></DataGrid>
    </Box>
  );
}

export default PropTable;
