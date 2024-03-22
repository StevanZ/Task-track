import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TaskModel } from "../models/tasks";
import {
  closeTask,
  createTask,
  deleteTask,
  getProjects,
  getTasks,
  updateTask,
} from "../services/todoistService";

interface TasksState {
  originalTasks: TaskModel[];
  tasks: TaskModel[];
  loading: boolean;
  error: boolean;
}

const initialState: TasksState = {
  originalTasks: [],
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
  async (task: TaskModel) => {
    const updatedTask = await updateTask(task.id as string, task);
    return updatedTask;
  }
);

export const fetchProjects = createAsyncThunk(
  "tasks/fetchProjects",
  async () => {
    const projects = await getProjects();
    return projects;
  }
);

export const closeTaskAction = createAsyncThunk(
  "tasks/closeTask",
  async (id: string) => {
    await closeTask(id);
    return id;
  }
);

export const deleteTaskAction = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string) => {
    await deleteTask(id);
    return id;
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    filterTasks: (state, action) => {
      const { assigneeName, taskStatus } = action.payload;
      state.tasks = state.originalTasks.filter((task) => {
        let assigneeMatch = true;
        let statusMatch = true;

        if (assigneeName) {
          assigneeMatch = task.labels ? task.labels[0] === assigneeName : false;
        }

        if (taskStatus) {
          statusMatch = task.labels ? task.labels[1] === taskStatus : false;
        }

        return assigneeMatch && statusMatch;
      });
    },
    clearFilter: (state) => {
      state.tasks = [...state.originalTasks];
    },
    moveTask: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const dragTask = state.tasks[dragIndex];
      state.tasks.splice(dragIndex, 1);
      state.tasks.splice(hoverIndex, 0, dragTask);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.originalTasks = [...action.payload];
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
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    });
    builder.addCase(deleteTaskAction.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(deleteTaskAction.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    });
  },
});

export const { filterTasks, clearFilter, moveTask } = taskSlice.actions;
export default taskSlice.reducer;
