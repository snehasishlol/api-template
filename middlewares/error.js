const errorHandler = (err, req, res, next) => {
    console.error(err);

    // Check if the error is a known type (e.g., a custom application error)
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ success: false, message: err.message, code: err.statusCode }).end();
    }

    res.status(500).json({ success: false, message: 'Internal Server Error', code: 500 }).end();
};

module.exports = errorHandler;