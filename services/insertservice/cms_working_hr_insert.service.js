 import { db } from "../../db/dbConnect.js";

export const PostCmsWorkingHrService = async (CmsWorkingHr) => {
  try {
    const columns = [
     "month", "year", "wh_lobby", "wh_less_than_equals_4hr", "wh_4_to_6_hr", "wh_6_to_8_hr", "wh_8_to_9_hr", "wh_9_to10_hr",
 "wh_10_to_11_hr", "wh_11_to_12_hr", "wh_12_to_14_hr", "wh_more_than_14hr", "wh_total"

    ];

    const values = CmsWorkingHr.map(entry => {
     
      const row = columns.map(col => entry[col] ?? null);
      return `(${row.map(val => db.escape(val)).join(", ")})`;



      
    }).join(", ");

    const query = `INSERT INTO t_cms_working_hours (${columns.join(", ")}) VALUES ${values}`;
    //  console.log("Executing query:", query);
    const [result] = await db.execute(query);
    return result;
  } catch (error) { 
    throw new Error("Database error: " + error.message);
  }
};


