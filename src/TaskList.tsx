import React, { Component, ReactElement } from "react";
import TaskObjectType from "./ObjectTypes/TaskObjectType";

type TaskListState = {
    hideToggle: boolean
};

type TaskListProps = {
    tasks: TaskObjectType[]
}

class TaskList extends Component<TaskListProps> {
    
    state: TaskListState = {
        hideToggle: true        
    };

    tasks: TaskObjectType[];

    constructor(props: TaskListProps) {
        super(props);

        this.tasks = props.tasks;
    }

    handleHideButton = (event: React.SyntheticEvent):void => {        
        this.setState({
            hideToggle: !this.state.hideToggle
        });

        console.log(this.state.hideToggle);
    }

    addTask(): ReactElement {
        return (
            <div className="py-5 px-3 flex flex-row">
                <input 
                    className="border-2 border-slate-200 h-12 w-full focus:outline-0 focus:border-violet-400"
                    type="text" 
                    name="newTask" 
                    placeholder="New task typed here."
                />

                <button className="p-3 bg-green-300 shrink-0">
                    Add Task
                </button>
            </div>
        );
    }

    getHideButton = (): ReactElement => {
        let className: string = "font-mono self-center px-3 text-white hover:bg-red-800 hover:text-black";
        let character: string = "X";

        if (this.state.hideToggle === false) {
            className += " bg-green-600";
            character = "V"
        }            
        else {
            className += " bg-red-600";
        }
        
        return (
            <button 
                className={className}
                onClick={this.handleHideButton}
            >
                {character}
            </button>
        );
    }

    getTasks = (): ReactElement[] => {
        return this.tasks.map((x): ReactElement => {
            return (
                <div className="flex flex-row my-3 border-2 border-slate-300 bg-slate-200" key={x.id}>
                    <div className="basis-10/12 bg-slate-200 py-2 pl-5">
                        <div className="flex flex-row justify-between">
                            <span>{x.description}</span>
                            <div className="font-mono text-xl flex flex-col justify-center">
                                {x.completed ? <span className="bg-green-300"><i className="fa fa-check px-3 py-2"></i></span> : <span className="bg-yellow-200 font-mono">TODO</span>}
                            </div>
                        </div>
                    </div>
                    <div className="basis-2/12">
                        <div className="flex flex-row justify-end h-full">
                            <button className="basis-5/12 bg-blue-300"><i className="fa fa-pencil"></i></button>
                            <button className="basis-5/12 bg-red-300">X</button>
                        </div>
                    </div>
                </div>
            );
        });        
    }

    render() {
        return (
            <div className="flex flex-row justify-center">
                <div className="basis-1/3">                    
                    <div className="border-4 border-violet-200 mt-5">
                        <div className="bg-violet-200 flex flex-row justify-between">
                            <span className="block font-mono text-2xl">New Task</span>
                            {this.getHideButton()}
                        </div>
                        {this.state.hideToggle ? this.addTask() : null }                        
                    </div>
                    <div className="border-4 border-violet-200 mt-5">
                        <span className="block font-mono text-2xl bg-violet-200">Taks({this.tasks.length})</span>
                        <div className="px-5">
                            {this.getTasks()}
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskList;