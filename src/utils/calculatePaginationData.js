export const calculatePaginationData = ({ total, page, perPage }) => {
  const totalPages = Math.ceil(total / perPage);

  return {
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};