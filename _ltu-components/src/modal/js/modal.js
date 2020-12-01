/**
 *  Modal
 */

 /**
 *  Function Open Modal
 *  @param: {Object} target - element to return focus to when model closed
 *  @param: {Object} content - html content to show in modal
 *  @param: {string} maxWidth - sets a max width for the modal [medium | large]
 *  @param: {string} staticBackdrop - sets whether or not backdrop click closes modal [no | yes]
 */
// make function available globally (without this it can't be used by other js files) -- there is probably a better way
window.openModal = function openModal(target, content, maxWidth='800px', staticBackdrop='no'){
     
    // add an attribute to the element to return focus to on overlay close
    $(target).attr('data-returnfocus', 'yes');
     
     // create overlay
     var dialog = '<div class="ds-modal overlay" role="dialog" aria-modal="true">\n<div class="ds-modal-dialog">'+content+'</div></div>';
     
     // append overlay to page and add overlay-open class to body to stop scroll
     $('body').append(dialog).addClass('overlay-open');
     
     // set max width of modal
     $('.ds-modal-dialog').css('max-width', maxWidth);
     
     // fade in overlay change focus to overlay close button
     $('.ds-modal').fadeIn(function(){
        // find first focusable element and set focus
        $(this).find('button:visible, [href]:visible, input:visible, select:visible, textarea:visible, [tabindex]:not([tabindex="-1"]):visible').eq(0).focus();

        if(staticBackdrop == 'yes') {
            $(this).addClass('static-backdrop');
        } else {
            // append close button
            $(this).append('<button id="overlay-close" class="ds-btn-round ds-btn--light ds-icon-x">Close</button>');
         }
     });
 }

/**
 *  Function Close Modal
 */
// make function available globally
window.closeModal = function closeModal(){
    $('.ds-modal').fadeOut(function(){

        // delete modal
        $(this).remove();
        
        // find return focus element
        var returnFocusLink = '[data-returnfocus="yes"]';

        // return focus to return focus element and remove identifying attribute
        $(returnFocusLink).focus().removeAttr('data-returnfocus');
        
        // return scroll to body
        $('body').removeClass('overlay-open');
    });
}

 $(document).ready(function($) {
    /**
     *  Click handler for modal close button
     */
    $('body').on('click keydown', '.ds-modal', function(event) {

        // if modal is not of type static backdrop
        if(!$(this).hasClass('static-backdrop')) {
 
            if($(event.target).is('#overlay-close') || $(event.target).is('.ds-modal')) {
                
                if (event.keyCode === undefined || event.keyCode == 13 || event.keyCode == 27) {
                    // undefined for click, 13 for enter key, 27 for esc key
                    event.preventDefault();
                    
                    // close the modal
                    closeModal($(this));
                }
            }

        }
    });

    /**
     *  Click handler for standard modal open button
     */
    $('body').on('click', '[data-modal-content]', function(e) {
        // prevent default click action
        e.preventDefault();

        // get object that was clicked
        var target = e.target;

        // get the modal content id from the clicked button
        var modalContentId = $(target).attr('data-modal-content');

        // get requested modal width
        var modalWidth = $(target).attr('data-modal-width');
        var maxWidth;
        if (modalWidth == "medium") {
            maxWidth = "1024px";
        } else if (modalWidth == "large") {
            maxWidth = "1280px";
        } else {
            maxWidth = "800px";
        }

        // get static backdrop flag
        var staticBackdrop = $(target).attr('data-static-backdrop');

        //create the modal
        var modalContent = $('<div/>').append($('#'+modalContentId).clone()).html();

        // show the modal
        openModal(target, modalContent, maxWidth, staticBackdrop);
    });

});
