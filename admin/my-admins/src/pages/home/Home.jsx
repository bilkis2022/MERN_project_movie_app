import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgeLg from "../../components/widgetLg/WidgeLg";

const Home = () => {
  const [userStates, setUserStates] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStates = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MmU5N2NkZDZjZjQ1MjIzZDEyM2YxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MTc1MTY2MiwiZXhwIjoxNjgyMTgzNjYyfQ.G0OK23uwbawjmFMy4FKw_HItuHJ5lcJUy_aWuLFUYF8",
          },
        });

        const sortData = res.data.sort(function (a, b) {
          return a._id - b._id;
        });
        console.log("sd", sortData);
        
        sortData.map((item) =>
          setUserStates((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "NEW USER": item.total },
          ])
        );
        console.log(userStates);
      } catch (e) {
        console.log(e);
      }
    };

    getStates();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStates}
        title={"User Analytics"}
        grid
        dataKey={"New User"}
      />
      <div className="homeWidgets">
          <WidgetSm />
          <WidgeLg />
      </div>
    </div>
  );
};

export default Home;
