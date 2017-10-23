export const formatURLParamsToArray = (params) =>{
    if(typeof params === "string" && params !== null && params !== undefined) {
        return [params]
    }
    else if(params !== undefined && params !== null && params.constructor === Array){
        return params
    }
    else {
        return []
    }
}
