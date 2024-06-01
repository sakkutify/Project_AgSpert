// api.js
export const fetchActiveOrders = async () => {
    // Mock implementation, replace with actual API call
    return [
      { id: 1, customer_name: 'Customer A', order_date: '2024-05-28' },
      { id: 2, customer_name: 'Customer B', order_date: '2024-05-29' },
    ];
  };
  
  export const fetchCompletedOrders = async () => {
    // Mock implementation, replace with actual API call
    return [
      { id: 3, customer_name: 'Customer C', order_date: '2024-05-27' },
      { id: 4, customer_name: 'Customer D', order_date: '2024-05-26' },
    ];
  };
  
  export const createNewOrder = async (orderData) => {
    // Mock implementation, replace with actual API call
    console.log('Creating new order', orderData);
    return orderData;
  };
  