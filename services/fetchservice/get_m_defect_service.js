import { db } from "../../db/dbConnect.js";

export const get_m_defect_service = async (query) => {
  try {
    let locoData = [];

    // apply condition to get data  as per pass with the api

    [locoData] = await db.query(`SELECT * FROM defect_categories `);

    return {
      status: "ok",
      data: locoData,
    };
  } catch (error) {
    console.error(" get_crew_Data_Service error:", error);
    return {
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    };
  }
};
