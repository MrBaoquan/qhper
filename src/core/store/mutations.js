// 设置用户信息
export const setUser = (state, data) => {
    state.user = state.userData(data);
};

// 设置组装用户信息的处理函数
export const assembleUser = (state, data) => {
    state.userData = data;
};
