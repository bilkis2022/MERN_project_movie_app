import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./widgetSm.css"
import { Visibility } from "@mui/icons-material";

const WidgetSm = () => {

  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    
    const getnewUser = async () => {

      try {
        const res = await axios.get("/users?new=true", {
          headers : {
            token : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmU5N2NkZDZjZjQ1MjIzZDEyM2YxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjIyNzM1MCwiZXhwIjoxNjgyNjU5MzUwfQ.WTrmHed5nKXdk26mfnrseiliROacGDE_CZOperrrJcY"
          }
        });
        console.log('newuser', res);
        setNewUser(res.data)

      } catch (error) {
        console.log(error);
      }
    };
    getnewUser();
  }, [])
  

  return (
    <div className='widgetSm'>
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {newUser.map((user) => (
          <li className="widgetSmListItem">
            <img
              src={
                user.profilePic ||
                "https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export default WidgetSm