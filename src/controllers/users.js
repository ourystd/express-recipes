const { create, authenticate, find } = require("../services/users");
const { CustomError } = require("../utils/error");

async function handleSignup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (await find({ email })) {
      throw new Error(`Email address already used`);
    }
    const { token } = await create({ email, name, password });
    res.json({ token });
  } catch (error) {
    next(error);
  }
}

async function handleLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    const results = await authenticate({ email, password });
    if (!results) {
      throw new CustomError(404, `Incorrect credentials`);
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleSignup,
  handleLogin,
};
