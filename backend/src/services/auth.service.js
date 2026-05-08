const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const login = async (email, password) => {
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    token: generateToken(admin.id),
  };
};

module.exports = {
  login,
};
