import { db } from "../../db/dbConnect.js";

export const insert_Loco_Data_service = async (loco) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    let insertedCount = 0;
    let updatedCount = 0;

    // =====================
    //  SPLIT DATA
    // =====================
    const insertData = loco.filter((d) => !d.id);
    const updateData = loco.filter((d) => d.id);

    // =====================
    //  INSERT PART
    // =====================
    if (insertData.length) {
      const columns = [
        "Railway",
        "Base_Shed",
        "Loco_No",
        "Type_of_Loco",
        "doc",
        "Tr_Converter",
        "Gear_Ratio",
        "Microprocessor_Relay",
        "ARNO_SIV",
        "AC_Cab",
        "AC_provided_in_POH_by",
        "POH_date",
        "Hotel_Load",
        "TFP_Winding",
        "CVVRs",
        "HRPT_Nos",
        "WC",
        "DPWCS",
        "RTIS",
        "EOTT",
        "TPWS",
        "Push_Pull",
        "WFL",
        "TCAS",
        "Other",
        "inserted_by",
      ];

      const values = insertData
        .map((entry) => {
          const row = columns.map((col) => entry[col] ?? null);
          return `(${row.map((val) => connection.escape(val)).join(", ")})`;
        })
        .join(", ");

      const insertQuery = `
        INSERT INTO M_loco (${columns.join(", ")})
        VALUES ${values}
      `;

      const [insertResult] = await connection.execute(insertQuery);
      insertedCount = insertResult.affectedRows;
    }

    // =====================
    //  UPDATE PART (SMART)
    // =====================
    const allowedColumns = [
      "Railway",
      "Base_Shed",
      "Loco_No",
      "Type_of_Loco",
      "doc",
      "Tr_Converter",
      "Gear_Ratio",
      "Microprocessor_Relay",
      "ARNO_SIV",
      "AC_Cab",
      "AC_provided_in_POH_by",
      "POH_date",
      "Hotel_Load",
      "TFP_Winding",
      "CVVRs",
      "HRPT_Nos",
      "WC",
      "DPWCS",
      "RTIS",
      "EOTT",
      "TPWS",
      "Push_Pull",
      "WFL",
      "TCAS",
      "Other",
      "inserted_by",
    ];

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
        UPDATE M_loco
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
