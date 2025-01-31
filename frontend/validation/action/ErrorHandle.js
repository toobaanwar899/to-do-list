export default function HandleError(result){
    if(!result.success){
        const errors = result.error.flatten().fieldErrors
        console.log("validation errror :" , errors);
        return {error: errors}  
    }try{
        return {success: true, data:result.data};
    }catch(err){
        console.error("Error During processing:", err);

        if(err instanceof Error){
            return{
                error :{
                    _form:[err.message],
                },
            };
        }else{
            return{
                error:{
                    _form:["unknown error"],
                },
            };
        }
        
    }
}