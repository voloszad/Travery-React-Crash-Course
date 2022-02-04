import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "./Button";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <h3>{id} at '{location.pathname}'</h3>
      <Button onClick={() => navigate(-1)} text='Go back' />
    </div>
  );
};

export default TaskDetails;
