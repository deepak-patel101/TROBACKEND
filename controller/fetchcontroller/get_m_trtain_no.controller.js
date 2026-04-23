import { get_m_train_service } from "../../services/fetchservice/get_m_train_service.js";

export const get_m_train_no_controller = async (req, res) => {
  console.log("hitting get api");
  try {
    const { zone } = req.query;
    const filters = { zone };

    const crew = await get_m_train_service(filters);
    return res.status(crew.status === "ok" ? 200 : 500).json(crew);
  } catch (error) {
    console.error("Error fetching crew Data Service:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
