 import { db } from "../../db/dbConnect.js";

export const PostCsmPDDService = async (CsmPDD) => {
  try {  
    const columns = [
        "PDD_MONTH", "PDD_YEAR", "PDD_ZONE", "PDD_DIVISON", "PDD_LOBBY", "TOTAL_CASES","PDD_LOBBY_NAME", "LESS_THEN_EQUAL_TO_THIRTY_MIN", "MORE_THEN_THIRTY_MIN_LESS_THAN_ONE_HOUR",
        "MORE_THEN_ONE_HOUR_LESS_THEN_TWO_HOUR", "MORE_THEN_TWO_HOUR_LESS_THEN_THREE_HOUR", "MORE_THEN_THREE_HOURS"

    ];

    const values = CsmPDD.map(entry => {
     
      const row = columns.map(col => entry[col] ?? null);
      return `(${row.map(val => db.escape(val)).join(", ")})`;
    }).join(", ");

    const query = `INSERT INTO t_cms_pdd (${columns.join(", ")}) VALUES ${values}`;
    //  console.log("Executing query:", query);
    const [result] = await db.execute(query);
    return result;
  } catch (error) { 
    throw new Error("Database error: " + error.message);
  }
};


