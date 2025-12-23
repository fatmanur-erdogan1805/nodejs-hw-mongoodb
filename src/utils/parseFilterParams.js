const parseContactType = (type) => {
  if (typeof type !== 'string') return;

  if (['friend', 'family', 'work'].includes(type)) return type;
};

const parseIsFavourite = (isFavourite) => {
  if (typeof isFavourite !== 'string') return;

  const lowerCased = isFavourite.toLowerCase();
  if (lowerCased === 'true') return true;
  if (lowerCased === 'false') return false;
};

export const parseFilterParams = ({ type, isFavourite }) => {
  return {
    contactType: parseContactType(type),
    isFavourite: parseIsFavourite(isFavourite),
  };
};
