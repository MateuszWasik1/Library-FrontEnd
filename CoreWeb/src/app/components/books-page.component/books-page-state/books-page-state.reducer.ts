import { createReducer, on } from "@ngrx/store";
import * as Actions from "./books-page-state.actions"
import { BooksState } from "./books-page-state.state";

var initialStateOfBooksPage: BooksState = {
    // Tasks: [],
    // Task: {
    //     TGID: "",
    //     TCGID: "",
    //     TName: "",
    //     TLocalization: "",
    //     TTime: new Date(),
    //     TBudget: 0,
    //     TStatus: TaskEnum.NotStarted,
    // },
    // TasksNotes: [],
    // TasksSubTasks: [],
    // Categories: [],
    // TasksSubTasksProgressBar: {
    //     percent: 0,
    //     class: 'progress-10',
    // },
    // Filters: {
    //     Category: '',
    //     Status: 3,
    //     Skip: 0,
    //     Take: 10,
    // },
    // FiltersTasksNotes: {
    //     Skip: 0,
    //     Take: 10,
    // },
    // FiltersTasksSubTasks: {
    //     Skip: 0,
    //     Take: 10,
    // },
    // TasksCount: 0,
    // TasksNotesCount: 0,
    // TasksSubTasksCount: 0,
    // IsError: {
    //     IsTasksError: false,
    //     IsTasksNotesError: false,
    //     IsCategoriesError: false,
    // },
    // BudgetOverrunMessage: "",
    // ErrorMessage: "",
};

