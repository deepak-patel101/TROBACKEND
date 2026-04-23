import { insert_crew_Data_service } from "../../services/insertservice/insert_Crew_Data.service.js";

const REQUIRED_FIELDS = [
  `zone`,
  `lobby`,
  `crew_id`,
  `crew_name`,
  `crew_type`,
  `crew_emp_code`,
];

export const Insert_Crew_Data_Controller = async (req, res) => {
  try {
    const crew = req.body;

    if (!Array.isArray(crew) || crew.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data",
      });
    }

    // 🔹 VALIDATION
    for (let i = 0; i < crew.length; i++) {
      const entry = crew[i];

      for (const field of REQUIRED_FIELDS) {
        if (!entry[field]) {
          return res.status(400).json({
            status: "error",
            message: `Field field="${field}" missing at index ${i}`,
          });
        }
      }
    }

    const result = await insert_crew_Data_service(crew);

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
