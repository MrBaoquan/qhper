export const loggedIn = (state) => {
    return state.user != null;
};

export const user = (state)=>{
    return state.user;
}

export const roles = (state)=>{
    const roles = state.user.roles;
    if(!Array.isArray(roles)||roles.length<=0) return [];
    return roles.map(_role=>_role.name);
}

export const check = (state,getters)=> roles=>{
    const user = getters.user
    if(user){
        const userRoles = getters.roles;
        if(Array.isArray(roles)&&roles.length){
            for(const role of roles){
                if(!userRoles.includes(role)) return false;
            }
        }else if(roles){
            if(!userRoles.includes(roles)) return false;
        }
        return true;
    }
    return false
    
}