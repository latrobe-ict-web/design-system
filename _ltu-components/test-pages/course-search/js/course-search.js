/*** 
 * THIS IS NOT PRODUCTION CODE
 * 
 * This script is purely for UI demonstrations purposes!
 * 
 ***/

// filter behaviour
$(document).ready(function() {
    
    const numResults = $('#course-search-results-count').text();
    var query = ''; // store search query
    var atarDefaultValue = $('#atar').attr('value'); // default atar value
    var atarValue = atarDefaultValue;

    var searchState = {
        currentState: '',
        nextState: '',
        relatedIsShowing: false,
        queryTagMessageIsShowing: false,

    }

    // sample list
    var autosuggestionResults = [
        "Business",
        "Marketing",
        "Management",
        "Business and commerce",
        "Business and law"
    ];

    // More complex sample list
    // var autosuggestionResults = [
    //     {
    //         searchTerm: "business",
    //         relatedTerms: [
    //             "Business",
    //             "Marketing",
    //             "Management",
    //             "Business and commerce",
    //             "Business and law"
    //         ]
    //     },
    //     {
    //         searchTerm: "arts",
    //         relatedTerms: [
    //             "archaeology",
    //             "creative arts",
    //             "international relations",
    //             "politics"
    //         ]
    //     },
    //     {
    //         searchTerm: "IT and engineering",
    //         relatedTerms: [
    //             "computer science",
    //             "cybersecurity",
    //             "civil engineering"
    //         ]
    //     },
    // ]

    var autosuggestionResultsIndex = 0;
    var filteredList = [];
    var asList = [];

    /* for UX testing - demo modal student type picker

    var studentType = '';
    
    // handlers for modal student type selection
    $('body').on('click', '#studentTypeSelect button', function(){
        studentType = $(this).val(); 
        localStorage.setItem('studentType', studentType);
        if(studentType == 'D') {
            $('#dom-toggle').prop('checked', true);
            $('#int-toggle').prop('checked', false);
        } else {
            $('#dom-toggle').prop('checked', false);
            $('#int-toggle').prop('checked', true);
        }
        closeModal();
    });

    // Check if Student type is set otherwise show modal
    if (localStorage.getItem('studentType') === null) {
        content = '<div class="ds-modal-content" id="studentTypeSelect"><h3>We would like to know who you are</h3> <div class="ds-column-layout"> <div class="ds-column-layout__column"> <p>I am a: <br><button class="ds-btn-primary ds-icon-australia-nz ds-icon--before" value="D">Domestic student</button></p> <div> <p><strong>Domestic student means:</strong></br> La Trobe considers you a ‘domestic’ student if you are a citizen or permanent resident of Australia; a citizen of New Zealand; or a permanent humanitarian visa holder.</p> </div> </div> <div class="ds-column-layout__column"> <p>I am an: <br><button class="ds-btn-primary ds-icon-globe ds-icon--before" value="I">International student</button></p> <div> <p><strong>International student means</strong></br> La Trobe considers you an ‘International’ student if you are <strong>not</strong> a citizen or a permanent resident of Australia; <strong>not</strong> a citizen of New Zealand; or <strong>not</strong> a permanent humanitarian visa holder.</p> </div> </div> </div> </div>';
        openModal('h1', content, undefined,'yes');
    } else {
        studentType = localStorage.getItem('studentType');
        if(studentType == 'D') {
            $('#dom-toggle').prop('checked', true);
            $('#int-toggle').prop('checked', false);
        } else {
            $('#dom-toggle').prop('checked', false);
            $('#int-toggle').prop('checked', true);
        }
    }

    // handler for student type toggles
    $('label[for="dom-toggle"], label[for="int-toggle]').on('click', function(){
        if($(this).val() == 'dom') {
            $('#dom-toggle').prop('checked', true);
            $('#int-toggle').prop('checked', false);
            localStorage.setItem('studentType', 'D');
        } else {
            $('#dom-toggle').prop('checked', false);
            $('#int-toggle').prop('checked', true);
            localStorage.setItem('studentType', 'I');
        }
    });

    */

    
    /* 
     * reset tags
     * this function is to refershes the filter tag list after filter change
     */
    function resetTags(){
        var filterTagsWrapper;
        var filterTags = '';
        
        $('#[*="-filter-tags"] button').remove();
        // $('#location-filter-tags button').remove();
        // $('#study-filter-tags button').remove();
        // $('#degree-filter-tags button').remove();
        $('#ATAR-filter-tag button').remove();

        $('#discipline-filter-tags').hide();
        $('#location-filter-tags').hide();
        $('#study-filter-tags').hide();
        $('#degree-filter-tags').hide();
        $('#ATAR-filter-tag').hide();
        // $('#filter-tags button').remove();
        // add tags for checkboxes
        $('.ds-filter-group__filter:not(#ATAR-filter)').each(function(){
            var filterName = $(this).attr('id');
            var filterTagsWrapperId = filterName+'-tags';
            console.log('id', filterTagsWrapperId);
           
            $(this).find('.ds-input-checkbox').each(function(){    
                // check not top level all control by checking that it doesn't have attr data-all-parent 
                var attrCheck = $(this).attr('data-all-parent');
                if (typeof attrCheck !== typeof undefined && attrCheck !== false) {
                    // if checked add a tag 
                    if ($(this).prop("checked") == true) {
                        var thisID = $(this).attr('id');
                        var thisVal = $(this).val();
                        var label = $('label[for='+thisID+']').first().text();

                        filterTag = '<button class="ds-tag ds-tag--green" title="remove filter" data-filter-id="'+thisID+'" data-filter-value="'+thisVal+'">'+label+'</button>\n';

                        $('#'+filterTagsWrapperId).show();
                        $('#'+filterTagsWrapperId).append(filterTag);
                    }
                }
            });
        }).promise().done(function(){
            
            
            // add tag for ATAR if not original value
            if(atarValue != atarDefaultValue) {
                $('#ATAR-filter-tag').append('<button class="ds-tag ds-tag--green" title="remove filter" data-filter-id="atar" data-filter-value="'+atarValue+'">ATAR: '+atarValue+'</button>');
            }
            
            refreshResults();
            
        });
        
    }
    
    function refreshNumResults(numResults) {
        $('#course-search-results-count').replaceWith('<span id="course-search-results-count">'+numResults+'</span>');
    }
    
    function refreshResults() {
        
        //simulate results change
        $('#course-search-results .ds-course-card').fadeOut();
        
        // if no filters    
        if($('#filter-tags .ds-tag').length == 0) {
            if(query == ''){
                // no filter tags no query fade in all course cards
                $('#course-search-results .ds-course-card').fadeIn();
                refreshNumResults(numResults);
            } else {
                // no filter but query
                $('#course-search-results .ds-course-card').each(function() {
                    if($(this).text().includes(query)) {
                        $(this).fadeIn();
                    }
                }).promise().done(function(){
                    var newNumResults = $('#course-search-results .ds-course-card:visible').length;
                    refreshNumResults(newNumResults);
                });
            }
        } 
        // else if fliters
        else {
            $('#filter-tags .ds-tag').each(function(){
                var filterTagWrapperId = $(this).parent().attr('id');
                console.log('id', filterTagWrapperId)
                switch (filterTagWrapperId) {
                    // case 'level-filter-tags':
                    //     filterAttribute = 'data-filter-level';
                    //     $('#level-filter').addClass('ds-filter-group__nav__tab--selected');
                    //     break;
                    case 'discipline-filter-tags':
                        filterAttribute = 'data-filter-discipline';
                        $('#filter-2-trigger').addClass('ds-filter-group__nav__tab--selected');
                        break;
                    case 'location-filter-tags':
                        filterAttribute = 'data-filter-location';
                        $('#filter-3-trigger').addClass('ds-filter-group__nav__tab--selected');
                        break;
                    case 'study-filter-tags':
                        filterAttribute = 'data-filter-mode';
                        $('#filter-4-trigger').addClass('ds-filter-group__nav__tab--selected');
                        break;
                    case 'degree-filter-tags':
                        filterAttribute = 'data-filter-mode';
                        $('#filter-5-trigger').addClass('ds-filter-group__nav__tab--selected');
                        break;
                    case 'ATAR-filter-tags':
                        filterAttribute = 'data-filter-atar';
                        break;
                        
                }
                    
                var filterValue = $(this).attr('data-filter-value');
                $('#course-search-results .ds-course-card['+filterAttribute+'~="'+filterValue+'"]').each(function() {
                    if(query != ''){
                        // filters and query
                        if($(this).text().includes(query)) {
                            $(this).fadeIn();
                        }
                    } else {
                        // filter no query
                        $(this).fadeIn();
                    }
                }).promise().done(function(){
                    var newNumResults = $('#course-search-results .ds-course-card:visible').length;
                    refreshNumResults(newNumResults);
                });
            });
        }
        
    }
    

    // handler for checkbox filter all change
    $('.ds-input-checkbox[data-all-control]').on('change', function(){

        // disable all filter tabs (until apply button clicked)
        // $('.ds-filter-group__nav__tab').attr('disabled', 'disabled');

        if($(this).prop("checked") == true) {
            // check all control
            var allControlName = $(this).attr('data-all-control');
            
            $('[data-all-parent="'+allControlName+'"]').each(function(){
                // uncheck all children
                $(this).prop( "checked", false );
                // if child is also an all control parent
                if($(this).attr('data-all-control')) {
                    //uncheck all its children
                    var allControlName = $(this).attr('data-all-control');
                    $('[data-all-parent="'+allControlName+'"]').prop( "checked", false );
                }
                
            });
        }
    });

    // handler for checkbox filter change
    $('.ds-input-checkbox[data-all-parent]').on('change', function(){
        // disable all filter tabs (until apply button clicked)
        // $('.ds-filter-group__nav__tab').attr('disabled', 'disabled');

        var allParentName = $(this).attr('data-all-parent');

        // if checked
        if($(this).prop("checked") == true) {

            // if all children in group are now checked
            if($('.ds-input-checkbox[data-all-parent="'+allParentName+'"]:checked').length == $('.ds-input-checkbox[data-all-parent="'+allParentName+'"]').length) {
                // uncheck all children
                $('.ds-input-checkbox[data-all-parent="'+allParentName+'"]').prop( "checked", false );
                // check all parent
                $('[data-all-control="'+allParentName+'"]').prop( "checked", true );
            } 
            else {
                // uncheck all parent
                $('[data-all-control="'+allParentName+'"]').prop( "checked", false );
                // if parent is also child uncheck its all parent
                var parentsAllParent = $('[data-all-control="'+allParentName+'"]').attr( 'data-all-parent' );
                if (parentsAllParent.length != 0) {
                    $('[data-all-control="'+parentsAllParent+'"]').prop( "checked", false );
                }
            }
        } 
        // else all children unchecked
        else if($(this).closest('.ds-filter-group__filter').find('.ds-input-checkbox[data-all-parent]:checked').length == 0) {
            // check if parent has parent
            var attrCheck = $('[data-all-control='+allParentName+']').attr('data-all-parent');
            if (typeof attrCheck !== typeof undefined && attrCheck !== false) {
                // if parents parent direct childre are all unchecked then check parents parent
                if($('[data-all-control="'+attrCheck+'"] [data-all-parent="'+attrCheck+'"]:checked').length == 0) {
                    $('[data-all-control="'+attrCheck+'"]').prop( "checked", true );
                } 
            } else {
                // if parent has no parent the check it
                $('[data-all-control='+allParentName+']').prop( "checked", true );
            }
        }
        
        playFilterAnimation();   
    });

    // handler for check box filter
    $('#apply_filters').on('click', function(event){
        event.preventDefault();

        let filterButton = document.querySelector('#show-course-filters');
        var $filterElement = $('.ds-filter-megamenu');

        filterButton.textContent = "Show filters";
        filterButton.classList.add('ds-btn--ghost');
        filterButton.classList.remove('ds-btn--ghost__active');
        $filterElement.slideUp();

        // check that it's not select all  
        if ( $('#discipline-filter input:checked' ).length > 0 && !$('#discipline-filter').find('[data-all-control]').prop("checked")) {
            $('#filter-2-trigger').addClass('ds-filter-group__nav__tab--selected');
        } else {
            $('#filter-2-trigger').removeClass('ds-filter-group__nav__tab--selected'); 
        }
        if ( $('#location-filter  input:checked' ).length > 0 && !$('#location-filter').find('[data-all-control]').prop("checked")) {
            $('#filter-3-trigger').addClass('ds-filter-group__nav__tab--selected');
        } else {
            $('#filter-3-trigger').removeClass('ds-filter-group__nav__tab--selected'); 
        }
        if ( $('#study-filter input:checked' ).length > 0 && !$('#study-filter').find('[data-all-control]').prop("checked")) {
            $('#filter-4-trigger').addClass('ds-filter-group__nav__tab--selected');
        } else {
            $('#filter-4-trigger').removeClass('ds-filter-group__nav__tab--selected'); 
        }
        if ( $('#degree-filter input:checked' ).length > 0 && !$('#degree-filter').find('[data-all-control]').prop("checked")) {
            $('#filter-5-trigger').addClass('ds-filter-group__nav__tab--selected');
        } else {
            $('#filter-5-trigger').removeClass('ds-filter-group__nav__tab--selected'); 
        }

        resetTags();
        playFilterAnimation();
    });

    $('.ds-filter-group__filter__clear').on('click', function() {
        console.log('clear filter')
        // TODO: clear all checkboxes/ATAR in filter menu
        $('[data-all-control]').each( function() {
            $(this).prop("checked", true);
        })

        $('[data-all-parent]').each( function() {
            if ( $(this).prop("checked") )
                $(this).trigger('click');
        });

        resetTags();
        $(".ds-filter-megamenu").slideUp();
        playFilterAnimation();
    });
    
    // handler for ATAR filter change
    $('#atar').on('change', function(){

        // disable all filter tabs (until apply button clicked)
        // $('.ds-filter-group__nav__tab').attr('disabled', 'disabled');

    });
    
    // handler for ATAR filter
    $('#atar-value-enter').on('click', function(event){
        event.preventDefault();
        
        // var filterTriggerButtonId = $(this).closest('.ds-filter-group__content__tab').attr('aria-labelledby'); // get tab button id

        atarValue = $('#atar').val(); // get set atarValue filter value


        // if atar is reset
        if(atarValue == atarDefaultValue) {
            // remove selected class from filter drop down button 
            $('#filter-6-trigger').removeClass('ds-filter-group__nav__tab--selected');
        } else {
            // add selected class to filter drop down button
            $('#filter-6-trigger').addClass('ds-filter-group__nav__tab--selected');
        }
        
        // enable filter tabs
        $('.ds-filter-group__nav__tab').removeAttr('disabled');

        // close filter
        if($('#filter-6-trigger').attr('aria-expanded') == "true") {
            $('#filter-6-trigger').trigger('click');
        }
        
        // reset filter taglist
        resetTags();
        playFilterAnimation();
    });
        
    
    //handle tag click
    // $('#filter-tags').on('click', '.ds-tag', function(){
    //     // get correspoding filter id from button attribute data-filter-id

    //     var filterId = $(this).attr('data-filter-id');

    //     if ($(this).attr('data-filter-id') != 'atar') { // if checkbox filter
    //         // trigger correspoding filter click
    //         $('#'+filterId).prop("checked",false).trigger("change").promise().done(function(){
    //             // trigger correspoding filters parent form submit
    //             $(this).closest('.ds-filter-group__filter').trigger('submit');
    //         });
    //     } else {
    //         $('#atar-value-clear').trigger('click').promise().done(function(){
    //             // trigger correspoding filters parent form submit
    //             $(this).closest('.ds-filter-group__filter').trigger('submit');
    //         });
    //     }

    // });

    $('.filter').on('click', '.ds-tag', function() {
                
        var parentNode = $(this).closest(".filter").attr("id");
        // console.log( 'parent', $(this), parentNode );
        var numFilters = $('#' + parentNode + " .ds-tag").length;
        console.log('num', numFilters);
        // Hacky

        $(this).remove();
        // console.log('for', $(this).attr('data-filter-id'));
        $("#" + $(this).attr('data-filter-id')).prop("checked", false);

        if ( $('#' + parentNode + " .ds-tag").length === 0 ) {
            switch(parentNode) {
                case 'discipline-filter-tags':
                    $('#filter-2-trigger').removeClass('ds-filter-group__nav__tab--selected');
                    break;
                case 'location-filter-tags':
                    $('#filter-3-trigger').removeClass('ds-filter-group__nav__tab--selected');
                    break;
                case 'study-filter-tags':
                    $('#filter-4-trigger').removeClass('ds-filter-group__nav__tab--selected');
                    break;
                case 'degree-filter-tags':
                    $('#filter-5-trigger').removeClass('ds-filter-group__nav__tab--selected');
                    break;
                case 'ATAR-filter-tag':
                    $('#filter-6-trigger').removeClass('ds-filter-group__nav__tab--selected');
                    break;
            }

            console.log('pn', parentNode);
            $('#' + parentNode).remove();
        }

        playFilterAnimation();
    });

    function playFilterAnimation() {
        $("#course-search-results").fadeOut().fadeIn();
    }

    // handler for course search
    $('#course-search').on('submit', function(event){

        event.preventDefault();

        // $("#related-terms-container").hide();
        $('#course-autosuggest').hide();

        // simulate search
        query = $('#query_courses').val();
        $('#query_courses').val('');
        
        // $(this).find('#query-tag-container');

        if (query != '') {
            $(this).find('#query-tag-container').append('<button type="button" class="ds-tag ds-tag--green" title="remove filter">'+query+'</button>');
            console.log('here')
            $(".query-tag-message").show();
        }

        if ( $(this).find('#query-tag-container .ds-tag') > 0 ) {
            console.log("show message")
            $(".query-tag-message").show();
        }
 
        // turn on releveance filter and switch it on
        $('#sort-releveance').removeAttr('disabled').prop('checked', true);
        
        refreshResults();
        
    });

    $('#related-terms-container .ds-tag').on("click", function() {
        $("#query-tag-container").append(this);
        $(this).removeClass("ds-tag--add").addClass("ds-tag--green");
    })

    // local autosuggest trigger
    $('#course-search').on('change', function(event) {
        console.log('show autosuggestions')
        $('#course-autosuggestions').show();
    });

    // handler for query-tag

    $('#query-tag-container').on('click', '.ds-tag', function(){
        if ($(this).data("search-type") === "related-term") {
            $("#related-terms-container").append(this);
            $(this).removeClass("ds-tag--green");
            $(this).addClass("ds-tag--add");
        } else {
            $(this).remove();
            if ($("#query-tag-container .ds-tag").length === 0) {
                $(".query-tag-message").hide();
            }
        }

        query = '';
        // disable relevance filter
        $('#sort-releveance').addAttr('disabled');
        // switch to a-z filter
        $('#sort-a-z').prop('checked', true);
        refreshResults();
    });

    
    $('.ds-icon-heart').on('click', function() {
        if ( $(this).attr("data-saved") === "false" ) {
            $(this).attr("data-saved", "true");
            $(this).addClass('ds-icon-heart-filled');
            $('.ds-icon-heart').not(this).parent().find(".interaction-note").hide();
            // implement functionality in your app    
            $(this).parent().find(".interaction-note").show();
        } else {
            $(this).attr("data-saved", "false");
            $(this).removeClass('ds-icon-heart-filled');
            $(this).parent().find(".interaction-note").hide();
        }
    });

    $('.close-note').on('click', function() {
        $(this).parent().hide();
    });

    $("#query_courses").keyup(function(e) {
        var typedQuery = $("#query_courses").val();

        $('.ds-results-list__search-keywords').text(typedQuery);
        
        if ($("#query_courses").val().length > 1) {
            // console.log('show results/get server results', autosuggestionResults, typedQuery)

            // $("#course-autosuggest").fadeIn();
            $("#related-terms-container").hide();
            $(".ds-results-list").show();

            filteredList = autosuggestionResults.filter(result => { return result.toLowerCase().includes(typedQuery)});

            asList = filteredList.map(result => { return `<li class="ds-results-list-item">${result}</li>`});

            $(".autosuggest-results").html(asList);
        } else {
            $("#related-terms-container").show();
        }
    });

    $("#query_courses").keydown(function(e) {
        if (e.key === 'Down') {
            autosuggestionResultsIndex++;
                        
            if (autosuggestionResultsIndex > filteredList.length) {
                autosuggestionResultsIndex = 0;
            }
            
            $("#query_courses").val($(filteredList[autosuggestionResultsIndex]).text());
        }

         if (e.key === 'Up') {
            autosuggestionResultsIndex--;
            
            if (autosuggestionResultsIndex < filteredList.length ) {
                autosuggestionResultsIndex = 0;
            }
            
            $("#query_courses").val($(filteredList[autosuggestionResultsIndex]).text());        
        }

        $(asList[autosuggestionResultsIndex]).addClass("highlighted");
        console.log('index', autosuggestionResultsIndex, filteredList[autosuggestionResultsIndex]);
    });

    $(".autosuggest-results").on("click",  ".ds-results-list-item", function() {
        //create the tag
        $("#query_courses").val($(this).text());
        $("#course-search-submit").trigger("click");
        $(".query-tag-message").show();
    });

    $("#query_courses").focus( function() {
        if ($('#query-tag-container .ds-tag').length > 0) {
            $('#related-terms-container').addClass("ds-text-input__focus-bottom");

            $("#query_courses").addClass("ds-text-input__related-search no-bottom-border");

            $('.ds-input-group__prepend').addClass("ds-text-input__focus-left-corner no-bottom-border");
    
            $("#query_courses").addClass("ds-text-input__focus-right-corner no-outline");

            if (!searchState.relatedIsShowing) {
                searchState.relatedIsShowing = true;
                $('#related-terms-container').show();
            }
        }
        
        // $("related-terms-container").show();
    });

    $("#query_courses").blur( function() {
        $(this).removeClass("ds-text-input__related-search ds-text-input__focus-right-corner no-bottom-border no-outline");
        $('.ds-input-group__prepend').removeClass("ds-text-input__focus-left-corner no-bottom-border");
        $('.ds-input-group__prepend').removeClass("no-bottom-border");

        $("#related-terms-container").removeClass("ds-text-input__focus-right-corner no-outline");
    });

    $(document).on("click", function(e) {
        // I'm sure there's a better way to target this
        if (e.target.id === "query_courses" || e.target.id === "related-terms-container" || e.target.parentNode.id === "related-terms-container" || e.target.parentNode.id === "query-tag-container") {
            // do nothing
        } else {
            searchState.relatedIsShowing = false;
            $('#related-terms-container').hide();
        }

    });
});