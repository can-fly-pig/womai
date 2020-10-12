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
        console.log(data);
        $('.spic img').attr('src', data.url);
        $('.bpic').attr('src', data.url);
        $('.loadtitle').html(data.title);
        $('.loadpcp').html(data.price);
        console.log(data.piclisturl.split(','));
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

    //3.网页效果 - 放大镜

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


    //4.购物车(cookie或者本地存储)。
    //购物车的思路。
    //4.1.详情页通过cookie存储商品的信息 - details.html ->(存储)
    //存储商品的数量和商品的sid(新建两个数组，以数组的形参存储)
    let arrsid = []; //商品的sid
    let arrnum = []; //商品的数量

    //第一次购买商品创建商品列表(cart.html)，多次不需要创建，数量累计。
    //通过判断确定是第一次还是多次。
    //直接获取cookie - 如果cookie里面存在当前的商品的sid，商品不是第一次。
    //通过jquery下面的cookie插件，进行cookie读取删 - $.cookie()

    //提前设定cookie的键值
    //目的就是判断商品是第一次添加进购物车，还是多次。
    function getcookie() {
        if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
            arrsid = $.cookie('cookiesid').split(','); //获取cookie的sid，存放到数组中。
            arrnum = $.cookie('cookienum').split(','); //获取cookie的数量，存放到数组中。
        } else { //cookie不存在
            arrsid = [];
            arrnum = [];
        }
    }


    $('.p-btn a').on('click', function() {
        getcookie(); //如果cookie存在，取到cookie的值，并且变成了数组。
        //如果arrsid里面存在当前商品的sid，说明商品已经存在，否则商品是第一次购买。
        //$.inArray(value,array)确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
        //value:查找的值
        //array:数组
        if ($.inArray(sid, arrsid) === -1) { //不存在，将商品的sid和数量存入cookie
            arrsid.push(sid); //添加当前商品的sid
            $.cookie('cookiesid', arrsid, { expires: 10, path: '/' }); //插件完成的cookie的添加。
            arrnum.push($('#count').val()); //添加商品的数量
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //插件完成的cookie的添加。
        } else { //存在,商品的数量累加
            //获取原来的sid对应的数量(sid和数量是对应的 ，sid的在数组的位置就是数量在数组的位置)
            let index = $.inArray(sid, arrsid); //sid在数组中的位置
            let num = parseInt(arrnum[index]); //sid对应的数量
            //原来的数量+新添加数量，一起存入cookie
            arrnum[index] = num + parseInt($('#count').val()); //原来的数量+新添加数量进行赋值
            $.cookie('cookienum', arrnum, { expires: 10, path: '/' }); //一起存入cookie
        }
    });

}(jQuery)