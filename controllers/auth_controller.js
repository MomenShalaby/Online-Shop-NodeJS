const User_model = require('../models/user_model')

exports.get_signup = (req, res) => {
    res.render('signup')
}

exports.post_signup = (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const confirm_password = req.body.confirm_password
        if (!username || !email || !password || !confirm_password) {
            console.log("fill the required fields.")
            res.redirect('/signup')
            return;


        }
        if (password != confirm_password) {
            console.log('Password doensnt match')
            res.redirect('/signup')
            return;
        }
        
        User_model.create_new_user(username, email, password)
        res.redirect('/login')


    }
    catch (err) {
        console.log(err)
        res.redirect('/signup')
    }

}

exports.get_login = (req, res) => {
    res.render('login',{
        auth_error:req.flash('auth_error')[0]
    })
}


exports.post_login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const user_id = await User_model.login(email, password);
        req.session.userId = user_id;

        res.redirect('/');
    } catch (err) {
        req.flash('auth_error',err)
        console.error(err);
        res.redirect('/login');
    }
};


exports.logout = async (req, res) => {
    try {
        await req.session.destroy()
        console.log('Logged out successfully')
        res.redirect('/login')

    }
    catch (err) {
        console.error(err)
        res.redirect('/')
    }
}