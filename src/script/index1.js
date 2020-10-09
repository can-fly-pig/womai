//Tab切换
! function($) {
    const tab = $('.floor1_r .tabchoise');
    const name = $('.floor1_r .name');
    const item = $('.con-tab');
    tab.on('mouseover', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        item.eq($(this).index()).show().siblings('.con-tab').hide();
        name.attr('color', 'green')
    })
}(jQuery);
! function($) {
    const tab = $('.floor2_r .tabchoise');
    const item = $('.floor2_r .con-tab');
    tab.on('mouseover', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        item.eq($(this).index()).show().siblings('.con-tab').hide();
    })
}(jQuery);
//图片运动
! function($) {
    $(' .con-tab img').hover(function() {
        $(this).stop(true).animate({
            left: 10 + 'px'
        })
    }, function() {
        $(this).stop(true).animate({
            left: 0 + 'px'
        })
    });
}(jQuery);

//顶部悬浮搜索框
! function($) {
    $(window).on('scroll', function() {
        let $top = $(window).scrollTop();
        if ($top > 1000) {
            $('body .header-search').stop(true).animate({
                opacity: 1
            })
        } else {
            $('body .header-search').stop(true).animate({
                opacity: 0
            })
        }
    })
}(jQuery);
//轮播图(没做完,差自动轮播)
! function($) {
    const banner = $('.wrapper .banner');
    const piclist = $('.banner .piclist li');
    const btnlist = $('.banner .btnlist li');
    const leftarrow = $('.banner #arrow_l');
    const rightarrow = $('.banner #arrow_r');
    const index = 0;
    banner.on('mouseover', function() {
        leftarrow.show();
        rightarrow.show();
    })

    banner.on('mouseout', function() {
        leftarrow.hide()
        rightarrow.hide()
    })

    btnlist.on('mouseover', function() {
        $(this).addClass('active').siblings('li').removeClass('active');
        piclist.eq($(this).index()).stop(true).animate({
            opacity: 1
        }).siblings('li').stop(true).animate({
            opacity: 0
        })
    })

    // 默认第一个小圆圈被选中
    btnlist.eq(0).addClass('active').siblings('li').removeClass('active');

    // 左右箭头点击事件
    rightarrow.on('click', function() {
        function checkRight() {
            x = x + 1;
        }
        btnlist.eq(x).addClass('active').siblings('li').removeClass('active');
        piclist.eq(x).stop(true).animate({
            opacity: 1
        }).siblings('li').stop(true).animate({
            opacity: 0
        })
    });
    leftarrow.on('click', function() {
        function checkLeft() {
            x = x - 1;
        }
        btnlist.eq(x).addClass('active').siblings('li').removeClass('active');
        piclist.eq(x).stop(true).animate({
            opacity: 1
        }).siblings('li').stop(true).animate({
            opacity: 0
        })
    })
}(jQuery);


//楼层图片闪光
! function($) {

    const aimg = $('.floor1 .img .aImg');
    const img = $('.floor1 .con .img');
    $('.floor1 .con .img').hover(function() {
        $('.floor1 .img .aImg').stop(true).animate({
            left: 242 + 'px'
        })
    }, function() {
        $('.floor1 .img .aImg').stop(true).animate({
            left: -242 + 'px'
        })
    });
    $('.floor1 .con .img').on('mouseover', function() {
        $('.floor1 .img .aImg').removeClass('none')
    })
    $('.floor1 .con .img').on('mouseout', function() {
        $('.floor1 .img .aImg').addClass('none')
    })

}(jQuery);

! function($) {

    const aimg = $('.floor2 .img .aImg');
    const img = $('.floor2 .con .img');
    $('.floor2 .con .img').hover(function() {
        $('.floor2 .img .aImg').stop(true).animate({
            left: 242 + 'px'
        })
    }, function() {
        $('.floor2 .img .aImg').stop(true).animate({
            left: -242 + 'px'
        })
    });
    $('.floor2 .con .img').on('mouseover', function() {
        $('.floor2 .img .aImg').removeClass('none')
    })
    $('.floor2 .con .img').on('mouseout', function() {
        $('.floor2 .img .aImg').addClass('none')
    })

}(jQuery)


! function($) {
    $('.min_cart .btn').on('mouseover', function() {
        $(this).siblings().removeClass('none'),
            $(this).addClass('cur')
    })
    $('.min_cart .btn').on('mouseout', function() {
        $(this).siblings().addClass('none'),
            $(this).removeClass('cur')
    })
}(jQuery)

//input文本框内容消失(没做出来)
// ! function($) {
//     const inpute = $('input');
//     inpute.on('mousedown', function() {
//         $(this).style.value = ''
//     })
// }(jQuery)

// //侧边导航栏跟随屏幕高度变化(没做出来)
// ! function($) {
//     const top = $('toolbar-left');
//     top = $(document).clientHeight
// }(jQuery)

// 自动轮播(没有实现)
// ! function($) {
//     var banner = $('.wrapper .banner');
//     var piclist = $('.banner .piclist li');
//     var btnlist = $('.banner .btnlist li');
//     var leftarrow = $('.banner #arrow_l');
//     var rightarrow = $('.banner #arrow_r');
//     var index = 0;
//     var time = 0;
//     rightarrow.onclick = function() {
//         var x = 0;

//         function checkRight() {
//             x = x + 1;
//         }
//         btnlist.eq(x).addClass('active').siblings('li').removeClass('active');
//         piclist.eq(x).stop(true).animate({
//             opacity: 1
//         }).siblings('li').stop(true).animate({
//             opacity: 0
//         })
//     };
//     time = setInterval(() => {
//         rightarrow.onclick()
//     }, 1500);
// }(jQuery)