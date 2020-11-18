let index = 0;
let attempt=0;
let score = 0;
let wrong = 0;
let questions = quiz.sort(function(){
  return 0.5 - Math.random;
});
let totalQuestion = questions.length;




$(function () {
  //timer code start from here
  
  let totalTime = 200; //200 sec for timer
  let min = 0;
  let sec = 0;
  let counter = 0;
  
  let timer = setInterval(function(){
    counter++;
    min = Math.floor((totalTime - counter) /60); //calculating min
    sec = totalTime - (min*60) - counter;
    $(".timerBox span").text(min + ":" + sec);
    
    if(counter == totalTime){
      
      alert("Time's up. Press ok to show the result");
      result();
      clearInterval(timer);
    }
   // console.log("min=" +min)
  //  console.log("sec=" +sec)
    
  }, 1000); //timer set for 1 sec interval
  
    //timer code end from here.
    //print questions here
    printQuestion(index);
    
});

//function to print question start
function printQuestion(i){
  $(".questionBox").text(questions[i].question);
  $(".optionBox span").eq(0).text(questions[i].option[0]);
  $(".optionBox span").eq(1).text(questions[i].option[1]);
  $(".optionBox span").eq(2).text(questions[i].option[2]);
  $(".optionBox span").eq(3).text(questions[i].option[3]);
}
//function to print question end

//function to check answer start
function checkAnswer(option){
  attempt++;
  
  let optionClicked = $(option).data("opt");
  
  //console.log(questions[index]);
  
  if(optionClicked == questions[index].answer){
    $(option).addClass("right");
    score++;
  }
  else{
    $(option).addClass("wrong");
    wrong++;
  }
  
  $(".scoreBox span").text(score);
  
  $(".optionBox span").attr("onclick","");
}
//function to check answer end

//function for next question start
function showNext(){
  if(index >= questions.length-1){
    showResult(0);
    return;
  }
  index++;
  
  $(".optionBox span").removeClass();
  $(".optionBox span").attr("onclick", "checkAnswer(this)");
  printQuestion(index);
  //console.log("hello world")
}
//function for next question end

//function for results start
function showResult(j){
  if(j == 1 &&
  index < questions.length -1 &&
  !confirm("quiz has not finished yet. Press Ok to Skip the quiz & get you final result.")
  ){
    return;
  }
  
  result();
}
$("#wrongans").text(wrong);
//function for results end

//Result function start
function result(){
  $("#questionScreen").hide();
  $("#resultScreen").show();
  
  $("#totalquestion").text(totalQuestion);
  $("#attemptquestion").text(attempt);
  $("#correctans").text(score);
}
//Result function end
