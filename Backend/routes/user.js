var User = require('../models/user.js');
var Bcrypt = require("Bcryptjs");

var replaced = ((original, change) => {
    if(change == undefined){
        return original;
    } else{
        return change;
    }
})



module.exports = (router) => {

  

    /**
     * All users endpoints
     */
    userRoute = router.route('/user');
    /**
     * GET user
     */
    userRoute.get((req, res) => {
        User.find()
        .exec()
        .then((users) => {
            if(users){
                res.status(200).send({data: users, message: "Successfully GET users"})
            } else{
                res.status(200).send({data: [], message: "Returned but could't find any user"})
            }
        })
        .catch(error => {
            res.status(500).send({data: "error", message: "Error in GET users: " + error})
        })
    })


    /**
     * User with specific id related endpoints
     */
    userIdRoute = router.route('/user/:id')
    userIdRoute.get((req, res) => {
        User.findById(req.params.id)
        .exec()
        .then((user) => {
            if(user){
                res.status(200).send({data: user, message: "Successfully GET users"})
            } else{
                res.status(200).send({data: [], message: "Returned but could't find any user"})
            }
        })
        .catch(error => {
            res.status(500).send({data: error, message: "Error in GET users: " + error})
        })
    })


    
    /**
     * Login endpoints
     * 
     * send back success and message (data when error)
     */

    loginRoute = router.route('/login');
    loginRoute.post((req, res) => {
        var username = req.body.username
        var password = req.body.password

        User.findOne({
            username: username
        })
        .exec()
        .then((user) => {
            if(user){
                if(Bcrypt.compareSync(password, user.password)){
                    res.status(201).send({
                        success: true,
                        message: "Successfully logged in!"
                    })
                } else{
                    res.status(500).send({
                        success: false,
                        message: "Wrong combination of username and password!"
                    })
                }
            } else{
                res.status(500).send({
                    success: false,
                    message: "Couldn't find a user with this username!"
                })
            }
        })
        .catch(error => {
            res.status(500).send({
                success: false,
                data: "error",
                message: "Error in login: " + error
            })
        })

    })

    /**
     * Register endpoint
     */
    registerRoute = router.route('/register');

    registerRoute.post((req, res) => {
        //username email and password
        

        // var user = new User();
        // //check username
        // if(username.length < 5){
        //     res.status(500).send({data: null, message: "username needs to be atleast 5 characters"})
        // } else{

        // }
        var user = new User();
        var username = req.body.username
        user.username = replaced(user.username, req.body.username);
        user.email = replaced(user.email, req.body.email);
        user.password = replaced(user.password, req.body.password);
        var salt = Bcrypt.genSaltSync(10);
        user.password = Bcrypt.hashSync(user.password, salt);
        user.save()
        .then(() => {
            res.status(201).send({
                success: true,
                data: user, 
                message: "Successfully create a user with username " + username})

        })
        .catch(error => {
            res.status(500).send({
                success: false,
                data: "error", 
                message: "Error in create users: " + error})
        })
    })

    return router;
}