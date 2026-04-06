import { PostCsmPDDService } from "../../services/insertservice/insert_cms_pdd.service.js";



const REQUIRED_FIELDS = [
  "PDD_LOBBY",  ];

export const PostCsmPDDController = async (req, res) => {
  try {
    const CsmPDD = req.body;

    if (!Array.isArray(CsmPDD) || CsmPDD.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data"
      });
    }

    for (let i = 0; i < CsmPDD.length; i++) {
      const entry = CsmPDD[i];
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

    const result = await PostCsmPDDService(CsmPDD);

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
