//https://opentdb.com/api.php?amount=10

const _question=document.querySelector('#question')

const options=document.querySelector('.quiz-options')

const _correctScore=document.querySelector('#correct-score')

const _totalQuestion=document.querySelector('#total-question')

const chkbtn=document.querySelector('#check-answer')

const playAgainBtn=document.querySelector("#play-again")


const _result=document.querySelector('#result')


let correctAnswer=' ', correctScore=quesCount=0, totalQuestion=10


//event Listeners

function eventListeners(){
    chkbtn.addEventListener('click',checkAnswer)
    playAgainBtn.addEventListener('click',restartQuiz)
    // homeBtn.addEventListener('click',function(){
    //     window.open('landing-page.html','_self')
    // })
}


document.addEventListener('DOMContentLoaded',()=>{
     loadQuestion()
     eventListeners()
    _totalQuestion.textContent=totalQuestion
    _correctScore.textContent=correctScore

})

async function loadQuestion(){
    const apiURL='https://opentdb.com/api.php?amount=1'
    const result=await fetch(`${apiURL}`)
    const data = await result.json()
    //console.log(data.results[0])
    _result.innerHTML=""
    showQuestion(data.results[0])

    
}

//display questions and options

function showQuestion(data){
    chkbtn.disabled=false
     correctAnswer=data.correct_answer
    let incorrectAnswers=data.incorrect_answers
    
    let optionList=incorrectAnswers
    optionList.splice(Math.floor(Math.random()*(incorrectAnswers.length+1)),0,correctAnswer )
    // console.log(optionList)
    // console.log(correctAnswer)

    _question.innerHTML=`${data.question} <br> <span class="category">${data.category}</span>`

    options.innerHTML=`
      ${optionList.map((option,index)=>`
      <li>${index+1}. <span>${option}</span></li>
      `).join(' ')}
    `

    selectQuestion()

}

// option selection
function selectQuestion(){
    options.querySelectorAll('li').forEach((option)=>{
        option.addEventListener('click',()=>{
            if(options.querySelector('.selected')){
                const activeOption=options.querySelector('.selected')
                activeOption.classList.remove('selected')

            }
            option.classList.add('selected')
        })
    })

    console.log(correctAnswer)


}



//answer check
function checkAnswer(){
    chkbtn.disabled=true
    if(options.querySelector('.selected')){
        let selectedAnswer=options.querySelector('.selected span').textContent
        // console.log(selectedAnswer)

        if(selectedAnswer==correctAnswer){
            correctScore++
            _result.innerHTML=`<p>&#x2705; Correct Answer!</p> `
        }
        else{

            _result.innerHTML=`<p>&#x274C; Incorrect Answer!</p> <p><small><b>Correct Answer: </b>${correctAnswer}</small></p>`



        }
        checkCount()

    }
    else{
        _result.innerHTML=`<p>❓Please select an option! </p>`
        chkbtn.disabled=false
    }
}


function checkCount(){
    quesCount++
    setCount()
    if(quesCount==totalQuestion){
       _result.innerHTML +=`<p>Your score is: ${correctScore}.</p>`
       playAgainBtn.style.display = 'block'     
       chkbtn.style.display='none'


    }
    else{
        setTimeout(()=>{
            loadQuestion()
        },300)
    }
}

function setCount(){
    _totalQuestion.textContent=totalQuestion
    _correctScore.textContent=correctScore
}

/* function to restart the Quiz*/
function restartQuiz(){
   
    correctScore=quesCount=0
    playAgainBtn.style.display='none'
   
    chkbtn.disabled=false
    setCount()
    loadQuestion()
    chkbtn.style.display='block'
    
}



