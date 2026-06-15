import Url from "../models/url.model.js";
import Click from "../models/click.model.js";

export const getAnalytics = async (code: string) => {
  const url = await Url.findOne({ code });

  if (!url) {
    return null;
  }

  const dailyClicks = await Click.aggregate([
    {
      $match: {
        linkId: url._id,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$timestamp",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const deviceBreakdown = await Click.aggregate([
    {
      $match: {
        linkId: url._id,
      },
    },
    {
      $group: {
        _id: "$device",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  return {
    totalClicks: url.clickCount,
    dailyClicks,
    deviceBreakdown,
  };
};
