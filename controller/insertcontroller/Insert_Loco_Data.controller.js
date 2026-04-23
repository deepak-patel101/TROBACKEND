import { insert_Loco_Data_service } from "../../services/insertservice/insert_Loco_Data.service.js";

const REQUIRED_FIELDS = [`Railway`, `Base_Shed`, `Loco_No`, `Type_of_Loco`];

export const Insert_Loco_Data_Controller = async (req, res) => {
  try {
    const loco = req.body;

    if (!Array.isArray(loco) || loco.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data",
      });
    }

    // 🔹 VALIDATION
    for (let i = 0; i < loco.length; i++) {
      const entry = loco[i];

      for (const field of REQUIRED_FIELDS) {
        if (!entry[field]) {
          return res.status(400).json({
            status: "error",
            message: `Field field="${field}" missing at index ${i}`,
          });
        }
      }
    }

    const result = await insert_Loco_Data_service(loco);

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
