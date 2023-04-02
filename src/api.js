import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://private-bbbe9-blissrecruitmentapi.apiary-mock.com',
});

export const getHealthData = () =>
  api.get('/health').then((response) => response.data);

export const getQuestionsList = ({ queryKey }) => {
  const [_, { limit = 10, offset = 0, filter }] = queryKey;

  return api
    .get('/questions', {
      params: {
        limit,
        offset,
        filter,
      },
    })
    .then((response) => response.data);
};

export const postShareEmail = ({ queryKey }) => {
  const [_, { destinationEmail, contentUrl }] = queryKey;

  return api
    .post('/share', {
      destination_email: destinationEmail,
      content_url: contentUrl,
    })
    .then((response) => response.data);
};

export const putQuestionById = ({ queryKey }) => {
  const [_, { questionId, data }] = queryKey;

  return api
    .put(`/questions/${questionId}`, {
      data,
    })
    .then((response) => response.data);
};

export const getQuestionById = ({ queryKey }) => {
  const [_, id] = queryKey;

  return api.get(`/questions/${id}`).then((response) => response.data);
};
