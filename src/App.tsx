import { Component, ReactElement } from "react";
import TaskObjectType from "./ObjectTypes/TaskObjectType";
import Header from "./Header";
import Task from "./TaskList";

type AppState = {
    tasks: TaskObjectType[]
};

class App extends Component {
    state: Readonly<AppState> = {
        tasks: [
            new TaskObjectType(1, "this is the first task kljasd aslkdj asdasl jdlasd alskdj asldkjas dlaksjd aslkdja sdlkjas dlakjsdlaksjd laskdj  alskjd alskdj aslkdj asldkjasd lkasjd alksdja slkdjaslkdj ", true),
            new TaskObjectType(2, "this is the second task", false),
            new TaskObjectType(3, "this is the third task", false),
            new TaskObjectType(4, "this is the fourth task", true),
            new TaskObjectType(5, "this is the fifth task", false)
        ]
    }

    render(): ReactElement {
        return (
            <div>
                <Header/>
                <Task tasks={this.state.tasks}/>
            </div>
        );
    }
}

export default App;