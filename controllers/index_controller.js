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

const editor = (req, res) => {
    res.sendFile('editor.html', rootDir)
}

const form = (req, res) => {
    res.sendFile('form.html', rootDir)
}

const response = (req, res) => {
    res.sendFile('response.html', rootDir)
}

const admin_home = (req, res) => {
    res.sendFile('admin/admin_home.html', rootDir)
};

const admin_user = (req, res) => {
    res.sendFile('admin/admin_user.html', rootDir)
};

module.exports = {home, login, register, logout, editor, response, form, admin_home, admin_user};
