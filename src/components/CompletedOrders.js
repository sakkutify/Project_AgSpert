import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCompletedOrders } from '../utils/api'; // Assume this is the function to fetch completed orders
import { Box, Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const CompletedOrders = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['completedOrders'],
    queryFn: fetchCompletedOrders
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        There was an error fetching the completed orders
      </Alert>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box>
        No completed orders found.
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
          </Tr>
        </Thead>
        <Tbody>
          {data.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.order_date}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CompletedOrders;
