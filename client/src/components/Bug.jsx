const Bug = ({ bug }) => {
  return (
    <>
      Title: {bug.title} Description: {bug.description} Assignee: {bug.assignee}{" "}
      Story Points: {bug.story_points}
    </>
  );
};
