import { db } from "../../db/dbConnect.js";

export const get_defect_service = async (dates) => {
  try {
    const { startDate, endDate } = dates;
    console.log("start", startDate, "");
    // Validate inputs
    if (!startDate && !endDate) {
      return {
        status: "error",
        message:
          "Please provide the start date and end date  info to get any the data!...",
      };
    }

    let defect = [];

    /// apply condition to get data  as per pass with the api
    if (startDate && endDate) {
      [defect] = await db.query(
        `SELECT * FROM defective where date BETWEEN ? AND  ?`,
        [startDate, endDate],
      );

      return {
        status: "ok",
        data: defect,
      };
    }
  } catch (error) {
    console.error("get_defect_Data_Service error:", error);
    return {
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    };
  }
};
