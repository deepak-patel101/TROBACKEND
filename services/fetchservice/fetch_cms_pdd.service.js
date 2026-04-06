import { db } from "../../db/dbConnect.js";

export const get_Cms_pdd_Service = async (query) => {
  try {
    const { PDD_MONTH, PDD_YEAR } = query;

    // Validate inputs
    if (!PDD_MONTH && !PDD_YEAR) {
      return {
        status: "error",
        message: "Please provide at least PDD_MONTH or PDD_YEAR in query parameters.",
      };
    }

    let currentData = [];
    let previousData = [];

    const currentYear = new Date().getFullYear();

    // Determine which year to use as base
    // If PDD_YEAR is provided, use it; otherwise default to currentYear
    const baseYear = PDD_YEAR ? Number(PDD_YEAR) : currentYear;

    //  Month only (defaults to current year + previous year)
    if (PDD_MONTH && !PDD_YEAR) {
      [currentData] = await db.query(
        `SELECT * FROM t_cms_pdd WHERE PDD_MONTH = ? AND PDD_YEAR = ?`,
        [PDD_MONTH, baseYear]
      );

      [previousData] = await db.query(
        `SELECT * FROM t_cms_pdd WHERE PDD_MONTH = ? AND PDD_YEAR = ?`,
        [PDD_MONTH, baseYear - 1]
      );

      return {
        status: "ok",
        // mode: "month_only",
        PDD_MONTH,
        current_year: baseYear,
        previous_year: baseYear - 1,
        current_data: currentData,
        previous_data: previousData,
      };
    }

    //  Month + Year provided (use given year and its previous year)
    if (PDD_MONTH && PDD_YEAR) {
      [currentData] = await db.query(
        `SELECT * FROM t_cms_pdd WHERE PDD_MONTH = ? AND PDD_YEAR = ?`,
        [PDD_MONTH, baseYear]
      );

      [previousData] = await db.query(
        `SELECT * FROM t_cms_pdd WHERE PDD_MONTH = ? AND PDD_YEAR = ?`,
        [PDD_MONTH, baseYear - 1]
      );

      return {
        status: "ok",
        // mode: "month_and_year",
        PDD_MONTH,
        current_year: baseYear,
        previous_year: baseYear - 1,
        current_data: currentData,
        previous_data: previousData,
      };
    }

    // Year only (fetch all months for that year and previous year)
    if (!PDD_MONTH && PDD_YEAR) {
      [currentData] = await db.query(
        `SELECT * FROM t_cms_pdd WHERE PDD_YEAR = ?`,
        [baseYear]
      );

      [previousData] = await db.query(
        `SELECT * FROM t_cms_pdd WHERE PDD_YEAR = ?`,
        [baseYear - 1]
      );

      return {
        status: "ok",
        // mode: "year_only",
        current_year: baseYear,
        previous_year: baseYear - 1,
        current_data: currentData,
        previous_data: previousData,
      };
    }

  } catch (error) {
    console.error(" get_Cms_pdd_Service error:", error);
    return {
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    };
  }
};
