import { db } from "../../db/dbConnect.js";

export const get_m_train_service = async (query) => {
  try {
    const { zone } = query;

    // Validate inputs
    if (!zone) {
      return {
        status: "error",
        message: "Please provide the zone info to get any the data!...",
      };
    }

    let train_no = [];

    /// apply condition to get data  as per pass with the api
    if (zone) {
      [train_no] = await db.query(`SELECT * FROM m_train_no where zone = ?`, [
        zone,
      ]);

      return {
        status: "ok",
        data: train_no,
      };
    }
  } catch (error) {
    console.error("get_train_no_Data_Service error:", error);
    return {
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    };
  }
};
