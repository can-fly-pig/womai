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


    //分页和排序
    //前端传递对应的页面给后端，后端根据页面返回对应的数据。
    //注意：一开始应该渲染第一页的数据(接口)
    //约定每页的数据条数。
    //总的数据计算分页。


    //排序
    let array_default = []; //排序前的li数组
    let array = []; //排序中的数组
    //冒泡排序，比较相邻的两个数字。
    let prev = null; //前一个商品价格
    let next = null; //后一个商品价格
    //1.渲染列表页的数据-默认渲染第一页
    const $list = $('#rannder');
    $.ajax({
        url: 'http://192.168.11.62/H5%20study/section%202/womai_item/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '<ul class="width">';
        $.each(data, function(index, value) {
            $strhtml += `
                        <li>
                        <dl>
                        <dt><a href="detail.html?sid=${value.sid}"><img class="lazy" data-original="${value.url}" alt=""></a></dt>
                        <dd class="name red"><a href="#">${value.title}</a></dd>
                        <dd class="price"><span id="price">￥${value.price}</span></dd>
                        <dd class="sailnum">热销：<span>${value.sailnum}件</span></dd>
                        <dd><button type="submit" onclick='addbord(this)'>加入购物车</button></dd>
                        </dl>
                        </li>
                    `;
        });
        $strhtml += '</ul>';
        $list.html($strhtml);
        //添加懒加载
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });

        //将页面的li元素加载到两个数组中
        $('#rannder li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });


    //2.分页思路:根据传输的页码，后端返回对应的接口数据，渲染出来。
    $('.pageshow').pagination({
        pageCount: 3, //总的页数
        jump: true, //是否开启跳转到指定的页数，布尔值。
        prevContent: '上一页', //将图标改成上一页下一页。
        nextContent: '下一页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取当前的点击的页码。
            $.ajax({
                url: 'http://192.168.11.62/H5%20study/section%202/womai_item/php/listdata.php',
                data: {
                    page: api.getCurrent() //传输数据
                },
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                        <dl>
                        <dt><a href="detail.html?sid=${value.sid}"><img class="lazy" data-original="${value.url}" alt=""></a></dt>
                        <dd class="name red"><a href="#">${value.title}</a></dd>
                        <dd class="price"><span id="price">￥${value.price}</span></dd>
                        <dd class="sailnum">热销：<span>${value.sailnum}件</span></dd>
                        <dd><button type="submit" onclick='addbord(this)'>加入购物车</button></dd>
                        </dl>
                        </li>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
                //添加懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

                //将页面的li元素加载到两个数组中
                $('#rannder li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });
        }

    });


    //3.排序，排序前的数组都已经具有li元素
    // 默认
    $('.nav_v button').eq(0).on('click', function() {
        $.each(array_default, function(index, value) {
            $('#rannder ul').append(value);
        });
        return;
    });
    // 升序
    $('.nav_v button').eq(1).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('#price').html().substring(1)); //取上个价格
                next = parseFloat(array[j + 1].find('#price').html().substring(1)); //下一个的价格
                //通过价格的判断，改变的是数组li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {
            $('#rannder ul').append(value);
        });
    });
    // 降序
    $('.nav_v button').eq(2).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('#price').html().substring(1)); //取上个价格
                next = parseFloat(array[j + 1].find('#price').html().substring(1)); //下一个的价格
                //通过价格的判断，改变的是数组li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }

        $.each(array, function(index, value) {
            $('#rannder ul').append(value);
        });
    });
}(jQuery)
//加入购物车点击后边框变化
function addbord(abv) {
    $(abv).css({ 'box-shadow': 'inset -2px 2px 5px #fff' })
}