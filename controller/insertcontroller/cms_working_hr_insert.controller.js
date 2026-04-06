import { PostCmsWorkingHrService } from "../../services/insertservice/cms_working_hr_insert.service.js";


const REQUIRED_FIELDS = [
  "wh_lobby",  ];

export const PostCmsWorkingHrController = async (req, res) => {
  try {
    const CmsWorkingHr = req.body;

    if (!Array.isArray(CmsWorkingHr) || CmsWorkingHr.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data"
      });
    }

    for (let i = 0; i < CmsWorkingHr.length; i++) {
      const entry = CmsWorkingHr[i];
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

    const result = await PostCmsWorkingHrService(CmsWorkingHr);

    res.status(201).json({
      status: "ok",
      message: `${result.affectedRows} row(s) inserted successfully`
    });
  } catch (error) {
    console.error("Controller error:", error);
    // res.status(500).json({ status: "error", message: "Internal Server Error" });
    res.status(500).json({ status: "error", message:error.message });
  }
};
