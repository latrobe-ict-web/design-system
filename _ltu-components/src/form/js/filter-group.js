$(document).ready(function() {
    $('#show-course-filters').click(function() {
        let filterButton = document.querySelector('#show-course-filters');
        var $location = $('.ds-filter-megamenu');
        // $location.toggle();
        // $location.hide()

        // let allFilters = document.querySelectorAll('.ds-filter-group__content__tab');


        if (filterButton.textContent === 'Hide filters') {
            filterButton.textContent = "Show filters";
            filterButton.classList.add('ds-btn--ghost');
            filterButton.classList.remove('ds-btn--ghost__active');
            $location.slideUp();
            // $("body").removeClass("overlay overlay-open");
            // $location.show();
        } else {
            filterButton.textContent = "Hide filters";
            filterButton.classList.add('ds-btn--ghost__active');
            filterButton.classList.remove('ds-btn--ghost');
            $location.slideDown();
            // $("body").addClass("overlay overlay-open");
        }
            
       

        //     // $location.append(allFilters);
        //     $location.append(allFilters);

        //     allFilters.forEach(function( filterGroup ) {
        //         console.log(filterGroup)
        //         filterGroup.hidden = false;
        //     })
        // }

    });

    // expand control click handler for 
    $('.ds-filter-group__nav__tab, .ds-filter-group__nav__label').click(function() {

        var regionId = $(this).attr('aria-controls');
        var $location = $('.ds-filter-megamenu');
        if ($(this).attr('aria-expanded') == 'false') { // region is collapsed then open it

            // close any open siblings
            $(this).siblings().each(function() {
                var siblingRegionId = $(this).attr('aria-controls');

                // close siblings colapsible region
                $('#'+siblingRegionId).hide().attr('hidden','hidden');

                // update the aria-expanded attribute of the siblings trigger
                $(this).attr('aria-expanded', 'false');
            });

            // update the aria-expanded attribute of the clicked trigger
            $(this).attr('aria-expanded', 'true');
  
            // open region
            $('#'+regionId).slideDown(function(){
                $(this).removeAttr('hidden');
            });

            $location.slideDown();
            // $("body").addClass("overlay overlay-open");
  
        }
        else { // region is expanded then close it
  
            // update the aria-expanded attribute of the region
            $(this).attr('aria-expanded', 'false');
            $location.slideUp();
            // $("body").removeClass("overlay overlay-open");
            // close region
            $('#'+regionId).slideUp(function(){
                $(this).attr('hidden','hidden');
            });

        }
    });
});