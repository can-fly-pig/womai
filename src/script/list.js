! function($) {
    const img = $('#rannder li');
    img.on('mouseover', function() {
        $(this).css('border', '1px solid red')
        $(this).find('img').stop(true).animate({
            left: 10 + 'px'
        })
    })
}(jQuery)