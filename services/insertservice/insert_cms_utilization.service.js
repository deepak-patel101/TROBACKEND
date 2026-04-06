
import { db } from "../../db/dbConnect.js";

export const PostCmsUtilizationService = async (CmsUtilization) => {
  try {
    
   const columns = ["ut_month", "ut_year", "ut_lobby", "ut_no_of_crew", "ut_designation", "ut_running_duty_hrs", "ut_non_running_duty_hrs",
     "ut_total_duty_hrs_fght", "ut_total_duty_hrs","ut_leave_days", "ut_sick_leave_days", "ut_absent_days",
         "ut_stationary_duty_day", "ut_test_and_training_days", "ut_other_non_leave_days", "ut_no_of_trips"];
        
        
      

 const values = CmsUtilization.map(entry => {
     
      const row = columns.map(col => entry[col] ?? null);
      return `(${row.map(val => db.escape(val)).join(", ")})`;
    }).join(", ");




    const query = `INSERT INTO t_cms_utilization (${columns.join(", ")}) VALUES ${values}`;
    const [result] = await db.execute(query);
    return result;
  } catch (error) { 
    throw new Error("Database error: " + error.message);

    
  }
};






 