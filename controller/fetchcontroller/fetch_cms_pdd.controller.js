import { get_Cms_pdd_Service } from "../../services/fetchservice/fetch_cms_pdd.service.js";

//by DBT
export const get_Cms_pdd_Controller = async (req, res) => {
  try {
    const result = await get_Cms_pdd_Service(req.query);
    return res.status(result.status === "ok" ? 200 : 500).json(result);
  } catch (error) {
    console.error("Error fetching CMS get_Cms_pdd  Data Service:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
