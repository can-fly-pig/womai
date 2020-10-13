! function($) {

    //右上方购物车盒子
    $('.min_cart .btn').on('mouseover', function() {
        $(this).siblings().removeClass('none'),
            $(this).addClass('cur')
    })
    $('.min_cart .btn').on('mouseout', function() {
        $(this).siblings().addClass('none'),
            $(this).removeClass('cur')
    })

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

    //购物车详情
    $('.toolbar-car').on('click', function() {
        $(this).parent().parent().parent().stop(true).animate({
            right: 0 + 'px'
        })
    })
    $('.car_inner').on('mouseout', function() {
        $(this).parent().animate({
            right: -276 + 'px'
        })
    })

    //渲染对应的商品详情
    let sidown = location.search.substring(1).split('=')[1];
    //判断sid是否存在
    if (!sidown) {
        sidown = 1;
    }

    // 2.将获取sid传给后端，后端获取sid，将对应的数据返回给前端。
    // 获取后端传入的数据
    // http://localhost/JS2008/Day%2029-Day%2031_jquery/goodscart/php/getsid.php
    $.ajax({
        url: 'http://192.168.11.62/H5%20study/section%202/womai_item/php/getsid.php',
        data: {
            sid: sidown
        },
        dataType: 'json'
    }).done(function(data) {
        $('.spic img').attr('src', data.url);
        $('.bpic').attr('src', data.url);
        $('.smallpic').attr('sid', data.sid);
        $('.loadtitle').html(data.title);
        $('.loadpcp').html(data.price);
        let picarr = data.piclisturl.split(','); //数据转换成数组
        let strhtml = '';
        $.each(picarr, function(index, value) {
            strhtml += `
                <li>
                    <img src="${value}"/>
                </li>
            `;
        });
        $('#list ul').html(strhtml);
    });


    //3.加减数量
    $('.add').on('click', function() {
        $(this).siblings('input').val(+$(this).siblings('input').val() + 1)
    })
    $('.minus').on('click', function() {
        if ($(this).siblings('input').val() <= 1) {
            alert('不能再少了')
        } else {
            $(this).siblings('input').val(+$(this).siblings('input').val() - 1)
        }
    })

    //4.网页效果 - 放大镜

    ! function() {

        $('.sf').width($('.spic').width() * $('.bf').width() / $('.bpic').width());
        $('.sf').height($('.spic').height() * $('.bf').height() / $('.bpic').height());
        var bili = $('.bpic').width() / $('.spic').width();
        var bilih = $('.bpic').height() / $('.spic').height();
        $('.spic').hover(function() {
            $('.sf').css('visibility', 'visible');
            $('.bf').css('visibility', 'visible');
            $(this).on('mousemove', function(ev) {
                var $left = ev.pageX - $('.picshow').offset().left - $('.sf').width() / 2;
                var $top = ev.pageY - $('.picshow').offset().top - $('.sf').height() / 2;
                if ($left < 0) {
                    $left = 0;
                } else if ($left >= $('.spic').width() - $('.sf').width()) {
                    $left = $('.spic').width() - $('.sf').width();
                }
                if ($top < 0) {
                    $top = 0;
                } else if ($top >= $('.spic').height() - $('.sf').height()) {
                    $top = $('.spic').height() - $('.sf').height();
                }
                $('.sf').css('left', $left);
                $('.sf').css('top', $top);
                $('.bpic').css('left', -$left * bili);
                $('.bpic').css('top', -$top * bilih);
            });
        }, function() {
            $('.sf').css('visibility', 'hidden');
            $('.bf').css('visibility', 'hidden');
        });

        //点击小图切换
        $('#list ul').on('click', 'li', function() {
            var $imgurl = $(this).find('img').attr('src');
            $('.smallpic').attr('src', $imgurl);
            $('.bpic').attr('src', $imgurl);
        });

        //点击箭头进行切换
        var $num = 6; //放大镜显示6张。
        $('#right').on('click', function() {
            var $list = $('#list ul li'); //8
            if ($list.length > $num) {
                $num++;
                $('#left').css('color', '#333');
                if ($list.length == $num) {
                    $('#right').css('color', '#fff');
                }
                $('#list ul').animate({
                    left: -($num - 6) * $list.eq(0).innerWidth()
                })
            }
        });

        $('#left').on('click', function() {
            var $list = $('#list ul li'); //8
            if ($num > 6) {
                $num--;
                $('#right').css('color', '#333');
                if ($num <= 6) {
                    $('#left').css('color', '#fff');
                }
                $('#list ul').animate({
                    left: -($num - 6) * $list.eq(0).innerWidth()
                })
            }
        });
    }();



    //5.添加购物车
    //购物车的思路
    //存放商品的sid和商品的数量--数组实现。
    //如果商品第一次存购物车，存放的是商品的sid和商品的数量。
    //如果是第二次购买商品，从第二次开始改变数量。

    //疑问：判断商品是第一次存还是多次存储。

    //1.解决方式：提前获取cookie里面id和num
    //点击按钮将商品的数量和id存放cookie中
    var arrsid = []; //商品的sid
    var arrnum = []; //商品的数量
    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) { //判断商品是第一次存还是多次存储
            arrsid = getcookie('cookiesid').split(','); //cookie商品的sid  
            arrnum = getcookie('cookienum').split(','); //cookie商品的num
        }
    }

    //2.有了上面的方法，可以点击加入购物车按钮判断商品是否是第一次还是多次。

    $('.p-btn a').on('click', function() { //点击加入购物车按钮。
        //location.reload(true);
        //判断当前的商品sid是否存在购物车(cookie)
        //判断当前的按钮对应的商品的sid和取出的cookie里面的sid进行比较

        //获取当前的按钮对应的商品的sid
        var $sid = $(this).parents('#content').find('.smallpic').attr('sid');
        cookietoarray(); //获取已经存在的cookie值。

        if ($.inArray($sid, arrsid) != -1) { //商品存在，数量叠加 
            //先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
            var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('#count').val());
            arrnum[$.inArray($sid, arrsid)] = num;
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie

        } else { //不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
            arrsid.push($sid); //将当前的id存入数组
            addcookie('cookiesid', arrsid.toString(), 10); //数组存入cookie
            arrnum.push($('#count').val());
            addcookie('cookienum', arrnum.toString(), 10); //数组存入cookie
        }
    });




}(jQuery)