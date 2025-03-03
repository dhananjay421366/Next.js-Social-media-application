import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";
import { emailvalidation } from "@/schemas/registerSchema";
import { z } from "zod";

const EmailQuerySchema = z.object({
    email: emailvalidation
})
export async function GET(request: Request) {

    try {

        // connect the db 
        await dbConnect();

        // get the email from params 
        const { searchParams } = new URL(request.url);
        console.log(searchParams.get('email'));
        const queryParams = {
            email: searchParams.get("email")
        }

        const result = EmailQuerySchema.safeParse(queryParams);
        console.log(result);

        if (!result.success) {
            const UserEmailErrors = result?.error.format().email?._errors || []
            return Response.json({
                success: false,
                message: UserEmailErrors?.length > 0 ? UserEmailErrors.join(',') : 'Invalid query parameter'
            }, { status: 400 })
        }

        const { email } = result.data;
        // check existingVerifiedUser 
        const existingVerifiedUser = await User.findOne({ email, isVerified: true })

        if (existingVerifiedUser) {
            return Response.json(
                { success: false, message: "email is already taken" },
                { status: 400 }
            )
        }

        return Response.json(
            { success: true, message: "email is available Great Choise !" },
            { status: 200 }
        )


    } catch (error) {
        console.log("Error to checking email ", error);
        return Response.json(
            { success: false, message: "Error to checking email " },
            { status: 500 }
        )

    }
}