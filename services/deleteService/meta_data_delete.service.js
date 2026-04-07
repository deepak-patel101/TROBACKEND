import { db } from "../../db/dbConnect.js";

export const delete_Meta_Data_Service = async (ID) => {
  try {
    const sql = `
      DELETE FROM meta_data
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [ID]);
    return result;
  } catch (error) {
    console.error("Error in meta_data Service:", error);

    throw new Error(error.message);
  }
};
