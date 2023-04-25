
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// const DB_URL = "mongodb://127.0.0.1:27017/online_shop";
const DB_URL = "mongodb+srv://momenahmed2010:blIZhpDsyFOFOBCe@cluster0.qs8mrwv.mongodb.net/?retryWrites=true&w=majority"

const User_modelSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        }
    });

const User_model = mongoose.model('user', User_modelSchema);

exports.get_all_users = async () => {
    try {
        await mongoose.connect(DB_URL);

        const users = await User_model.find({});
        mongoose.disconnect();
        return users;
    } catch (error) {
        throw error;
    }
}

exports.create_new_user = async (username, email, password) => {
    try {
        await mongoose.connect(DB_URL);
        user = await User_model.findOne({ email: email })
        if (user) {
            console.log("email exist ")
        }

        else {
            hashed_password = await bcrypt.hash(password, 10)
            let user = new User_model({
                username: username,
                email: email,
                password: hashed_password
            })
            console.log("user created")

            return user.save()

        }
    }


    catch (err) {

        throw (err)

    }
    finally {
        mongoose.disconnect
    }
}

exports.login = async (email, password) => {
    try {
        await mongoose.connect(DB_URL);
        const user = await User_model.findOne({ email: email });
        if (!user) {
            console.log("email doesn't exist ");
            throw new Error("email doesn't exist");
        } else {
            const is_same_password = await bcrypt.compare(password, user.password);
            if (!is_same_password) {
                console.log('incorrect password');
                throw new Error('incorrect password');
            } else {
                console.log('Login successfully');
                return user._id;
            }
        }
    } catch (err) {
        return Promise.reject(err);
    } finally {
        mongoose.disconnect();
    }
};