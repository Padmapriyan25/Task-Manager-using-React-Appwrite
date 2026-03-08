import { useState } from "react";
import { login } from "../appwrite/authService";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/config";
import { FcGoogle } from "react-icons/fc";
import signupImage from "../assets/aeps.png"

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      await login(email,password);
      // alert("Login successful");
      // navigate("/dashboard");
      navigate("/tasks");
    }
    catch(error){
      alert(error.message);
    }
  };

  const loginWithGoogle = () => {
  account.createOAuth2Session(
    "google",
    "http://localhost:5173/tasks",
    "http://localhost:5173/login"
  );
};

  return(
    <div className="flex flex-col md:flex-row min-h-screen border">
      <section className="w-full md:w-[45%] flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold mb-2">Hello,</h1>
          <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
          <p className="text-gray-500 mb-6">Hey, welcome back to your special place</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input type="email" placeholder="Email" className="p-3 border rounded" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" className="p-3 border rounded" onChange={(e)=>setPassword(e.target.value)}/>
            <div className="flex justify-between text-sm text-gray-500">
              <label className="flex items-center gap-2">
                <input type="checkbox" />Remember me
              </label>
              <span className="cursor-pointer hover:underline">Forgot Password?</span>
            </div>
            <button type="submit" className="bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition">Sign In</button>
          </form>
          <div className="flex items-center gap-3 my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          <button onClick={loginWithGoogle} className="w-full flex items-center justify-center gap-3 border p-3 rounded hover:bg-gray-100 transition"><FcGoogle size={22}/>Continue with Google</button>
          <p className="text-center mt-6 text-sm">Don't have an account?<span onClick={()=>navigate("/signup")}
            className="text-purple-600 ml-1 cursor-pointer hover:underline">Sign Up</span></p>
        </div>
      </section>
      <section className="w-full md:w-[55%] bg-cover bg-center rounded-r-lg" style={{backgroundImage:`url(${signupImage})`}}>

      </section>
    </div>
  );
}

export default Login;