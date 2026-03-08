import { useState } from "react";
import { signup } from "../appwrite/authService";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/config";
import { FcGoogle } from "react-icons/fc";
import signupImage from "../assets/SecurePayment.jpg"

function Signup() {

  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await signup(email,password,name);
      // alert("Signup successful");
      navigate("/login");
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
    <div className="flex flex-col md:flex-row min-h-screen border ">
      <section className="w-full md:w-[45%] flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-4">Create an Account</h2>
          <p className="text-gray-500 mb-6">Sign up and start managing your tasks easily</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input className="p-3 border rounded" type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
            <input className="p-3 border rounded" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input className="p-3 border rounded" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button type="submit" className="bg-purple-600 text-white p-3 rounded hover:bg-purple-700 transition">Sign Up</button>
          </form>
          <div className="flex items-center gap-3 my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">Or continue with</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>     
          <button onClick={loginWithGoogle} className="w-full flex items-center justify-center gap-3 border p-3 rounded hover:bg-gray-100 transition"><FcGoogle size={22}/>Continue with Google</button>
          <p className="text-center mt-6 text-sm">Already have an account?<span onClick={() => navigate("/login")}
          className="text-purple-600 cursor-pointer ml-1 hover:underline">Login</span></p>
        </div>
      </section>
      <section className="w-full md:w-[55%] bg-cover bg-center rounded-r-lg" style={{backgroundImage:`url(${signupImage})`}}>

      </section>
    </div>
);
}

export default Signup;