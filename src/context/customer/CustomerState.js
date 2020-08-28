import React, { useReducer } from "react";
import CustomerContext from "./customerContext";
import customerReducer from "./CustomerReducer";
import axios from "axios";

const CustomerState = (props) => {
  const initialState = {
    customers: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(customerReducer, initialState);

  //get customers
  const getCustomerList = async (date) => {
    try {
      const res = await axios.get("/customers");
      const customerDataArr = customerPointTotals(res.data, date);
      dispatch({
        type: "GET_CUSTOMERS",
        payload: customerDataArr,
      });
    } catch (error) {
      dispatch({
        type: "CUSTOMER_ERROR",
        payload: error.response.msg,
      });
    }
  };

  //get a customer that a user searches for
  const filterCustomers = (text) => {
    dispatch({
      type: "FILTER_CUSTOMERS",
      payload: text,
    });
  };
  //clear filters
  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  //Calculate total points/month for each customer
  const customerPointTotals = (customers, startingDate) => {
    let customerPoints = {};

    customers.forEach((customer) => {
      let name = customer.customer_name;
      let points = determinePoints(customer.trans_amnt);
      let monthIndex = determineMonthIndex(
        new Date(customer.trans_date),
        startingDate
      );

      if (customerPoints[name] == null) {
        customerPoints[name] = {
          Months: new Array(3).fill(0),
          Total: points,
        };
        customerPoints[name].Months[monthIndex] = points;
      } else {
        customerPoints[name].Months[monthIndex] += points;
        customerPoints[name].Total += points;
      }
    });

    return Object.keys(customerPoints).map((key) => {
      return {
        Name: key,
        Months: customerPoints[key].Months,
        Total: customerPoints[key].Total,
      };
    });
  };
  //determine which we are dealing with
  const determineMonthIndex = (transDate, startDate) => {
    let sDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1);
    if (transDate < sDate) {
      return 0;
    } else if (transDate < sDate.setMonth(sDate.getMonth() + 1)) {
      return 1;
    } else {
      return 2;
    }
  };
  //Calculate points for each transaction
  const determinePoints = (amount) => {
    amount = Math.floor(amount); // 1 point per complete dollar
    if (amount <= 50) {
      return 0;
    } else if (amount <= 100) {
      return amount - 50;
    }

    return 50 + (amount - 100) * 2;
  };

  return (
    <CustomerContext.Provider
      value={{
        customers: state.customers,
        filtered: state.filtered,
        filterCustomers,
        getCustomerList,
        clearFilter,
      }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
};

export default CustomerState;
