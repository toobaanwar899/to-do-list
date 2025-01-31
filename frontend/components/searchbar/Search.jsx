import { setSearch } from "@/features/task/taskSlice";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Search = () => {
  const dispatch = useDispatch();
  function handleChange(event) {
    const { value } = event.target;
    dispatch(setSearch(value));
    console.log(value);
  }
  return (
    <StyledWrapper>
      <input
        className="input w-full"
        name="search"
        onChange={handleChange}
        placeholder="Search..."
        type="search"
        aria-label="Search"
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input {
    max-width: 100%;
    background-color: #f5f5f5;
    color: #242424;
    padding: 0.15rem 0.5rem;
    min-height: 40px;
    border-radius: 4px;
    outline: none;
    border: none;
    line-height: 1.15;
    box-shadow: 0px 10px 20px -18px;
    margin: 0; /* Ensure no extra margin pushes it off alignment */
  }

  input:focus {
    border-bottom: 2px solid #5b5fc7;
    border-radius: 4px 4px 2px 2px;
  }

  input:hover {
    outline: 1px solid lightgrey;
  }
`;

export default Search;
