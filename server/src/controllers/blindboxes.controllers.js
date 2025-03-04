import { blindboxServices } from "../services/blindboxes.services.js";


// const createBlindBox = async (req, res) => {
//   try {
//     // const userId = req.user.id; // Assuming you have middleware to authenticate and set req.user
//     // const result = await blindboxServices.createBlindBox(req.body, userId);
//     const result = await blindboxServices.createBlindBox(req.body);
//     res.status(201).json({
//       message: 'Blind box created successfully',
//       result,
//     });
//   } catch (error) {
//     // Handle errors appropriately (e.g., send error response)
   
//     res.status(500).json({ error: error.message });
//   }
// };

const createBlindBox = async (req, res) => {
  try {
    const result = await blindboxServices.createBlindBox(req.body);
    res.status(201).json({
      message: 'Blind box created successfully',
      result,
    });
    console.log(result)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const blindboxController = {
  createBlindBox,
  // Add other blind box related controllers here
};