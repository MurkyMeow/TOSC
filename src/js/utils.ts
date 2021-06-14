const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export const genToken = (length: number): string => {
  const result = [];
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++)
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  return result.join('');
};
