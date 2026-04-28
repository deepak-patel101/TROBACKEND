import { universal_delete_Service } from "../../services/deleteService/universal_delete.service.js";

export const universal_Delete_controller = async (req, res) => {
  try {
    const filters = req.query;
    if (!filters) {
      return res
        .status(400)
        .json({ message: " ID and table name is required" });
    }
    const result = await universal_delete_Service(filters);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No data found with the given ID" });
    }

    res.status(200).json({
      message: "  Data deleted successfully",
      deletedStationId: filters.id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
