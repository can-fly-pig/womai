var x = 0;

function checkRight() {
    x = x + 1;
    if (x > 5) {
        x = 0
    }
}

function checkLeft() {
    x = x - 1;
    if (x < 0) {
        x = 5
    }
}


! function($) {
    //Tab切换第0块
    const tab1 = $('.floor0_r .tabchoise');
    const name1 = $('.floor0_r .name');
    const item1 = $('.floor0_r .con-tab');
    tab1.on('mouseover', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        item1.eq($(this).index()).show().siblings('.con-tab').hide();
        name1.attr('color', 'green')
    });
    //Tab切换第一块
    const tab = $('.floor1_r .tabchoise');
    const name = $('.floor1_r .name');
    const item = $('.floor1_r .con-tab');
    tab.on('mouseover', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        item.eq($(this).index()).show().siblings('.con-tab').hide();
        name.attr('color', 'green')
    });

    //Tab切换第二块
    const tab2 = $('.floor2_r .tabchoise');
    const item2 = $('.floor2_r .con-tab');
    tab2.on('mouseover', function() {
        $(this).addClass('cur').siblings().removeClass('cur');
        item2.eq($(this).index()).show().siblings('.con-tab').hide();
    });

    //图片运动
    $(' .con-tab img').hover(function() {
        $(this).stop(true).animate({
            left: 10 + 'px'
        })
    }, function() {
        $(this).stop(true).animate({
            left: 0 + 'px'
        })
    });

    //顶部悬浮搜索框
    $(window).on('scroll', function() {
        let $top1 = $(window).scrollTop();
        if ($top1 > 1000) {
            $('body .header-search').stop(true).animate({
                opacity: 1
            })
        } else {
            $('body .header-search').stop(true).animate({
                opacity: 0
            })
        }
    })

    //轮播图(没做完,差自动轮播)
    const banner = $('.wrapper .banner');
    const piclist = $('.banner .piclist li');
    const btnlist = $('.banner .btnlist li');
    const leftarrow = $('.banner #arrow_l');
    const rightarrow = $('.banner #arrow_r');
    const index = 0;
    const time = 0;
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

    //楼层图片闪光 (第0层楼广告图)
    $('.floor0 .con .img').hover(function() {
        $('.floor0 .img .aImg').stop(true).animate({
            left: 242 + 'px'
        })
    }, function() {
        $('.floor0 .img .aImg').stop(true).animate({
            left: -242 + 'px'
        })
    });
    $('.floor0 .con .img').on('mouseover', function() {
        $('.floor0 .img .aImg').removeClass('none')
    })
    $('.floor0 .con .img').on('mouseout', function() {
            $('.floor0 .img .aImg').addClass('none')
        })
        //楼层图片闪光 (第一层楼广告图)
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

    //楼层图片闪光 (第二层楼广告图)
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

    //右上方购物车盒子
    $('.min_cart .btn').on('mouseover', function() {
        $(this).siblings().removeClass('none'),
            $(this).addClass('cur')
    })
    $('.min_cart .btn').on('mouseout', function() {
        $(this).siblings().addClass('none'),
            $(this).removeClass('cur')
    })

    //input文本框获得焦点内容消失
    const guess = $('.list_seach ul');
    const gusinfo = $('.list_seach ul li');
    const input = $('.search_l input');
    input.focus(function() {
        this.value = '';
        guess.show()
    })

    //input文本框失去焦点内容显示
    input.blur(function() {
            this.value = this.defaultValue;
            guess.hide()
        })
        //li标签的内容没有到input中
    gusinfo.on('click', function() {
            input.value = this.innerHTML
        })
        //二级菜单


    //侧边导航栏隐藏元素

    $('.toolbar-footer li').on('mouseover', function() {
        $(this).addClass('cur').siblings().removeClass('cur')
    })
    $('.toolbar-footer li').on('mouseout', function() {
            $('.toolbar-footer li').removeClass('cur')
        })
        //点击回到顶部
    $('.toolbar-footer .top').on('click', function() {
            $('html').animate({
                scrollTop: 0
            });
        })
        //购物车详情(未完成)
    $('.toolbar-car').on('click', function() {
        $(this).parent().parent().parent().stop(true).animate({
                right: 0 + 'px'
            }),
            $(this).parent().parent().siblings('.car_inner').stop(true).animate({
                left: 310 + 'px'
            })
    })
    $('.l_toolbar').on('mouseout', function() {
        $(this).animate({
            right: -276 + 'px'
        })
    })


    //懒加载(没效果)
    $("img .lazy").lazyload({
        effect: "fadeIn" //图片显示方式
    })


    //ajax引入数据



}(jQuery)