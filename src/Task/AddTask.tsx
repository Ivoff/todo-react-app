import React, { Dispatch, ReactElement } from "react";
import { useState } from "react";
import { TaskAction } from "./TaskReducer/TaskReducer";

export default function AddTask(props: {tasksDispatcher: Dispatch<TaskAction>}): ReactElement {
    const tasksDispatcher = props.tasksDispatcher;
    const [taskDescription, setTaskDescription] = useState<string>("");

    const handleAdd = (input: string): void => {
        if (input !== "") {
            tasksDispatcher({
                task: {description: input}, 
                type: "add"
            });

            setTaskDescription("");
        }
    }

    return (
        <div className="py-3 px-3 flex flex-row bg-slate-200">                
            <input 
                className="border-2 border-slate-200 h-12 w-full focus:outline-0 focus:border-violet-400 border-2 border-slate-300 px-2"
                type="text" 
                name="newTask" 
                placeholder="New task typed here."
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        handleAdd(taskDescription);
                    }
                }}
            />

            <button 
                className="p-1 bg-green-300 shrink-0 border-2 border-green-400 hover:bg-green-600 hover:border-green-600"
                onClick={() => handleAdd(taskDescription)}
            >
                Add Task
            </button>
        </div>
    );
}