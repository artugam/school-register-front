import axios from 'axios'
import toast from "../toast/ToastService";
import responseCodes from "./ResponseCodes";

const axiosService = {
    handleError: function (reason) {
        if(!reason.response) {
            toast.error(responseCodes.message["500"]);
            return;
        }


        if(!responseCodes.message[reason.response.data.error]) {
            console.log(reason.response);
            toast.error("No key for " + reason.response.data.error)
            return;
        }

        console.log(reason.response);
        toast.error(responseCodes.message[reason.response.data.error]);
    }
};

export default axiosService;