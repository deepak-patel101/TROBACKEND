import { db } from "../../db/dbConnect.js";

export const get_m_crew_service = async (query) => {
  try {
    const { zone } = query;

    // Validate inputs
    if (!zone) {
      return {
        status: "error",
        message: "Please provide the zone info to get any the data!...",
      };
    }

    let crew = [];

    /// apply condition to get data  as per pass with the api
    if (zone) {
      [crew] = await db.query(`SELECT * FROM m_crew where zone = ?`, [zone]);

      return {
        status: "ok",
        data: crew,
      };
    }
  } catch (error) {
    console.error("get_crew_Data_Service error:", error);
    return {
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    };
  }
};
