import { db } from "../../db/dbConnect.js";

export const insert_Meta_Data_service = async (metaData) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    let insertedCount = 0;
    let updatedCount = 0;

    // 🔹 SPLIT DATA
    const insertData = metaData.filter((d) => !d.id);
    const updateData = metaData.filter((d) => d.id);

    // =====================
    // 🔹 INSERT PART
    // =====================
    if (insertData.length) {
      const columns = ["office", "staff", "date", "shift", "inserted_by"];

      const values = insertData
        .map((entry) => {
          const row = columns.map((col) => entry[col] ?? null);
          return `(${row.map((val) => connection.escape(val)).join(", ")})`;
        })
        .join(", ");

      const insertQuery = `
        INSERT INTO meta_data (${columns.join(", ")})
        VALUES ${values}
      `;

      const [insertResult] = await connection.execute(insertQuery);
      insertedCount = insertResult.affectedRows;
    }

    // =====================
    // 🔹 UPDATE PART
    // =====================
    for (const entry of updateData) {
      const updateQuery = `
        UPDATE meta_data
        SET 
          office = ?,
          staff = ?,
          date = ?,
          shift = ?,
          inserted_by = ?
        WHERE id = ?
      `;

      const [updateResult] = await connection.execute(updateQuery, [
        entry.office,
        entry.staff,
        entry.date,
        entry.shift,
        entry.inserted_by,
        entry.id,
      ]);

      if (updateResult.affectedRows > 0) {
        updatedCount++;
      }
    }

    await connection.commit();

    return {
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
