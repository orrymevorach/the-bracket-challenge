import Cookies from 'js-cookie';

export const removeDupes = data => {
  let set = [...new Set(data)]; // Sets remove dupes
  return Array.from(set);
};

export const split = data => {
  const half = Math.ceil(data.length / 2);
  return [data.slice(0, half), data.slice(half)];
};

export const getUid = () => Cookies.get('uid');

export const camelToSnakeCase = str =>
  str.replace(/[A-Z]/g, letter => `_${letter}`).toUpperCase();

export const isEmpty = object => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};
