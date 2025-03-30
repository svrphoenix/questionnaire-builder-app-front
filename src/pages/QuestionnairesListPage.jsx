// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import { Container, Spinner } from 'react-bootstrap';
// import QuestionnairesList from '../components/QuestionnairesList/QuestionnairesList';
// import {
//   deleteQuestionnaire,
//   getAllQuestionnaires,
// } from '../services/API/questionnaireServices';
// import usePagination from '../hooks/usePagination';
// import CustomPagination from '../components/CustomPagination/CustomPagination';

// const QuestionnairesListPage = () => {
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [isLoading, setLoading] = useState(true);
//   const [totalPages, setTotalPages] = useState(null);
//   const [currentPage, setCurrentPage] = usePagination();

//   const fetchQuestionnaires = async activePage => {
//     setLoading(true);
//     const result = await getAllQuestionnaires(activePage);
//     setLoading(false);
//     setQuestionnaires(result.questionnaires.Data);
//     setTotalPages(result.questionnaires.CountPages);
//   };

//   const removeQuestionnaire = async id => {
//     setLoading(true);
//     await deleteQuestionnaire(id);
//     setLoading(false);
//     if (questionnaires.length - 1 === 0 && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//       await fetchQuestionnaires(currentPage - 1);
//     } else {
//       await fetchQuestionnaires(currentPage);
//     }
//   };

//   useEffect(() => {
//     fetchQuestionnaires(currentPage);
//   }, [currentPage]);

//   return (
//     <Container>
//       <h2 className="page-header">Questionnaires List</h2>
//       {isLoading ? (
//         <Container
//           fluid
//           className="vh-100 d-flex justify-content-center align-items-center"
//         >
//           <Spinner />
//         </Container>
//       ) : (
//         <>
//           <QuestionnairesList
//             questionnaires={questionnaires}
//             onDelete={removeQuestionnaire}
//           />
//           <div className="mt-2 d-flex justify-content-center">
//             <CustomPagination
//               pagesCount={totalPages}
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//               alwaysShown={false}
//             />
//           </div>
//         </>
//       )}
//     </Container>
//   );
// };

// QuestionnairesListPage.propTypes = {};

// export default QuestionnairesListPage;

// variant 2
// import React, { useEffect, useState, useCallback } from 'react';
// import { Container, Spinner } from 'react-bootstrap';
// import QuestionnairesList from '../components/QuestionnairesList/QuestionnairesList';
// import {
//   deleteQuestionnaire,
//   getAllQuestionnaires,
// } from '../services/API/questionnaireServices';
// import CustomPagination from '../components/CustomPagination/CustomPagination';
// import usePagination from '../hooks/usePagination';

// const QuestionnairesListPage = () => {
//   const [currentPage, setCurrentPage] = usePagination();
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(0);

//   const [isFetchingMore, setFetchingMore] = useState(false);
//   const [hasMoreData, setHasMoreData] = useState(true);

//   const fetchQuestionnaires = async (page, append = false) => {
//     if (!append) setLoading(true);
//     setFetchingMore(append);

//     const result = await getAllQuestionnaires(page);

//     if (append) {
//       setQuestionnaires(prev => [...prev, ...result.questionnaires.Data]);
//     } else {
//       setQuestionnaires(result.questionnaires.Data);
//     }

//     setTotalPages(result.questionnaires.CountPages);
//     setHasMoreData(page < result.questionnaires.CountPages);
//     setLoading(false);
//     setFetchingMore(false);
//   };

//   const handleScroll = useCallback(() => {
//     if (!hasMoreData || isFetchingMore) return;

//     const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
//     if (scrollHeight - scrollTop <= clientHeight + 50) {
//       setFetchingMore(true);
//       console.log('setting page on listpage');
//       setCurrentPage(prevPage => {
//         const nextPage = prevPage + 1;
//         if (nextPage <= totalPages) {
//           fetchQuestionnaires(nextPage, true);
//         }
//         return nextPage;
//       });
//     }
//   }, [hasMoreData, isFetchingMore, totalPages, setCurrentPage]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   useEffect(() => {
//     fetchQuestionnaires(1);
//   }, []);

//   const removeQuestionnaire = async id => {
//     setLoading(true);
//     await deleteQuestionnaire(id);
//     setLoading(false);

