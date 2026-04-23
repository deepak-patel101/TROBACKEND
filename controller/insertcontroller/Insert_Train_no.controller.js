import { insert_Train_no_service } from "../../services/insertservice/insert_Train_no.service.js";

const REQUIRED_FIELDS = [`zone`, `train_no`];

export const Insert_Train_no_controller = async (req, res) => {
  try {
    const train_no = req.body;
    if (!Array.isArray(train_no) || train_no.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid or empty input data",
      });
    }

    // 🔹 VALIDATION
    for (let i = 0; i < train_no.length; i++) {
      const entry = train_no[i];

      for (const field of REQUIRED_FIELDS) {
        if (!entry[field]) {
          return res.status(400).json({
            status: "error",
            message: `Field "${field}" missing at index ${i}`,
          });
        }
      }
    }

    const result = await insert_Train_no_service(train_no);

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
