var msgInput = $("#msg")
var sendButton = $("#send")
var text = $("#msgDisplay")
var chatRoom = $("#room")
var roomList = $("#chatList")
var maxMsgs = 5
var db = firebase.database()
var msgMondiale = db.ref("pippos")

var viewMessages = function(x){
  
  var msgs = x.val()
  var l = msgs.length
  console.log(msgs)
  for (var i = l-maxMsgs;i<l;i++ ){
    
    var mex = msgs[i]
    var newP = $("<p>")
    newP.text(mex)
    text.prepend(newP)
  }
}

var sendMsg = function (){
   var name = $("#name").val()
   var msg =  msgInput.val()
  
   if(name != ": " && msg != ""){
  msgMondiale.push([name,msg])}
}

var updateText = function(x){
   text.empty()
  msgs = x.val()

  for(i in msgs){
    
    var msgName = msgs[i][0]
    var msgText = msgs[i][1]
    var newP = $("<p class='message'>")
    var newPname = $("<span class='senderName'>")
          newPname.text(msgName+": ")
    
    if(msgText.includes("/embed ")){
      var codeToEmbed = msgText.replace("/embed ","")
      newP.prepend($("codeToEmbed"))
      alert(codeToEmbed)
    }
       //If no commands are included
      else{
          var newPmsg = $("<span class='messageText'>")
          newPmsg.text(msgText)
          newP.prepend(newPmsg)
          }
    newP.prepend(newPname)
          text.prepend(newP)
     }
}

var dDos = function(){
  sendMsg()
  updateText(msgMondiale.val())
}

//msgInput.on("change",sendMsg)
sendButton.on("click",sendMsg)
msgMondiale.on("value",updateText)
//msgMondiale.on("value",viewMessages)

//Added later

var changeRoom = function(x){
   msgMondiale = db.ref(x.val())
  $(".display").empty()
  msgMondiale.on("value",updateText)
}

chatRoom.on("change",function(){
   msgMondiale = db.ref(chatRoom.val())
  $(".display").empty()
  msgMondiale.on("value",updateText)})

roomList.on("change",function(){
   msgMondiale = db.ref(roomList.val())
  $(".display").empty()
  msgMondiale.on("value",updateText)})