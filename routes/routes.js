import express from "express";
import { get_tro_Meta_data_controller } from "../controller/fetchcontroller/get_tro_Meta_data.controller.js";
import { Insert_Meta_Data_Controller } from "../controller/insertcontroller/Insert_Meta_Data.controller.js";
import { delete_Meta_Data_Controller } from "../controller/deletecontroller/detele_meta_data.controller.js";

const routes = express.Router();

//                  for getting data                      ////////////////////////
routes.get("/metaData", get_tro_Meta_data_controller);

//                   for inserting data                   //////////////////////////
routes.post("/insert_metadata", Insert_Meta_Data_Controller);
//                   for updating data                   //////////////////////////

//                   for deleting data                     /////////////////////////
routes.delete("/delete_metadata", delete_Meta_Data_Controller);
export default routes;
