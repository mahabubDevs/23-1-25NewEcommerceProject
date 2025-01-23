module.exports = ( req, res, next) => {
    //list of authorized email
    const authorizedEmail = [
        "mahabub@gmail.com",
        "mahabub@gmail.com",
        "mahabub@gmail.com",
        "mahabub@gmail.com",
    ];
    //list verifaication code 
    const authorizedCode = [
        "1234",
        "1234",
        "1234",
        "1234",
    ];
    //check the email authorithation code is correct
    if (!authorizedEmail.includes(req.body.email)) {
        return res.status(401).json({ message: "Unauthorized email" });
    }


    //check the code is correct 
    if (authorizedCode.includes(req.body.code)) {
        next();
    } else {
        return res.status(401)
            .json({
                message: "Unauthorized code"
            });
    }
}