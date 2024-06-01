import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createNewOrder } from '../utils/api'; // Assume this is the function to create a new order
import { Box, Button, Input, FormControl, FormLabel, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Spinner, Alert, AlertIcon, Checkbox } from '@chakra-ui/react';

const NewOrderModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: createNewOrder,
    onSuccess: () => {
      queryClient.invalidateQueries('activeOrders');
      onClose();
      reset();
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <Button onClick={onOpen}>+ Sale Order</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Sale Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Customer ID</FormLabel>
                <Input {...register('customer_id', { required: true })} />
              </FormControl>
              <FormControl>
                <FormLabel>SKU ID</FormLabel>
                <Input {...register('sku_id', { required: true })} />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input {...register('price', { required: true })} />
              </FormControl>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input {...register('quantity', { required: true })} />
              </FormControl>
              <FormControl>
                <FormLabel>Invoice No</FormLabel>
                <Input {...register('invoice_no', { required: true })} />
              </FormControl>
              <FormControl>
                <FormLabel>Invoice Date</FormLabel>
                <Input {...register('invoice_date', { required: true })} type="date" />
              </FormControl>
              <FormControl>
                <FormLabel>Paid</FormLabel>
                <Checkbox {...register('paid', { required: true })} type="checkbox" />
              </FormControl>
              <Button type="submit" isLoading={mutation.isLoading}>Create</Button>
              {mutation.isError && (
                <Alert status="error">
                  <AlertIcon />
                  There was an error creating the order
                </Alert>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewOrderModal;
