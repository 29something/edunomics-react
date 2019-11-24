export const isAdmin = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("user_type")==='admin') {
        return true;
    } else {
        return false;
    }
};

export const isPTO = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("user_type")==='plant technical officer') {
        return true;
    } else {
        return false;
    }
};
export const isQIC = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("user_type")==='quality incharge') {
        return true;
    } else {
        return false;
    }
};