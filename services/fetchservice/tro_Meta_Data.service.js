import { db } from "../../db/dbConnect.js";

export const get_Meta_Data_Service = async (query) => {
  try {
    const { date } = query;

    // Validate inputs
    if (!date) {
      return {
        status: "error",
        message: "Please provide the date to get any the data!...",
      };
    }

    let metaData = [];

    /// apply condition to get data  as per pass with the api
    if (date) {
      [metaData] = await db.query(`SELECT * FROM meta_data where date = ?`, [
        date,
      ]);

      //   [currentData] = await db.query(
      //     `SELECT * FROM t_cms_working_hours WHERE cms_month = ? AND cms_year = ?`,
      //     [cms_month, baseYear],
      //   );

      //   [previousData] = await db.query(
      //     `SELECT * FROM t_cms_working_hours WHERE cms_month = ? AND cms_year = ?`,
      //     [cms_month, baseYear - 1],
      //   );

      return {
        status: "ok",
        // mode: "month_only",
        data: metaData,
      };
    }
  } catch (error) {
    console.error(" get_Meta_Data_Service error:", error);
    return {
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    };
  }
};
