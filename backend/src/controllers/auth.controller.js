const authService = require('../services/auth.service');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password',
      });
    }

    const adminData = await authService.login(email, password);

    res.status(200).json({
      status: 'success',
      data: adminData,
    });
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  login,
};
