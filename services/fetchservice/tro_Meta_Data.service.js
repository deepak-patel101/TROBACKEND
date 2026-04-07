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
    let result = [];

    /// apply condition to get data  as per pass with the api
    if (date) {
      [metaData] = await db.query(`SELECT * FROM meta_data where date = ?`, [
        date,
      ]);
      const uniqueShift = ["00-08", "08-16", "16-24"];
      const filterData = Object.values(
        metaData.reduce((acc, curr) => {
          const { shift, office, staff } = curr;

          // create shift group if not exists
          if (!acc[shift]) {
            acc[shift] = { shift, date };
          }

          // create office array if not exists
          if (!acc[shift][office]) {
            acc[shift][office] = [];
          }
          // push staff into that office
          acc[shift][office].push(staff);
          console.log(acc);
          return acc;
        }, {}),
      );

      return {
        status: "ok",
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
