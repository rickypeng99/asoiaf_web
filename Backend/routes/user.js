
module.exports = (router) => {

    /**
     * All users endpoints
     */
    userRoute = router.route('/user');
    userRoute.get((req, res) => {
        
    })

    userRoute.post((req, res) => {

    })

    /**
     * User with specific id related endpoints
     */



    
    /**
     * Login & Register endpoints
     */

    loginRoute = router.route('/login');

    loginRoute.post((req, res) => {

    })

    registerRoute = router.route('/register');

    registerRoute.post((req, res) => {

    })
}