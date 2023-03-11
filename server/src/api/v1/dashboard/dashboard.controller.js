const { getAddressService } = require('./dashboard.service');

const getAddress = async (req, res) => {
  try {
    const address = await getAddressService();
    res.status(200).json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAddress,
};
