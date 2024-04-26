const default_page_limit=0;
const default_page_number=1;

function getPagination(query){
    const page = Math.abs(query.page) || default_page_number;
    const limit = Math.abs(query.limit) || default_page_limit;
    const skip = (page-1) * limit;

    return{
        skip, 
        limit,
    };
}

module.exports ={
    getPagination,
}