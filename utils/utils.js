export const removeDupes = data => {
  let set = [...new Set(data)]; // Sets remove dupes
  return Array.from(set);
};
