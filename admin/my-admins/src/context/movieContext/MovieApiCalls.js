import axios from "axios";
import {
  createMoviesFailure,
  createMoviesStart,
  createMoviesSuccess,
  deleteMoviesFailure,
  deleteMoviesStart,
  deleteMoviesSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
} from "./MovieAction";

//  get_____movies______

export const GetMovies = async (dispatch) => {
  dispatch(getMoviesStart());

  try {
    const res = await axios.get("/movies", {
      headers: {
        token:
          "Bearer " + JSON.parse(localStorage.getItem("movieUser").accessToken),
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (e) {
    dispatch(getMoviesFailure());
  }
};

// create___movies__________

export const CreateMovies = async (movie, dispatch) => {
  dispatch(createMoviesStart());

  try {
    const res = await axios.post("/movies", movie, {
      headers: {
        token:
          "Bearer " + JSON.parse(localStorage.getItem("movieuser").accessToken),
      },
    });

    dispatch(createMoviesSuccess(res.data));
  } catch (e) {
    dispatch(createMoviesFailure());
  }
};

// delete_movies_______

export const DeleteMovies = async (id, dispatch) => {
  dispatch(deleteMoviesStart());

  try {
    const res = await axios.delete("/movies/" + id, {
      headers: {
        token:
          "Bearer " + JSON.parse(localStorage.getItem("movieUser")).accessToken,
      },
    });

    dispatch(deleteMoviesSuccess(id));
  } catch (err) {
    dispatch(deleteMoviesFailure());
  }
};
