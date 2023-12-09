import { createSlice } from '@reduxjs/toolkit';

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        allGroups: [],
        groupUsers: [],
        renderGroups: false,
    },
    reducers: {
        enterGroup: (state, action) => {
            state.allGroups = action.payload;
        },
        renderGroupsData: (state) => {
            state.renderGroups = !state.renderGroups;
        },
        setGroupUsers: (state, action) => {
            state.groupUsers = action.payload;
        },
        updateGroup: (state, action) => {
            const id = action.payload.id;

            state.allGroups = state.allGroups.map(group =>
                group._id === id ? { ...group, ...action.payload } : group
            );
        },
        toggleUserWorkingStatus: (state, action) => {
            const userId = action.payload;
            const user = state.groupUsers.find(user => user._id === userId);
            if(user) user.isWorking = !user.isWorking;
        },
        setAllUsersWorking: (state) => {
            state.groupUsers.forEach(user => user.isWorking = true);
        },
        setAllUsersNotWorking: (state) => {
            state.groupUsers.forEach(user => user.isWorking = false);
        },
    },
});

export const {
    enterGroup,
    renderGroupsData,
    updateGroup,
    setGroupUsers,
    toggleUserWorkingStatus,
    setAllUsersWorking,
    setAllUsersNotWorking
} = groupsSlice.actions;

export default groupsSlice.reducer;