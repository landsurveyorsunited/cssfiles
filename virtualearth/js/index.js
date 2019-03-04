var map = null;
         var locations = null;
         var pixel = null;
         var clickEvent = null;
         var LL = null;

         function GetMap()
         {
            map = new VEMap('myMap');
           map.LoadMap(new VELatLong(32.7764750,-79.9310510), 12 ,'r' ,false);

            map.AttachEvent("onclick", PixelClick);

         }

         function PixelClick(e)
         {
   	        var x = e.mapX;
            var y = e.mapY;
            pixel = new VEPixel(x, y);
            LL = map.PixelToLatLong(pixel);

            map.FindLocations(LL, GetResults);

         }


         function GetResults(locations)
         {
      	    var s="Results for " + LL.Latitude + ", " + LL.Longitude + ": ";
            if(locations != null)
            {
	             s+=locations[0].Name;
               
            }
            else
            {
               s+="No Result found.";
            } 
              document.getElementById('Results').innerHTML = "<p>" + s + "</p>";
            //alert(s);
         }
