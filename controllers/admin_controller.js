const rootDir = {root: './views'};

const home = (req, res) => {
    res.sendFile('admin/admin_home.html', rootDir)
};

const user = (req, res) => {
    res.sendFile('admin/admin_user.html', rootDir)
};

module.exports = {home, user};
