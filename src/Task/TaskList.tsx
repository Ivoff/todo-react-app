import React, { ReactElement, useReducer, useState } from "react";
import TaskObjectType from "../ObjectTypes/TaskObjectType";
import Task from "./Task";
import AddTask from "./AddTask";
import { TasksReducer } from "./TaskReducer/TaskReducer";

type TaskListState = {
    hideToggle: boolean
    tasks: TaskObjectType[]
};

export default function TaskList() {
    
    const initialState: TaskListState = {
        hideToggle: true,
        tasks: [
            {
                id: 1, 
                description: "this is the first task kljasd aslkdj asdasl jdlasd alskdj asldkjas dlaksjd aslkdja sdlkjas dlakjsdlaksjd laskdj  alskjd alskdj aslkdj asldkjasd lkasjd alksdja slkdjaslkdj ", 
                completed: true
            },
            {id: 2, description: "this is the second task", completed: false},
            {id: 3, description: "this is the third task", completed: false},
            {id: 4, description: "this is the fourth task", completed: true},
            {id: 5, description: "this is the fifth task", completed: false}
        ]
    };

    const [ hideToggle, setHideToggle ] = useState(initialState.hideToggle);
    const [ tasks, dispatchTasks ] = useReducer(TasksReducer, initialState.tasks);

    const handleHideButton = (event: React.SyntheticEvent):void => {        
        event.preventDefault();

        setHideToggle(hideToggle);
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
        let opacity: string;
        return tasks.map((x): ReactElement => {
            opacity = x.completed ? "opacity-30" : "opacity-100";
            return (
                <Task opacity={opacity} task={x} key={x.id}/>
            );
        });        
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
                <div className="border-4 border-violet-200 mt-5">
                    <span className="block font-mono text-2xl bg-violet-200">Taks({tasks.length})</span>
                    <div className="px-3">
                        {getTasks()}
                    </div>
                </div>
            </div>
        </div>
    );
}