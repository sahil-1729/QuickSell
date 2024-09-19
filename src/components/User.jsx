import "./status.css";
import userProfile from "../assets/user.svg";
import dot from "../assets/dot.svg";
import add from "../assets/add.svg";

import noPriority from "../assets/No-priority.svg";
import urgent from "../assets/UrgentPriority.svg";
import high from "../assets/HighPriority.svg";
import medium from "../assets/MediumPriority.svg";
import low from "../assets/LowPriority.svg";

import backlog from "../assets/Backlog.svg";
import todo from "../assets/To-do.svg";
import inProgress from "../assets/in-progress.svg";
import done from "../assets/Done.svg";
import cancelled from "../assets/Cancelled.svg";

import getData from "../utils/GetData";
import { useEffect, useState } from "react";

const User = ({ sorting }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const priorities = [noPriority, low, medium, high, urgent];
  const status = {
    Backlog: backlog,
    "In progress": inProgress,
    Todo: todo,
    done: done,
    cancelled: cancelled,
  };

  useEffect(() => {
    const setData = async () => {
      const data = await getData();
      //   console.log(data);
      setTickets(data.tickets);
      setUsers(data.users);
    };
    setData();
  }, []);

  return (
    <>
      {users ? (
        <div className="status-box">
          <div className="section">
            {users.map((val, key) => {
              const filtered = tickets.filter((value) => {
                return value.userId === val.id;
              });
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
                      <img src={userProfile} alt="fireSpot" /> &nbsp;
                      {val.name} &nbsp;
                      <span className="task-length"> {filtered.length}</span>
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
                        <div key={key} className="task">
                          <div className="task-box-id">{val.id}</div>

                          <div className="task-title">
                            <img src={status[val.status]} alt="fireSpot" />
                            &nbsp;
                            {val.title}
                          </div>

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
      ) : (
        0
      )}
    </>
  );
};

export default User;
