import Url from "../models/url.model.js";
import { getNextSequence } from "./counter.service.js";
import { encodeBase62 } from "../utils/base62.js";
import Click from "../models/click.model.js";

type ShortUrlData = {
  urlId: number;
  code: string;
  originalUrl: string;
};
export const createShortUrl = async (originalUrl: string) => {
  const existingUrl = await Url.findOne({
    originalUrl,
  });

  if (existingUrl) {
    return {
      code: existingUrl.code,
      originalUrl: existingUrl.originalUrl,
    };
  }

  const sequence = await getNextSequence();

  const code = encodeBase62(sequence);

  const url = await Url.create({
    urlId: sequence,
    code,
    originalUrl,
  });

  return {
    code: url.code,
    originalUrl: url.originalUrl,
  };
};

export const getOriginalUrl = async (
  code: string,
  device = "unknown",
  referrer = "direct",
) => {
  const url = await Url.findOne({ code });

  if (!url) {
    return null;
  }

  await Click.create({
    linkId: url._id,
    device,
    referrer,
  });

  await Url.updateOne(
    { _id: url._id },
    {
      $inc: {
        clickCount: 1,
      },
    },
  );

  return url.originalUrl;
};

export const getUrls = async () => {
  return Url.find().sort({ createdAt: -1 }).lean();
};
