import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Main from "./pages/Main";
import 'flowbite';

function App() {
  const ProtectedRoute = ({ children }) => {
    const pf = localStorage.getItem("profile");
    if (!pf) {
      return <Navigate to="/auth" replace />;
    }

    return children;
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <Routes>
        
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
