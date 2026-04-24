import { db } from "../../db/dbConnect.js";
export const get_defect_service = async (dates) => {
  try {
    const { startDate, endDate } = dates;

    if (!startDate && !endDate) {
      return {
        status: "error",
        message: "Please provide the start date and end date!",
      };
    }

    let defect = [];

    if (startDate && endDate) {
      [defect] = await db.query(
        `SELECT id, date, train_no, loco_no, lp_name, alp_name, hq, shed, engine_schedule, station, time, defect_categories, defect_details, tlc_remark FROM defective WHERE date BETWEEN ? AND ?`,
        [startDate, endDate],
      );

      // Format dates here
      const formattedData = defect.map((item) => ({
        ...item,
        date: item.date ? item.date.toISOString().split("T")[0] : null,
        engine_schedule: item.engine_schedule
          ? item.engine_schedule.toISOString().split("T")[0]
          : null,
      }));

      return {
        status: "ok",
        data: formattedData,
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
