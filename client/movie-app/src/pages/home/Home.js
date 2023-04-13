import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import List from "../../components/list/List.jsx";

const Home = ({ type }) => {
  const [list, setList] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomList = async () => {
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type : ''}${genre ? "&genre=" + genre : ''} `,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmU5N2NkZDZjZjQ1MjIzZDEyM2YxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTMwOTQ0NSwiZXhwIjoxNjgxNzQxNDQ1fQ.ydNfWRuRdiWcFCUQy4ykgCrRgzAcCnYdjr0EFtAU1zk",
            },
          }
        );
        console.log('home',res);
        setList(res.data);

      } catch (error) {
        console.log(error);
      }
    };
    getRandomList();
  }, [type, genre]);
  return (
    <div className="home">
      <Navbar />
      {
        list.map((lists)=>
          
         ( <List lists={lists} />)
        )
      }
      
    </div>
  );
};

export default Home;
