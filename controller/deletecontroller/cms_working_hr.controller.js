import { delete_working_hrService } from "../../services/deleteService/cms_working_hr_delete.service.js";



 export const delete_working_hrController = async (req, res) => {
  try {
    const ID = req.params.id;
    if (!ID) {
      return res.status(400).json({ message: " ID is required" });
    }
    const result = await delete_working_hrService(ID);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No data found with the given ID" });
    }   

    res.status(200).json({
      message: "  Data deleted successfully",
      deletedStationId: ID,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};








