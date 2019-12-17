import globalConstants from "../../constants/Global";


const auth = {
    getLoggedUser: () => {
        return  JSON.parse(localStorage.getItem(globalConstants.user));
    },
};

export default auth;