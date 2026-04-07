import { insert_Meta_Data_service } from "../../services/insertservice/insert_Meta_Data.service.js";

const REQUIRED_FIELDS = ["date", "office", "staff", "shift"];

export const Insert_Meta_Data_Controller = async (req, res) => {
  try {
    const metaData = req.body;

    if (!Array.isArray(metaData) || metaData.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data",
      });
    }

    // 🔹 VALIDATION
    for (let i = 0; i < metaData.length; i++) {
      const entry = metaData[i];

      for (const field of REQUIRED_FIELDS) {
        if (!entry[field]) {
          return res.status(400).json({
            status: "error",
            message: `Field "${field}" missing at index ${i}`,
          });
        }
      }
    }

    const result = await insert_Meta_Data_service(metaData);

    return res.status(200).json({
      status: "ok",
      message: `
        ${result.insertedCount} inserted,
        ${result.updatedCount} updated
      `,
      data: result,
    });
  } catch (error) {
    console.error("Controller error:", error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
