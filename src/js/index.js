import toast from './lib/toast';

const button = document.querySelector('button');

button.addEventListener('mousedown',function(e){
    this.classList.add('button-active');
})
button.addEventListener('mouseup', function(){
    this.classList.remove('button-active');
})

button.addEventListener('click',() => {
    toast.success("Hi! I'm toast");
})