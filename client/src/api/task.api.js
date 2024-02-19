import axios from "axios";

// const TASKS_API_URL = "http://127.0.0.1:8000/api/v1/tasks/";
const TASKS_API_URL = "https://crud-django-react.up.railway.app/api/v1/tasks/";

const tasksApi = axios.create({
    baseURL: TASKS_API_URL,
});

export const getAllTasks = () => tasksApi.get("/");

export const getTask = (id) => tasksApi.get(`/${id}/`);

export const createTask = (task) => tasksApi.post("/", task);

export const deleteTask = (id) => tasksApi.delete(`/${id}/`);

export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