//     const updatedQuestionnaires = questionnaires.filter(q => q.Id !== id);
//     setQuestionnaires(updatedQuestionnaires);

//     if (updatedQuestionnaires.length === 0 && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     } else {
//       fetchQuestionnaires(currentPage);
//     }
//   };

//   return (
//     <Container>
//       <h2 className="page-header">Questionnaires List</h2>
//       {isLoading && currentPage === 1 ? (
//         <Container
//           fluid
//           className="vh-100 d-flex justify-content-center align-items-center"
//         >
//           <Spinner />
//         </Container>
//       ) : (
//         <>
//           <QuestionnairesList
//             questionnaires={questionnaires}
//             onDelete={removeQuestionnaire}
//           />
//           {isFetchingMore && (
//             <div className="d-flex justify-content-center mt-3">
//               <Spinner animation="border" />
//             </div>
//           )}
//           <div className="mt-2 d-flex justify-content-center">
//             <CustomPagination
//               pagesCount={totalPages}
//               currentPage={currentPage}
//               setCurrentPage={page => {
//                 setCurrentPage(page);
//                 setQuestionnaires([]);
//                 fetchQuestionnaires(page);
//               }}
//               alwaysShown={true}
//             />
//           </div>
//         </>
//       )}
//     </Container>
//   );
// };

// export default QuestionnairesListPage;
// variant 3
// import React, { useEffect, useState, useCallback } from 'react';
// import { Container, Spinner } from 'react-bootstrap';
// import QuestionnairesList from '../components/QuestionnairesList/QuestionnairesList';
// import {
//   deleteQuestionnaire,
//   getAllQuestionnaires,
// } from '../services/API/questionnaireServices';
// import CustomPagination from '../components/CustomPagination/CustomPagination';
// import usePagination from '../hooks/usePagination';
// import { useNavigate } from 'react-router-dom';

// const QuestionnairesListPage = () => {
//   const [currentPage, setCurrentPage] = usePagination(); // Sync page state with URL
//   const navigate = useNavigate(); // Enable navigation
//   const [questionnaires, setQuestionnaires] = useState([]);
//   const [isLoading, setLoading] = useState(false);
//   const [totalPages, setTotalPages] = useState(0);

//   const [isFetchingMore, setFetchingMore] = useState(false); // Track scroll loads
//   const [hasMoreData, setHasMoreData] = useState(true); // Flag for pagination limits

//   // Fetch data for a specific page
//   const fetchQuestionnaires = async (page, append = false) => {
//     if (!append) setLoading(true);
//     setFetchingMore(append);

//     const result = await getAllQuestionnaires(page);

//     if (append) {
//       setQuestionnaires(prev => [...prev, ...result.questionnaires.Data]);
//     } else {
//       setQuestionnaires(result.questionnaires.Data);
//     }

//     setTotalPages(result.questionnaires.CountPages);
//     setHasMoreData(page < result.questionnaires.CountPages);
//     setLoading(false);
//     setFetchingMore(false);
//   };

//   const handleScroll = useCallback(() => {
//     if (!hasMoreData || isFetchingMore) return;

//     const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
//     if (scrollHeight - scrollTop <= clientHeight + 50) {
//       setFetchingMore(true);
//       setCurrentPage(prevPage => {
//         const nextPage = prevPage + 1;
//         if (nextPage <= totalPages) {
//           fetchQuestionnaires(nextPage, true);
//           return nextPage;
//         }
//         return prevPage;
//       });
//     }
//   }, [hasMoreData, isFetchingMore, totalPages, setCurrentPage]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   useEffect(() => {
//     fetchQuestionnaires(currentPage);
//   }, [currentPage]);

//   const removeQuestionnaire = async id => {
//     setLoading(true);
//     await deleteQuestionnaire(id);
//     setLoading(false);

//     const updatedQuestionnaires = questionnaires.filter(q => q.Id !== id);
//     setQuestionnaires(updatedQuestionnaires);

//     if (updatedQuestionnaires.length === 0 && currentPage > 1) {
//       const previousPage = currentPage - 1;
//       setCurrentPage(previousPage);
//       fetchQuestionnaires(previousPage);
//     } else {
//       fetchQuestionnaires(currentPage);
//     }
//   };

