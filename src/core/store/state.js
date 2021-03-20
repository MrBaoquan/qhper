export default {
    user: null,
    userData: (_data) => {
        return {
            id: _data.id,
            username: _data.username,
        };
    },
};
