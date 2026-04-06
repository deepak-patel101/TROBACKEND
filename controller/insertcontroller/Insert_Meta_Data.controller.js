import { insert_Meta_Data_service } from "../../services/insertservice/insert_Meta_Data.service.js";

const REQUIRED_FIELDS = ["date"];

export const Insert_Meta_Data_Controller = async (req, res) => {
  console.log("hitting post api");
  try {
    const metaData = req.body;
    if (!Array.isArray(metaData) || metaData.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data",
      });
    }

    for (let i = 0; i < metaData.length; i++) {
      const entry = metaData[i];
      for (const field of REQUIRED_FIELDS) {
        if (
          entry[field] === undefined ||
          entry[field] === null ||
          entry[field] === ""
        ) {
          return res.status(400).json({
            status: "error",
            message: `Field "${field}" is required and cannot be empty (record index: ${i})`,
          });
        }
      }
    }
    const result = await insert_Meta_Data_service(metaData);
    res.status(201).json({
      status: "ok",
      message: `${result.affectedRows} row(s) inserted successfully`,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
