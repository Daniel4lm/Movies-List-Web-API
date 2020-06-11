
function addFromForm() {

    const mainTableID = $('body table').attr('id');
    checkTableBody(mainTableID);
    $(`#${mainTableID} tbody`).append(addToTableHTML());
    formClear();
}

function addToTableHTML() {
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

