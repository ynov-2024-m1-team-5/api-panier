const verifyUser = (req, res, next) => {
    const { customer_id } = req.params;
    console.log("Token : ", req.userToken);
    console.log("USER : ", customer_id);
    if (customer_id != req.userToken.customer_id) {
        return res.status(403).json({ success:false, message: "Unauthorized" });
    }
    next();
}

module.exports = verifyUser;
