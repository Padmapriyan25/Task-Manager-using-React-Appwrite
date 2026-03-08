import { Client, Databases, ID, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = "69aa547a002613ff3562";   
const TABLE_ID = "tasks";                   

export const createTask = async (title, description, userId) => {
  return await databases.createDocument(
    DATABASE_ID,
    TABLE_ID,
    ID.unique(),
    {
      title,
      description,
      userId
    }
  );
};

export const getTasks = async (userId) => {
  return await databases.listDocuments(
    DATABASE_ID,
    TABLE_ID,
    [
      Query.equal("userId", userId)
    ]
  );
};

export const deleteTask = async (taskId) => {
  return await databases.deleteDocument(
    DATABASE_ID,
    TABLE_ID,
    taskId
  );
};

export const updateTask = async (id, data) => {
  return await databases.updateDocument(
    DATABASE_ID,
    TABLE_ID,
    id,
    data
  );
};