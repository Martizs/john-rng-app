import bcrypt from 'bcrypt';

export const getHashedPass = async (pass) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pass, salt);
};

export const comparePass = (pass, hashPass) => bcrypt.compare(pass, hashPass);
