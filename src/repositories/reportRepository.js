const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getTotalSalesAndOderDetails(year) {
  var result =[]
    try {
      const totalSales = await pool.query(

        "SELECT order_status,SUM(total_price)  FROM user_orders where order_date::text LIKE $1 GROUP BY order_status",
        [year+'%']
      );
     
      totalSales.rows.forEach(element => {
       
        result.push(element);
       });
    } catch (error) {
     
      throw new InternalServerErrorException();
    }
    

    try {
      const totalOdersOnStatus = await pool.query(

        "SELECT order_status,count(order_id) AS total_orders FROM user_orders where order_date::text LIKE $1 GROUP BY order_status",
        [year+'%']
      );

      totalOdersOnStatus.rows.forEach(element => {
        result.push(element);
      });
  
    
    } catch (error) {
     
      throw new InternalServerErrorException();
    }
    try {
      const totalOder = await pool.query(

        "SELECT count(order_id) AS total_orders FROM user_orders where order_date::text LIKE $1",
        [year+'%']
      );
      totalOder.rows.forEach(element => {
        result.push(element);
      });
    return result;
    } catch (error) {
     
      throw new InternalServerErrorException();
    }

  }


  async function getQuaterlySalesReport(year){
    try {
      const sales = await pool.query("SELECT date_part('quarter',order_date) as quater, sum(total_price) as sales from user_orders where order_status=$1 AND order_date::text LIKE $2  group by date_part('quarter',order_date) ",["DELIVERED",year+'%']);
      return sales;
    } catch (error) {
      throw new InternalServerErrorException();
    }

  }


  async function getYears(){
    try {
      const years = await pool.query("select distinct date_part('year', order_date) as year from user_orders ")
      return years;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

async function getProductsAccordingToCategory(category_id){
try {
  const products = await pool.query("select product_id,name from product where category_id=$1",[category_id]);
  return products;
} catch (error) {
  throw new InternalServerErrorException();
}
}

  async  function  getOdersDetailsForReport(year,category_id,product_id){
    try {
      const years = await pool.query("select date_part('month',order_date) as month , count(order_id) as no_of_orders from user_orders where order_status=$1 and category_id=$2 and product_id=$3 and date_part('year',order_date)=$4 group by date_part('month',order_date)",["DELIVERED",category_id,product_id,year])
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  module.exports = {getTotalSalesAndOderDetails,getQuaterlySalesReport,getYears,getOdersDetailsForReport,getProductsAccordingToCategory}