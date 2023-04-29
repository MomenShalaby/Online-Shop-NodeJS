const User_model = require('../models/user_model')

exports.get_signup = (req, res) => {
    res.render('signup', {
        auth_error: req.flash('auth_error')[0]
    })
}

exports.post_signup =async (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const confirm_password = req.body.confirm_password
        // if (!username || !email || !password || !confirm_password) {
        //     console.log("fill the required fields.")
        //     throw new Error('fill the required fields');


        // }
        // if (password != confirm_password) {

        //     console.log('Password doensnt match')

        //     throw new Error('Password doensnt match');

        // }

        await User_model.create_new_user(username, email, password)
        res.redirect('/login')


    }
    catch (err) {
        req.flash('auth_error', err.toString())
        console.log(err)
        res.redirect('/signup')
    }

}

exports.get_login = (req, res) => {
    res.render('login', {
        auth_error: req.flash('auth_error')[0]
    })
}


exports.post_login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            throw new Error('Email and password are required');

        }
        else {
            const user_id = await User_model.login(email, password);
            req.session.userId = user_id;
            res.redirect('/');
        }
    } catch (err) {
        req.flash('auth_error', err.toString())
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