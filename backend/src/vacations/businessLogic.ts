import { getConnection } from "../db";
import { getAllVacationsQuery } from "./query";




export async function getAllVacations() {
    const query: string = getAllVacationsQuery()
    const result = await getConnection().execute(query)
    return result[0];

}