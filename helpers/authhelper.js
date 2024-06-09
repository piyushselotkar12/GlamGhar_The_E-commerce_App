import bcrypt from 'bcryptjs';
// const bcrypt = require('bcryptjs');
export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPass = await bcrypt.hash(password, saltRounds);
        return hashedPass;
    }
    catch (error) {
        console.log(error);
    }
}

export const comparePassword = async (password, hashedPass) => {
    return await bcrypt.compare(password, hashedPass);
}

// import bcrypt from 'bcryptjs';

// export const hashPassword = async (password) => {
//   try {
//     // Increase salt rounds for better security in production (12-14 recommended)
//     const saltRounds = 10; // Adjust for development/production as needed
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
//   } catch (error) {
//     console.error('Error hashing password:', error);
//     throw error; // Re-throw for proper error handling
//   }
// };

// export const comparePassword = async (password, hashedPassword) => {
//   try {
//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     return isMatch;
//   } catch (error) {
//     console.error('Error comparing passwords:', error);
//     throw error; // Re-throw for proper error handling
//   }
// };
