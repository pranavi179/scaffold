const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validSignupInput = data => {
    let errors = {};

    let {  user_name, email , password } = data;
    user_name = !isEmpty(user_name) ? user_name :"";

    email = !isEmpty(email) ? email :"";
     password = !isEmpty(password) ? password : "";

    
     if(Validator.isEmpty(user_name )){
        errors.user_name  = "user_name  required";
    }
    
     if(Validator.isEmpty(email)){
         errors.email = "Email required";
     }
     else if (!Validator.isEmail(email)){
         errors.email ="enter a valid email id";

     }

     if(Validator.isEmpty(password)){
         errors.password="password is required";
     }
     else if (!Validator.isLength(password,{min:8,max:20})){
         errors.password="password must be atleast 8 characters";
     }

     return{
         errors,
         isValid:isEmpty(errors)
        };

}