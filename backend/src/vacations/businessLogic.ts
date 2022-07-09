import { getConnection } from "../db";
import { getAllVacationsQuery, getAmountOfFollowersQuery, getAmountOfFollowersQueryFollowedVacations, getCheckFollowQuery, getCreateVacationQuery, getFollowVacationQuery, getUpdateFollowQuery, getUpdateFollowersAmountQuery, getDeleteVacationQuery, getUpdateVacationQuery } from "./query";
import axios from "axios";
const { access_key } = process.env



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
    const { description, destination, image, from_date, to_date, price } = vacation;
    console.log(from_date)
    const res = await getVacImageAddress(image)

    const query: string = getCreateVacationQuery()
    const result = await getConnection().execute(query, [description, destination, res, from_date, to_date, price])

    return result[0];

}
export async function editVacation(vacation: IVacation) {
    let { description, destination, image, from_date, to_date, price,id,ammount_of_followers } = vacation;
    if(!image.includes("https://images.unsplash.com/")){
    image = await getVacImageAddress(image)
    }
    const query: string = getUpdateVacationQuery()
    console.log({ description, destination, image, from_date, to_date, price,id })
    const result = await getConnection().execute(query, [description, destination, image, from_date, to_date, price,id])

    return result[0];

}
export async function followVacation(vacationId: number, userId: number, isFollowed: boolean) {
    const isFollowedBefore = await checkIfFollowedAlready(userId, vacationId)
    const followersAmount = getAmountOfFollowersQuery()
    const followersAmountRes = await getConnection().query(followersAmount)
    const amount = followersAmountRes[0]
    if (isFollowed) {
        const query = getUpdateFollowersAmountQuery()
        const selectedVacation = amount.find((vac: any) => {
            return vac.id === vacationId
        })
        const newAmount = selectedVacation.ammount_of_followers + 1
        const result = await getConnection().execute(query, [newAmount, vacationId])
    } else {
        const query = getUpdateFollowersAmountQuery()
        const selectedVacation = amount.find((vac: any) => {
            return vac.id === vacationId
        })
        const newAmount = selectedVacation.ammount_of_followers - 1
        const result = await getConnection().execute(query, [newAmount, vacationId])
        console.log(result)
    }

    if (isFollowedBefore.length > 0) {
        const vac = isFollowedBefore[0]
        const query: string = getUpdateFollowQuery()
        const result = await getConnection().execute(query, [isFollowed ? "follow" : "unfollow", vac.id])
        return result[0]
    } else {
        const query: string = getFollowVacationQuery()
        const updateFollowersQuery = getAmountOfFollowersQueryFollowedVacations()
        const result = await getConnection().execute(query, [vacationId, userId, isFollowed ? "follow" : "unfollow"])
        return result[0];
    }
}
export async function getVacImageAddress(query: string) {
    if (!query) return null
    try {
        const result = await axios.get(`https://api.unsplash.com/search/photos?query=${query}&client_id=${access_key}`)
        if (result.data.total === 0) {
            return "https://www.researchgate.net/profile/Ahmed-Mohmed-2/post/Why_do_we_need_a_vacation_How_often_do_you_need_a_vacationWhat_are_the_benefits_of_vacationsDo_vacations_make_you_happier/attachment/5e079b76cfe4a777d4fedc26/AS%3A841148566339584%401577556854285/image/vacation-final.jpg"
        }
        return result.data.results[0].urls.small
    } catch (error: any) {

    }


}

async function checkIfFollowedAlready(userId: number, vacationId: number) {
    const query: string = getCheckFollowQuery()
    const result = await getConnection().execute(query, [userId, vacationId])
    console.log(result[0])
    return result[0]
}
export async function deleteVacation(id: number) {
    const query: string = getDeleteVacationQuery()
    const result = await getConnection().execute(query, [id])
    return result[0];

}