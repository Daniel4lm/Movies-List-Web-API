
function productDelete(btn) {

    //var id = $(ctl).data("id");

    const thisRow = $(btn).parents("tr");
    thisRow.remove();
    
}