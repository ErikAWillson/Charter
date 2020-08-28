import React, { Fragment } from "react";
import SearchBar from "./components/layout/SearchBar";
import CustomerList from "./components/customers/CustomerList";
import DefaultDate from "./components/DefautlDate";

import CustomerState from "./context/customer/CustomerState";
import "materialize-css/dist/css/materialize.min.css";

const App = () => {
  return (
    <CustomerState>
      <Fragment>
        <SearchBar />
        <div className='container'>
          <DefaultDate />
          <CustomerList />
        </div>
      </Fragment>
    </CustomerState>
  );
};

export default App;
