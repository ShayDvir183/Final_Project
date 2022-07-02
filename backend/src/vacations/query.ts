



const getAllVacationsQuery = () => {
    return 'SELECT * FROM vacations_app.vacations order by from_date '
}
const getCreateVacationQuery = () => {
    return 'INSERT INTO vacations_app.vacations (description, destination, image, from_date, to_date, price, ammount_of_followers) VALUES (?, ?, ?, ?, ?, ?, ?);'
}
const getFollowVacationQuery = () => {
    return 'INSERT INTO vacations_app.followed_vacations (vac_id, user_id, follow_status) VALUES (?, ?, ?);'
}
// need to complete check which vacation the user follow
const getIsFollowingQuery = () => {
    return 'SELECT * FROM vacations_app.followed_vacations where vac_id = ? order by created_at desc limit 1'
}
const getCheckFollowQuery = () => {
    return 'SELECT * FROM vacations_app.followed_vacations where user_id = ? and vac_id = ?'
}
const getUpdateFollowQuery = () => {
    return 'UPDATE vacations_app.followed_vacations SET follow_status = ? WHERE (id = ?);'
}
const getUpdateFollowersAmountQuery = () => {
    return 'UPDATE `vacations_app`.`vacations` SET `ammount_of_followers` = ? WHERE (`id` = ?);'

}
const getAmountOfFollowersQueryFollowedVacations = () => {
    return 'Select count(*) as AmountOfFollowers, vac_id from followed_vacations where follow_status = "follow"  group by vac_id'

}
const getUpdateAmountOfFollowersQuery = () => {
    return 'UPDATE `vacations_app`.`vacations` SET `ammount_of_followers` = ? WHERE (`id` = ?);'
}

const getAmountOfFollowersQuery = () => {
    return 'SELECT id,ammount_of_followers FROM vacations_app.vacations;'
}

const getDeleteVacationQuery = () => {
    return 'DELETE FROM `vacations_app`.`vacations` WHERE (`id` = ?);'
}


export { getAllVacationsQuery, getAmountOfFollowersQuery, getCreateVacationQuery, getFollowVacationQuery, getUpdateAmountOfFollowersQuery, getAmountOfFollowersQueryFollowedVacations, getIsFollowingQuery, getCheckFollowQuery, getUpdateFollowersAmountQuery, getUpdateFollowQuery, getDeleteVacationQuery }