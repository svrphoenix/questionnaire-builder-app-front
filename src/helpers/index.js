export const transformQuestions = inputArray => {
  return inputArray.map((question, index) => ({
    id: Date.now() + index,
    text: question.QuestionText,
    type: question.QuestionType,
    choices:
      question.Choices.length > 0
        ? question.Choices.map(choice => choice.ChoiceText)
        : null,
  }));
};
