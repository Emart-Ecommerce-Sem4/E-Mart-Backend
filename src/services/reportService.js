const reportRepository = require("../repositories/reportRepository");
const generateOutput = require("../utils/outputFactory");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");



async function getTotalSalesReport(year) {
    try {
      const res = await reportRepository.getTotalSales(year)
      return generateOutput(200, "Report fetched succesfully!", {
        salesReport: res,
      });
    } catch (error) {
      return generateOutput(500, "Error occured while Report generate", {
        error,
      });
    }
  }


  async function getTotalOdersReport(year) {
    try {
      const res = await reportRepository.getTotalOdersReport(year)
      return generateOutput(200, "Report fetched succesfully!", {
        ordersReport: res,
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
async function getProductsAccordingToSubCategory(sub_category_id) {
    try {
        const res = await reportRepository.getProductsAccordingToSubCategory(sub_category_id);
        return generateOutput(200,"products fetvhed successfully",{
            products:res.rows
        });
    } catch (error) {
        return generateOutput(500, "Error occured while fetch products", {
            error,
          });
    }
}
async function getSubCategoryAccordingtoCategory(sub_category_id) {
  try {
      const res = await reportRepository.getSubCategoruAccordingToCategory(sub_category_id);
      return generateOutput(200,"products fetvhed successfully",{
          subcategory:res.rows
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
            orders:res.rows
        });
    } catch (error) {
       
        return generateOutput(500, "Error occured while fetch order details", {
            error,
          });
    }
}
async  function getCategoryWithMostOrders(year) {
    try {
        const res =await reportRepository.getCategoryWithMostOrders(year);
        return generateOutput(200,"order details fetched successfully",{
            category:res.rows
        });
    } catch (error) {
       
        return generateOutput(500, "Error occured while fetch order details", {
            error,
          });
    }
}
async  function getmostSalesAccordingToTime(year,fromMonth,toMonth) {
  try {
      const res =await reportRepository.getmostSalesAccordingToTime(year,fromMonth,toMonth);
      return generateOutput(200,"Sales details fetched successfully",{
          sales:res
      });
  } catch (error) {
     
      return generateOutput(500, "Error occured while fetch Sales details", {
          error,
        });
  }
}
  module.exports={getmostSalesAccordingToTime,getTotalSalesReport,getQuaterlySalesReport,getYears,getProductsAccordingToSubCategory,getOdersDetailsForReport,getSubCategoryAccordingtoCategory,getCategoryWithMostOrders,getTotalOdersReport}