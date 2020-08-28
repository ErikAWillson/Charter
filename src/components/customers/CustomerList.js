import React, { useState, useContext, useEffect, Fragment } from "react";
import Customer from "./Customer";
import CustomerContext from "../../context/customer/customerContext";
import Spinner from "../layout/Spinner";

const CustomerList = () => {
  const customerContext = useContext(CustomerContext);
  const { customers, filtered, getCustomerList } = customerContext;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCustomerList(new Date(2020, 9));
    setLoading(false);
    //eslint-disable-next-line
  }, [filtered]);

  if (customers !== null && customers.length === 0 && !loading) {
    return <h4> No contacts found!</h4>;
  }

  return (
    <Fragment>
      {customers !== null && !loading ? (
        <ul className='collection with-header'>
          <li className='collection-header'>
            <h4 className='center'> Customer List</h4>
          </li>
          <table className='centered striped responsive-table'>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>October Points</th>
                <th>November Points</th>
                <th>December Points</th>
                <th>Total Points</th>
              </tr>
            </thead>
            <tbody>
              {filtered !== null
                ? filtered.map((customer, index) => (
                    <Customer customer={customer} key={index} />
                  ))
                : customers.map((customer, index) => (
                    <Customer customer={customer} key={index} />
                  ))}
            </tbody>
          </table>
        </ul>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default CustomerList;
