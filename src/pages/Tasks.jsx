import { useState, useEffect } from "react";
import { createTask, getTasks, deleteTask, updateTask } from "../appwrite/taskService";
import { account } from "../appwrite/config";
import { logout } from "../appwrite/authService";
import { useNavigate } from "react-router-dom";

function Tasks() {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [tasks,setTasks] = useState([]);
  const [userName,setUserName] = useState("");
  const [editingTaskId,setEditingTaskId] = useState(null);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    const user = await account.get();
    setUserName(user.name);
    const res = await getTasks(user.$id);
    setTasks(res.documents);
  };

//   const fetchTasks = async () => {
//   try {
//     const user = await account.get();
//     setUserName(user.name);
//     const res = await getTasks(user.$id);
//     setTasks(res.documents);
//   } catch (error) {
//     // user not logged in
//     navigate("/login");
//     console.log(error);
//   }
// };

  useEffect(()=>{
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await account.get();
    if(editingTaskId){
      await updateTask(editingTaskId,{title,description});
      setEditingTaskId(null);
    } 
    else {
      await createTask(title,description,user.$id);
    }
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setEditingTaskId(task.$id);
  };

  const markComplete = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    await updateTask(task.$id,{
      status:newStatus
    });
    fetchTasks();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return(
  <div className="min-h-screen bg-gray-100 p-10">
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-3xl font-bold">Welcome back, <span className="text-purple-600 ml-2">{userName}</span></h1>
      <button onClick={handleLogout} className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">Logout</button>
    </div>
    <div className="bg-white p-6 rounded-lg shadow mb-10">
      <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
        <input type="text" placeholder="Task title" value={title} onChange={(e)=>setTitle(e.target.value)} className="p-3 border rounded w-60"/>
        <input type="text" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)} className="p-3 border rounded w-80"/>
        <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">{editingTaskId ? "Update Task" : "Add Task"}</button>
      </form>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tasks.map((task)=>{
        const statusColor = task.status === "completed" ? "bg-green-100 text-green-600"  : "bg-yellow-100 text-yellow-600";
        return(
        <div key={task.$id} className="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-500 hover:shadow-lg transition">
          <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>{task.status}</span>
          <h3 className="text-lg font-semibold mt-2">{task.title}</h3>
          <p className="text-gray-600 text-sm mt-2">{task.description}</p>
          <div className="flex justify-between items-center mt-5">
            <span className="text-xs text-gray-400">{new Date(task.$createdAt).toLocaleDateString()}</span>
            <div className="flex gap-3">
              <button onClick={()=>markComplete(task)}className="text-green-600">✔</button>
              <button onClick={()=>handleEdit(task)} className="text-blue-600">✏</button>
              <button onClick={()=>handleDelete(task.$id)} className="text-red-500">🗑</button>
            </div>
          </div>
        </div>
        );
        })}
    </div>
  </div>
  );
}

export default Tasks;
