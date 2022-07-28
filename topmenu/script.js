MyList='Home,Info,Portfolio,Servizi,Contatti,Blog'.split(',');
function gELM(w){return document.getElementById(w);}
function Enlarge(w){
  NmId=w.split("_")[1];
  for(i=0;i<MyList.length;i++){
    if(MyList[i]!==NmId){
      gELM('But_'+MyList[i]).style.backgroundColor='transparent';
      gELM('But_'+MyList[i]).style.color='#555555';
      gELM('Sub_'+MyList[i]).className='SubHome_SINGLE';
      gELM('Sub_'+MyList[i]).style.height='0px';
    }
  }
  Hgt=gELM('Sub_'+NmId).style.height.split("px")[0]>0?0:400;
  Opac=Hgt!==0?' OpacOn':'';
  ColorBG=Hgt!==0?gELM('Sub_'+NmId).style.backgroundColor:'white';
  ColorTX=Hgt!==0?'#ffffff':'#555555';
  gELM(w).style.backgroundColor=ColorBG;
  gELM(w).style.color=ColorTX;
  gELM('Sub_'+NmId).className='SubHome_SINGLE'+Opac;
  gELM('Sub_'+NmId).style.height=Hgt+'px';
}