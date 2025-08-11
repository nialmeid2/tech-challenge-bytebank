
import { createUser, createUserCookie, emailExists, loginUser, User } from "@/src/model/User";
import HomePage from "@/src/page/Home";
import { cookies } from "next/headers";


export default function Home() {

    async function doLogin(email: string, password: string) {
        "use server"

        try {
            const loggedUser = await loginUser({email, password} as User)
            
            if (!loggedUser)
                return undefined;

            await createUserCookie((await cookies()), loggedUser);

            return loggedUser;

        } catch(err) {
            console.log(err);
            throw err;
        }
    }

    async function doSignUp(user: Omit<User, "id">) {
        "use server"

        try {
            const createdUser = await createUser(user);
            console.log(createdUser)
            await createUserCookie((await cookies()), createdUser);
            return createdUser;
        } catch (err) {
            console.log(err);
            throw err;
        }

    }

    async function checkEmail(email: string) {
        "use server"

        try {
            return await emailExists(email);            
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    return <div className={`flex-1 flex flex-col`}>
        <HomePage doLogin={doLogin} doSignUp={doSignUp} checkEmail={checkEmail} />
    </div>
}
