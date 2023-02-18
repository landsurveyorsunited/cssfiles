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
addOption("Locations", "USA", "/hubs/USA");
addOption("Locations", "Asia", "/hubs/Asia");
addOption("Locations", "Africa", "/hubs/Africa");
addOption("Locations", "Europe", "/hubs/USA");
addOption("Locations", "Oceania", "/hubs/Oceania");
addOption("Locations", "North America", "/hubs/N+America");
addOption("Locations", "South America", "/hubs/S+America");
addOption("Locations", "Middle East", "/hubs/Middle+East");
addOption("Locations", "Caribbean", "/hubs/Caribbean");

addOption("Equipment", "Select an item", "", 1); //HEADER OPTION
addOption("Equipment", "PHP.net", "http://www.php.net");
addOption("Equipment", "mySQL", "http://www.mysql.com");

addOption("Employment", "Select an item", "", 1); //HEADER OPTION
addList("Employment", "Surveying Jobs", "", "Jobs-General");
addList("Employment", "Employment Tools", "", "Jobs-Tech");

addOption("Jobs-General", "Select an item", "", 1); //HEADER OPTION
addOption("Jobs-General", "Jobs Board", "/jobs");
addOption("Jobs-General", "Jobs Hub", "/hubs/jobs=join");
addOption("Jobs-General", "Post Job", "/hubs/jobs/post-job");
addOption("Jobs-General", "CV Generator", "/cv");

addOption("Jobs-Tech", "Select an item", "", 1); //HEADER OPTION
addOption("Jobs-Tech", "CV Generator", "/cv");
addOption("Jobs-Tech", "Resume Review", "/hubs/jobs/resume-review");
addOption("Jobs-Tech", "Share Resume", "/hubs/jobs/seeking");

addOption("Market", "Select an item", "", 1); //HEADER OPTION
addList("Market", "Equipment Types", "", "Market-Regular");
addList("Market", "Vendor Smarkets", "", "Market-Vendors");

addOption("Market-Regular", "Select an item", "", 1); //HEADER OPTION
addOption("Market-Regular", "Total Stations", "/topics/total-stations");
addOption("Market-Regular", "GPS GNSS", "/topics/survey-grade-gps");
addOption("Market-Regular", "Drones", "http://www.nissanusa.com");
addOption("Market-Regular", "Antique Equipment", "http://www.bmw.com");

addOption("Market-Vendors", "Select an item", "", 1); //HEADER OPTION
addOption("Market-Vendors", "Safety Apparel", "/hubs/safety-apparel");
addOption("Market-Vendors", "Survipod", "/hubs/survipod");
addOption("Market-Vendors", "Marketplace Hubs", "/marketplace");
addOption("Market-Vendors", "Entire Smarketplace", "/smarketplace");
