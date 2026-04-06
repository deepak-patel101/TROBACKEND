import { db } from "../../db/dbConnect.js";

export const insert_Meta_Data_service = async (metData) => {
  console.log(metData);
  try {
    const columns = [`office`, `staff`, `date`, `shift`, `inserted_by`];

    const values = metData
      .map((entry) => {
        const row = columns.map((col) => entry[col] ?? null);
        return `(${row.map((val) => db.escape(val)).join(", ")})`;
      })
      .join(", ");

    const query = `INSERT INTO meta_data (${columns.join(", ")}) VALUES ${values}`;
    const [result] = await db.execute(query);
    return result;
  } catch (error) {
    throw new Error("Database error: " + error.message);
  }
};
