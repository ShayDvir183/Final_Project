import { getConnection } from "../db";
import { getChartDataQuery } from "./query";


export async function getChartData(){
    const query:string = getChartDataQuery()
    const result = await getConnection().query(query)
    return result[0]
}