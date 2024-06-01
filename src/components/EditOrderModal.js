// src/components/EditOrderModal.js
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const updateOrder = async (updatedOrder) => {
  const { data } = await axios.put(`/api/orders/${updatedOrder.id}`, updatedOrder);
  return data;
};

const EditOrderModal = ({ order, readOnly = false, onClose }) => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: order,
  });
  const queryClient = useQueryClient();
  const mutation = useMutation(updateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['activeOrders']);
      onClose();
      reset();
    }
  });

  const onSubmit = (data) => {
    mutation.mutate({ ...order, ...data });
  };

  return (
    <Modal isOpen={Boolean(order)} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>Customer</FormLabel>
              <Select {...register('customer_id')} isDisabled={readOnly}>
                {/* Map through customers to create options */}
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Invoice No</FormLabel>
              <Input {...register('invoice_no')} isReadOnly={readOnly} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoice_date"
                control={control}
                render={({ field }) => <DatePicker selected={field.value} onChange={field.onChange} readOnly={readOnly} />}
              />
            </FormControl>
            {/* Add more fields as needed */}
            {!readOnly && <Button mt={4} type="submit">Update Order</Button>}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditOrderModal;
