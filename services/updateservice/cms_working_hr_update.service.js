

import { db } from '../../db/dbConnect.js';


export const UpdateCmsWorkingHrService = async (data) => {
  try {
    const { ID, ...fieldsToUpdate } = data;

    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(fieldsToUpdate))
       {
      if (value !== undefined && value !== null) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
// console.log("Fields to update:", fields); for debugging gg 
    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    values.push(ID); // WHERE clause value

    const sql = `UPDATE t_cms_working_hours SET ${fields.join(", ")} WHERE ID = ?`;

    const [result] = await db.query(sql, values);
    return result;

  } catch (error) {
    console.error("Error in Service:", error);
    throw new Error(error.message);
  }
};


