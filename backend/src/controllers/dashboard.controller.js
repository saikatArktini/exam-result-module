const dashboardService = require('../services/dashboard.service');

const getSummary = async (req, res) => {
  try {
    const summary = await dashboardService.getDashboardSummary();
    res.status(200).json({ status: 'success', data: summary });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getSummary
};
