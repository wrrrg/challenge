const Users = require('../../models/user');

module.exports = (req, res) => {
  Users.findOne({ email: req.params.email }, (err, user) => {
    if (err) return res.send(err);
    return res.json(user);
  });
};
