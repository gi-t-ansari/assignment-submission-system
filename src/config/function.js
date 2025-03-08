export const getShortName = (name) => {
  const parts = name.trim().split(" ");

  if (parts.length === 2) {
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  } else {
    return parts[0].slice(0, 2).toUpperCase();
  }
};
