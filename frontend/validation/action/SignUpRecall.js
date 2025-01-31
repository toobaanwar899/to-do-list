
import { UserSignInSchema } from "../config/ZodSchema";
import HandleError from "./ErrorHandle";

async function UserSignInRecall(formData) {
    const SignInData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
  

    };

    const result = UserSignInSchema.safeParse(SignInData);
    return HandleError(result);
    
}
export default UserSignInRecall;