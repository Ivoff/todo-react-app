import { Component, ReactElement } from "react";
import TaskObjectType from "./ObjectTypes/TaskObjectType";
import Header from "./Header";
import TaskList from "./Task/TaskList";

type AppState = {
    tasks: TaskObjectType[]
};

class App extends Component 
{
    render(): ReactElement {
        return (
            <div>
                <Header/>
                <TaskList/>
            </div>
        );
    }
}

export default App;
export type { AppState };