import bcrypt from 'bcrypt';

const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  const encryptedPass = bcrypt.hashSync(password, salt);

  return encryptedPass;
};

const validPassword = (user, password) => {
  const response = bcrypt.compareSync(password, user.pass);
  return response;
};

export {hashPassword, validPassword};
