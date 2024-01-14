import JWT from "jsonwebtoken";

export function createJwt(userId: string) {
    return JWT.sign({ uid: userId }, process.env.JWT_SECRET!, {
        algorithm: "HS256",
        expiresIn: 600,
        subject: userId,
    });
}

export function verifyJwt(token: string) {
    return JWT.verify(token, process.env.JWT_SECRET!, {
        algorithms: ["HS256"],
    });
}
