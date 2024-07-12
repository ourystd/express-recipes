const bcrypt = require("bcrypt");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const path = require("path");

const { JWT_SECRET } = process.env;
const db = path.join(__dirname, "../../db/users.json");

async function authenticate({ id, email, password }) {
  const user = await find({ email });

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  });

  return { token };
}

async function create({ email, name, password }) {
  const users = JSON.parse(await fs.readFile(db));

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: bcrypt.hash(password, 10),
  };

  const token = jwt.sign({ id: newUser.id }, JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  });
  users.push(newUser);

  await fs.writeFile(db, JSON.stringify(users));

  return { token };
}

async function find({ id, email }) {
  const users = JSON.parse(await fs.readFile(db));
  const userID = parseInt(id);
  return users.find((user) => user.id === userID || user.email === email);
}

module.exports = {
  authenticate,
  create,
  find,
};
