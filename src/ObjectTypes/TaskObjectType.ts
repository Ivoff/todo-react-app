class TaskObjectType
{
    public id: number;
    public description: string;
    public completed: boolean;

    constructor(id: number, descrition: string, completed: boolean)
    {
        this.id = id;
        this.description = descrition;
        this.completed = completed;
    }    
}

export default TaskObjectType;