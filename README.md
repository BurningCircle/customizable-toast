
# Customizable toasts for everyone!

This library allows you to create toasts with custom styles. No need in downloading css files to make it work. Just style it, as you want. 

>Данная библиотека позволяет вам создавать уведомления с сщбственными стилями. Вам не нужно дополнительно скачивать css файлы, чтобы все работало. Просто стилизуйте уведомления, как вам нужно
## Usage
First of all you need to download it via npm/yarn:
>Первым делом Вам необходимо скачать библиотеку с помощью npm или yarn

`npm install custoast`
or 
`yarn add custoast`

import it in your project (you can call it as you wish, not only custoast):
>Импортируйте объект в свой проект(Вы можете использовать другое имя, не только custoast):

`import custoast from 'custoast;'`

and use it:
>И используйте:

```
custoast.success('Hey, it's working!');
custoast.error('But you did something wrong. Again!');
custoast.warning('Be careful next time!');
custoast.notification('Nice weather today, btw)');
 ```
 ## Styling
The most important part is adding styles to toasts. Every toast have two base classes: **toast** and **toast-{success/warning/error/notification}** depends on the type of the toast. Add common styles for every type of toast in the 'toast' class:
>Самая важная часть - добавление собственных стилей для уведомлений. Каждое уведомление имеет два основных класса **toast**  и **toast-{success/warning/error/notification}**, название которого зависит от типа уведомления. Добавьте общие стили для всех типов уведомлений в класс 'toast':

```
.toast{
    padding: 10px;
    font-family: monospace;
	font-weight: 600;
    border-radius: 10px;
    margin-bottom: 14px;
    transition: 0.3s;
    overflow: hidden;
    box-shadow: 0 5px 20px 2px rgba(0,0,0,.15);
}
```
Don't forget to add **transition** parametr.  It depends on how long the toast removal animation takes.
Now style every type of toast like in the example below:
>Не забудьте добавить параметр **transition**. От него зависит, как долго будет происходить анимация удаления уведомления.
>Теперь стилизуйте каждый тип уведомления, как показано в примере ниже:
```
.toast-success {
  background: #aaff00;
  color: rgba(0, 0, 0, 0.6);
}
```
Also you can add custom appearance animation. Just create keyframes animation and add it to the **toast** or **toast-{toast type name}** class:
>Также вы можете добавить собственную анимацию появления уведомления. Просто создайте keyframes анимацию и добавьте ее в класс **toast** или **toast-{toast type name}**:
```
@keyframes fallUp {
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.toast-success {
  ...
  animation: fallUp 0.5s;
}
```
When the toast is about to disapear, he gets class **toast-remove**. You can add custom animation for it too:
>Когда уведомление перейдет в стадию удаления, ему будет присвоен класс **toast-remove**. В него также можно добавить собственные стили.
```
.toast-remove {
  transform: scale(0);
}
```
You can style even toast container. By default toast container have this styles: 
>Вы даже можете стилизовать контейнер для уведомлений. По умолчанию контейнер имеет следующие стили:
```
position: fixed;
display: inline-block;
top: 40px;
right: 40px;
```
If you want to customize it, then add your custom styles to **toast-container** class.
>**Important**: **toast-container** class must contain **position** parametr, then your custom styles would work
>Если вы хотите кастомизировать контейнер, добавьте собственные стили в класс **toast-container**.
>**Важно**: **toast-container** класс должен содержать параметр **position**. Только в этом случае Ваши стили будут работать.
```
.toast-container{
    position: fixed;
    bottom: 40px;
    left: 40px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column-reverse;
}
```


