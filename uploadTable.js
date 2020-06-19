
function moviesList(params = [], apikey = '94bcd98') {

    let newUrl = '';
    /* Define url according the number of input elements */
    if (params.length == 2) {
        newUrl = `http://www.omdbapi.com/?apikey=${apikey}&${params[0]}=${params[1]}`;
    } else if (params.length == 4) {
        newUrl = `http://www.omdbapi.com/?apikey=${apikey}&${params[0]}=${params[1]}&${params[2]}=${params[3]}`;
    }

    // Call Web API to get a list of Product
    $.ajax({
        url: newUrl,
        type: 'GET',
        dataType: 'json',
        success: function (movies) {

            if (movies.Response === 'False') {
                returnError(movies);
            } else {
                if (params[0] === 's') {
                    movieListRead(movies.Search);
                    console.log(movies.Search);
                } else {
                    movieRead(movies);
                    console.log(movies);
                }
            }
        },
        error: function (request, message, error) {
            handleException(request, message, error);
        }
    });
}

function returnError(movie) {

    const mainTableID = $('body table').attr('id');
    checkTableBody(mainTableID);
    $(`#${mainTableID} tbody`).append('<tr><td></td></tr>');

    $('#msgError').html(`<h5> ${movie.Error} </h5>`).removeClass('collapse');
    $('#msgError').addClass('collapse.show');
    //$('#addButton').css('margin-left', $(`#${mainTableID}`).css('margin-left').replace('px', '') * 1.05);
    
}

function movieRead(movie) {

    const mainTableID = $('body table').attr('id');
    checkTableBody(mainTableID);
    $('#msgError').removeClass('collapse.show').addClass('collapse');
    // Add a row to the Product table
    $(`#${mainTableID} tbody`).append(addMovieHTML(movie));
    //$('#addButton').css('margin-left', $(`#${mainTableID}`).css('margin-left').replace('px', '') * 1.05);

}

function movieListRead(movies) {
    const mainTableID = $('body table').attr('id');
    checkTableBody(mainTableID);

    $('#msgError').removeClass('collapse.show').addClass('collapse');

    // Iterate over the collection of data
    $.each(movies, function (index, movie) {
        // Add a row to the Product table
        $(`#${mainTableID} tbody`).append(addMovieHTML(movie));
    });
    //$('#addButton').css('margin-left', $(`#${mainTableID}`).css('margin-left').replace('px', '') * 1.05);
}

function getTableLength(tableId) {
    return $(`#${tableId} > tbody`).find('tr').length;
}

function checkTableBody(tableID) {
    /* If we don't have table body create new one */
    if ($(`#${tableID} tbody`).length == 0) {
        $(`#${tableID}`).append('<tbody></tbody>');
    }
}

function addMovieHTML(movie) {
    return `
            <tr>
            <td>
                <button type='button'
                onclick='productDisplay(this);'
                data-id='${movie.imdbID}'
                class='btn btn-outline-warning rowButton'>
                Edit
                </button>
            </td>
            <td>${movie.Title}</td>
            <td>${movie.Year}</td>
            <td>${movie.imdbID}</td>
            <td>${movie.Type}</td>
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

function handleException(request, message, error) {
    var msg = "";
    msg += "Code: " + request.status + "\n";
    msg += "Text: " + request.statusText + "\n";
    if (request.responseJSON != null) {
        msg += "Message" +
            request.responseJSON.Message + "\n";
    }
    alert(msg);
}