! function($) {
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
                        <dt><a href="#"><img class="lazy" src="${value.url}" alt=""></a></dt>
                        <dd class="name red"><a href="#">${value.title}</a></dd>
                        <dd class="price"><span>￥${value.price}</span></dd>
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
                            <a href="detail.html?sid=${value.sid}" target="_blank">
                                <img src="${value.url}"/>
                                <p>${value.sid}${value.title}</p>
                                <span class="price">￥${value.price}</span>
                                <span>${value.sailnumber}</span>
                            </a>
                        </li>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);

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
                prev = parseFloat(array[j].find('.price').html().substring(1)); //取上个价格
                next = parseFloat(array[j + 1].find('.price').html().substring(1)); //下一个的价格
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
}(jQuery);
// ! function($) {

//     let array_default = []; //排序前的li数组
//     let array = []; //排序中的数组
//     let prev = null;
//     let next = null;


//     //1.渲染列表页的数据-默认渲染第一页
//     const $list = $('.list');
//     $.ajax({
//         url: 'http://localhost/JS2008/taobaoitem_test/php/listdata.php',
//         dataType: 'json'
//     }).done(function(data) {
//         let $strhtml = '<ul>';
//         $.each(data, function(index, value) {
//             $strhtml += `
//                 <li>
//                     <a href="detail.html?sid=${value.sid}" target="_blank">
//                         <img class="lazy" data-original="${value.url}" width="200" height="200"/>
//                         <p>${value.sid}${value.title}</p>
//                         <span class="price">￥${value.price}</span>
//                         <span>${value.sailnumber}</span>
//                     </a>
//                 </li>
//             `;
//         });
//         $strhtml += '</ul>';
//         $list.html($strhtml);

//         //添加懒加载
//         $(function() {
//             $("img.lazy").lazyload({ effect: "fadeIn" });
//         });

//         array_default = []; //排序前的li数组
//         array = []; //排序中的数组
//         prev = null;
//         next = null;
//         //将页面的li元素加载到两个数组中
//         $('.list li').each(function(index, element) {
//             array[index] = $(this);
//             array_default[index] = $(this);
//         });
//     });
//     //渲染的外部无法获取内部的元素对象，通过事件委托实现。

//     //2.分页思路
//     //告知后端当前请求的是第几页数据。将当前的页面页码传递给后端(get和page)
//     $('.page').pagination({
//         pageCount: 3, //总的页数
//         jump: true, //是否开启跳转到指定的页数，布尔值。
//         coping: true, //是否开启首页和尾页，布尔值。
//         prevContent: '上一页',
//         nextContent: '下一页',
//         homePage: '首页',
//         endPage: '尾页',
//         callback: function(api) {
//             console.log(api.getCurrent()); //获取的页码给后端
//             $.ajax({
//                 url: 'http://localhost/JS2008/taobaoitem_test/php/listdata.php',
//                 data: {
//                     page: api.getCurrent()
//                 },
//                 dataType: 'json'
//             }).done(function(data) {
//                 let $strhtml = '<ul>';
//                 $.each(data, function(index, value) {
//                     $strhtml += `
//                         <li>
//                             <a href="detail.html?sid=${value.sid}" target="_blank">
//                                 <img src="${value.url}"/>
//                                 <p>${value.sid}${value.title}</p>
//                                 <span class="price">￥${value.price}</span>
//                                 <span>${value.sailnumber}</span>
//                             </a>
//                         </li>
//                     `;
//                 });
//                 $strhtml += '</ul>';
//                 $list.html($strhtml);

//                 array_default = []; //排序前的li数组
//                 array = []; //排序中的数组
//                 prev = null;
//                 next = null;

//                 //将页面的li元素加载到两个数组中
//                 $('.list li').each(function(index, element) {
//                     array[index] = $(this);
//                     array_default[index] = $(this);
//                 });
//             })
//         }
//     });

//     //3.排序

//     $('button').eq(0).on('click', function() {
//         $.each(array_default, function(index, value) {
//             $('.list ul').append(value);
//         });
//         return;
//     });
//     $('button').eq(1).on('click', function() {
//         for (let i = 0; i < array.length - 1; i++) {
//             for (let j = 0; j < array.length - i - 1; j++) {
//                 prev = parseFloat(array[j].find('.price').html().substring(1));
//                 next = parseFloat(array[j + 1].find('.price').html().substring(1));
//                 //通过价格的判断，改变的是li的位置。
//                 if (prev > next) {
//                     let temp = array[j];
//                     array[j] = array[j + 1];
//                     array[j + 1] = temp;
//                 }
//             }
//         }
//         //清空原来的列表，将排序后的数据添加上去。
//         //empty() : 删除匹配的元素集合中所有的子节点。
//         // $('.list ul').empty();//清空原来的列表
//         //这里能够省略empty
//         //append在追加的时候，如果追加的是jquery的元素对象，而jquery元素对象在你追加的元素中存在，直接取出存在的元素，从后面追加。
//         //如果追加的是内容结构，依然和appendChild一样，后面继续追加。
//         $.each(array, function(index, value) {
//             console.log(value); //n.fn.init [li, context: li]
//             $('.list ul').append(value);
//         });
//     });
//     $('button').eq(2).on('click', function() {
//         for (let i = 0; i < array.length - 1; i++) {
//             for (let j = 0; j < array.length - i - 1; j++) {
//                 prev = parseFloat(array[j].find('.price').html().substring(1));
//                 next = parseFloat(array[j + 1].find('.price').html().substring(1));
//                 //通过价格的判断，改变的是li的位置。
//                 if (prev < next) {
//                     let temp = array[j];
//                     array[j] = array[j + 1];
//                     array[j + 1] = temp;
//                 }
//             }
//         }
//         //清空原来的列表，将排序后的数据添加上去。
//         //empty() : 删除匹配的元素集合中所有的子节点。
//         // $('.list ul').empty();//清空原来的列表
//         $.each(array, function(index, value) {
//             console.log(value);
//             $('.list ul').append(value);
//         });
//     })


// }(jQuery);