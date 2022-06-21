

const getUsersQuery = () => {
    return 'SELECT * FROM vacations_app.users'
}

const getCreateUserQuery = () => {
    return 'INSERT INTO vacations_app.users (`first_name`, `last_name`,`email`, `user_name`, `password`) VALUES (?,?, ?,?, ?);'
}














export { getUsersQuery, getCreateUserQuery }