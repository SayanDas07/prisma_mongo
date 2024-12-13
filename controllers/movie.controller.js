import prisma from "../db/db.js";


export const fetch = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 1;

    if (page <= 0) page = 1;
    if (limit <= 0 || limit > 100) limit = 10;

    const skip = (page - 1) * limit;

    try {
        const movies = await prisma.movie.findMany({
            
           

            include: {
                casts: {
                    select: {
                        name: true,
                        description: true,
                    },
                },
            },
            
        });

        const totalMovies = await prisma.movie.count();
        const totalPages = Math.ceil(totalMovies / limit);

        return res.json({
            status: 200,
            movies,
            meta: {
                totalPages,
                currentPage: page,
                limit: limit,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};




//create
export const create = async (req, res) => {
    try {
        const { name } = req.body;

        const movie = await prisma.movie.create({
            data: {
                name: name
            }
        });

        console.log("Movie added successfully!", movie);

        return res.json({ status: 200, message: "Movie added successfully!", movie });
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, message: "Internal Server Error!" });

    }
}

// Update
export const update = async (req, res) => {
    const { id } = req?.params
    const { name } = req?.body

    if (!id) {
        return res.json({ status: 400, message: "Please provide movie id!" })
    }

    if (!name) {
        return res.json({ status: 400, message: "Please provide movie name!" })
    }

    const movie = await prisma.movie.update({
        data: {
            name: name
        },
        where: {
            id: id
        }
    }
    )
    return res.json({ status: 200, movie, message: "Movie updated successfully!" })
}

// delete
export const deleteMovie = async (req, res) => {
    const { id } = req.params
    await prisma.movie.delete({
        where: {
            id: id
        }
    })

    return res.json({ status: 200, message: "Movie deleted successfully!" })
}

// Searching
export const search = async (req, res) => {
    const query = req?.query?.q
    

    const movies = await prisma.movie.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive"
            }
        }
    })

    return res.json({ status: 200, movies })
}