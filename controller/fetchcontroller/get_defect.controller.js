import { get_defect_service } from "../../services/fetchservice/get_defect_service.js";

export const get_defect_controller = async (req, res) => {
  try {
    const dates = req.query;
    const filters = dates;
    console.log("hitting get api", dates);

    const defect = await get_defect_service(filters);
    return res.status(defect.status === "ok" ? 200 : 500).json(defect);
  } catch (error) {
    console.error("Error fetching defect Data Service:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
