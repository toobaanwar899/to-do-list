import { AddSchema } from "../config/ZodSchema";
import HandleError from "./ErrorHandle";

async function AddRecall(formData) {
    const AddData = {
        title: formData.get("title"),
        description: formData.get("description"),
        dueDate: formData.get("dueDate"),
        
    };

    const result = AddSchema.safeParse(AddData);
    return HandleError(result);
    
}
export default AddRecall;