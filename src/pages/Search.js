import SearchComponent from "../components/Query/SearchComponent";
import { useNavigate } from "react-router-dom";
import { checkStatus } from "../util/auth";

const Search = () => {
  const navigate = useNavigate();

  const handlePredictButtonClick = () => {
    navigate("/predict");
  };

  const tokenStatus = checkStatus();

  return (
    <>
      <SearchComponent />
      {tokenStatus && (
        <button onClick={handlePredictButtonClick}>
          Predict Property Price
        </button>
      )}
    </>
  );
};

export default Search;
