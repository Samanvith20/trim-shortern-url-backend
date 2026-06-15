import { Request, Response } from "express";
import { createUrlSchema } from "../validators/url.validator.js";
import {
  createShortUrl,
  getOriginalUrl,
  getUrls,
} from "../services/url.service.js";

export const createUrl = async (req: Request, res: Response) => {
  try {
    const validatedData = createUrlSchema.parse(req.body);

    const data = await createShortUrl(validatedData.url);

    return res.status(201).json({
      success: true,
      data: {
        ...data,
        shortUrl: `${req.protocol}://${req.get("host")}/${data.code}`,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};

export const redirectToUrl = async (req: Request, res: Response) => {
  const { code } = req.params;

  const originalUrl = await getOriginalUrl(
    code,
    req.headers["user-agent"] || "unknown",
    req.get("referer") || "direct",
  );

  if (!originalUrl) {
    return res.status(404).json({
      success: false,
      message: "URL not found",
    });
  }

  return res.redirect(302, originalUrl);
};

export const getAllUrls = async (req: Request, res: Response) => {
  const urls = await getUrls();

  return res.status(200).json({
    success: true,
    data: urls,
  });
};
