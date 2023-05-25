import AppLayout from 'layout/app-layout';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getFeedbacks } from 'apiSdk/feedbacks';
import { FeedbacksInterface } from 'interfaces/feedbacks';
import { Error } from 'components/error';

function FeedbacksListPage() {
  const { data, error, isLoading } = useSWR<FeedbacksInterface[]>(
    () => true,
    () =>
      getFeedbacks({
        relations: ['users', 'restaurants'],
      }),
  );

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Feedbacks
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Rating</Th>
                  <Th>Review</Th>
                  <Th>Created At</Th>
                  <Th>Customer</Th>
                  <Th>Restaurant</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.rating}</Td>
                    <Td>{record.review}</Td>
                    <Td>{record.created_at as unknown as string}</Td>
                    <Td>{record.users?.name}</Td>
                    <Td>{record.restaurants?.name}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default FeedbacksListPage;
