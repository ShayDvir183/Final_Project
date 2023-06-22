const getUsersQuery = (): string => {
  return "SELECT * FROM vacations_app.users";
};

const getCreateUserQuery = (): string => {
  return "INSERT INTO vacations_app.users (`first_name`, `last_name`,`email`, `user_name`, `password`) VALUES (?,?, ?,?, ?);";
};

export { getUsersQuery, getCreateUserQuery };
