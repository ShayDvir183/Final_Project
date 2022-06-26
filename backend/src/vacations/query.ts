



const getAllVacationsQuery = () => {
    return 'SELECT * FROM vacations_app.vacations order by created_at DESC'
}
const getCreateVacationQuery = () => {
    return 'INSERT INTO vacations_app.vacations (description, destination, image, from_date, to_date, price, ammount_of_followers) VALUES (?, ?, ?, ?, ?, ?, ?);'
}

export { getAllVacationsQuery, getCreateVacationQuery }