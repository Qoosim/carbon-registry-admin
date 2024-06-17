import { createSlice } from '@reduxjs/toolkit'

interface OrgListState {
    orgList: any;
    error: string | null;
    isLoading: boolean;
    // orgRequestStatus: {
    //     isPending: boolean;
    //     isReview: boolean;
    // };
}

const initialOrgListState: OrgListState = {
    orgList: null,
    error: null,
    isLoading: false,
    // orgRequestStatus: {
    //     isPending: true,
    //     isReview: false,
    // },
};

export const OrgListSlice = createSlice({
    name: 'orgList',
    initialState: initialOrgListState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setOrgList: (state, action) => {
            state.orgList = action.payload,
            state.error = null,
            state.isLoading = false
        },
        setOrgListError: (state, action) => {
            state.error = action.payload,
            state.isLoading = false
        },
        // setRequestStatus: (state, action) => {
        //     state.orgRequestStatus.isPending = action.payload.isPending;
        //     state.orgRequestStatus.isReview = action.payload.isReview;
        // },
    }
})

export const {
    setIsLoading,
    setOrgList,
    setOrgListError
} = OrgListSlice.actions

export default OrgListSlice.reducer
