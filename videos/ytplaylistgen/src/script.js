/*
https://www.youtube.com/watch?v=PkZNo7MFNFg
https://www.youtube.com/watch?v=uMuYaES4W3o
https://www.youtube.com/watch?v=TlB_eWDSMt4
https://www.youtube.com/watch?v=u_vMChpZMCk
https://www.youtube.com/watch?v=484iWaZQJbo
https://www.youtube.com/watch?v=NgGLFozNM2o
https://www.youtube.com/watch?v=VjcEBbmJWEw
https://www.youtube.com/watch?v=ss10re-tjwo
https://www.youtube.com/watch?v=j8eBXGPl_5E
https://www.youtube.com/watch?v=OVHE6C3XQy0
https://www.youtube.com/watch?v=MflUMIeADZU
https://www.youtube.com/watch?v=Mus_vwhTCq0
*/
youtubeUrls.value = `https://www.youtube.com/watch?v=PkZNo7MFNFg\nhttps://www.youtube.com/watch?v=uMuYaES4W3o\nhttps://www.youtube.com/watch?v=TlB_eWDSMt4\nhttps://www.youtube.com/watch?v=u_vMChpZMCk\nhttps://www.youtube.com/watch?v=484iWaZQJbo\nhttps://www.youtube.com/watch?v=NgGLFozNM2o\nhttps://www.youtube.com/watch?v=VjcEBbmJWEw\nhttps://www.youtube.com/watch?v=ss10re-tjwo\nhttps://www.youtube.com/watch?v=j8eBXGPl_5E\nhttps://www.youtube.com/watch?v=OVHE6C3XQy0\nhttps://www.youtube.com/watch?v=MflUMIeADZU\nhttps://www.youtube.com/watch?v=Mus_vwhTCq0`;
$(".create").click(function() {
  list = $("#youtubeUrls")
    .val()
    .split("\n");
  playlist = [];
  for (str in list) {
    str = list[str];
    if (str.toLowerCase().includes("youtube.com/watch?v=")) {
      str = str.split("youtube.com/watch?v=").slice(-1)[0];
      // console.log(str);
      playlist.push(str);
    }
  }

  if (playlist != [] && playlist != "") {
    newTab = "target='_blank'"; // If wanted in a new tab //
    plStr = "https://www.youtube.com/embed/?playlist=" + String(playlist);
    console.log(plStr);
    $("#playlistLink").html(
      "<a href='" + plStr + "'" + newTab + ">" + plStr + "</a>"
    );
  } else {
    $("#playlistLink").html(
      "<span class='nolink'>Add Some Youtube Links!  : )</span>"
    );
  }
});
