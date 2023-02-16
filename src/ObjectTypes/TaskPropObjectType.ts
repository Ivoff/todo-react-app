import React from "react";
import { TaskAction } from "../Task/TaskReducer/TaskReducer";
import TaskObjectType from "./TaskObjectType";

type TaskPropObjectType = {
    task: TaskObjectType,
    tasksDispatch: React.Dispatch<TaskAction>,
    opacity: string
}

export default TaskPropObjectType;