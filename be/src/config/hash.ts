import bcrypt from "bcryptjs";

export const createHash = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, salt);

    return hasPassword;
}

export const verifyHash = async (password: string, hashedPassword: string) => {
    const isMatched = await bcrypt.compare(password, hashedPassword);

    return isMatched;
}