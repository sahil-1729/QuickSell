import "./status.css";
import backlog from "../assets/Backlog.svg";
import todo from "../assets/To-do.svg";
import inProgress from "../assets/in-progress.svg";
import done from "../assets/Done.svg";
import cancelled from "../assets/Cancelled.svg";
import dot from "../assets/dot.svg";
import add from "../assets/add.svg";

import noPriority from "../assets/No-priority.svg";
import urgent from "../assets/UrgentPriority.svg";
import high from "../assets/HighPriority.svg";
import medium from "../assets/MediumPriority.svg";
import low from "../assets/LowPriority.svg";
import userProfile from "../assets/user.svg";

import getData from "../utils/GetData";
import { useEffect, useState } from "react";

const Status = ({ sorting }) => {
  const stat = [
    {
      icon: backlog,
      status: "Backlog",
    },
    {
      icon: todo,
      status: "Todo",
    },
    {
      icon: inProgress,
      status: "In Progress",
    },
    {
      icon: done,
      status: "Done",
    },
    {
      icon: cancelled,
      status: "Cancelled",
    },
  ];
  const priorities = [noPriority, low, medium, high, urgent];
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const setData = async () => {
      const data = await getData();
      // console.log(data);
      setTickets(data.tickets);
    };
    setData();
  }, []);

  return (
    <>
      <div className="status-box">
        <div className="section">
          {stat.map((val, key) => {
            const filtered = tickets.filter((value) => {
              return value.status.toLowerCase() === val.status.toLowerCase();
            });
            {
              /* console.log("filtered ", val.status, filtered); */
            }
            if (sorting === "Priority") {
              filtered.sort((a, b) => b.priority - a.priority);
            } else {
              filtered.sort((a, b) => a.title.localeCompare(b.title));
            }

            return (
              <div key={key} className="section-part">
                <div className="section-title">
                  <div>
                    {" "}
                    <img src={val.icon} alt="fireSpot" /> &nbsp;
                    {val.status} &nbsp; {filtered.length}
                  </div>
                  <div>
                    {" "}
                    <img src={add} alt="fireSpot" />
                    &nbsp;
                    <img src={dot} alt="fireSpot" />
                  </div>
                </div>
                <div className="task-box">
                  {filtered.map((val, key) => {
                    return (
                      <div className="task" key={key}>
                        <div className="task-box-id">
                          {val.id} <img src={userProfile} alt="fireSpot" />
                        </div>
                        <div>{val.title}</div>
                        <div className="task-tag-div">
                          <div className="task-tag">
                            <img
                              src={priorities[val.priority]}
                              alt="fireSpot"
                            />
                          </div>
                          <div className="task-tag"> {...val.tag}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Status;
