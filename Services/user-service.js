//
const user_dao = require("../DAOs/user-dao")




//
class user_service {
    
    //
    constructor () {
        this.user_dao = new user_dao()
    }

    //
    async create_user(request_object) {
        const result_object = await this.user_dao.create_user(request_object)
        return result_object
    }

    //
    //async get_all_users() {
    //    const result_object = await this.user_dao.get_all_users()
    //    return result_object
    //}

    //
    async get_user_by_email(email) {
        const result_object = await this.user_dao.get_user_by_email(email)
        return result_object
    }
    
}




//
module.exports = user_service