//   const navigateToEditPage = quizId => {
//     // Pass the current page when navigating to the edit page
//     navigate(`/editor/${quizId}?page=${currentPage}`);
//   };

//   return (
//     <Container>
//       <h2 className="page-header">Questionnaires List</h2>
//       {isLoading && currentPage === 1 ? (
//         <Container
//           fluid
//           className="vh-100 d-flex justify-content-center align-items-center"
//         >
//           <Spinner />
//         </Container>
//       ) : (
//         <>
//           <QuestionnairesList
//             questionnaires={questionnaires}
//             onDelete={removeQuestionnaire}
//             onEdit={navigateToEditPage} // Pass current page to edit page
//           />
//           {isFetchingMore && (
//             <div className="d-flex justify-content-center mt-3">
//               <Spinner animation="border" />
//             </div>
//           )}
//           <div className="mt-2 d-flex justify-content-center">
//             <CustomPagination
//               pagesCount={totalPages}
//               currentPage={currentPage}
//               setCurrentPage={page => {
//                 setCurrentPage(page);
//                 setQuestionnaires([]);
//                 fetchQuestionnaires(page);
//               }}
//               alwaysShown={true}
//             />
//           </div>
//         </>
//       )}
//     </Container>
//   );
// };

// export default QuestionnairesListPage;

import React, { useEffect, useState, useCallback } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import QuestionnairesList from '../components/QuestionnairesList/QuestionnairesList';
import {
  deleteQuestionnaire,
  getAllQuestionnaires,
} from '../services/API/questionnaireServices';
import CustomPagination from '../components/CustomPagination/CustomPagination';
import usePagination from '../hooks/usePagination';

const QuestionnairesListPage = () => {
  const [currentPage, setCurrentPage] = usePagination();
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [isFetchingMore, setFetchingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const fetchQuestionnaires = async (page, append = false) => {
    if (!append) setLoading(true);
    setFetchingMore(append);

    const result = await getAllQuestionnaires(page);

    if (append) {
      setQuestionnaires(prev => [...prev, ...result.questionnaires.Data]);
    } else {
      setQuestionnaires(result.questionnaires.Data);
    }

    setTotalPages(result.questionnaires.CountPages);
    setHasMoreData(page < result.questionnaires.CountPages);
    setLoading(false);
    setFetchingMore(false);
  };

  const handleScroll = useCallback(() => {
    if (!hasMoreData || isFetchingMore) return;

    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setFetchingMore(true);
      setCurrentPage(prevPage => {
        const nextPage = prevPage + 1;
        if (nextPage <= totalPages) {
          fetchQuestionnaires(nextPage, true);
        }
        return nextPage;
      });
    }
  }, [hasMoreData, isFetchingMore, totalPages, setCurrentPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchQuestionnaires(currentPage);
  }, [currentPage]);

  // Scroll to top when the page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
  }, []); // Empty dependency array ensures it runs only on page load

  const removeQuestionnaire = async id => {
    setLoading(true);
    await deleteQuestionnaire(id);
    setLoading(false);

    const updatedQuestionnaires = questionnaires.filter(q => q.Id !== id);
    setQuestionnaires(updatedQuestionnaires);

    if (updatedQuestionnaires.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchQuestionnaires(currentPage - 1);
    } else {
      fetchQuestionnaires(currentPage);
    }
  };

  return (
    <Container>
      <h2 className="page-header">Questionnaires List</h2>
      {isLoading && currentPage === 1 ? (
        <Container
          fluid
          className="vh-100 d-flex justify-content-center align-items-center"
        >
          <Spinner />
        </Container>
      ) : (
        <>
          <QuestionnairesList
            questionnaires={questionnaires}
            onDelete={removeQuestionnaire}
          />
          {isFetchingMore && (
            <div className="d-flex justify-content-center mt-3">
              <Spinner animation="border" />
            </div>
          )}
          <div className="mt-2 d-flex justify-content-center">
            <CustomPagination
              pagesCount={totalPages}
              currentPage={currentPage}
              setCurrentPage={page => {
                setCurrentPage(page);
                setQuestionnaires([]);
                fetchQuestionnaires(page);
              }}
              alwaysShown={true}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default QuestionnairesListPage;
