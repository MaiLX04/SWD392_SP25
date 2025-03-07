import databaseServices from "../services/database.services"

const getBlindboxInfo = async (blindbox_id) => {
    try {

    } catch (error) { throw new Error(error) }
    databaseServices.blind_boxes.findOne({_id: new ObjectId(blindbox_id)});
}

export const blindboxModel = {
    getBlindboxInfo
}