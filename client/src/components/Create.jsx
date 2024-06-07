import { useState } from "react";
import bugService from "../services/bug";

const CreateForm = ({ bugs, setAlertColor, setBugs, setNotification }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [points, setPoints] = useState("");

  const createBug = (event) => {
    event.preventDefault();
    const newBug = {
      title,
      description,
      assignee,
      points,
    };
    bugService.create(newBug).then((newBug) => {
      setBugs(bugs.concat(newBug));
      setAlertColor("added");
      setNotification(`Added ${title} for ${assignee}`);
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }).catch(() => {
      setAlertColor("deleted");
      setNotification("Check Fields");
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }).finally(() => {
      setTitle("");
      setDescription("");
      setAssignee("");
      setPoints("");
    });
  };

  return (
    <>
      <h3>Create Ticket</h3>
      <form onSubmit={createBug}>
        <div>
          <input
            type="title"
            value={title}
            placeholder="title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <input
            type="description"
            value={description}
            placeholder="description"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div>
          <input
            type="assignee"
            value={assignee}
            placeholder="assignee"
            onChange={(event) => setAssignee(event.target.value)}
          />
        </div>
        <div>
          <input
            type="points"
            value={points}
            placeholder="points"
            onChange={(event) => setPoints(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default CreateForm;
