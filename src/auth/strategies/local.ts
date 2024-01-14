import { compare, hash } from "bcrypt";
import { prismaClient } from "../../data/prisma";
import { Strategy } from "passport-local";

export const loginStrategy = new Strategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (email, password, done) => {
        try {
            const user = await prismaClient.user.findUniqueOrThrow({
                where: { email: email.toLowerCase() },
            });
            if (!user.password) return done("user uses oauth");
            const status = await compare(password, user.password);
            if (status)
                return done(null, {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                });
            else return done("Wrong credentials");
        } catch (error) {
            return done(error);
        }
    }
);

export const registerStrategy = new Strategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
        const username = (req.body.username ?? "").trim();
        try {
            if (!username) return done("username doesn't exist");
            const user = await prismaClient.user.create({
                data: {
                    email: email.toLowerCase(),
                    password: await hash(password, 10),
                    username,
                },
            });

            done(null, {
                id: user.id,
                email: user.email,
                username: user.username,
            });
        } catch (error) {
            return done(error);
        }
    }
);
