import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskModel } from "../models/tasks";
import { createTask, getTasks, updateTask } from "../services/todoistService";

interface TasksState {
  tasks: TaskModel[];
  loading: boolean;
  error: boolean;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: false,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const tasks = await getTasks();
  return tasks;
});

export const addTask = createAsyncThunk(
  "tasks/createTask",
  async (task: TaskModel) => {
    const addedTask = await createTask(task);
    return addedTask;
  }
);

export const update = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, task }: { id: string; task: TaskModel }) => {
    if (!task.id) throw new Error("Task id is required");
    const updatedTask = await updateTask(id, { ...task });
    return updatedTask;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(addTask.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
    });
    builder.addCase(addTask.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(update.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });
    builder.addCase(update.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default taskSlice.reducer;
