const registerValidator = ({ name, email, password }) => {
    const error = {};

    // name
    if(!name) {
        error.name = "Please Provide Your Name"
    }
    // email
    if(!email) {
        error.email = "Please Provide Your Email"
    }
    // password
    if(!password) {
        error.password = "Please Provide Your Password"
    } else if(password.length < 6) {
        error.password = "Password Length Must be 6 charecter";
    }

    return {
        isValid: Object.keys(error).length === 0,
        error
    }
}

const loginValidator = ({ email, password }) => {
    const error = {};
    
    // email
    if(!email) {
        error.email = "Please Provide Your Email"
    }
    // password
    if(!password) {
        error.password = "Please Provide Your Password"
    } else if(password.length < 6) {
        error.password = "Password Length Must be 6 charecter";
    }

    return {
        isValid: Object.keys(error).length === 0,
        error
    }
}

const addProductValidator = (formData) => {
    const error = {};
    const { name, price, brand, category, stock, discount, description } = Object.fromEntries(formData);

    // name
    if(!name) {
        error.name = "Please Set Product Name"
    }
    // price
    if(!price) {
        error.price = "Please Set Product Price"
    }

    // price
    if(!price) {
        error.price = "Please Set Product Price"
    }
    // price
    if(!brand) {
        error.brand = "Please Set Product Brand"
    }
    // price
    if(!category) {
        error.category = "Please Set Product Category"
    }
    // price
    if(!stock) {
        error.stock = "Please Set Product Stock"
    }
    // price
    if(!discount) {
        error.discount = "Please Set Product Discount"
    }
    // price
    if(!description) {
        error.description = "Please Set Product Description"
    }

    return {
        isValid: Object.keys(error).length === 0,
        error,
        value: { name, price, brand, stock, category, discount, description }
    }
}
 
export {
    loginValidator,
    registerValidator,
    addProductValidator
}