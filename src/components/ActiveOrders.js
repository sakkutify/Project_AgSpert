import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchActiveOrders } from '../utils/api'; // Assume this is the function to fetch active orders
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import NewOrderModal from './NewOrderModal';
import EditOrderModal from './EditOrderModal';

function editOrder(){
    <EditOrderModal />
  }

const ActiveOrders = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['activeOrders'],
    queryFn: fetchActiveOrders
  });

  

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error fetching the active orders
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box>
        No active orders found.
      </Box>
    );
  }

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Customer Name</Th>
            <Th>Order Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.order_date}</Td>
              <Td>
                
                <Button onClick={editOrder()}>Edit</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default ActiveOrders;
