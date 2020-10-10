<?php
//设置字符编码。
header('content-type:text/html;charset=utf-8');
//2.php连接数据库。
// new mysqli(主机名，数据库用户名，数据库密码，数据库名称)
define('HOST','localhost');//主机名
define('USERNAME','root');//数据库用户名
define('PASSWORD','');//数据库密码
define('DBNAME','mm');//数据库名称

$conn=@new mysqli(HOST,USERNAME,PASSWORD,DBNAME);//$conn:数据库连接对象
//@:容错处理，错误信息不显示。
//自定义的错误处理
if($conn->connect_error){//满足条件，数据库连接有误。
    die('数据库连接错误'.$conn->connect_error);//退出，并输出括号里面的信息
}

//设置字符编码问题。
// $conn->query():执行括号里面的代码，可以执行sql语句。
$conn->query('SET NAMES UTF8');

//获取数据库的数据。
// select * from users where 条件; 
$result=$conn->query("select * from eieghtinfo");//获取guestlove里面的所有数据，给$result

$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i]=$result->fetch_assoc();//当前的数组赋值给另一个数组，形成二维数组。
}

echo json_encode($arr);//真正的接口。






