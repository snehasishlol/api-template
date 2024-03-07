const clientHandler = async (req, res, next) => {
    try {
        const data = await fetch(`https://ipapi.co/json`).then((r) => r.json());
        if (!data) req.client = {};
        
        else req.client = data;
        next();
    }
    catch (error) {
        console.error(error);
        next();
    }
}

module.exports = clientHandler;