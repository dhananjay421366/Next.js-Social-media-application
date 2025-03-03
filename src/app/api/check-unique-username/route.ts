import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import { usernameValidation } from "@/schemas/registerSchema";
import { z } from "zod";


const UserQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    try {
        // connect the db 
        await dbConnect();

        // get username from params 
        const { searchParams } = new URL(request.url);
        console.log(searchParams.get('username'));
        const queryParams = {
            username: searchParams.get('username')
        }

        // valid with zod 
        const result = UserQuerySchema.safeParse(queryParams);
        console.log(result);
        if (!result.success) {
            const UserNameErrors = result?.error.format().username?._errors || []
            return Response.json({
                success: false,
                message: UserNameErrors?.length > 0 ? UserNameErrors.join(',') : 'Invalid query parameter'
            }, { status: 400 })
        }

        const { username } = result.data;

        // check existingVerifiedUser
        const existingVerifiedUser = await User.findOne({ username, isVerified: true })
        if (existingVerifiedUser) {
            return Response.json(
                { success: false, message: "username is already taken" },
                { status: 400 }
            )
        }

        return Response.json(
            { success: true, message: "username is available Great Choise !" },
            { status: 200 }
        )
    } catch (error) {
        console.log("Error to checking username", error);
        return Response.json(
            { success: false, message: "Error to checking username" },
            { status: 500 }
        )

    }

}