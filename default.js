let nextAdd = false;

let nextChoicer = false;

let curBuffer;

$(document).ready(() => {

    makeSidePanel();
    //makeRightPanel();

    const addButton = $('#addButton');
    const sideChoicer = $('.sideChoicer');

    //let tablePosition = $('#mainTable').position();
    //$('.addButton').css('margin-left', $('#mainTable').css('margin-left').replace('px', '') * 1.05);
    
    $('#sideSearchIMDb').focus();

    /* Add button for adding new movies */
    addButton.on('click', () => {
        eventForm(addButton);
    });

    /* Side drop column items */
    sideChoicer.on('click', () => {
        nextChoicer = !nextChoicer;
        if (nextChoicer) {
            sideChoicer.children('i').remove();
            sideChoicer.append('<i class="material-icons">expand_less</i>');
            $('#sideItemTitle').removeClass('collapse').addClass('collapse.show');
            $('#sideSearchTitle').focus();
        } else {
            sideChoicer.children('i').remove();
            sideChoicer.append('<i class="material-icons">expand_more</i>');
            $('#sideItemTitle').removeClass('collapse.show').addClass('collapse');
        }
    });

    /* Keypress Enter  */
    $('#sideSearchIMDb').on('keyup', (event) => {
        let inputValue = event.target.value;
        if (event.keyCode == 13) {
            alert(inputValue);
            $('#sideSearchIMDb').val("");
        }
    });

    /* Side IMDb id search button */
    $('#sideIMDbButton').on('click', (event) => {
        let inputValue = $('#sideSearchIMDb').val();        
        tableClear('mainTable'); /* Clear table */
        if(curBuffer) {
            curBuffer.length = 0;
        }        
        moviesList(['i', inputValue]);
        $('#sideSearchIMDb').val("");

    });

    /* Side Title search button */
    $('#sideTitleButton').on('click', (event) => {
        let inputValue = $('#sideSearchTitle').val();
        tableClear('mainTable');
        curBuffer = ['s', inputValue];
        moviesList(['s', inputValue]);
        $('#sideSearchTitle').val("");
    });

    $('#listMovies').on('click', (event) => {
        curBuffer = [...[curBuffer[0], curBuffer[1]], ...['type', 'movie'] ];
        filterCategories(curBuffer);       
    });

    $('#listSeries').on('click', (event) => {
        curBuffer = [...[curBuffer[0], curBuffer[1]], ...['type', 'series'] ];
        filterCategories(curBuffer);        
    });

    $('#listGames').on('click', (event) => {
        curBuffer = [...[curBuffer[0], curBuffer[1]], ...['type', 'game'] ];
        filterCategories(curBuffer);
    });

    $('#listEpisodes').on('click', (event) => {
        curBuffer = [...[curBuffer[0], curBuffer[1]], ...['type', 'episode'] ];
        filterCategories(curBuffer);
    });
});

function filterCategories(buffer) {
    if (getTableLength('mainTable') > 1) {
        tableClear('mainTable');
        moviesList(curBuffer);
    }    
}

/*
$(document).mousemove(function (event) {

    if (event.pageX == 0) {
        $('.sideDiv').fadeIn(400);
    } else if (event.pageX >= $('.sideDiv').width()) {
        $('.sideDiv').fadeOut(400);
    }

});*/

function makeRightPanel() {
    $('.rightDiv').css('width', window.innerWidth - $('.sideDiv').css('width').replace('px', ''));
}

function makeSidePanel() {
    let posTop = Number($('#topTitle').css('height').replace('px', ''));
    //alert( window.innerHeight );
    let heightSide = Number(window.innerHeight) - posTop ;
    $('.sideDiv').css('top', posTop );
    $('.sideDiv').css('height', heightSide);
}

function eventForm(btn) {

    nextAdd = !nextAdd;

    let posTop = Number($('#topTitle').css('height').replace('px', ''));
    let heightSide;

    if (nextAdd) {
        $('#formMovieDiv').removeClass('collapse');
        $('#formMovieDiv').addClass('collapse.show');
        $('#updateButton').text(btn.text()).addClass('btn btn-primary');
        heightSide = document.body.clientHeight - posTop ;
    } else {
        $('#formMovieDiv').removeClass('collapse.show');
        $('#formMovieDiv').addClass('collapse');
        $('#updateButton').text("").removeClass('btn btn-primary');
        heightSide = Number(window.innerHeight) - posTop ;
        formClear();
    }   
    $('.sideDiv').css('height', heightSide);
}

function formClick() {

    if ($("#updateButton").text().trim() == "Add") {
        addFromForm();
        $('#updateButton').text("").removeClass('btn btn-primary');
    } else {
        movieUpdate();
        $('#updateButton').text("").removeClass('btn btn-warning');
    }

    $('#formMovieDiv').removeClass('collapse.show');
    $('#formMovieDiv').addClass('collapse');
}

function tableClear(tableId) {
    $(`#${tableId} > tbody`).empty();
}

function formClear() {
    $("#title").val("");
    $("#introyear").val("");
    $("#imdbID").val("");
    $('#type').val("");
}