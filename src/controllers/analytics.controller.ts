import { Request, Response } from "express";
import { getAnalytics } from "../services/analytics.service.js";

export const getUrlAnalytics = async (req: Request, res: Response) => {
  const analytics = await getAnalytics(req.params.code);

  if (!analytics) {
    return res.status(404).json({
      success: false,
      message: "URL not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: analytics,
  });
};
