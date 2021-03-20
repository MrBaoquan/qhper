export const loggedIn = (state) => {
    return state.user != null;
};

export const user = (state)=>{
    return state.user;
}