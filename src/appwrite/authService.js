import { account } from "./config";
import { ID } from "appwrite";

export const signup = async (email, password, name) => {
  return await account.create(ID.unique(), email, password, name);
};

export const login = async (email, password) => {
  try {
    // delete old session if exists
    await account.deleteSession("current");
  } 
  catch (error) {
    // ignore if no session exists
    console.log("No previous session:", error);
  }
  return await account.createEmailPasswordSession(email, password);
};

export const logout = async () => {
  return await account.deleteSession("current");
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  }
  catch {
    return null;
  }
};




