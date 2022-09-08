# 第一章：国际化

## 1.1 国际化原理

* 需求：
  * 有一个变量 msg ，但是这个 msg 有且只能有两个值：
    * ① hello world 
    * ② 你好，世界
  * 要求根据需要切换 msg 的值。



* 示例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>Title</title>
</head>
<body>
    <script>
        // ① 定义 msg 值的数据源
        const message = {
            en: {
                msg: 'hello world'
            },
            zh: {
                msg: '你好，世界'
            }
        }

        // ② 定义切换变量
        let locale = 'en'

        // ③ 定义赋值函数
        function t(key){
            return message[locale][key]
        }

        // ④ 为 msg 赋值
        const result = t('msg');
        console.log(result)

    </script>
</body>
</html>
```



