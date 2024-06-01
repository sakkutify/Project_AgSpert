// src/pages/OrdersPage.js
import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Button } from '@chakra-ui/react';
import ActiveOrders from '../components/ActiveOrders';
import CompletedOrders from '../components/CompletedOrders';
import NewOrderModal from '../components/NewOrderModal';

const OrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box p={4}>
      {/* <Button onClick={() => setIsModalOpen(true)}>+ Sale Order</Button> */}
      <Tabs mt={4}>
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveOrders />
          </TabPanel>
          <TabPanel>
            <CompletedOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <NewOrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
};

export default OrdersPage;
