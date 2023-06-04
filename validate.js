module.exports.validateUserInputs = inputs => {
   if(!isValidEmail(inputs.email) || !inputs.name){
    return false
   } else {
    return true
   }
}

const isValidEmail = (str) => /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i.test(str)

