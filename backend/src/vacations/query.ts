



const getAllVacationsQuery = () => {
    return `SELECT * FROM vacations_app.vacations order by created_at DESC`
}


export { getAllVacationsQuery }