import { db } from "../../db/dbConnect.js";

export const universal_delete_Service = async (filters) => {
  try {
    const sql = `
      DELETE FROM ${filters.table}
      WHERE id = ?
    `;
    const [result] = await db.query(sql, [filters.id]);
    return result;
  } catch (error) {
    console.error("Error in meta_data Service:", error);

    throw new Error(error.message);
  }
};
