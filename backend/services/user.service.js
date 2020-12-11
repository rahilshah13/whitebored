const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
    authenticate,
    getAllUsers,
    getById,
    addUser,
    //registerCourse
}

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }

}

async function getAllUsers() {
    //Returning the result of the promise. In the next homework we will make sure no passwords are sent back to the user.
    return User.find().select('-hash');
}



async function getById(id) {
    return User.find({_id:id});
}

//TODO: finish this function. Here you should insert the course 'id' into the User document.
// Useful Hint: Recall that JWT token already contains user id and with each client request the 'req' object is modified to include user id in req.user.sub
// async function registerCourse(req){
//
//     let id = req.user.sub;
//     const user = await User.findById(id);
//
//     if (user.role === 'Student') {
//         //TODO: Do not allow students to register more than five course.
//         if (user.courses.length < 5) {
//             user.courses.push(req.body.courseid);
//             await user.save();
//         }
//         else {
//             throw "Course limit is reached. Remove a course to add a new one.";
//         }
//     }
//         // //TODO: On the angular side you will need to hide the 'add' button from the professors, however, you should still block them from adding courses here as well.
//     // //TODO: send a message to users if the limit is reached.
//     else {
//         throw "You must be a student to register a course.";
//     }
// }

async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

