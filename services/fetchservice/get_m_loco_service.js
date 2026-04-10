import { db } from "../../db/dbConnect.js";

export const get_m_loco_service = async (query) => {
  try {
    const { railway } = query;

    // Validate inputs
    if (!railway) {
      return {
        status: "error",
        message: "Please provide the date to get any the data!...",
      };
    }

    let locoData = [];

    /// apply condition to get data  as per pass with the api
    if (railway) {
      [locoData] = await db.query(`SELECT * FROM M_Loco where Railway = ?`, [
        railway,
      ]);

      return {
        status: "ok",
        data: locoData,
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
