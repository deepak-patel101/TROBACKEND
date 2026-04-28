import express from "express";
import { get_tro_Meta_data_controller } from "../controller/fetchcontroller/get_tro_Meta_data.controller.js";
import { Insert_Meta_Data_Controller } from "../controller/insertcontroller/Insert_Meta_Data.controller.js";
import { delete_Meta_Data_Controller } from "../controller/deletecontroller/detele_meta_data.controller.js";
import { get_m_loco_controller } from "../controller/fetchcontroller/get_m_loco.controller.js";
import { get_m_crew_controller } from "../controller/fetchcontroller/get_m_crew.controller.js";
import { get_m_train_no_controller } from "../controller/fetchcontroller/get_m_trtain_no.controller.js";
import { Insert_Train_no_controller } from "../controller/insertcontroller/Insert_Train_no.controller.js";
import { Insert_Loco_Data_Controller } from "../controller/insertcontroller/Insert_Loco_Data.controller.js";
import { Insert_Crew_Data_Controller } from "../controller/insertcontroller/Insert_Crew_Data.controller.js";
import { get_m_defect_service } from "../services/fetchservice/get_m_defect_service.js";
import { get_m_defect_controller } from "../controller/fetchcontroller/get_m_defect.controller.js";
import { Insert_Defect_Categories_Data_Controller } from "../controller/insertcontroller/Insert_Defect_Categories_Data.controller.js";
import { Insert_Defective_Controller } from "../controller/insertcontroller/Insert_Defect.controller.js";
import { get_defect_controller } from "../controller/fetchcontroller/get_defect.controller.js";
import { universal_Delete_controller } from "../controller/deletecontroller/universal_Delete.controller.js";

const routes = express.Router();

/////////////////////////////////////////for getting data////////////////////////////////////////////////////
routes.get("/metaData", get_tro_Meta_data_controller);
routes.get("/loco_master", get_m_loco_controller);
routes.get("/crew", get_m_crew_controller);
routes.get("/train_no", get_m_train_no_controller);
routes.get("/defect_categories", get_m_defect_controller);
routes.get("/defect", get_defect_controller);

////////////////////for inserting data ////////////////////////////////////
routes.post("/insert_metadata", Insert_Meta_Data_Controller);
routes.post("/insert_train_no", Insert_Train_no_controller);
routes.post("/insert_loco_Data", Insert_Loco_Data_Controller);
routes.post("/insert_crew_Data", Insert_Crew_Data_Controller);
routes.post(
  "/insert_Defect_Categories",
  Insert_Defect_Categories_Data_Controller,
);
routes.post("/insert_Defect", Insert_Defective_Controller);

///////////////////////////////////for updating data ////////////////////////////////////////////////////

////////////////////////////////////for deleting data ////////////////////////////////////////////////
routes.delete("/delete_metadata", delete_Meta_Data_Controller);
routes.delete("/universal_delete", universal_Delete_controller);
export default routes;
