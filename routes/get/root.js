module.exports = {
    route: '/',
    handler: async (req, res) => {
        res.json({ hello: 'world' }).end();
    }
}