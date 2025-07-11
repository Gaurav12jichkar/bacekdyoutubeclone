class ApiError extends Error {
constructor(
  statuscode,
  message="Somthing went wrong",
errors=[],
stack=""
    ){
       super(message)
       this.statuscode=statuscode
       this.message=message
       this.success=false
       this.data=null
       this.errors=errors
       if(stack){
        this.stack=stack
       }
       else{
        Error.captureStackTrace(this,this.constructor)
       }

    }
}
export{ApiError}