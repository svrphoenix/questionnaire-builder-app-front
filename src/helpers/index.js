export const transformQuestions = inputArray => {
  return inputArray.map((question, index) => ({
    id: question.Id ? question.Id : Date.now() + index,
    text: question.QuestionText,
    type: question.QuestionType,
    choices:
      question.Choices.length > 0
        ? question.Choices.map(choice => choice.ChoiceText)
        : null,
  }));
};

// export const prepareQuestionnaire = inputArray =>
//   inputArray.map((question, index) => ({
//     id: question.Id ? question.Id : Date.now() + index,
//     text: question.QuestionText || '',
//     type: question.QuestionType || 'text',
//     choices:
//       question.Choices?.map(choice => ({
//         id: choice.ChoiceId || Date.now() + index + Math.random(),
//         text: choice.ChoiceText || '',
//       })) || [],
//   }));
