import {  ReactElement, useState } from "react"
import TaskObjectType from "../ObjectTypes/TaskObjectType";
import TaskPropObjectType from "../ObjectTypes/TaskPropObjectType";
import { TextArea } from "./TextArea";


export default function Task(props: TaskPropObjectType): ReactElement {

    const task: TaskObjectType = props.task;
    const opacity:string = props.opacity
    
    const [ edit, setEdit ] = useState(false);
    const [ newDescription, setNewDescription ] = useState<string>(task.description);

    const getStatusBadge = (currentTask: TaskObjectType): ReactElement => {        
        const text: string = currentTask.completed ? "DONE" : "TODO";
        const bgColor: string = currentTask.completed ? "bg-green-200 hover:bg-green-400" : "bg-yellow-200 hover:bg-yellow-300";

        const className = `hover:cursor-pointer font-mono text-xl vertical-writing text-center p-1 ${bgColor}`;

        return (
            <span className={className} onClick={() => {
                props.tasksDispatch({
                    task: {
                        id: props.task.id, 
                        description: props.task.description, 
                        completed: !props.task.completed
                    },
                    type: "edit"
                })
            }}>
                <p className="border hover:border-slate-400 border-dotted py-1">{text}</p>
            </span>
        )
    }

    const getDescription = (): ReactElement => {
        if (!edit)
            return <p className={"p-1 pl-2 self-center whitespace-pre-line "+opacity}>{task.description}</p>;
        
        return (
            <TextArea 
                defaultValue={task.description}
                newDescription={newDescription}
                setNewDescription={setNewDescription}
                onKeyUp={(e) => {
                    if (e.key === "Escape") {
                        setEdit(!edit);
                        setNewDescription(task.description)
                    }
                }}
            />
        )
    }

    const getEditButton = (): ReactElement => {
        if (edit) {
            return (
                <button 
                    className={`basis-1/2 bg-green-300 font-bold ${task.completed ? "" : "hover:bg-green-600 hover:text-white"} ${opacity}`} 
                    disabled={task.completed}
                    onClick={() => {
                        props.tasksDispatch({
                            task: {
                                id: props.task.id,
                                completed: props.task.completed,
                                description: newDescription
                            },
                            type: "edit"
                        });
                        setEdit(!edit);
                    }}
                >
                    <i className="fa fa-save"></i>
                </button>
            );
        }

        return (
            <button 
                className={`basis-1/2 bg-blue-300 font-bold ${task.completed ? "" : "hover:bg-blue-600 hover:text-white"} ${opacity}`} 
                disabled={task.completed}
                onClick={() => setEdit(!edit)}
             >
                <i className="fa fa-pencil"></i>
            </button>
        )
    }

    return (
        <div className={"flex flex-row my-3 border-2 border-slate-300 bg-slate-200 "}>
            <div className="basis-10/12 bg-slate-200">
                <div className="flex flex-row justify-start">
                    {getStatusBadge(task)}
                    {getDescription()}
                </div>
            </div>
            <div className={"basis-2/12 "}>
                <div className="flex flex-row justify-end h-full">
                    {getEditButton()}
                    <button className="basis-1/2 bg-red-300 font-bold hover:bg-red-500 hover:text-white"><i className="fa fa-close"></i></button>
                </div>
            </div>
        </div>
    )
}