
function productDisplay(btn) {
    /* Fetch parent <tr> container of this button */
    const thisRow = $(btn).parents("tr");
    const cols = thisRow.children("td");

    $('#formMovieDiv').removeClass('collapse');
    $('#formMovieDiv').addClass('collapse.show');

    /* Fill all fields in the form */
    $("#title").val($(cols[1]).text());
    $("#introyear").val($(cols[2]).text());
    $("#imdbID").val($(cols[3]).text());
    $('#type').val($(cols[4]).text());

    // Change Update Button Text
    $("#updateButton").text(btn.innerText).addClass('btn btn-warning');
}

function movieUpdate() {

    // Find Product in <table>
    const row = $("#mainTable button[data-id='" + $("#imdbID").val().trim() + "']").parents("tr")[0];
    // Add changed product to table
    $(row).after(movieBuildTableRow());
    // Remove original product
    $(row).remove();
    formClear(); // Clear form fields
    //$('#addButton').css('margin-left', $('#mainTable').css('margin-left').replace('px', '') * 1.05);
}

function movieBuildTableRow() {
    return `
            <tr>
            <td>
                <button type='button'
                onclick='productDisplay(this);'
                data-id='${$("#imdbID").val()}'
                class='btn btn-outline-warning rowButton'>
                Edit
                </button>
            </td>
            <td>${$("#title").val()}</td>
            <td>${$("#introyear").val()}</td>
            <td>${$("#imdbID").val()}</td>
            <td>${$('#type').val()}</td>
            <td>
                <button type='button'
                    onclick='productDelete(this);'
                    class='btn btn-outline-danger rowButton'>
                    Delete
                </button>
            </td>
            </tr>
    `;    
  }


  
