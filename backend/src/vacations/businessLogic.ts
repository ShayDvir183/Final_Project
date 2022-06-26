import { getConnection } from "../db";
import { getAllVacationsQuery, getCreateVacationQuery } from "./query";

export interface IVacation {
    id: number,
    description: string,
    destination: string,
    image: string,
    from_date: Date,
    to_date: Date,
    price: number,
    ammount_of_followers: number,
}


export async function getAllVacations() {
    const query: string = getAllVacationsQuery()
    const result = await getConnection().execute(query)
    return result[0];

}
export async function createVacation(vacation: IVacation) {
    const { description, destination, image, from_date, to_date, price, ammount_of_followers } = vacation;
    const query: string = getCreateVacationQuery()
    const result = await getConnection().execute(query, [description, destination, image, from_date, to_date, price, ammount_of_followers])
    return result[0];

}