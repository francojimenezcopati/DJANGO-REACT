import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { createTask, deleteTask, updateTask, getTask } from "../api/task.api";

export function TaskFormPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();
    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateTask(params.id, data);
            toast.success("Task updated", {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff",
                },
            });
        } else {
            await createTask(data);
            toast.success("New Task Added", {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff",
                },
            });
        }

        navigate("/tasks");
    });

    useEffect(() => {
        const loadTask = async () => {
            if (params.id) {
                const { data } = await getTask(params.id);
                setValue("title", data.title);
                setValue("description", data.description);
                setValue("done", data.done);
            }
        };
        loadTask();
    }, []);

    return (
        <div className="max-w-xl mx-auto bg-zinc-800 p-10 rounded-lg m-2">
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                    autoFocus
                />

                {errors.title && <span>This field is required</span>}

                <textarea placeholder="Description" {...register("description", { required: true })} className="bg-zinc-700 p-3 rounded-lg block w-full" />

                {errors.description && <span>This field is required</span>}

                <div className="flex items-center m-2">
                    <input
                        id="default-checkbox"
                        {...register("done")}
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Done
                    </label>
                </div>

                <button className="bg-indigo-500 p-3 rounded-lg block w-full mt-3">Save</button>
            </form>

            {params.id && (
                <div className="flex justify-end">
                    <button
                        className="bg-red-500 p-3 rounded-lg w-full mt-3"
                        onClick={async () => {
                            const accepted = window.confirm("Are you sure?");
                            if (accepted) {
                                await deleteTask(params.id);
                                toast.success("Task Removed", {
                                    position: "bottom-right",
                                    style: {
                                        background: "#101010",
                                        color: "#fff",
                                    },
                                });
                                navigate("/tasks");
                            }
                        }}
                    >
                        delete
                    </button>
                </div>
            )}
        </div>
    );
}
