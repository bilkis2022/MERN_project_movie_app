import { Publish } from '@mui/icons-material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import "./movie.css"


const Movie = () => {

  
    // const location = useLocation();
    // console.log('lmovie', location.state);

   const { state } = useLocation();
   console.log('state', state);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newMovie">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={state.some.img} alt="" className="productInfoImg" />
            <span className="productName">{state.some.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{state.some._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{state.some.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{state.some.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{state.some.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={state.some.title} />
            <label>Year</label>
            <input type="text" placeholder={state.some.year} />
            <label>Genre</label>
            <input type="text" placeholder={state.some.genre} />
            <label>Limit</label>
            <input type="text" placeholder={state.some.limit} />
            <label>Trailer</label>
            <input type="file" placeholder={state.some.trailer} />
            <label>Video</label>
            <input type="file" placeholder={state.some.video} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={state.some.img}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Movie