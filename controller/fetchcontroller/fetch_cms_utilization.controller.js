import { fetch_cms_utilization_service } from "../../services/fetchservice/fetch_cms_utilization.service.js";



export const fetch_cms_utilization_controller = async(req , res)=>{
    try{  

const {ut_month,ut_year}=req.query;
 const filters={ut_month,ut_year};
  
 const   cms_utilization = await  fetch_cms_utilization_service(filters);
        return res.status(cms_utilization.status === "ok" ? 200 : 500).json(cms_utilization);

    


    }
    catch(error){
        console.error("Error fetching CMS UTILIZATION Data Service:", error);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }   
}