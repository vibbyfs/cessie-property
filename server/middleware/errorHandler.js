
async function errorHandler(err, req, res, next) {
    console.error(err.stack);
    
    if (err.name === "NotFound") {
        return res.status(404).json({ message: err.message });
    }
    res.status(500).json({ message: 'Something went wrong!' });
}

module.exports = errorHandler;
