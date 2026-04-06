
import { db } from "../../db/dbConnect.js";
 export const  fetch_cms_utilization_service = async ( filters) => {
    try {
        const sql = `select * from t_cms_utilization where ut_month =? OR ut_year = ? ;`;
        const [data] = await db.query(sql, [filters.ut_month,filters.ut_year]);


        
        
        return { status: "ok",  data,   };
    } catch (error) {
          console.error("Error in fetch_cms_utilization Service:", error);
         return { status: "error", message: error.message };
    }   }