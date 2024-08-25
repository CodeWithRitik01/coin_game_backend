
import supabase from "../config.js"

//to transfer user's detail
const getUserDetail = async (req, res, next) =>{
    try{
        const {userId, username} = req;


        return res.status(201).json({
            success: true,
            message: "Get User",
            userId,
            username
        });
    }catch(error){
        next(res.status(404).json(error))
    }
}

//function to create new user or to update points if user already exists
const createRow = async (req, res, next) =>{
    try{
        const {userId, username} = req;
        const {points} = req.body;

        const allData = await getRecords();

        const alreadyExist =  allData.find((ele) => ele.user_id == userId)
        if(alreadyExist == undefined){
            const {data} = await supabase
            .from('track_coins')
            .insert([
                {user_name:username, user_id:userId, points}
            ])

            if (error) {
                return res.status(400).json({ success: false, message: "Error inserting data", error });
            }

            return res.status(201).json({
                success: true,
                message: "New record added successfully",
                data
            });
        }else{
            const {data, error} = await supabase
            .from('track_coins')
            .update({points})
            .eq('user_id', userId)

            const filteredData = await getRecords(); 
            const renderData =  filteredData.find((ele) => ele.user_id == userId)

            if (error) {
                return res.status(400).json({ success: false, message: "Error updating data", error });
            }

            return res.status(201).json({
                success:true,
                message: "Record Updated",
                data:renderData
            });
        }
 }catch(error){
        next(res.status(404).json(error))
    }

}

//getting all table data
const getRecords = async () => {
    const { data, error } = await supabase
      .from('track_coins')
      .select('*');
  
    if (error) console.error(error);
    else return data;
  };
  

//getting data for specific user
const getPoints = async (req, res, next) =>{

    try {
        const {userId, username} = req;
        const data = await getRecords(); 
        const renderData =  data.find((ele) => ele.user_id == userId)

        return res.status(201).json({
            success:true,
            message: "records",
            data:renderData
        });
    } catch (error) {
        next(res.status(404).json(error))

    }
  
    
}
  
export {createRow, getRecords, getUserDetail, getPoints}