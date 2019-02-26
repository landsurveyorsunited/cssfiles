//var hide_empty_list=true; //uncomment this line to hide empty selection lists
var disable_empty_list=true; //uncomment this line to disable empty selection lists

var onclickaction="alert" //set to "alert" or "goto". Former is for debugging purposes, to tell you the value of the final selected list that will be used as the destination URL. Set to "goto" when below configuration is all set up as desired. 

var newwindow=0 //Open links in new window or not? 1=yes, 0=no.

/////DEFINE YOUR MENU LISTS and ITEMS below/////////////////

addListGroup("chainedmenu", "First-Select");

addOption("First-Select", "Select an item", "", 1); //HEADER OPTION
addList("First-Select", "Webmaster Resources", "", "Webmaster");
addList("First-Select", "News Sites", "", "News");
addList("First-Select", "Car Sites", "", "Cars");

addOption("Webmaster", "Select an item", "", 1); //HEADER OPTION
addList("Webmaster", "JavaScript Links", "", "Webmaster-JavaScript");
addList("Webmaster", "PHP Links", "", "Webmaster-PHP");
addOption("Webmaster", "CodingForums.com", "http://www.codingforums.com"); //END OF THIS NODE

addOption("Webmaster-JavaScript", "Select an item", "", 1); //HEADER OPTION
addOption("Webmaster-JavaScript", "JavaScript Kit", "http://www.javascriptkit.com");
addOption("Webmaster-JavaScript", "Dynamic Drive", "http://www.dynamicdrive.com");
addOption("Webmaster-JavaScript", "JavaScript Reference", "http://www.javascriptkit.com/jsref/");

addOption("Webmaster-PHP", "Select an item", "", 1); //HEADER OPTION
addOption("Webmaster-PHP", "PHP.net", "http://www.php.net");
addOption("Webmaster-PHP", "mySQL", "http://www.mysql.com");

addOption("News", "Select an item", "", 1); //HEADER OPTION
addList("News", "General News", "", "News-General");
addList("News", "Tech News", "", "News-Tech");

addOption("News-General", "Select an item", "", 1); //HEADER OPTION
addOption("News-General", "CNN", "http://www.cnn.com");
addOption("News-General", "MSNBC", "http://www.msnbc.com");
addOption("News-General", "BBC News", "http://news.bbc.co.uk");
addOption("News-General", "Fox News", "http://www.foxnews.com");

addOption("News-Tech", "Select an item", "", 1); //HEADER OPTION
addOption("News-Tech", "News.com", "http://www.news.com");
addOption("News-Tech", "Wired News", "http://www.wired.com");
addOption("News-Tech", "TheRegister", "http://www.theregister.com");

addOption("Cars", "Select an item", "", 1); //HEADER OPTION
addList("Cars", "Regular Cars", "", "Cars-Regular");
addList("Cars", "Sports Cars", "", "Cars-Sports");

addOption("Cars-Regular", "Select an item", "", 1); //HEADER OPTION
addOption("Cars-Regular", "Toyota", "http://www.toyota.com");
addOption("Cars-Regular", "Ford", "http://www.ford.com");
addOption("Cars-Regular", "Nissan", "http://www.nissanusa.com");
addOption("Cars-Regular", "BMW", "http://www.bmw.com");

addOption("Cars-Sports", "Select an item", "", 1); //HEADER OPTION
addOption("Cars-Sports", "Porsche", "http://www.www.porsche.com");
addOption("Cars-Sports", "Aston Martin", "http://www.astonmartin.com");
