import { delete_Meta_Data_Service } from "../../services/deleteService/meta_data_delete.service.js";

export const delete_Meta_Data_Controller = async (req, res) => {
  console.log(req.query);
  try {
    const ID = req.query.id;
    if (!ID) {
      return res.status(400).json({ message: " ID is required" });
    }
    const result = await delete_Meta_Data_Service(ID);
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No data found with the given ID" });
    }

    res.status(200).json({
      message: "  Data deleted successfully",
      deletedStationId: ID,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
