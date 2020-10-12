define([], function() {
    //Tab切换第0块
    ! function($) {
        let tab1 = $('.floor1_r .tabchoise');
        let name1 = $('.floor1_r .name');
        let item1 = $('.floor1_r .con-tab');
        return {
            TAB: ! function() {
                tab1.on('mouseover', function() {
                    $(this).addClass('cur').siblings().removeClass('cur');
                    item1.eq($(this).index()).show().siblings('.con-tab').hide();
                    name1.attr('color', 'green')
                })
            }()
        }
    }(jQuery)

})