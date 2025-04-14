//
//
const {user_dao} = require("../DAOs/user-dao");

//
//
const {create_response} = require("../Utilities/create-response");

//
//
const {generate_hash,verify_password} = require("../Utilities/bcrypt-utility");




//
//
class user_service {

    //
    constructor () {
        this.user_dao = new user_dao();
    };

    //
    async register(request_object) {
        try {
            if (((!request_object.body.email)||(!request_object.body.password)) || ((!request_object.body.fn)||(!request_object.body.sn))) {
                return create_response(false,null,"Error! Users must provide a unique email, password, and first and last names to create an account");
            };
            request_object.body.password = await generate_hash(request_object.body.password);
            const result_object = await this.user_dao.create_user(request_object);
            return result_object;
        }
        catch (error_register) {
            return create_response(false,null,error_register.message);
        };
    };

    //
    async login(request_object) {
        try {
            if ((!request_object.body.email)||(!request_object.body.password)) {
                return create_response(false,null,"Error! Users must provide an existing email and password to log into an account");
            };
            const result_object = await this.user_dao.get_user_by_email(request_object);
            if (!result_object.success) {
                return create_response(false,null,"Sorry! A");
            };
            const matching = await verify_password(request_object.body.password,result_object.data._password_);
            if (!matching) {
                return create_response(false,null,"Oops! B");
            };
            //return create_response(true,result_object.data,result_object.error);
            request_object.session.user = {
                id : result_object.data._id_,
                name : `${result_object.data._fn_} ${result_object.data._sn_}`
            };
            request_object.session.isAuthenticated = true;
            return request_object.session;
        }
        catch (error_login) {
            return create_response(false,null,error_login.message);
        };
    };

};




//
module.exports = {user_service};