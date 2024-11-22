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

export function isEven(number) {
  return number % 2 === 0;
}

export function validateEmail(email) {
  if (
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return true;
  }
  return false;
}

export function toCamelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function removeUnderscore(key) {
  return key.replace(/_/g, '');
}
