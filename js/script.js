

const start = document.querySelector('.start-btn');
const reset = document.querySelector('.reset-btn');
const ans = document.querySelector('.ans-btn');
const input = document.querySelector('.input-col');
const guess = document.querySelector('.guess-btn');
const record =document.getElementById('historical-record');
let resultArray = [];
let resultString ='';
let guessArray = [];



start.addEventListener('click' , ()=>{
    start.disabled = true;
    start.classList.remove('btn-success');
    start.classList.add('btn-dark');
    for(let i=1;i<10;i++){
        resultArray.push(i);
    }
    //將陣列隨機排序
    resultArray.sort(function(){
        return Math.random()-0.5;
    })
    console.log(resultArray);
    resultArray.length = 4;
    console.log(resultArray);
    for(let i=0;i<resultArray.length;i++){
        resultString +=resultArray[i];
    }
    
    reset.disabled = false;
    reset.classList.remove('btn-dark');
    reset.classList.add('btn-danger');
    ans.disabled = false;
    input.disabled = false;
    guess.disabled =false;
    guess.classList.remove('btn-dark');
    guess.classList.add('btn-danger');
});

guess.addEventListener('click' , ()=>{
    let inputValue = input.value;
    inputValue = (inputValue+'').split('');
    guessArray = inputValue.map(Number);
    
    //將有出現在guessArray的數字取出成為"新陣列"
    const x = resultArray.filter(x => guessArray.includes(x));
    //出現在guessArray的陣列長度...
    let b  =x.length;
    //有出現在guessArray的陣列去進行位置的比較
    //位置相同的才取出來,最後計算新陣列長度即為 "幾A的A"
    let a = x.filter(x => resultArray.indexOf(x) === guessArray.indexOf(x)).length;
    //幾B的B
    b = b - a;
    console.log(`${a}A${b}B`);
    
    if(guessArray.length === 4){
        let div =document.createElement('div');
        div.setAttribute('style' , 'padding: 10px 5px');
        let btn = document.createElement('button');
        btn.setAttribute('style' , 'margin-right:10px');
        let span = document.createElement('span');
        if(a===4){
            btn.classList.add('btn' , 'btn-success');
            btn.innerText = `${a}A${b}B`;
            span.innerText = `${input.value}`;
            div.appendChild(btn);
            div.appendChild(span);
            record.appendChild(div);
            input.disabled = true;
            input.value = "";
        }
        else{
            btn.classList.add('btn' , 'btn-danger');
            btn.innerText = `${a}A${b}B`;
            span.innerText = `${input.value}`;
            div.appendChild(btn);
            div.appendChild(span);
            record.appendChild(div);
            input.value = "";
            
        }
    }
    else if(guessArray.length < 4 || guessArray.length > 4){
        alert('請輸入四碼數字...');
        input.value = "";
    }
})

reset.addEventListener('click' , resetFunc);
function resetFunc(){
    while(record.firstChild){
        record.removeChild(record.firstChild);
    }
    start.disabled = false;
    start.classList.remove('btn-dark');
    start.classList.add('btn-success');
    reset.disabled = true;
    reset.classList.remove('btn-danger');
    reset.classList.add('btn-dark');
    ans.disabled = true;
    input.disabled = true;
    guess.disabled =true;
    guess.classList.remove('btn-danger');
    guess.classList.add('btn-dark');
    resultArray = [];
    input.value='';
    resultString = '';
}
    
ans.addEventListener('click' , ()=>{
    alert('答案就在這個背後lalalalala~')
    alert(`1A2B的答案是..是...是....是這個: ${resultString}!!!`);
    resetFunc();
})

