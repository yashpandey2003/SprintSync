import * as actionTypes from './ActionType';
import api from '@/config/api';
import { toast } from "react-toastify";

export const fetchIssues = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUES_REQUEST });
        try {
            const response = await api.get(`/api/issues/project/${id}`);
            console.log("fetch issues", response.data);
            dispatch({
                type: actionTypes.FETCH_ISSUES_SUCCESS,
                issues: response.data,
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ISSUES_FAILURE,
                error: error.message,
            });
        }
    };
};

export const fetchIssueById = (id) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.FETCH_ISSUES_BY_ID_REQUEST });
        try {
            const response = await api.get(`/api/issues/${id}`);
            console.log("fetch issue by id", response.data);
            dispatch({
                type: actionTypes.FETCH_ISSUES_BY_ID_SUCCESS,
                issueDetails: response.data,  // ✅ Corrected from `issues`
            });
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ISSUES_BY_ID_FAILURE,
                error: error.message,
            });
        }
    };
};

export const updateIssueStatus = ({ id, status }) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.UPDATE_ISSUE_STATUS_REQUEST });
        try {
            const response = await api.put(`/api/issues/${id}/status/`+ status); 
            console.log("update issue status", response.data);
            dispatch({
                type: actionTypes.UPDATE_ISSUE_STATUS_SUCCESS,
                issueDetails: response.data,
            });
            toast.success("Issue status updated");
        } catch (error) {
            dispatch({
                type: actionTypes.UPDATE_ISSUE_STATUS_FAILURE,
                error: error.message,
            });
            toast.error("Failed to update issue status");
        }
    };
};

export const assignedUserToIssue = ({ issueId, userId }) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.ASSIGNED_ISSUE_TO_USER_REQUEST });
        try {
            const response = await api.put(`/api/issues/${issueId}/assignee/${userId}`);
            console.log("assigned issue --- ", response.data);
            dispatch({
                type: actionTypes.ASSIGNED_ISSUE_TO_USER_SUCCESS,
                issues: response.data,
            });
            toast.success("User assigned to issue");
        } catch (error) {
            dispatch({
                type: actionTypes.ASSIGNED_ISSUE_TO_USER_FAILURE,
                error: error.message,  // ✅ Added missing error handling
            });
            toast.error("Failed to assign user");
        }
    };
};

export const createIssue = (issueData) => {
    return async (dispatch) => {
        dispatch({ type: actionTypes.CREATE_ISSUE_REQUEST });
        try {
            const response = await api.post("/api/issues", issueData);
            dispatch({
                type: actionTypes.CREATE_ISSUE_SUCCESS,
                issues: response.data,
            });
            console.log("issue created successfully", response.data);
            toast.success("Issue created successfully!");
        } catch (error) {
            dispatch({
                type: actionTypes.CREATE_ISSUE_FAILURE,  // ✅ Fixed typo (`types` → `type`)
                error: error.message,
            });
            toast.error("Failed to create issue");
        }
    };
};

export const deleteIssue = (issueId)=>{
    return async (dispatch)=>{
        dispatch({type:actionTypes.DELETE_ISSUE_REQUEST});
        try {
            await api.delete(`/api/issues/${issueId}`);
            dispatch({
                type:actionTypes.DELETE_ISSUE_SUCCESS,
                issueId,
            })
            console.log("Issue deleted", issueId);
            toast.success("Issue deleted");
        } catch (error) {
            dispatch({
                type:actionTypes.DELETE_ISSUE_FAILURE,
                error:error.message
            })
            console.log("error----------", error)
            toast.error("Failed to delete issue");
        }
    }
}
