import Counter from "../models/counter.model.js";

export const getNextSequence = async (): Promise<number> => {
  let counter = await Counter.findById("url-counter");

  if (!counter) {
    counter = await Counter.create({
      _id: "url-counter",
      sequence: 1000,
    });

    return counter.sequence;
  }

  counter = await Counter.findOneAndUpdate(
    { _id: "url-counter" },
    {
      $inc: { sequence: 1 },
    },
    {
      returnDocument: "after",
    }
  );

  if (!counter) {
    throw new Error("Unable to generate sequence");
  }

  return counter.sequence;
};