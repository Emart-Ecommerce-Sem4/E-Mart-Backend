const reportRepository = require("../repositories/reportRepository");
const generateOutput = require("../utils/outputFactory");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");



async function getTotalSalesReport(year) {
    try {
      const res = await reportRepository.getTotalSalesAndOderDetails(year)
      return generateOutput(200, "Report fetched succesfully!", {
        salesReport: res,
      });
    } catch (error) {
      return generateOutput(500, "Error occured while Report generate", {
        error,
      });
    }
  }
  async function getQuaterlySalesReport(year) {
    try {
      const res = await reportRepository.getQuaterlySalesReport(year)
      return generateOutput(200, "Report fetched succesfully!", {
        salesReport: res.rows,
      });
    } catch (error) {
      return generateOutput(500, "Error occured while Report generate", {
        error,
      });
    }
  }
async  function getYears(){
    try {
        const res = await reportRepository.getYears();
        return generateOutput(200,"Years frtched successfully!",{
            years:res.rows
        });
    } catch (error) {
        return generateOutput(500, "Error occured while fetch years", {
            error,
          });
    }
}
async function getProductsAccordingToCategory(category_id) {
    try {
        const res = await reportRepository.getProductsAccordingToCategory(category_id);
        return generateOutput(200,"products fetvhed successfully",{
            products:res.rows
        });
    } catch (error) {
        return generateOutput(500, "Error occured while fetch products", {
            error,
          });
    }
}

async function getOdersDetailsForReport(year,category_id,product_id) {
    try {
        const res = await reportRepository.getOdersDetailsForReport(year,category_id,product_id);
        return generateOutput(200,"order details fetched successfully",{
            products:res.rows
        });
    } catch (error) {
        return generateOutput(500, "Error occured while fetch order details", {
            error,
          });
    }
}
  module.exports={getTotalSalesReport,getQuaterlySalesReport,getYears,getProductsAccordingToCategory,getOdersDetailsForReport}