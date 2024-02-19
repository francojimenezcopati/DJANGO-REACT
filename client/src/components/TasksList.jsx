import { useEffect, useState } from "react";
import { getAllTasks } from "../api/task.api";
import { TaskCard } from "./TaskCard";

export function TasksList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasks().then(res => console.log(setTasks(res.data)))
    }, [])

    return (
        <div className="grid grid-cols-3 gap-3">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    )
}