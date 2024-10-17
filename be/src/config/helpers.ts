const parseEmptyStringToNull = (value: any) => {
    return value == "" || value == undefined ? null : value;
};

export { parseEmptyStringToNull };
