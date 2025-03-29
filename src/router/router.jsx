import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import QuestionnairesListPage from '../pages/QuestionnairesListPage';
import CreateQuestionnairePage from '../pages/CreateQuestionnairePage';
import QuestionnairePage from '../pages/QuestionnairePage';
import EditQuestionnairePage from '../pages/EditQuestionnairePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <QuestionnairesListPage /> },
      { path: '/builder', element: <CreateQuestionnairePage /> },
      {
        path: '/editor',
        element: <EditQuestionnairePage />,
        children: [{ path: ':id', element: <EditQuestionnairePage /> }],
      },
      { path: '/interactive', element: <QuestionnairePage /> },
    ],
  },
]);

export default router;
