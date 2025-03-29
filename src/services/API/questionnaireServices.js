import API from './api';
import { handleError } from '../../utils/errorHandler';

const getAllQuestionnaires = async (page, size = 8) => {
  try {
    const response = await API.get('/questionnaires', {
      params: { page, size },
    });
    return { questionnaires: response.data };
  } catch (error) {
    handleError(error, 'Failed to fetch questionnaires');
  }
};

const saveQuestionnaire = async newQuestionnaire => {
  try {
    const response = await API.post('/questionnaires', newQuestionnaire);
    return { questionnaire: response.data };
  } catch (error) {
    handleError(error, 'Failed to save questionnaire');
  }
};

const updateQuestionnaire = async (id, updatedQuestionnaire) => {
  try {
    const response = await API.put(
      `/questionnaires/${id}`,
      updatedQuestionnaire
    );
    return { questionnaire: response.data };
  } catch (error) {
    handleError(error, 'Failed to update questionnaire');
  }
};

const getQuestionnaireDetails = async id => {
  try {
    const response = await API.get(`/questionnaires/${id}`);
    return response.data;
  } catch (error) {
    handleError(error, `Failed to fetch questionnaire details for ID: ${id}`);
    return null;
  }
};

const deleteQuestionnaire = async id => {
  try {
    await API.delete(`/questionnaires/${id}`);
  } catch (error) {
    handleError(error, `Failed to delete questionnaire with ID: ${id}`);
  }
};

const saveResponses = async (questionnaireId, responses) => {
  try {
    await API.post(`/responses/${questionnaireId}`, responses);
  } catch (error) {
    handleError(
      error,
      `Failed to save responses for questionnaire ID: ${questionnaireId}`
    );
  }
};

export {
  getAllQuestionnaires,
  saveQuestionnaire,
  updateQuestionnaire,
  getQuestionnaireDetails,
  deleteQuestionnaire,
  saveResponses,
};
