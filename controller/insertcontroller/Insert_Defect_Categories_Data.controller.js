import { insert_Defect_categories_Services } from "../../services/insertservice/insert_Defect_categories.service.js";

const REQUIRED_FIELDS = ["defect_categories"];

export const Insert_Defect_Categories_Data_Controller = async (req, res) => {
  try {
    const defect = req.body;

    if (!Array.isArray(defect) || defect.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data",
      });
    }

    //  VALIDATION
    for (let i = 0; i < defect.length; i++) {
      const entry = defect[i];

      for (const field of REQUIRED_FIELDS) {
        if (!entry[field]) {
          return res.status(400).json({
            status: "error",
            message: `Field field="${field}" missing at index ${i}`,
          });
        }
      }
    }

    const result = await insert_Defect_categories_Services(defect);

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
