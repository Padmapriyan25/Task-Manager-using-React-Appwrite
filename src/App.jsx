import { BrowserRouter,Routes,Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";

function App(){
  // const user = localStorage.getItem("user");
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/tasks" element={<ProtectedRoute user={user}><Tasks /></ProtectedRoute>} /> */}
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;