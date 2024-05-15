const Bug = ({ bug }) => {
  return (
    <li>
      Title: {bug.title} Description: {bug.description} Assignee:{" "}
      {bug.assignee.name} Story Points: {bug.story_points}
    </li>
  );
};

export default Bug;
