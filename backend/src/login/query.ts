


const getUsersQuery = () => {
    return 'SELECT * FROM `vacations-app`.users'
}

const getCreateUserQuery = () => {
    return 'INSERT INTO `vacations-app`.`users` (`first_name`, `last_name`,`email`, `user_name`, `password`) VALUES (?,?, ?,?, ?);'
}














export { getUsersQuery, getCreateUserQuery }