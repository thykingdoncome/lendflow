import Axios from "../Axios";

const END_POINT = '/students'

const getAllStudents = () => Axios.get(END_POINT)

export {
    getAllStudents
}