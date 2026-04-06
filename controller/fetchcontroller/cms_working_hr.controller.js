import {get_Cms_Working_Hr_Service}    from "../../services/fetchservice/cms_working_hr.service.js";

//by DBT
export const get_Cms_Working_Hr_Controller = async (req, res) => {
  try {
    const result = await get_Cms_Working_Hr_Service(req.query);
    return res.status(result.status === "ok" ? 200 : 500).json(result);
  } catch (error) {
    console.error("Error fetching CMS WORKING HR Data Service:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
