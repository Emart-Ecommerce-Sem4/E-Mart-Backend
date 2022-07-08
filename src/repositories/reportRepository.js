const pool = require("../configs/database.conf");
const {
  InternalServerErrorException,
} = require("../exceptions/InternalServerErrorException");

async function getTotalSales(year) {
  var result =[]
    try {
      const totalSales = await pool.query(

        "SELECT order_status,SUM(total_price) as sales_on_status FROM user_orders where date_part('year',order_date)=$1 GROUP BY order_status",
        [year]
      );
     
      totalSales.rows.forEach(element => {
       
        result.push(element);
       });
    } catch (error) {
      console.log(error)
      
      throw new InternalServerErrorException();
    }
    

    
    
    try {
      const salesOnDeliveryMethods= await pool.query("select delivery_method, sum(total_price) as total_sales from user_orders where date_part('year',order_date)=$1 GROUP BY delivery_method",[year]);
      salesOnDeliveryMethods.rows.forEach(element=>{
        result.push(element);
      })

      return result;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }

  }


  // async function getTotalOderDetails(year) {
  //   var result =[]
  //     try {
  //       const totalOdersOnStatus = await pool.query(
  
  //         "SELECT order_status,count(order_id) AS total_orders_on_status FROM user_orders where date_part('year',order_date)=$1 GROUP BY order_status",
  //         [year]
  //       );
  
  //       totalOdersOnStatus.rows.forEach(element => {
  //         result.push(element);
  //       });
    
      
  //     } catch (error) {
  //       console.log(error)
       
  //       throw new InternalServerErrorException();
  //     }
  //     try {
  //       const totalOder = await pool.query(
  
  //         "SELECT count(order_id) AS total_orders FROM user_orders where date_part('year',order_date)=$1",
  //         [year]
  //       );
  //       totalOder.rows.forEach(element => {
  //         result.push(element);
  //       });
     
  //     } catch (error) {
  //       console.log(error)
       
  //       throw new InternalServerErrorException();
  //     }
     
  //     try {
  //       const salesOnDeliveryMethods= await pool.query("select delivery_method, sum(total_price) as total_sales from user_orders where date_part('year',order_date)=$1 GROUP BY delivery_method",[year]);
  //       salesOnDeliveryMethods.rows.forEach(element=>{
  //         result.push(element);
  //       })
  
  //       return result;
  //     } catch (error) {
  //       console.log(error)
  //       throw new InternalServerErrorException();
  //     }
  
  //   }





  async function getQuaterlySalesReport(year){
    try {
      const sales = await pool.query("SELECT date_part('quarter',order_date) as quater, sum(total_price) as sales,avg(total_price) as average from user_orders where order_status=$1 AND date_part('year',order_date)=$1  group by date_part('quarter',order_date) ",["DELIVERED",year]);
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

async function getProductsAccordingToSubCategory(sub_category_id){
try {
  const products = await pool.query("select product_id,title from product where sub_category_id=$1",[sub_category_id]);
  return products;
} catch (error) {
  throw new InternalServerErrorException();
}
}
async function getSubCategoruAccordingToCategory(category_id){
  try {
    const products = await pool.query("select sub_category_id,name from product where category_id=$1",[category_id]);
    return products;
  } catch (error) {
    throw new InternalServerErrorException();
  }
  }
  async  function  getOdersDetailsForReport(year,category_id,product_id){
    try {
      
      const res = await pool.query("select date_part('month',u.order_date) as month , count(u.order_id) as no_of_orders from  user_orders u left outer join order_items o on u.order_id= o.order_id left outer join product p on p.product_id=o.product_id where u.order_status=$1 and p.category_id=$2 and p.product_id=$3 and date_part('year',u.order_date)=$4 group by date_part('month',u.order_date)",["DELIVERED",category_id,product_id,year])
      console.log(res);
      return res;
    } catch (error) {
     
      throw new InternalServerErrorException();
    }
  }
  async function getCategoryWithMostOrders(year) {
    try {
      const  res =await pool.query("select count(u.order_id) as total_orders,c.category_name from  user_orders u left outer join order_items o on u.order_id=o.order_id left outer join product p on p.product_id=o.product_id left outer join category c on c.category_id=p.category_id where date_part('year',u.order_date)=$1 and u.order_status=$2  group by c.category_id",[year,"DELIVERED"]);
      return res;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }
  }
  async function getToTenProductWithSales(year,fromMonth,toMonth) {
    try {
      const  res  = await pool.query("select sum(u.total_price) as sales,p.product_name,c.category_name,count(order_id) as total_orders")
    } catch (error) {
      
    }
  }
  module.exports = {getTotalSales,getQuaterlySalesReport,getYears,getOdersDetailsForReport,getProductsAccordingToSubCategory,getCategoryWithMostOrders,getSubCategoruAccordingToCategory}