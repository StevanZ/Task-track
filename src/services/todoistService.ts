import { TodoistApi } from "@doist/todoist-api-typescript";
import { TaskModel } from "../models/tasks";

const apiKey = import.meta.env.VITE_TODOIST_API_KEY as string;

const api = new TodoistApi(apiKey);

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
    await api.addTask(task);
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
