import { createSlice } from '@reduxjs/toolkit'

interface ProjectListState {
    projectList: any;
    error: string | null;
    loading: boolean;
    // projectRequestStatus: {
    //     isPending: boolean;
    //     isReview: boolean;
    // };
}

const initialProjectListState: ProjectListState = {
    projectList: null,
    error: null,
    loading: false,
    // projectRequestStatus: {
    //     isPending: true,
    //     isReview: false,
    // },
};

export const ProjectListSlice = createSlice({
    name: 'projectList',
    initialState: initialProjectListState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setProjectList: (state, action) => {
            state.projectList = action.payload,
            state.error = null,
            state.loading = false
        },
        setProjectListError: (state, action) => {
            state.error = action.payload,
            state.loading = false
        },
        // setProjectRequestStatus: (state, action) => {
        //     state.requestStatus.isPending = action.payload.isPending;
        //     state.requestStatus.isReview = action.payload.isReview;
        // },
    }
})

export const {
    setLoading,
    setProjectList,
    setProjectListError
} = ProjectListSlice.actions

export default ProjectListSlice.reducer
