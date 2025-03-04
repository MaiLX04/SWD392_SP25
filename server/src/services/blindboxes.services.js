import { ObjectId } from 'mongodb'; // Import ObjectId
import Blindbox from '../models/schemas/Blindboxes.schema.js';
import databaseServices from './database.services.js';
import BlindBox from '../models/schemas/Blindboxes.schema.js';

// const createBlindBox = async (payload) => {
//   try {
//     let blindboxId = new ObjectId()
//     let ownId = new ObjectId()
//     const newBlindBox = new Blindbox({
//       _id: blindboxId,
//       ...payload,
//     //  ownerId: ownId, // Assuming you have the user ID from authentication
//     });

//     const result = await databaseServices.blind_boxes.insertOne(newBlindBox);
//     return result;
//   } catch (error) {
//     // Handle errors appropriately (e.g., log, throw custom error)
//     console.error('Error creating blind box:', error);
//     throw error;
//   }
// };

const createBlindBox = async (payload) => {
  try {
    let blindbox_Id = new ObjectId()
    let userId = new ObjectId()
    const newBlindBox = new BlindBox({
      _id: blindbox_Id,
      user_id: userId, // Convert user_id to ObjectId
      ...payload,
    });

    const result = await databaseServices.blind_boxes.insertOne(newBlindBox);
    return result;
  } catch (error) {
    console.error('Error creating blind box:', error);
    throw error;
  }
};

export const blindboxServices = {
  createBlindBox,
  // Add other blind box related services here (e.g., getBlindBoxById, etc.)
};