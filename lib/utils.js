import bcrypt from 'bcrypt';

export const getHashedPass = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(pass, salt);
};