import React, { useRef, useContext, useEffect } from "react";
import CustomerContext from "../../context/customer/customerContext";

const SearchBar = () => {
  const customerContext = useContext(CustomerContext);
  const text = useRef("");

  const { filterCustomers, clearFilter, filtered } = customerContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });
  const onChange = (event) => {
    if (text.current.value !== "") {
      filterCustomers(event.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <nav style={{ marginBottom: "30px" }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Search for Customers...'
              ref={text}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default SearchBar;
