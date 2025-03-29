import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getQuestionnaireDetails } from '../services/API/questionnaireServices';
import QuestionnaireInteractive from '../components/QuestionnaireInteractive/QuestionnaireInteractive';

const QuestionnairePage = () => {
  const [questionnaire, setQuestionnaire] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: activeQuestionnaireId } = useParams();

  useEffect(() => {
    const fetchQuestionnaireDetails = async () => {
      if (!activeQuestionnaireId) {
        setError('No questionnaire Id provided.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const result = await getQuestionnaireDetails(activeQuestionnaireId);
      setQuestionnaire(result);
      setError(null);
      setIsLoading(false);
    };

    fetchQuestionnaireDetails();
  }, [activeQuestionnaireId]);

  return (
    <Container>
      <h2 className="page-header">Interactive Questionnaire</h2>
      {isLoading && (
        <Container
          fluid
          className="vh-100 d-flex justify-content-center align-items-center"
        >
          <Spinner />
        </Container>
      )}
      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}
      {!isLoading && !error && questionnaire && (
        <QuestionnaireInteractive questionnaire={questionnaire} />
      )}
    </Container>
  );
};

export default QuestionnairePage;
