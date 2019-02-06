var cartip=document.createElement("div") //Dynamically create tooltip element
cartip.setAttribute("id", "cartooltip")
document.body.appendChild(cartip)
var cartooltipobj=document.getElementById("cartooltip")
var rightcolumnobj=document.getElementById("rightcolumn")

function ietruebody(){
return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body
}

document.getElementById("rightcolumn").onmouseover=function(){ //show tooltip
var titletext=document.getElementById("cartitle")? document.getElementById("cartitle").innerHTML : "DD Forums Archive"
cartooltipobj.innerHTML=titletext
cartooltipobj.style.left=rightcolumnobj.offsetLeft+rightcolumnobj.offsetWidth-180+"px"
cartooltipobj.style.top=rightcolumnobj.offsetTop+rightcolumnobj.offsetHeight-40+"px"
cartooltipobj.style.visibility="visible"
}

document.getElementById("rightcolumn").onmouseout=function(){ //hide tooltip
document.getElementById("cartooltip").style.visibility="hidden"
}
