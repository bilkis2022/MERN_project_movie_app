import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "./movieList.css";
import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MovieContext } from "../../context/movieContext/MovieContext";
import {
  DeleteMovies,
  GetMovies,
} from "../../context/movieContext/MovieApiCalls";



export default function MovieList() {
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    GetMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    DeleteMovies(id, dispatch);
  };
  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 150,

      valueGetter: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },

    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      valueGetter: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/movie/" + params.row._id, movie: params.row }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutlineOutlinedIcon
             className="productListDelete"
             onClick={()=> handleDelete(params.row._id)} ></DeleteOutlineOutlinedIcon>
          </>
          // <div className="productListItem">
          //   <img className="productListImg" src={params.row.img} alt="" />
          //   {params.row.title}
          // </div>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={movies}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
