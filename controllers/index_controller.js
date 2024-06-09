const rootDir = {root: './views'};

const home = (req, res) => {
    res.sendFile('index.html', rootDir)
};

module.exports = {home};
