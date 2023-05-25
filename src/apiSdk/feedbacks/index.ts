import axios from 'axios';
import queryString from 'query-string';
import { FeedbacksInterface } from 'interfaces/feedbacks';
import { GetQueryInterface } from '../../interfaces';

export const getFeedbacks = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/feedbacks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFeedbacks = async (feedbacks: FeedbacksInterface) => {
  const response = await axios.post('/api/feedbacks', feedbacks);
  return response.data;
};

export const updateFeedbacksById = async (id: string, feedbacks: FeedbacksInterface) => {
  const response = await axios.put(`/api/feedbacks/${id}`, feedbacks);
  return response.data;
};

export const getFeedbacksById = async (id: string) => {
  const response = await axios.get(`/api/feedbacks/${id}`);
  return response.data;
};
