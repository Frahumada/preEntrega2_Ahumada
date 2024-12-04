export const producValidator = (req, res, next) => {
        // console.log( req.body.title + "<--- Desde el productValidator -->" + typeof req.body.title)
        // console.log( req.body.description + "<--- Desde el productValidator -->"+ typeof req.body.description)
        // console.log( req.body.code + "<--- Desde el productValidator -->"+ typeof req.body.code)
        // console.log( req.body.price + "<--- Desde el productValidator -->"+ typeof req.body.price)
        // console.log( req.body.status + "<--- Desde el productValidator -->"+ typeof req.body.status)
        // console.log( req.body.stock + "<--- Desde el productValidator -->"+ typeof req.body.stock) 
        // console.log( req.body.category + "<--- Desde el productValidator -->"+ typeof req.body.category) 
        if (
        typeof req.body.title !== "string" ||
        typeof req.body.description !== "string" ||
        typeof req.body.code !== "string" ||
        typeof req.body.price !== "number" ||
        typeof req.body.status !== "boolean" ||
        typeof req.body.stock !== "number" || 
        typeof req.body.category !== "string"
    ) {
        res.status(404).json({msg: "Invalid Body"});
        console.log("Invalid Body");
    }
    else return next();
};