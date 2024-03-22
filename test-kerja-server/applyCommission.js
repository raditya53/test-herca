const main = require('./DBConnect.js');

const calculateCommission = (revenue) => {
  let commissionRate;
  let commission;

  if (revenue >= 500000000) {
    commissionRate = 0.10; // 10%
  } else if (revenue >= 200000000) {
    commissionRate = 0.05; // 5%
  } else if (revenue >= 100000000) {
    commissionRate = 0.025; // 2.5%
  } else {
    commissionRate = 0; // 0%
  }

  commission = revenue * commissionRate;
  return { commissionRate: commissionRate * 100, commission: commission };
};

const applyCommissionToMarketingData = async (status) => { // 1. Tambahkan parameter status
  try {
    const marketingData = await main();
    const commissionData = [];
    marketingData.forEach(row => {
      const { MarketingName, Month, revenue, paid } = row; // Misalkan ada informasi pembayaran dalam data marketing

      // Lakukan pengecekan untuk menentukan status pembayaran
      const paymentStatus = paid ? true : false;

      const { commissionRate, commission } = calculateCommission(revenue);

      const formattedRevenue = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(revenue);
      const formattedCommission = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(commission);

      commissionData.push({
        MarketingName,
        Month,
        revenue: formattedRevenue,
        commissionRate: `${(commissionRate).toFixed(2)}%`,
        commission: formattedCommission,
        status: paymentStatus // 3. Set nilai status berdasarkan informasi pembayaran
      });
    });

    // Return the commission data with updated payment status
    return commissionData;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};

module.exports = applyCommissionToMarketingData;
