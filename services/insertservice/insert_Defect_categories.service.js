import { db } from "../../db/dbConnect.js";

export const insert_Defect_categories_Services = async (crew) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    let insertedCount = 0;
    let updatedCount = 0;

    // =====================
    //  SPLIT DATA
    // =====================
    const insertData = crew.filter((d) => !d.id);
    const updateData = crew.filter((d) => d.id);

    // =====================
    //  INSERT PART
    // =====================
    if (insertData.length) {
      const columns = ["defect"];

      const values = insertData
        .map((entry) => {
          const row = columns.map((col) => entry[col] ?? null);
          return `(${row.map((val) => connection.escape(val)).join(", ")})`;
        })
        .join(", ");

      const insertQuery = `
        INSERT INTO defect_categories (${columns.join(", ")})
        VALUES ${values}
      `;

      const [insertResult] = await connection.execute(insertQuery);
      insertedCount = insertResult.affectedRows;
    }

    const allowedColumns = ["defect"];

    for (const entry of updateData) {
      const updates = [];
      const values = [];

      for (const key of allowedColumns) {
        if (entry[key] !== undefined) {
          updates.push(`${key} = ?`);
          values.push(entry[key]);
        }
      }

      // Skip if nothing to update
      if (updates.length === 0) continue;

      const updateQuery = `
        UPDATE defect_categories
        SET ${updates.join(", ")}
        WHERE id = ?
      `;

      values.push(entry.id);

      const [updateResult] = await connection.execute(updateQuery, values);

      if (updateResult.affectedRows > 0) {
        updatedCount++;
      }
    }

    await connection.commit();

    return {
      success: true,
      insertedCount,
      updatedCount,
      total: insertedCount + updatedCount,
    };
  } catch (error) {
    await connection.rollback();
    throw new Error("Database error: " + error.message);
  } finally {
    connection.release();
  }
};
