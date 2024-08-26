import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import EditForm from './pages/edit-form';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/edit" element={<EditForm />} />
        <Route path="/*" element={<Navigate to="/home" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  );
}
