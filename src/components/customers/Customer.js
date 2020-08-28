import React from "react";

const Customer = ({ customer }) => {
  return (
    <tr>
      <td>{customer.Name}</td>
      {customer.Months.map((month, index) => (
        <td key={index}>{month} </td>
      ))}
      <td>{customer.Total} </td>
    </tr>
  );
};

export default Customer;
