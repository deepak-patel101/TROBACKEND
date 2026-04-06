import { db } from "../../db/dbConnect.js";

export const get_Cms_Working_Hr_Service = async (query) => {
  try {
    const { cms_month, cms_year } = query;

    // Validate inputs
    if (!cms_month && !cms_year) {
      return {
        status: "error",
        message: "Please provide at least cms_month or cms_year in query parameters.",
      };
    }

    let currentData = [];
    let previousData = [];

    const currentYear = new Date().getFullYear();

    // Determine which year to use as base
    // If cms_year is provided, use it; otherwise default to currentYear
    const baseYear = cms_year ? Number(cms_year) : currentYear;

    //  Month only (defaults to current year + previous year)
    if (cms_month && !cms_year) {
      [currentData] = await db.query(
        `SELECT * FROM t_cms_working_hours WHERE cms_month = ? AND cms_year = ?`,
        [cms_month, baseYear]
      );

      [previousData] = await db.query(
        `SELECT * FROM t_cms_working_hours WHERE cms_month = ? AND cms_year = ?`,
        [cms_month, baseYear - 1]
      );

      return {
        status: "ok",
        // mode: "month_only",
        cms_month,
        current_year: baseYear,
        previous_year: baseYear - 1,
        current_data: currentData,
        previous_data: previousData,
      };
    }

    //  Month + Year provided (use given year and its previous year)
    if (cms_month && cms_year) {
      [currentData] = await db.query(
        `SELECT * FROM t_cms_working_hours WHERE cms_month = ? AND cms_year = ?`,
        [cms_month, baseYear]
      );

      [previousData] = await db.query(
        `SELECT * FROM t_cms_working_hours WHERE cms_month = ? AND cms_year = ?`,
        [cms_month, baseYear - 1]
      );

      return {
        status: "ok",
        // mode: "month_and_year",
        cms_month,
        current_year: baseYear,
        previous_year: baseYear - 1,
        current_data: currentData,
        previous_data: previousData,
      };
    }

    // Year only (fetch all months for that year and previous year)
    if (!cms_month && cms_year) {
      [currentData] = await db.query(
        `SELECT * FROM t_cms_working_hours WHERE cms_year = ?`,
        [baseYear]
      );

      [previousData] = await db.query(
        `SELECT * FROM t_cms_working_hours WHERE cms_year = ?`,
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
    console.error(" get_Cms_Working_Hr_Service error:", error);
    return {
      status: "error",
      message: "Internal Server Error",
      details: error.message,
    };
  }
};
