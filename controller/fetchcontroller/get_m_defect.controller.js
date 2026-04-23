import { get_m_defect_service } from "../../services/fetchservice/get_m_defect_service.js";

export const get_m_defect_controller = async (req, res) => {
  console.log("hitting get api");
  try {
    const locoData = await get_m_defect_service();
    return res.status(locoData.status === "ok" ? 200 : 500).json(locoData);
  } catch (error) {
    console.error("Error fetching defect Data Service:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
