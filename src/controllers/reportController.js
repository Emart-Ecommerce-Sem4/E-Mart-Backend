const express = require("express");
const reportservice = require("../services/reportService");
const authenticateToken = require("../middlewares/authorization");

const router = express.Router();


router.get("/totalsales/:year", async (req, res) => {
    const response = await reportservice.getTotalSalesReport(req.params.year);
    res.status(200);
    res.send(response);
  });

  router.get("/totalsalesaccordingtotime/:year/:frommonth/:tomonth", async (req, res) => {
    const response = await reportservice.getmostSalesAccordingToTime(req.params.year,req.params.frommonth,req.params.tomonth);
    res.status(200);
    res.send(response);
  });

  router.get("/totalorders/:year", async (req, res) => {
    const response = await reportservice.getTotalOdersReport(req.params.year);
    res.status(200);
    res.send(response);
  });

  router.get("/quaterlysales/:year", async (req, res) => {
    const response = await reportservice.getQuaterlySalesReport(req.params.year);
    res.status(200);
    res.send(response);
  });

  router.get("/getyears", async (req,res)=>{
    const response = await reportservice.getYears();
    res.status(200);
    res.send(response);
  })
  router.get("/getproducts/:sub_category_id", async (req,res)=>{
    const response = await reportservice.getProductsAccordingToSubCategory(req.params.sub_category_id);
    res.status(200);
    res.send(response);
  });
  router.get("/getsubcategories/:category_id", async (req,res)=>{
    const response = await reportservice.getSubCategoryAccordingtoCategory(req.params.category_id);
    res.status(200);
    res.send(response);
  });

  router.get("/getorderdeilsforinteres/:year/:category_id/:product_id", async (req,res)=>{
    const response = await reportservice.getOdersDetailsForReport(req.params.year,req.params.category_id,req.params.product_id);
    res.status(200);
    res.send(response);
  });
  router.get("/getcategorywithmostorders/:year", async (req,res)=>{
    const response = await reportservice.getCategoryWithMostOrders(req.params.year);
    res.status(200);
    res.send(response);
  });


  module.exports=router;