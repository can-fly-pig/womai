! function($) {
    const input = $('.big');
    const username = $('.username');
    const form = document.querySelector('#registry');
    const span = document.querySelector('.usernam');
    let flag = true;

    //文本框光标获取与失去
    // input.focus(function() {
    //     this.value = ''
    // })
    // input.blur(function() {
    //     this.value = this.defaultValue;
    // })

    //注册数据匹配
    username.blur = function() {
        $.ajax({
            type: 'post',
            url: 'http://192.168.11.62/H5%20study/section%202/womai_item/php/registry.php',
            data: {
                name: $(this).value
            }.done(function(data) {
                if (data) {
                    span.text() = '该用户名已存在';
                    span.style.color = 'red';
                    flag = false;
                } else {
                    span.innerHTML = '√';
                    span.style.color = 'green';
                    flag = true;
                }
            })
        })
    };

    form.onsubmit = function() {
        if (username.value === '') {
            span.innerHTML = '该用户名不能为空';
            span.style.color = 'red';
            flag = false;
        }
        if (!flag) {
            return false; //阻止跳转
        }
    }






}(jQuery)