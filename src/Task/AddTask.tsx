import { Dispatch, ReactElement } from "react";
import { useState } from "react";
import { TaskAction } from "./TaskReducer/TaskReducer";

export default function AddTask(props: {tasksDispatcher: Dispatch<TaskAction>}): ReactElement {
    const tasksDispatcher = props.tasksDispatcher;
    const [taskDescription, setTaskDescription] = useState<string>("");

    return (
        <div className="py-3 px-3 flex flex-row bg-slate-200">                
            <input 
                className="border-2 border-slate-200 h-12 w-full focus:outline-0 focus:border-violet-400 border-2 border-slate-300 px-2"
                type="text" 
                name="newTask" 
                placeholder="New task typed here."
                onChange={(e) => setTaskDescription(e.target.value)}
            />

            <button 
                className="p-1 bg-green-300 shrink-0 border-2 border-green-400"
                onClick={
                    () => tasksDispatcher({
                        task: {description: taskDescription}, 
                        type: "add"
                    })
                }
            >
                Add Task
            </button>
        </div>
    );
}