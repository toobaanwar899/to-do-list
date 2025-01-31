import { LoginSchema } from "../config/ZodSchema";
import HandleError from "./ErrorHandle";

async function AdminLoginRecall(formData) {
    const logInData = {
        email: formData.get("email"),
        password: formData.get("password"),
        
    };

    const result = LoginSchema.safeParse(logInData);
    return HandleError(result);
    
}
export default AdminLoginRecall;