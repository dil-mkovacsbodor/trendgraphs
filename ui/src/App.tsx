import { Navigate, Route, Routes } from 'react-router-dom'
import { FormWizard } from './components/wizard/form-wizard'
import { Toaster } from 'sonner'
import { ResultsPage } from './pages/results-page'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<FormWizard />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  )
}

export default App