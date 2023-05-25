import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createRestaurants } from 'apiSdk/restaurants';
import { Error } from 'components/error';
import { RestaurantsInterface } from 'interfaces/restaurants';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { UsersInterface } from 'interfaces/users';
import { getUsers } from 'apiSdk/users';

function RestaurantsCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RestaurantsInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRestaurants(values);
      resetForm();
      router.push('/restaurants');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RestaurantsInterface>({
    initialValues: {
      name: '',
      location: '',
      contact_details: '',
      operating_hours: '',
      owner_id: null,
      feedbacks: [],
      menus: [],
      orders: [],
      reservations: [],
    },
    validationSchema: restaurantsValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Restaurants
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="location" mb="4" isInvalid={!!formik.errors.location}>
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} />
            {formik.errors.location && <FormErrorMessage>{formik.errors.location}</FormErrorMessage>}
          </FormControl>
          <FormControl id="contact_details" mb="4" isInvalid={!!formik.errors.contact_details}>
            <FormLabel>Contact Details</FormLabel>
            <Input
              type="text"
              name="contact_details"
              value={formik.values.contact_details}
              onChange={formik.handleChange}
            />
            {formik.errors.contact_details && <FormErrorMessage>{formik.errors.contact_details}</FormErrorMessage>}
          </FormControl>
          <FormControl id="operating_hours" mb="4" isInvalid={!!formik.errors.operating_hours}>
            <FormLabel>Operating Hours</FormLabel>
            <Input
              type="text"
              name="operating_hours"
              value={formik.values.operating_hours}
              onChange={formik.handleChange}
            />
            {formik.errors.operating_hours && <FormErrorMessage>{formik.errors.operating_hours}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UsersInterface>
            formik={formik}
            name={'owner_id'}
            label={'Owner'}
            placeholder={'Select Users'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record.id}
              </option>
            )}
          />

          <ArrayFormField
            values={formik.values.feedbacks}
            errors={formik.errors.feedbacks}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'rating', label: 'rating' },
              { fieldName: 'review', label: 'review' },
              { fieldName: 'created_at', label: 'created_at' },
              { fieldName: 'customer_id', label: 'users' },
            ]}
            title={'Feedbacks'}
            name="feedbacks"
            rowInitialValues={{
              rating: 0,
              review: '',
              created_at: new Date(new Date().toDateString()),
              customer_id: null,
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'rating' && (
                  <FormControl id="rating" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'review' && (
                  <FormControl id="review" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'created_at' && (
                  <FormControl id="created_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'customer_id' && (
                  <AsyncSelect<UsersInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Users'}
                    fetcher={getUsers}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.menus}
            errors={formik.errors.menus}
            setFieldValue={formik.setFieldValue}
            properties={[{ fieldName: 'name', label: 'name' }]}
            title={'Menus'}
            name="menus"
            rowInitialValues={{ name: '' }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'name' && (
                  <FormControl id="name" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.orders}
            errors={formik.errors.orders}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'status', label: 'status' },
              { fieldName: 'total_price', label: 'total_price' },
              { fieldName: 'created_at', label: 'created_at' },
              { fieldName: 'updated_at', label: 'updated_at' },
              { fieldName: 'customer_id', label: 'users' },
            ]}
            title={'Orders'}
            name="orders"
            rowInitialValues={{
              status: '',
              total_price: 0,
              created_at: new Date(new Date().toDateString()),
              updated_at: new Date(new Date().toDateString()),
              customer_id: null,
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'status' && (
                  <FormControl id="status" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" name={name} value={value} onChange={formik.handleChange} />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'total_price' && (
                  <FormControl id="total_price" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'created_at' && (
                  <FormControl id="created_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'updated_at' && (
                  <FormControl id="updated_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'customer_id' && (
                  <AsyncSelect<UsersInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Users'}
                    fetcher={getUsers}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <ArrayFormField
            values={formik.values.reservations}
            errors={formik.errors.reservations}
            setFieldValue={formik.setFieldValue}
            properties={[
              { fieldName: 'date', label: 'date' },
              { fieldName: 'time', label: 'time' },
              { fieldName: 'party_size', label: 'party_size' },
              { fieldName: 'created_at', label: 'created_at' },
              { fieldName: 'updated_at', label: 'updated_at' },
              { fieldName: 'customer_id', label: 'users' },
            ]}
            title={'Reservations'}
            name="reservations"
            rowInitialValues={{
              date: new Date(new Date().toDateString()),
              time: new Date(new Date().toDateString()),
              party_size: 0,
              created_at: new Date(new Date().toDateString()),
              updated_at: new Date(new Date().toDateString()),
              customer_id: null,
            }}
            renderRowField={({ fieldName, value, name, error, label }) => (
              <>
                {fieldName === 'date' && (
                  <FormControl id="date" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'time' && (
                  <FormControl id="time" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'party_size' && (
                  <FormControl id="party_size" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <NumberInput
                      name={name}
                      value={value}
                      onChange={(valueString, valueNumber) =>
                        formik.setFieldValue(name, Number.isNaN(valueNumber) ? 0 : valueNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'created_at' && (
                  <FormControl id="created_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'updated_at' && (
                  <FormControl id="updated_at" isInvalid={Boolean(error)}>
                    <FormLabel>{label}</FormLabel>
                    <DatePicker
                      dateFormat={'dd/MM/yyyy'}
                      selected={value}
                      onChange={(value: Date) => formik.setFieldValue(name, value)}
                    />
                    {error && <FormErrorMessage>{error}</FormErrorMessage>}
                  </FormControl>
                )}
                {fieldName === 'customer_id' && (
                  <AsyncSelect<UsersInterface>
                    formik={formik}
                    name={name}
                    label={label}
                    placeholder={'Select Users'}
                    fetcher={getUsers}
                    renderOption={(record) => (
                      <option key={record.id} value={record.id}>
                        {record.id}
                      </option>
                    )}
                  />
                )}
              </>
            )}
          />

          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default RestaurantsCreatePage;
