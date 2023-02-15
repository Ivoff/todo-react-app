import TaskObjectType from "../../ObjectTypes/TaskObjectType";
import TaskAddObjectType from "../../ObjectTypes/TaskAddObjectType";
import TaskRemoveObjectType from "../../ObjectTypes/TaskRemoveObjectType";

type TaskEditObjectType = TaskObjectType;

type TaskAction = {
    task: TaskAddObjectType | TaskRemoveObjectType | TaskEditObjectType,
    type: string
}

function TasksReducer(tasks: Readonly<TaskObjectType[]>, action: TaskAction): TaskObjectType[] {
    let result: TaskObjectType[] = [];

    switch (action.type) {
        case "add": {
            let actionTask = action.task as TaskAddObjectType;
            result = [
                ...tasks,
                {
                    id: tasks.length+1, 
                    description: actionTask.description, 
                    completed: false
                }
            ];
        } break;

        case "delete": {
            let actionTask = action.task as TaskRemoveObjectType;
            result = tasks.filter(x => x.id !== actionTask.id);
        } break;

        case "edit": {
            let actionTask = action.task as TaskEditObjectType;
            result = tasks.map(x => {
                if (x.id === actionTask.id) {
                    x.completed = actionTask.completed;
                    x.description = actionTask.description;
                }
                return x;
            });
        } break;
    }

    return result;
}

export { TasksReducer };
export type { TaskAction };