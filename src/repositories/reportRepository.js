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
      const salesOnDeliveryMethods= await pool.query("select delivery_method, sum(total_price) as total_sales from user_orders where date_part('year',order_date)=$1 and order_status=$2 GROUP BY delivery_method",[year,"DELIVERED"]);
      salesOnDeliveryMethods.rows.forEach(element=>{
        result.push(element);
      })

      return result;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }

  }


  async function getTotalOdersReport(year) {
    var result =[]
      try {
        const totalOdersOnStatus = await pool.query(
          "SELECT order_status,count(order_id) AS total_orders_on_status FROM user_orders where date_part('year',order_date)=$1 GROUP BY order_status",
          [year]
        );
  
        totalOdersOnStatus.rows.forEach(element => {
          result.push(element);
        });
    
      
      } catch (error) {
        console.log(error)
       
        throw new InternalServerErrorException();
      }
      try {
        const totalOder = await pool.query(
  
          "SELECT count(order_id) AS total_orders FROM user_orders where date_part('year',order_date)=$1",
          [year]
        );
        totalOder.rows.forEach(element => {
          result.push(element);
        });
     
      } catch (error) {
        console.log(error)
       
        throw new InternalServerErrorException();
      }
     
      try {
        const salesOnDeliveryMethods= await pool.query("select delivery_method, count(order_id) as total_Orders_on_delevery_method from user_orders where date_part('year',order_date)=$1  GROUP BY delivery_method",[year]);
        salesOnDeliveryMethods.rows.forEach(element=>{
          result.push(element);
        })
  
        return result;
      } catch (error) {
        console.log(error)
        throw new InternalServerErrorException();
      }
  
    }





  async function getQuaterlySalesReport(year){
    try {
      const sales = await pool.query("SELECT date_part('quarter',order_date) as quater, sum(total_price) as sales,avg(total_price) as average from user_orders where order_status=$1 AND date_part('year',order_date)=$2  group by date_part('quarter',order_date) ",["DELIVERED",year]);
      return sales;
    } catch (error) {
      console.log(error)
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
  const products = await pool.query("select p.product_id,p.title from product p left outer join product_subcategory ps on p.product_id=ps.product_id where sub_category_id=$1",[sub_category_id]);
  return products;
} catch (error) {
  console.log(error)
  throw new InternalServerErrorException();
}
}
async function getSubCategoruAccordingToCategory(category_id){
  try {
    console.log(category_id)
    const products = await pool.query("select s.sub_category_id,s.name from sub_category s left outer join category_subcategory cs on cs.sub_category_id=s.sub_category_id where category_id=$1",[category_id]);
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
      const  res =await pool.query("select category_name,count(order_id) as orders,  count(order_id)*100/(select count(order_id)  from full_product_order_view where order_status=$1 AND date_part('year',order_date)=$2) as percentage from full_product_order_view where order_status=$1 AND date_part('year',order_date)=$2 group by category_name",["DELIVERED",year]);
      return res;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }
  }
  async function getmostSalesAccordingToTime(year,fromMonth,toMonth) {
    
    var result =[]
    try {
      
      const  res  = await pool.query("select max_values.category_name, max(max_values.sales),max_values.percentage from (select category_name, sum(total_price) as sales, round(sum(total_price)*100/(select sum(total_price) from full_product_order_view  where order_status=$1 AND date_part('year',order_date)=$2 and date_part('month',order_date) between $3 and $4 )) as percentage   from full_product_order_view  where order_status=$1 AND date_part('year',order_date)=$2 and date_part('month',order_date) between $3 and $4 group by category_name) as max_values group by category_name,percentage order by max(max_values.sales) desc limit 1",['DELIVERED',year,fromMonth,toMonth] )
      res.rows.forEach(element => {
        result.push(element);
      });
      
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }

    try {
      
      const  res  = await pool.query("select max_values.title, max(max_values.sales),max_values.percentage  from (select title, sum(total_price) as sales, round(sum(total_price)*100/(select sum(total_price) from full_product_order_view  where order_status=$1 AND date_part('year',order_date)=$2 and date_part('month',order_date) between $3 and $4 )) as percentage   from full_product_order_view  where order_status=$1 AND date_part('year',order_date)=$2 and date_part('month',order_date) between $3 and $4 group by title) as max_values group by title,percentage order by max(max_values.sales) desc limit 1",['DELIVERED',year,fromMonth,toMonth] )
      res.rows.forEach(element => {
        result.push(element);
      });
     
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }
    try {
      const  res  = await pool.query("select max_values.name, max(max_values.sales),max_values.percentage  from (select name, sum(total_price) as sales, round(sum(total_price)*100/(select sum(total_price) from full_product_order_view  where order_status=$1 AND date_part('year',order_date)=$2 and date_part('month',order_date) between $3 and $4 )) as percentage   from full_product_order_view  where order_status=$1 AND date_part('year',order_date)=$2 and date_part('month',order_date) between $3 and $4 group by name) as max_values group by name,percentage order by max(max_values.sales) desc limit 1",['DELIVERED',year,fromMonth,toMonth] )
      res.rows.forEach(element => {
        result.push(element);
      });
     
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }

    try {
      const  res  = await pool.query("select  max_values.variant_type, max(max_values.sales),max_values.percentage  from (select variant_type, sum(total_price) as sales, round(sum(total_price)*100/(select sum(total_price) from full_product_order_view  where order_status=$1 AND date_part('year',order_date)=$2 and date_part('month',order_date) between $3 and $4 )) as percentage   from full_product_order_view  where order_status=$1 AND date_part('year',order_date)=$2 and date_part('month',order_date) between $3 and $4 group by variant_type) as max_values group by variant_type,percentage order by max(max_values.sales) desc limit 1",['DELIVERED',year,fromMonth,toMonth] )
      res.rows.forEach(element => {
        result.push(element);
      });
      
     return result;

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }


  }

  async function getOrdersOverview(year,category,subCategory,product) {
    try {
    
      const res = await pool.query("select date_part('month',order_date) as month ,count(order_id) as order_count from full_product_order_view where order_status=$1 and date_part('year',order_date)=$2 and category_name=$3 and name=$4 and title =$5 group by date_part('month',order_date)" ,["DELIVERED",year,category,subCategory,product])
      return res;
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException();
    }
  }
  module.exports = {getOrdersOverview,getmostSalesAccordingToTime,getTotalOdersReport,getTotalSales,getQuaterlySalesReport,getYears,getOdersDetailsForReport,getProductsAccordingToSubCategory,getCategoryWithMostOrders,getSubCategoruAccordingToCategory}