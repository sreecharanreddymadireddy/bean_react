import axios from 'axios';

const ASSIGNMENT_API_BASE_URL = "http://localhost:8080/api/v1/assignments"; 

class AssignmentService {

    getAssignments() {
        return axios.get(ASSIGNMENT_API_BASE_URL);
    }

    createAssignment(assignment) {
        return axios.post(ASSIGNMENT_API_BASE_URL, assignment);
    }

    getAssignmentById(assignmentId) {
        return axios.get(ASSIGNMENT_API_BASE_URL + '/' + assignmentId);
    }

    updateAssignment(assignment, assignmentId) {
        return axios.put(ASSIGNMENT_API_BASE_URL + '/' + assignmentId, assignment);
    }

    deleteAssignment(assignmentId) {
        return axios.delete(ASSIGNMENT_API_BASE_URL + '/' + assignmentId);
    }
}

export default new AssignmentService();
