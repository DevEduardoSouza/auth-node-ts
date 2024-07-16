export const randomCode = (length: number = 5): string => {
  let code = "";

  for (let i = 0; i < length; i++) {
    let number = Math.floor(Math.random() * length);
    code += number;
  }

  return code;
};
