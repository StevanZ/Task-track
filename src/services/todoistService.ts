import { TodoistApi } from "@doist/todoist-api-typescript";
import { TaskModel } from "../models/tasks";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY as string;

const api = new TodoistApi(apiKey);

export const getProjects = async () => {
  try {
    const projects = await api.getProjects();
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const tasks: TaskModel[] = await api.getTasks();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task: TaskModel) => {
  try {
    return await api.addTask(task);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id: string, updated: TaskModel) => {
  try {
    return await api.updateTask(id, updated);
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id: string) => {
  try {
    return await api.deleteTask(id);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const closeTask = async (id: string) => {
  try {
    return await api.closeTask(id);
  } catch (error) {
    console.error("Error closing task:", error);
    throw error;
  }
};
