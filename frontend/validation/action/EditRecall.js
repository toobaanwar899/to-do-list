import { EditSchema } from "../config/ZodSchema";
import HandleError from "./ErrorHandle";

async function EditRecall(formData) {
    const EditData = {
        title: formData.get("title"),
        dueDate: formData.get("dueDate"),
        description: formData.get("description"),
        
    };

    const result = EditSchema.safeParse(EditData);
    return HandleError(result);
    
}
export default EditRecall;