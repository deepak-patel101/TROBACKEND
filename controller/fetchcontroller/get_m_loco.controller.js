import { get_m_loco_service } from "../../services/fetchservice/get_m_loco_service.js";

export const get_m_loco_controller = async (req, res) => {
  console.log("hitting get api");
  try {
    const { railway } = req.query;
    const filters = { railway };

    const locoData = await get_m_loco_service(filters);
    return res.status(locoData.status === "ok" ? 200 : 500).json(locoData);
  } catch (error) {
    console.error("Error fetching loco Data Service:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
