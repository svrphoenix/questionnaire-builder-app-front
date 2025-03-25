import API from './api';

export const getAllQuestionnaires = async (page, size = 6) => {
  try {
    const response = await API.get('/questionnaires', {
      params: { page, size },
    });
    return {
      questionnaires: response.data,
      success: true,
    };
  } catch (error) {
    console.log(error.message);
  }
};
