# Questionnaire Frontend

This is the frontend for the **Questionnaire Application**, built to provide a
user-friendly interface for managing and completing questionnaires. It offers
functionality for creating, editing, and interacting with questionnaires, along
with responsive and dynamic features.

## Features

### Base Level

1. **Questionnaire Catalog Page**:

   - Displays a paginated list of questionnaires.
   - Each questionnaire card includes: - **Name** - **Description** - **Number
     of Questions** - **Number of Completions** Actions: - **Edit**: Navigates
     to a page similar to the questionnaire creation page. - **Run**: Opens the
     interactive questionnaire page. - **Delete**: Removes the questionnaire.

2. **Questionnaire Builder Page**:

   - Allows users to create a questionnaire by adding multiple questions.
   - Supported question types:
     - **Text**: Free-form user input.
     - **Single Choice**: Users select one answer (radio buttons).
     - **Multiple Choices**: Users select multiple answers (checkbox buttons).
   - Saves the created questionnaire to the database.

3. **Interactive Questionnaire Page**:
   - Enables users to complete previously created questionnaires.
   - Displays all user answers and the time taken to complete upon submission.
   - Stores responses in the database.

### Middle Level

1. **Enhanced Sorting**:

   - Ability to sort the questionnaire catalog by:
     - **Name**
     - **Number of Questions**
     - **Number of Completions**

2. **Save Intermediate Completion State**:
   - Interactive questionnaire page can save progress so users can resume after
     refreshing the page.

### Advanced Level

1. **Infinite Scroll Pagination**:
   - Automatically loads more questionnaires as the user scrolls the page.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/svrphoenix/questionnaire-builder-app-front.git
   cd ./questionnaire-builder-app-front
   ```

## Technologies Used

- React: For building the user interface.
- React Router: For managing client-side navigation.
- Axios: For making API calls to the backend.
- SCSS/Bootstrap: Styling for components and pages.

## Backend Repository

Check out the backend code at: [Questionnaire Builder App Backend Repository](https://github.com/svrphoenix/questionnaire-builder-app-back)

## License

This project is licensed under the MIT License.
