const getDisplayName = (name: string): string => {
  return name[0].toUpperCase() + name.toLowerCase().slice(1);
};

const getInitials = (name: string): string => {
  return name[0].toUpperCase();
};

export const stringUtils = {
  getDisplayName: getDisplayName,
  getInitials: getInitials,
};
