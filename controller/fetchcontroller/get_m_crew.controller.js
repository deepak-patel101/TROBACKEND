import { get_m_crew_service } from "../../services/fetchservice/get_m_crew_service.js";

export const get_m_crew_controller = async (req, res) => {
  console.log("hitting get api");
  try {
    const { zone } = req.query;
    const filters = { zone };

    const crew = await get_m_crew_service(filters);
    return res.status(crew.status === "ok" ? 200 : 500).json(crew);
  } catch (error) {
    console.error("Error fetching crew Data Service:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
