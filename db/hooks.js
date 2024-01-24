export const handleSaveError = (error, data, next) => {
    error.status = 400;
    next();
};

export const runValidatorAtUpdate = function (next) {
    this.options.runValidator = true;
    this.options.new = true;
    next();
}