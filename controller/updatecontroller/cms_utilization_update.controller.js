import { UpdateCmsUtilizationService } from "../../services/updateservice/cms_utilization_update.service.js";

export const UpdateCmsUtilizationController = async (req, res) => {
  try {
    const CmsUtilization = Array.isArray(req.body) ? req.body : [req.body];
    const results = [];
    const notFound = [];

    for (const item of CmsUtilization) {
      const { ID, ...fields } = item;

      if (!ID) {
        // Continue to next item if ID is missing
        notFound.push({ error: "Missing cms Utilization", item });
        continue;

      }
      // for pushing  code in

      
      try {
        const result = await UpdateCmsUtilizationService({ ID, ...fields });

        if (result.affectedRows === 0) {
          notFound.push({ ID, updated: false });
        } else {
          results.push({ ID, updated: true });
        }
      } catch (err) {
        // Capture individual failure but continue
        notFound.push({ ID, error: err.message });
      }
    }

    if (results.length > 0) {
      res.status(200).json({
        status: "ok",
        message: `Total ${results.length} record(s) updated successfully.`,
        updated: results,
        not_updated: notFound,
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "No records were updated.",
        not_updated: notFound,
      });
    }

  } catch (error) {
    console.error("Error in Controller:", error);
    res.status(500).json({ message: error.message });
  }
};
