import {BrowserRouter,Routes, Route, }from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import QuizPage from "../pages/QuizPage";
import ResultPage from "../pages/ResultPage";
import NotFoundPage from "../pages/NotFoundPage";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}