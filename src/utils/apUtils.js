import _ from "lodash";

export const returnPaginationRange = (totalPage, page, limit, siblings) => {
  let totalPageNoInArray = 7 + siblings;
  if (totalPageNoInArray >= totalPage) {
    _.range(1, totalPage + 1);
  }
  let leftSiblingsIndex = Math.max(page - siblings, 1);
  let rightSiblingsIndex = Math.min(page + siblings, totalPage);

  let showLeftDots = leftSiblingsIndex >= 2;
  let showRightDots = rightSiblingsIndex < totalPage - 2;

  if (!showLeftDots && showRightDots) {
    let leftItemCount = 1 + 2 * siblings;
    let leftRange = _.range(1, leftItemCount + 1);
    return [...leftRange, " ...", totalPage];
  } else if (showLeftDots && !showRightDots) {
    let rightItemCount = 1 + 2 * siblings;
    let rightRange = _.range(totalPage - rightItemCount, totalPage + 1);
    console.log({ rightItemCount, totalPage, rightRange });
    return [1, "... ", ...rightRange];
  } else {
    let middleRange = _.range(leftSiblingsIndex, rightSiblingsIndex + 1);
    return [1, "... ", ...middleRange, " ...", totalPage];
  }
};
