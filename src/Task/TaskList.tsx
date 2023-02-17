import React, { ReactElement, useReducer, useState } from "react";
import TaskObjectType from "../ObjectTypes/TaskObjectType";
import Task from "./Task";
import AddTask from "./AddTask";
import { TasksReducer } from "./TaskReducer/TaskReducer";
import UniqueKey from "../UniqueKeyProvider";

type TaskListState = {
    hideToggle: boolean
    tasks: TaskObjectType[]
};

type Filter = {
    order: "desc" | "asc",
    status: "done" | "todo" | "none"
}

export default function TaskList() {
    
    const initialState: TaskListState = {
        hideToggle: true,
        tasks: [
            {
                id: 1, 
                description: "this is the first task kljasd aslkdj asdasl jdlasd alskdj asldkjas dlaksjd aslkdja sdlkjas dlakjsdlaksjd laskdj  alskjd alskdj aslkdj asldkjasd lkasjd alksdja slkdjaslkdj ", 
                completed: false,
                createdAt: new Date()
            },
            {id: 2, description: "this is the second task", completed: false, createdAt: new Date()},
            {id: 3, description: "this is the third task", completed: false, createdAt: new Date()},
            {id: 4, description: "this is the fourth task", completed: true, createdAt: new Date()},
            {id: 5, description: "this is the fifth task", completed: false, createdAt: new Date()}
        ]
    };

    const [ hideToggle, setHideToggle ] = useState(initialState.hideToggle);
    const [ tasks, dispatchTasks ] = useReducer(TasksReducer, initialState.tasks);
    const [ filter, setFilter ] = useState<Filter>({order:"asc", status: "none"})

    const handleHideButton = (event: React.SyntheticEvent):void => {        
        event.preventDefault();

        setHideToggle(!hideToggle);
    }

    const getHideButton = (): ReactElement => {
        let className: string = `font-mono self-center px-3 text-white ${hideToggle ? "hover:bg-red-800" : "hover:bg-green-800"} hover:text-black`;
        let character: string = "X";

        if (hideToggle === false) {
            className += " bg-green-600";
            character = "V"
        }
        else {
            className += " bg-red-600";
        }
        
        return (
            <button 
                className={className}
                onClick={handleHideButton}
            >
                {character}
            </button>
        );
    }

    const getTasks = (): ReactElement[] => {

        if (tasks.length === 0) {
            return [(
                <div className="flex flex-col items-center py-2" key={UniqueKey.next()}>
                    <div className="text-5xl rounded-full border-4 border-violet-200 px-6 p-2 bg-white">
                        <i className="fa fa-exclamation"></i>
                    </div>
                    <p className="mt-2 font-mono text-lg">No tasks added yet.</p>
                </div>
            )];
        }

        let opacity: string;
        return filterByStatus(tasks).sort(getSortFunc()).map((x): ReactElement => {
            opacity = x.completed ? "opacity-30" : "opacity-100";
            return (
                <Task opacity={opacity} task={x} tasksDispatch={dispatchTasks} key={x.id}/>
            );
        });
    }

    const getSortFunc = (): (a: TaskObjectType, b: TaskObjectType) => number => {
        if (filter.order === "desc") {
            return (a: TaskObjectType, b: TaskObjectType) => {
                return b.id - a.id;
            }
        } else {
            return (a: TaskObjectType, b: TaskObjectType) => {
                return a.id - b.id;
            }
        }
    }

    const filterByStatus = (inputTasks: TaskObjectType[]): TaskObjectType[] => {
        if (filter.status === "none")
            return inputTasks;
        if (filter.status === "done") 
            return [...inputTasks.filter((x) => x.completed === true)];
        else
            return [...inputTasks.filter((x) => x.completed === false)];
    }

    return (
        <div className="flex flex-row justify-center">
            <div className="basis-1/3">
                <div className="border-4 border-violet-200 mt-5">
                    <div className="bg-violet-200 flex flex-row justify-between">
                        <span className="block font-mono text-2xl">New Task</span>
                        {getHideButton()}
                    </div>
                    {hideToggle ? <AddTask tasksDispatcher={dispatchTasks} /> : null }
                </div>
                <div className="border-4 border-violet-200 mt-5 w-full">
                    <div className="flex flex-row justify-between bg-violet-200">
                        <span className="font-mono text-2xl">Taks({tasks.length})</span>
                        <div className="font-mono text-xl basis-auto">
                            (
                            <span 
                                className="text-violet-500 hover:cursor-pointer hover:text-violet-800"
                                onClick={() => setFilter({order: "desc", status: filter.status})}
                            >
                                desc
                            </span>
                            ,
                            <span 
                                className="text-violet-500 hover:cursor-pointer hover:text-violet-800"
                                onClick={() => setFilter({order: "asc", status: filter.status})}
                            >
                                asc
                            </span>
                            ) (
                            <span 
                                className="text-yellow-600 hover:cursor-pointer hover:text-yellow-800"
                                onClick={() => setFilter({order: filter.order, status: "todo"})}
                            >
                                TODO
                            </span>
                            ,
                            <span 
                                className="text-emerald-600 hover:cursor-pointer hover:text-emerald-800"
                                onClick={() => setFilter({order: filter.order, status: "done"})}
                            >
                                DONE
                            </span>
                            )

                            <span
                                className="text-red-500 px-3 pr-4 hover:cursor-pointer hover:text-red-700"
                                onClick={() => setFilter({order: "asc", status: "none"})}
                            >
                                RESET
                            </span>
                        </div>
                    </div>
                    <div className="px-3">
                        {getTasks()}
                    </div>
                </div>
            </div>
        </div>
    );
}