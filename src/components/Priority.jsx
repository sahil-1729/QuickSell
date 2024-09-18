import "./status.css";
import noPriority from "../assets/No-priority.svg";
import urgent from "../assets/UrgentPriority.svg";
import high from "../assets/HighPriority.svg";
import medium from "../assets/MediumPriority.svg";
import low from "../assets/LowPriority.svg";
import dot from "../assets/dot.svg";
import add from "../assets/add.svg";
import getData from "../utils/GetData";
import userProfile from "../assets/user.svg";

import backlog from "../assets/Backlog.svg";
import todo from "../assets/To-do.svg";
import inProgress from "../assets/in-progress.svg";
import done from "../assets/Done.svg";
import cancelled from "../assets/Cancelled.svg";
import { useEffect, useState } from "react";

const Priority = ({ sorting }) => {
  const priorit = [
    {
      icon: noPriority,
      priority: "No priority",
    },
    {
      icon: urgent,
      priority: "Urgent",
    },
    {
      icon: high,
      priority: "High",
    },
    {
      icon: medium,
      priority: "Medium",
    },
    {
      icon: low,
      priority: "Low",
    },
  ];
  const status = {
    Backlog: backlog,
    "In progress": inProgress,
    Todo: todo,
    done: done,
    cancelled: cancelled,
  };
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
          {priorit.map((val, key) => {
            const priorityNo = {
              "No priority": 0,
              Urgent: 4,
              High: 3,
              Medium: 2,
              Low: 1,
            };
            const filtered = tickets.filter((value) => {
              return value.priority === priorityNo[val.priority];
            });
            if (sorting === "Priority") {
              filtered.sort((a, b) => b.priority - a.priority);
            } else {
              filtered.sort((a, b) => a.title.localeCompare(b.title));
            }
            {
              /* console.log("filtered ", val.status, filtered); */
            }
            return (
              <div key={key} className="section-part">
                <div className="section-title">
                  <div>
                    {" "}
                    <img src={val.icon} alt="fireSpot" /> &nbsp;
                    {val.priority} &nbsp; {filtered.length}
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
                        <div>
                          <img src={status[val.status]} alt="fireSpot" />
                          &nbsp;{val.title}
                        </div>

                        <div className="task-tag">{...val.tag}</div>
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

export default Priority;
