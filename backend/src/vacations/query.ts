



const getAllVacationsQuery = ():string => {
    return 'SELECT * FROM vacations_app.vacations order by from_date '
}
const getCreateVacationQuery = ():string => {
    return 'INSERT INTO vacations_app.vacations (description, destination, image, from_date, to_date, price) VALUES (?, ?, ?, ?, ?, ?);'
}
const getUpdateVacationQuery = ():string => {
    return 'UPDATE `vacations_app`.`vacations` SET `description` = ?, `destination` = ?, `image` = ?, `from_date` = ?, `to_date` = ?, `price` = ? WHERE (`id` = ?);'
}
const getFollowVacationQuery = ():string => {
    return 'INSERT INTO vacations_app.followed_vacations (vac_id, user_id, follow_status) VALUES (?, ?, ?);'
}
const getIsFollowingQuery = ():string => {
    return 'SELECT * FROM vacations_app.followed_vacations where vac_id = ? order by created_at desc limit 1'
}
const getCheckFollowQuery = ():string => {
    return 'SELECT * FROM vacations_app.followed_vacations where user_id = ? and vac_id = ?'
}
const getUpdateFollowQuery = ():string => {
    return 'UPDATE vacations_app.followed_vacations SET follow_status = ? WHERE (id = ?);'
}
const getUpdateFollowersAmountQuery = ():string => {
    return 'UPDATE `vacations_app`.`vacations` SET `ammount_of_followers` = ? WHERE (`id` = ?);'

}
const getAmountOfFollowersQueryFollowedVacations = ():string => {
    return 'Select count(*) as AmountOfFollowers, vac_id from followed_vacations where follow_status = "follow"  group by vac_id'

}
const getUpdateAmountOfFollowersQuery = ():string => {
    return 'UPDATE `vacations_app`.`vacations` SET `ammount_of_followers` = ? WHERE (`id` = ?);'
}

const getAmountOfFollowersQuery = ():string => {
    return 'SELECT id,ammount_of_followers FROM vacations_app.vacations;'
}

const getDeleteVacationQuery = ():string => {
    return 'DELETE FROM `vacations_app`.`vacations` WHERE (`id` = ?);'
}
const getIdsQuery = ():string => {
    return 'SELECT vac_id FROM vacations_app.followed_vacations where user_id = ? and follow_status = "follow";'
}
const getChartDataQuery = ():string => {
    return 'SELECT destination,ammount_of_followers FROM vacations_app.vacations where ammount_of_followers != 0;'
}


export { getAllVacationsQuery,getIdsQuery,getChartDataQuery, getUpdateVacationQuery, getAmountOfFollowersQuery, getCreateVacationQuery, getFollowVacationQuery, getUpdateAmountOfFollowersQuery, getAmountOfFollowersQueryFollowedVacations, getIsFollowingQuery, getCheckFollowQuery, getUpdateFollowersAmountQuery, getUpdateFollowQuery, getDeleteVacationQuery }