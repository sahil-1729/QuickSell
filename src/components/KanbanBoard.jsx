import Priority from "./Priority";
import Status from "./Status";
import User from "./User";

const KanbanBoard = ({ criteria }) => {
  if (criteria.grouping === "Status") {
    return <Status sorting={criteria.ordering} />;
  } else if (criteria.grouping === "Priority") {
    return <Priority sorting={criteria.ordering} />;
  } else if (criteria.grouping === "User") {
    return <User sorting={criteria.ordering} />;
  } else {
    return <Status sorting={criteria.ordering} />;
  }
};

export default KanbanBoard;
