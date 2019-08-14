export const getAverageScore = (ratings: number[]) => {
  let rating = 0,
    total,
    obj;

  if (ratings.length === 0) return -1;

  ratings.forEach((review: any) => {
    obj = review.statistics;
    total =
      (obj.methodology +
        obj.organization +
        obj.preparation +
        obj.knowledge +
        obj.clarity) /
      5;
    rating += total;
  });

  return rating / ratings.length;
};
