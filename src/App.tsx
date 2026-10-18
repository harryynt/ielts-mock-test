import { Navigate, Route, Routes } from 'react-router-dom';
import { ReadingExamPage } from './features/exam/components/ReadingExamPage';
import { ResultsPage } from './features/results/ResultsPage';
import { LoginPage } from './features/auth/LoginPage';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { ImportPage } from './features/import/ImportPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/exam" replace />} />
      <Route path="/exam" element={<ReadingExamPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/import" element={<ImportPage />} />
    </Routes>
  );
}

export default App;
