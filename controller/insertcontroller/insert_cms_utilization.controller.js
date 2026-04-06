import { PostCmsUtilizationService } from "../../services/insertservice/insert_cms_utilization.service.js";

  const REQUIRED_FIELDS = [
    "ut_lobby",  ];
  
  
  export const PostCmsUtilizationController = async (req, res) => {
    try {

    
      const CmsUtilization = req.body;
  
      if (!Array.isArray(CmsUtilization) || CmsUtilization.length === 0) {
        return res.status(400).json({
          status: "error",
          message: "Invalid or empty input data"
        });
      }
  
      for (let i = 0; i < CmsUtilization.length; i++) {
        const entry = CmsUtilization[i];
        for (const field of REQUIRED_FIELDS) {
          if (
            entry[field] === undefined ||
            entry[field] === null ||
            entry[field] === ""
          ) {
            return res.status(400).json({
              status:"error",
              message:`Field "${field}" is required and cannot be empty (record index: ${i})`
            });
          }
        }
      } 
    const result = await PostCmsUtilizationService(CmsUtilization);
    res.status(201).json({
      status: "ok",
      message: `${result.affectedRows} row(s) inserted successfully`
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });

  }}
 
  
    