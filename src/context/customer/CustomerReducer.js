export default (state, action) => {
  switch (action.type) {
    case "GET_CUSTOMERS":
      return {
        ...state,
        customers: action.payload,
      };
    case "FILTER_CUSTOMERS":
      return {
        ...state,
        filtered: state.customers.filter((customer) => {
          const regex = new RegExp(`${action.payload}`, "gi"); //gi = global + case insensitive
          return customer.Name.match(regex);
        }),
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        filtered: null,
      };
    case "CUSTOMER_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
