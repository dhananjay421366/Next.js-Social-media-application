import dbConnect from "@/lib/dbConnect";
import User from "@/models/User.model";

export async function POST(request: Request) {
    try {
        // connect the db 
        await dbConnect();

        // get opt and email  from  user
        const { verifyCode, email } = await request.json();

        if (!verifyCode || !email) {
            return Response.json(
                { message: "Email and verify code are required", success: false },
                { status: 400 }
            )
        }


        // finde user by email 
        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            return Response.json(
                { success: true, message: "No user found with this email" },
                { status: 404 }
            )
        }

        //  check verification code matches or not 
        if (user.verifyCode !== verifyCode) {
            return Response.json(
                { success: false, message: "Verification code is incorrect" },
                { status: 400 }
            )
        }

        // check verifyCode expiry
        if (new Date() > user.verifyCodeExpiry) {
            return Response.json(
                { success: false, message: "Verification code has expired" },
            )
        }

        // make the user has verified 
        user.isVerified = true;
        user.verifyCode = verifyCode;

        // Set the new expiry time (1-2 minutes from now)
        const newExpiryTime = new Date(Date.now() + Math.floor(Math.random() * 60 + 60) * 1000); // Random between 1 and 2 minutes
        user.verifyCodeExpiry = newExpiryTime;

        await user.save();

        // Respond with success
        return Response.json(
            { success: true, message: "User verified successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error to verifying user ", error);
        return Response.json(
            { success: false, message: "Error to verifying user" },
            { status: 500 }
        )

    }

}