const rootDir = {root: './views'};

const home = (req, res) => {
    res.sendFile('home.html', rootDir)
};

const login = (req, res) => {
    res.sendFile('login.html', rootDir)
};

const register = (req, res) => {
    res.sendFile('register.html', rootDir)
}

const logout = (req, res) => {
    res.sendFile('logout.html', rootDir)
}

const admin_home = (req, res) => {
    res.sendFile('admin/admin_home.html', rootDir)
};

const admin_user = (req, res) => {
    res.sendFile('admin/admin_user.html', rootDir)
};

module.exports = {home, login, register, logout, admin_home, admin_user};
