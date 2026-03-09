// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ user, children }) {

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { account } from "../appwrite/config";

function ProtectedRoute({ children }) {

  const [isAuthenticated,setIsAuthenticated] = useState(null);
  useEffect(()=>{
    const checkUser = async () => {
      try{
        await account.get();
        setIsAuthenticated(true);
      }
      catch{
        setIsAuthenticated(false);
      }
    };
    checkUser();
  },[]);

  if(isAuthenticated === null){
    return <p>Loading...</p>;
  }

  if(!isAuthenticated){
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;