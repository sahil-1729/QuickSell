import "./nav.css";
import display from "../assets/Display.svg";
import down from "../assets/down.svg";
import { useState } from "react";
import KanbanBoard from "./KanbanBoard";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [criteria, setCriteria] = useState(
    window.localStorage.getItem("items")
      ? JSON.parse(window.localStorage.getItem("items"))
      : {
          grouping: "",
          ordering: "",
        }
  );
  // console.log(criteria);
  return (
    <>
      <div className="nav-box">
        <button
          className=""
          onClick={(e) => {
            setVisible(!visible);
          }}
        >
          <img src={display} alt="fireSpot" /> Display
          <img src={down} alt="fireSpot" />
        </button>
        <div
          className="temp"
          style={{ visibility: visible ? "visible" : "hidden" }}
        >
          <div className="select-div">
            <div>Grouping</div>
            <select
              name="group"
              value={
                window.localStorage.getItem("items")
                  ? JSON.parse(window.localStorage.getItem("items")).grouping
                  : "Status"
              }
              onChange={(e) => {
                // console.log(e.target.value);
                const res = { ...criteria, grouping: e.target.value };
                setCriteria(res);
                window.localStorage.setItem("items", JSON.stringify(res));
              }}
            >
              <option value="Status">Status</option>
              <option value="Priority">Priority</option>
              <option value="User">User</option>
            </select>
          </div>
          <div className="select-div">
            <div>Ordering</div>
            <select
              name="order"
              value={
                window.localStorage.getItem("items")
                  ? JSON.parse(window.localStorage.getItem("items")).ordering
                  : "Priority"
              }
              onChange={(e) => {
                console.log(e.target.value);
                const res = { ...criteria, ordering: e.target.value };
                setCriteria(res);
                window.localStorage.setItem("items", JSON.stringify(res));
              }}
            >
              <option value="Priority">Priority</option>
              <option value="Title">Title</option>
            </select>
          </div>
        </div>
      </div>
      <KanbanBoard criteria={criteria} />
    </>
  );
};

export default Navbar;
