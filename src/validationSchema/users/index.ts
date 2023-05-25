import * as yup from 'yup';
import { feedbacksValidationSchema } from 'validationSchema/feedbacks';
import { ordersValidationSchema } from 'validationSchema/orders';
import { reservationsValidationSchema } from 'validationSchema/reservations';
import { restaurantsValidationSchema } from 'validationSchema/restaurants';

export const usersValidationSchema = yup.object().shape({
  role: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  feedbacks: yup.array().of(feedbacksValidationSchema),
  orders: yup.array().of(ordersValidationSchema),
  reservations: yup.array().of(reservationsValidationSchema),
  restaurants: yup.array().of(restaurantsValidationSchema),
});
