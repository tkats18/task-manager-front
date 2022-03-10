const User = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                authorized:true,
                userData:action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                authorized:false,
                userData:action.payload

            }
        default:
            return {
                ...state,
                authorized:localStorage.getItem('token')!==null,
                userData:localStorage.getItem('email')

            }
    }
}

export default User
