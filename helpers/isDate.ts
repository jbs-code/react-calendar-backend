import moment from "moment";

export const isDate = (value: number | string) => {
    if (!value) return false;

    const date = moment(value);
    if (date.isValid()) return true;
    else return false;
};
