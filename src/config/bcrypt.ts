import * as bcrypt from 'bcrypt';

export const bcryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  const result = await bcrypt.hash(password, salt);

  return result;
};

export const bcryptCompare = async (
  password: string,
  userPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, userPassword);
};
