import { ORDER_MESSAGE } from "../constants/messages";
import reviewRepo from "../repositories/reviews.repo";
import userRepo from "../repositories/users.repo";

const writeReview = async (reqBody) => {
    try {
        const { userID } = reqBody 
        if (!await userRepo.findById(userID)) {
            throw new Error(ORDER_MESSAGE.NO_PERMISSION)
        }

        const { reviewer, order_detail, content, create_at, star } = reqBody || {}

        const newReview = { reviewer, order_detail, content, create_at, star }
        // const filter = ['reviewer', 'order_detail', 'content', 'create_at', 'star']
        // const newReview = {
        //     ...Object.fromEntries(
        //         Object.entries(reqBody).filter(([key]) => filter.includes(key))
        //     )
        // }
        return await reviewRepo.writeReview(newReview)
    } catch (error) {
        throw new Error(error.message)
    }
}

const getReview = async (id) => {
    try {
        return await reviewRepo.getReview(id)
    } catch (error) {
        throw new Error(error.message)
    }
}

const editReview = async (star, content, id) => {
    if (!await getReview(id)) {
        throw new Error(ORDER_MESSAGE.NOT_FOUND)
    }
    return await reviewRepo.editReview(star, content, id)
}

const deleteReview = async (userID, reviewID) => {
    if (await userRepo.findById(userID)) {
        throw new Error(ORDER_MESSAGE.NO_PERMISSION)
    }
    return await reviewRepo.deleteReview(reviewID)
}

export const reviewService = {
    getReview,
    editReview,
    writeReview,
    deleteReview
}