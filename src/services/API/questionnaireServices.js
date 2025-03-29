import API from './api';

const getAllQuestionnaires = async (page, size = 6) => {
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

const saveQuestionnaire = async newQuestionnaire => {
  try {
    const response = await API.post('/questionnaires', newQuestionnaire);
    return {
      questionnaires: response.data,
      success: true,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const updateQuestionnaire = async (id, updatedQuestionnaire) => {
  try {
    const response = await API.put(
      `/questionnaires/${id}`,
      updatedQuestionnaire
    );
    return {
      questionnaires: response.data,
      success: true,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const getQuestionnaireDetails = async id => {
  try {
    const response = await API.get(`/questionnaires/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getAllQuestionnaires,
  saveQuestionnaire,
  updateQuestionnaire,
  getQuestionnaireDetails,
};
