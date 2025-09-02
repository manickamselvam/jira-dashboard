import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getBoardByProject,
  createTask,
  updateTask,
  deleteTask,
} from '../../services/taskBoardService';

export const fetchTaskBoard = createAsyncThunk(
  'taskBoard/fetch',
  async (projectId) => {
    try {
      console.log('taskboard api called :');
      const res = await getBoardByProject(projectId);
      console.log('Riskeee :', res.data);

      return res.data; // 👈 Adjust based on actual response
    } catch (error) {
      console.log('Error in fetchTaskBoard:', error);
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to add task'
      );
    }
  }
);

export const addTask = createAsyncThunk(
  'taskBoard/addTask',
  async (taskData, thunkAPI) => {
    try {
      const res = await createTask(taskData);
      return res.data; // newly created task
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to add task'
      );
    }
  }
);

export const updateTaskThunk = createAsyncThunk(
  'taskBoard/updateTask',
  async ({ taskId, updates }, thunkAPI) => {
    try {
      const res = await updateTask(taskId, updates);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to update task'
      );
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  'taskBoard/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      await deleteTask(taskId);
      return taskId;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to delete task'
      );
    }
  }
);

export const moveTaskThunk = createAsyncThunk(
  'taskBoard/moveTask',
  async ({ taskId, newStatus }, thunkAPI) => {
    try {
      const res = await updateTask(taskId, { status: newStatus });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || 'Failed to move task'
      );
    }
  }
);

const taskBoardSlice = createSlice({
  name: 'taskBoard',
  initialState: {
    tasks: {},
    columns: {},
    columnOrder: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTaskBoard.fulfilled, (state, action) => {
        console.log('Fetched board:', action.payload); // 👈 Add this

        const { tasks, columns, columnOrder } = action.payload;
        state.tasks = tasks || {};
        state.columns = columns || {};
        state.columnOrder = columnOrder || [];
        state.loading = false;
      })
      .addCase(fetchTaskBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const newTask = action.payload;
        const taskId = newTask._id;

        // Add task to tasks map
        state.tasks[taskId] = newTask;

        // Find column by status and push task ID
        const columnId = Object.keys(state.columns).find(
          (key) => state.columns[key].status === newTask.status
        );

        if (columnId) {
          state.columns[columnId].taskIds.push(taskId);
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskId = updatedTask._id;

        // Update task in tasks map
        state.tasks[taskId] = updatedTask;

        // If status changed, move task to new column
        const oldColumnId = Object.keys(state.columns).find((key) =>
          state.columns[key].taskIds.includes(taskId)
        );

        const newColumnId = Object.keys(state.columns).find(
          (key) => state.columns[key].status === updatedTask.status
        );

        if (oldColumnId && newColumnId && oldColumnId !== newColumnId) {
          // Remove from old column
          state.columns[oldColumnId].taskIds = state.columns[
            oldColumnId
          ].taskIds.filter((id) => id !== taskId);
          // Add to new column
          state.columns[newColumnId].taskIds.push(taskId);
        }
      })
      .addCase(updateTaskThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        const taskId = action.payload;

        // Remove task from tasks map
        delete state.tasks[taskId];

        // Remove task from its column
        const columnId = Object.keys(state.columns).find((key) =>
          state.columns[key].taskIds.includes(taskId)
        );

        if (columnId) {
          state.columns[columnId].taskIds = state.columns[
            columnId
          ].taskIds.filter((id) => id !== taskId);
        }
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(moveTaskThunk.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const taskId = updatedTask._id;

        // Update task
        state.tasks[taskId] = updatedTask;

        // Remove from old column
        const oldColumnId = Object.keys(state.columns).find((key) =>
          state.columns[key].taskIds.includes(taskId)
        );

        const newColumnId = Object.keys(state.columns).find(
          (key) => state.columns[key].status === updatedTask.status
        );

        if (oldColumnId && newColumnId && oldColumnId !== newColumnId) {
          state.columns[oldColumnId].taskIds = state.columns[
            oldColumnId
          ].taskIds.filter((id) => id !== taskId);
          state.columns[newColumnId].taskIds.push(taskId);
        }
      })
      .addCase(moveTaskThunk.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskBoardSlice.reducer;
