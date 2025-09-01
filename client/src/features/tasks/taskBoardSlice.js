// import { createSlice } from '@reduxjs/toolkit';

// const initialTasks = {
//   'task-1': {
//     id: 'task-1',
//     title: 'Implement user authentication',
//     description: 'Add login and register functionality with JWT',
//     status: 'todo',
//     priority: 'high',
//     assignee: 'John Doe',
//     createdAt: '2024-01-15',
//     updatedAt: '2024-01-15',
//   },
//   'task-2': {
//     id: 'task-2',
//     title: 'Design homepage layout',
//     description: 'Create responsive homepage with modern UI',
//     status: 'in-progress',
//     priority: 'medium',
//     assignee: 'Jane Smith',
//     createdAt: '2024-01-14',
//     updatedAt: '2024-01-16',
//   },
//   'task-3': {
//     id: 'task-3',
//     title: 'Setup CI/CD pipeline',
//     description: 'Configure automated testing and deployment',
//     status: 'done',
//     priority: 'low',
//     assignee: 'Mike Johnson',
//     createdAt: '2024-01-10',
//     updatedAt: '2024-01-12',
//   },
//   'task-4': {
//     id: 'task-4',
//     title: 'Database optimization',
//     description: 'Improve query performance and add indexes',
//     status: 'todo',
//     priority: 'medium',
//     assignee: 'Sarah Wilson',
//     createdAt: '2024-01-16',
//     updatedAt: '2024-01-16',
//   },
//   'task-5': {
//     id: 'task-5',
//     title: 'API documentation',
//     description: 'Write comprehensive API documentation using Swagger',
//     status: 'in-progress',
//     priority: 'low',
//     assignee: 'John Doe',
//     createdAt: '2024-01-13',
//     updatedAt: '2024-01-15',
//   },
// };

// const initialColumns = {
//   'column-1': {
//     id: 'column-1',
//     title: 'To Do',
//     status: 'todo',
//     taskIds: ['task-1', 'task-4'],
//   },
//   'column-2': {
//     id: 'column-2',
//     title: 'In Progress',
//     status: 'in-progress',
//     taskIds: ['task-2', 'task-5'],
//   },
//   'column-3': {
//     id: 'column-3',
//     title: 'Done',
//     status: 'done',
//     taskIds: ['task-3'],
//   },
//   'column-4': {
//     id: 'column-4',
//     title: 'In-QA',
//     status: 'in-qa',
//     taskIds: [],
//   },
// };

// const initialState = {
//   tasks: initialTasks,
//   columns: initialColumns,
//   columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
// };

// const taskBoardSlice = createSlice({
//   name: 'taskBoard',
//   initialState,
//   reducers: {
//     moveTask: (state, action) => {
//       const {
//         taskId,
//         sourceColumnId,
//         destinationColumnId,
//         sourceIndex,
//         destinationIndex,
//       } = action.payload;

//       // Remove task from source column
//       state.columns[sourceColumnId].taskIds.splice(sourceIndex, 1);

//       // Add task to destination column
//       state.columns[destinationColumnId].taskIds.splice(
//         destinationIndex,
//         0,
//         taskId
//       );

//       // Update task status
//       const newStatus = state.columns[destinationColumnId].status;
//       state.tasks[taskId].status = newStatus;
//       state.tasks[taskId].updatedAt = new Date().toISOString();
//     },

//     reorderTasks: (state, action) => {
//       const { columnId, sourceIndex, destinationIndex } = action.payload;
//       const column = state.columns[columnId];
//       const [movedTaskId] = column.taskIds.splice(sourceIndex, 1);
//       column.taskIds.splice(destinationIndex, 0, movedTaskId);
//     },

//     addTask: (state, action) => {
//       const taskId = `task-${Date.now()}`;
//       const now = new Date().toISOString();

//       const newTask = {
//         ...action.payload,
//         id: taskId,
//         createdAt: now,
//         updatedAt: now,
//       };

//       state.tasks[taskId] = newTask;

//       // Add to the appropriate column
//       const columnId = Object.keys(state.columns).find(
//         (key) => state.columns[key].status === newTask.status
//       );

//       if (columnId) {
//         state.columns[columnId].taskIds.push(taskId);
//       }
//     },

//     updateTask: (state, action) => {
//       const { taskId, updates } = action.payload;
//       if (state.tasks[taskId]) {
//         state.tasks[taskId] = {
//           ...state.tasks[taskId],
//           ...updates,
//           updatedAt: new Date().toISOString(),
//         };
//       }
//     },

//     deleteTask: (state, action) => {
//       const taskId = action.payload;

//       // Remove from tasks
//       delete state.tasks[taskId];

//       // Remove from all columns
//       Object.keys(state.columns).forEach((columnId) => {
//         const index = state.columns[columnId].taskIds.indexOf(taskId);
//         if (index > -1) {
//           state.columns[columnId].taskIds.splice(index, 1);
//         }
//       });
//     },
//   },
// });

// export const { moveTask, reorderTasks, addTask, updateTask, deleteTask } =
//   taskBoardSlice.actions;
// export default taskBoardSlice.reducer;

// ========= New Code =============

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
