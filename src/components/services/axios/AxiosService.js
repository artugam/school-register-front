import axios from 'axios'
import toast from "../toast/ToastService";
import responseCodes from "./ResponseCodes";

const axiosService = {
    handleError: function (reason) {
        if (!reason.response) {
            toast.error(responseCodes.message["500"]);
            return;
        }
        if(reason.response.data.errors) {
            this.handleErrorsMessages(reason.response.data.errors);
            return;
        }
        // if(reason.response.)
        if (!responseCodes.message[reason.response.data.error]) {
            console.log(reason.response);
            toast.error("No key for " + reason.response.data.error)
            return;
        }

        toast.error(responseCodes.message[reason.response.data.error]);
    },
    getAuthConfig: () => {
        var authData = localStorage.getItem("authData");
        authData = JSON.parse(authData);

        var config = {
            headers: {
                "Authorization": authData.tokenType + " " + authData.accessToken
            },
        };
        return config;
    },

    handleErrorsMessages: function (errors) {
        errors.map((item) => {
            if(responseCodes.message[item.code]) {
                toast.error(responseCodes.message[item.code]);
                return;
            }
        });
    }
};

export default axiosService;