import { get_defect_service } from "../../services/fetchservice/get_defect_service.js";

export const get_defect_controller = async (req, res) => {
  try {
    const dates = req.body;
    const filters = dates[0];
    console.log("hitting get api", filters);

    const defect = await get_defect_service(filters);
    return res.status(defect.status === "ok" ? 200 : 500).json(defect);
  } catch (error) {
    console.error("Error fetching defect Data Service:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