export const BooksReducer = createReducer<BooksState>(
    initialStateOfBooksPage,

    // //Load Task
    // on(Actions.loadTaskSuccess, (state, { Task }) => ({
    //     ...state,
    //     Task: {
    //         TGID: Task.tgid,
    //         TCGID: Task.tcgid,
    //         TName: Task.tName,
    //         TLocalization: Task.tLocalization,
    //         TTime: Task.tTime,
    //         TBudget: Task.tBudget,
    //         TStatus: Task.tStatus,
    //     },
    // })),
    
    // on(Actions.loadTaskError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Load Tasks
    // on(Actions.loadTasksSuccess, (state, { Tasks }) => ({
    //     ...state,
    //     Tasks: Tasks.list,
    //     TasksCount: Tasks.count
    // })),

    // on(Actions.loadTasksError, (state, { error }) => ({
    //     ...state,
    //     IsError: { ...state.IsError, IsTasksError: true },
    //     ErrorMessage: error
    // })),

    // //Load Task Notes
    // on(Actions.loadTasksNotesSuccess, (state, { TasksNotes }) => ({
    //     ...state,
    //     TasksNotes: TasksNotes.list,
    //     TasksNotesCount: TasksNotes.count
    // })),

    // on(Actions.loadTasksNotesError, (state, { error }) => ({
    //     ...state,
    //     IsError: { ...state.IsError, IsTasksNotesError: true },
    //     ErrorMessage: error
    // })),

    // //Load Task SubTasks
    // on(Actions.loadTasksSubTasksSuccess, (state, { TasksSubTasks }) => {
    //     let newTasksSubTasks = [...TasksSubTasks.list];

    //     newTasksSubTasks = newTasksSubTasks.map((x: any) => ({...x, tstStatus: x.tstStatus.toString()}));

    //     let TasksSubTasksProgressBar = ProgressBarCalculations(newTasksSubTasks)

    //     return { 
    //         ...state, 
    //         TasksSubTasks: newTasksSubTasks, 
    //         TasksSubTasksCount: TasksSubTasks.count,
    //         TasksSubTasksProgressBar: TasksSubTasksProgressBar
    //     };
    // }),

    // on(Actions.loadTasksSubTasksError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Load Categories
    // on(Actions.loadCategoriesSuccess, (state, { Categories }) => ({
    //     ...state,
    //     Categories: Categories
    // })),

    // on(Actions.loadCategoriesError, (state, { error }) => ({
    //     ...state,
    //     IsError: { ...state.IsError, IsCategoriesError: true },
    //     ErrorMessage: error
    // })),

    // //Save Task 
    // on(Actions.addTaskSuccess, (state) => ({
    //     ...state,
    // })),

    // on(Actions.addTaskError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Save Task Note
    // on(Actions.saveTaskNoteSuccess, (state, { TaskNote }) => {
    //     let newTaskNotes = [...state.TasksNotes];

    //     let newModel = {
    //         "tngid": TaskNote.TNGID,
    //         "tnDate": new Date(),
    //         "tnNote": TaskNote.TaskNote,
    //     }

    //     newTaskNotes.push(newModel)

    //     return {...state, TasksNotes: newTaskNotes};
    // }),

    // on(Actions.saveTaskNoteError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Update Task 
    // on(Actions.updateTaskSuccess, (state) => ({
    //     ...state,
    // })),
    
    // on(Actions.updateTaskError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Add Task SubTask 
    // on(Actions.addTaskSubTaskSuccess, (state, { SubTask }) => {
    //     let newTaskSubTasks = [...state.TasksSubTasks];

    //     let newModel = {
    //         tstgid: SubTask.TSTGID,
    //         tstTitle: SubTask.TSTTitle,
    //         tstText: SubTask.TSTText,
    //         tstStatus: SubTasksStatusEnum.NotStarted,
    //         tstCreationDate: new Date(),
    //     }

    //     newTaskSubTasks.push(newModel)

    //     return {...state, TasksSubTasks: newTaskSubTasks};
    // }),

    // on(Actions.addTaskSubTaskError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Change Task SubTask Status
    // on(Actions.taskSubTaskChangeStatusSuccess, (state, { Model }) => {
    //     let newTasksSubTasks = [...state.TasksSubTasks];

    //     let subTask = newTasksSubTasks.find(x => x.tstgid == Model.TSTGID);

    //     let newSubTask = {...subTask};

    //     newSubTask.tstStatus = Model.Status;

    //     let existingSubTaskIndex = newTasksSubTasks.findIndex(x => x.tstgid == Model.TSTGID);

    //     newTasksSubTasks[existingSubTaskIndex] = newSubTask

    //     let TasksSubTasksProgressBar = ProgressBarCalculations(newTasksSubTasks)

    //     return {...state, TasksSubTasks: newTasksSubTasks, TasksSubTasksProgressBar: TasksSubTasksProgressBar};
    // }),

    // on(Actions.taskSubTaskChangeStatusError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Delete Task
    // on(Actions.deleteTaskSuccess, (state, { tgid }) => {
    //     let newTasks = [...state.Tasks];

    //     let taskWithoutDeletedTask = newTasks.filter(x => x.tgid != tgid);

    //     return {...state, Tasks: taskWithoutDeletedTask};
    // }),

    // on(Actions.deleteTaskError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Delete Task Notes
    // on(Actions.deleteTaskNoteSuccess, (state, { TNGID }) => {
    //     let newTaskNotes = [...state.TasksNotes];

    //     let taskNotesWithoutDeletedTask = newTaskNotes.filter(x => x.tngid != TNGID);

    //     return {...state, TasksNotes: taskNotesWithoutDeletedTask};
    // }),

    // on(Actions.deleteTaskNoteError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Delete Task SubTask
    // on(Actions.deleteTaskSubTaskSuccess, (state, { TSTGID }) => {
    //     let newTaskSubTasks = [...state.TasksSubTasks];

    //     let taskSubTasksWithoutDeletedTaskSubTask = newTaskSubTasks.filter(x => x.tstgid != TSTGID);
    
    //     return {...state, TasksSubTasks: taskSubTasksWithoutDeletedTaskSubTask};
    // }),
    
    // on(Actions.deleteTaskSubTaskError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Delete Task Related Entities
    // on(Actions.deleteTaskRelatedEntitiesSuccess, (state, { TGID }) => {
    //     let newTasks = [...state.Tasks];

    //     let taskWithoutDeletedTaskSubTask = newTasks.filter(x => x.tgid != TGID);
    //         return {...state, Tasks: taskWithoutDeletedTaskSubTask};
    // }),
        
    // on(Actions.deleteTaskRelatedEntitiesError, (state, { error }) => ({
    //     ...state,
    //     ErrorMessage: error
    // })),

    // //Filters
    // on(Actions.ChangeCategoryFilterValue, (state, { value }) => ({
    //     ...state,
    //     Filters: {
    //         ...state.Filters,
    //         Category: value
    //     }
    // })),

    // on(Actions.ChangeStatusFilterValue, (state, { value }) => ({
    //     ...state,
    //     Filters: {
    //         ...state.Filters,
    //         Status: parseInt(value)
    //     }
    // })),

    // on(Actions.updatePaginationDataTasks, (state, { PaginationData }) => ({
    //     ...state,
    //     Filters: {
    //         ...state.Filters,
    //         Skip: PaginationData.Skip,
    //         Take:  PaginationData.Take,
    //     }
    // })),

    // on(Actions.updatePaginationDataTasksNotes, (state, { PaginationData }) => ({
    //     ...state,
    //     FiltersTasksNotes: {
    //         ...state.FiltersTasksNotes,
    //         Skip: PaginationData.Skip,
    //         Take:  PaginationData.Take,
    //     }
    // })),

    // on(Actions.updatePaginationDataTasksSubTasks, (state, { PaginationData }) => ({
    //     ...state,
    //     FiltersTasksSubTasks: {
    //         ...state.FiltersTasksSubTasks,
    //         Skip: PaginationData.Skip,
    //         Take:  PaginationData.Take,
    //     }
    // })),

    // on(Actions.cleanState, (state) => ({
    //     ...state,
    //     Tasks: [],
    //     Task: {
    //         TGID: "",
    //         TCGID: "",
    //         TName: "",
    //         TLocalization: "",
    //         TTime: new Date(),
    //         TBudget: 0,
    //         TStatus: TaskEnum.NotStarted,
    //     },
    //     TasksNotes: [],
    //     TasksSubTasks: [],
    //     Categories: [],
    //     TasksSubTasksProgressBar: {
    //         percent: 0,
    //         class: 'progress-10',
    //     },
    //     Filters: {
    //         Category: '',
    //         Status: 3,
    //         Skip: 0,
    //         Take: 10,
    //     },
    //     FiltersTasksNotes: {
    //         Skip: 0,
    //         Take: 10,
    //     },
    //     FiltersTasksSubTasks: {
    //         Skip: 0,
    //         Take: 10,
    //     },
    //     TasksCount: 0,
    //     TasksNotesCount: 0,
    //     TasksSubTasksCount: 0,
    //     IsError: {
    //         IsTasksError: false,
    //         IsTasksNotesError: false,
    //         IsCategoriesError: false,
    //     },
    //     BudgetOverrunMessage: "",
    //     ErrorMessage: "",
    // })),
) 
