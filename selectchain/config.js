//var hide_empty_list=true; //uncomment this line to hide empty selection lists
var disable_empty_list=true; //uncomment this line to disable empty selection lists

var onclickaction="alert" //set to "alert" or "goto". Former is for debugging purposes, to tell you the value of the final selected list that will be used as the destination URL. Set to "goto" when below configuration is all set up as desired. 

var newwindow=0 //Open links in new window or not? 1=yes, 0=no.

/////DEFINE YOUR MENU LISTS and ITEMS below/////////////////

addListGroup("chainedmenu", "First-Select");

addOption("First-Select", "Select an item", "", 1); //HEADER OPTION
addList("First-Select", "Hubs", "", "Hubs");
addList("First-Select", "Employment", "", "Employment");
addList("First-Select", "Marketplace", "", "Market");

addOption("Hubs", "Select an item", "", 1); //HEADER OPTION
addList("Hubs", "Locations", "", "Locations");
addList("Hubs", "Equipment", "", "Equipment");
addList("Hubs", "Employment", "", "Employment");
addOption("Hubs", "CodingForums.com", "http://www.codingforums.com"); //END OF THIS NODE

addOption("Locations", "Select an item", "", 1); //HEADER OPTION
addOption("Locations", "JavaScript Kit", "http://www.javascriptkit.com");
addOption("Locations", "Dynamic Drive", "http://www.dynamicdrive.com");
addOption("Locations", "JavaScript Reference", "http://www.javascriptkit.com/jsref/");

addOption("Equipment", "Select an item", "", 1); //HEADER OPTION
addOption("Equipment", "PHP.net", "http://www.php.net");
addOption("Equipment", "mySQL", "http://www.mysql.com");

addOption("Employment", "Select an item", "", 1); //HEADER OPTION
addList("Employment", "General News", "", "News-General");
addList("Employment", "Tech News", "", "News-Tech");

addOption("News-General", "Select an item", "", 1); //HEADER OPTION
addOption("News-General", "CNN", "http://www.cnn.com");
addOption("News-General", "MSNBC", "http://www.msnbc.com");
addOption("News-General", "BBC News", "http://news.bbc.co.uk");
addOption("News-General", "Fox News", "http://www.foxnews.com");

addOption("News-Tech", "Select an item", "", 1); //HEADER OPTION
addOption("News-Tech", "News.com", "http://www.news.com");
addOption("News-Tech", "Wired News", "http://www.wired.com");
addOption("News-Tech", "TheRegister", "http://www.theregister.com");

addOption("Market", "Select an item", "", 1); //HEADER OPTION
addList("Market", "Regular Cars", "", "Market-Regular");
addList("Market", "Sports Cars", "", "Market-Vendors");

addOption("Market-Regular", "Select an item", "", 1); //HEADER OPTION
addOption("Market-Regular", "Toyota", "http://www.toyota.com");
addOption("Market-Regular", "Ford", "http://www.ford.com");
addOption("Market-Regular", "Nissan", "http://www.nissanusa.com");
addOption("Market-Regular", "BMW", "http://www.bmw.com");

addOption("Market-Vendors", "Select an item", "", 1); //HEADER OPTION
addOption("Market-Vendors", "Porsche", "http://www.www.porsche.com");
addOption("Market-Vendors", "Aston Martin", "http://www.astonmartin.com");
