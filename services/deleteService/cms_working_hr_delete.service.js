
import { db } from '../../db/dbConnect.js';

export const delete_working_hrService = async (ID) => {
  try {
    const sql = `
      DELETE FROM t_cms_working_hours
      WHERE ID = ?
    `;
    const [result] = await db.query(sql, [ID]);
    return result;
  } catch (error) {
    console.error("Error in delete_working_hr Service:", error);
    
    throw new Error(error.message);
  }
};

