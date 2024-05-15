import { useState } from "react";

const CreateForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [points, setPoints] = useState("");

  return (
    <>
      <h3>Create Ticket</h3>
      <form onSubmit={() => console.log("Hello World")}>
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
