import { get_Meta_Data_Service } from "../../services/fetchservice/tro_Meta_Data.service.js";

export const get_tro_Meta_data_controller = async (req, res) => {
  console.log("hitting get api");
  try {
    const { date } = req.query;
    const filters = { date };

    const metaData = await get_Meta_Data_Service(filters);
    return res.status(metaData.status === "ok" ? 200 : 500).json(metaData);
  } catch (error) {
    console.error("Error fetching Meta Data Service:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
