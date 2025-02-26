import { ObjectId } from 'mongodb'
import databaseServices from '../../services/database.services.js'

const getUserProfile = async (userId) => {
    try {
        return databaseServices.users.findOne({ _id: new ObjectId(userId) })
    } catch (error) { throw new Error(error) }
}
export const userModel = {
    getUserProfile
}