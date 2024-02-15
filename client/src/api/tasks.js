import axios from "axios";

const URL ="http://127.0.0.1:8000"
const endpoint =`${URL}/api/task`

export const fetchTask = async (id) => await axios.get(`${endpoint}/${id}`)

export const createTask = async (newTask) => await axios.post(endpoint,newTask)

export const updateTask = async (id, task) => await axios.put(`${endpoint}/${id}`)

export const deleteTask = async (id) => await axios.delete(`${endpoint}/${id}`);