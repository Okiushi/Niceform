const displaySbHome = (req, res) => {
    res.render('sandbox');
};

const displaySbDb = (req, res) => {
    res.render('sandbox_db');
};

module.exports = {displaySbHome, displaySbDb};
