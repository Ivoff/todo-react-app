import { ReactElement } from "react"
import TaskObjectType from "../ObjectTypes/TaskObjectType";
import TaskPropObjectType from "../ObjectTypes/TaskPropObjectType";


export default function Task(props: TaskPropObjectType): ReactElement {

    const task: TaskObjectType = props.task;
    const opacity:string = props.opacity

    const getStatusBadge = (currentTask: TaskObjectType): ReactElement => {        
        const text: string = currentTask.completed ? "DONE" : "TODO";
        const bgColor: string = currentTask.completed ? "bg-green-200 hover:bg-green-400" : "bg-yellow-200 hover:bg-yellow-300";

        const className = `hover:cursor-pointer font-mono text-xl vertical-writing text-center p-1 ${bgColor}`;

        return (
            <span className={className}>
                <p className="border hover:border-slate-400 border-dotted py-1">{text}</p>
            </span>
        )
    }

    return (
        <div className={"flex flex-row my-3 border-2 border-slate-300 bg-slate-200 "}>
            <div className="basis-10/12 bg-slate-200">
                <div className="flex flex-row justify-start">
                    {getStatusBadge(task)}
                    <span className={"p-1 pl-2 self-center "+opacity}>{task.description}</span>
                </div>
            </div>
            <div className={"basis-2/12 "}>
                <div className="flex flex-row justify-end h-full">
                    <button className={`basis-5/12 bg-blue-300 font-bold ${task.completed ? "" : "hover:bg-blue-600 hover:text-white"} ${opacity}`} disabled={task.completed}><i className="fa fa-pencil"></i></button>
                    <button className="basis-5/12 bg-red-300 font-bold hover:bg-red-500 hover:text-white"><i className="fa fa-close"></i></button>
                </div>
            </div>
        </div>
    )
}