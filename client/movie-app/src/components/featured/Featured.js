import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Featured = ({ type, setGenre }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    const getRandomcontent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem('userm')).accessToken 
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomcontent();
  }, [type]);

  console.log(content);

  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option>Genre</option>
            <option value="comedy">Comedy</option>
            <option value="nature">Nature</option>
          </select>
        </div>
      )}

      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} />
        <span className="desc">{content.desk}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button>
            <MoreVertIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
