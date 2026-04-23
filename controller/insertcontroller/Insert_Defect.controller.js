import { insert_Defect_service } from "../../services/insertservice/insert_Defect.service.js";

const REQUIRED_FIELDS = [
  `date`,
  `train_no`,
  `loco_no`,
  `lp_name`,
  `alp_name`,
  // `hq`,
  `shed`,
  `engine_schedule`,
  `station`,
  `time`,
  `defect_categories`,
  `defect_details`,
  `inserted_by`,
];

export const Insert_Defective_Controller = async (req, res) => {
  try {
    const defective = req.body;
    console.log(defective);
    if (!Array.isArray(defective) || defective.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data",
      });
    }

    // 🔹 VALIDATION
    for (let i = 0; i < defective.length; i++) {
      const entry = defective[i];

      for (const field of REQUIRED_FIELDS) {
        if (!entry[field]) {
          return res.status(400).json({
            status: "error",
            message: `Field field="${field}" missing at index ${i}`,
          });
        }
      }
    }

    const result = await insert_Defect_service(defective);

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
