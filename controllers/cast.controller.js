import prisma from "../db/db.js";

export const fetchCast = async (req ,res) => {
    const casts = await prisma.cast.findMany({
        include:{
            movie:{
                select:{
                    name:true,
                    id:true
                }
            }
        }
    })

    return res.json({status:200 , casts})
}

export const storeCast = async (req ,res) => {
    const {movie_id ,name ,description} = req?.body
    const cast = await prisma.cast.create({
        data:{
            movieId:movie_id,
            name:name,
            description:description
        }
    })

    return res.json({status:200 , cast ,message:"Cast Added successfully!"})
}


// Update
export const updateCast = async (req , res) => {
    const {id} = req.params
    const {name ,description ,movie_id} = req?.body
    await prisma.cast.update({
        data:{
            name:name,
            description:description,
            movieId:movie_id
        },
        where:{
            id:id
        }
    })
   return res.json({status:200 , message:"Cast updated successfully!"})
}

// delete
export const deleteCast = async (req ,res) => {
    const {id} = req.params
    await prisma.cast.delete({
        where:{
            id:id
        }
    })

    return res.json({status:200 , message:"Cast deleted successfully!"})
}