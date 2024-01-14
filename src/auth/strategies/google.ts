import { Strategy, VerifyCallback } from "passport-google-oauth2";
import { prismaClient } from "../../data/prisma";

export const googleStrategy = new Strategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async (
        accessToken: string,
        refreshToken: string,
        profile: {
            id: string;
            displayName: string;
            email: string;
            picture: string;
        },
        done: VerifyCallback
    ) => {
        try {
            const user = await prismaClient.user.findUnique({
                where: { email: profile.email },
            });

            if (!user)
                await prismaClient.user.create({
                    data: {
                        id: profile.id,
                        email: profile.email,
                        username: profile.displayName,
                    },
                });
            done(null, {
                id: profile.id,
                email: profile.email,
                username: profile.displayName,
            });
        } catch (error) {
            done(error);
        }
    }
);
