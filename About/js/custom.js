/**
 * Fb video downloader
 * @type Javascript Class
 */

/**
 * show download link 
 * call ajax function
*/
  $("#videodownload").click(function() {

      // url 
      var vid_url = $("#url").val();

      /**
       * valid url is correct 
      */
      if(isUrlValid(vid_url)){    

        $('#videodownload').button('loading');
        $(".result").hide();
        $("#bar").css("display","block");
        $("#hd").html('');
        $("#sd").html('');
        
        //ajax call
        $.ajax({
          type:"POST",      
          dataType:'json',
          url:'service.php',
          data:{url:vid_url},
          // success function 
          success:function(data){
            console.log(data);

            if(data.type=="success") {
              // show snackbar message
              var x = document.getElementById("snackbar-success");
              x.className = "show";
              setTimeout(function(){ 
                x.className = x.className.replace("show", ""); 
              }, 3000);


              var img_link = $("#url").val().split("/")[5];
              
              // video title
              $("#title").html(data.title);
              
              // video source
              $('#video').attr('src', data.sd_download_url);
              $("#video")[0].load();
              $("#source").html('<a id="vid_url" href="'+vid_url+'">'+vid_url+'</a>');
              
              // SD video quality download link
              $("#sd").html('<a href="'+data.sd_download_url+'"  class="btn btn-block btn-color" download="sd.mp4">Download SD</a>');

              // HD video quality download link
              if(data.hd_download_url){
                $("#hd").html('<a href="'+data.hd_download_url+'"  class="btn btn-block btn-color" download="hd.mp4">Download HD</a>');
              }
              
              // button reset
              $('#videodownload').button('reset');

              //show result div
              $(".result").show();
            }

            // error function 
            if(data.type=="failure"){
              // show snackbar message
              var x = document.getElementById("snackbar-error");
              x.className = "show";
              setTimeout(function(){ 
                x.className = x.className.replace("show", ""); 
              }, 3000);

              // button reset
              $('#videodownload').button('reset');
            }           
          }
        })
      }
      /**
       * valid url is incorrect 
      */
      else {

          // show snackbar message
          var x = document.getElementById("snackbar-error");
          $(x).html("Invalid URL/ PLease Enter the correct URL for download the video");
          x.className = "show";
          setTimeout(function(){ 
            x.className = x.className.replace("show", ""); 
          }, 3000);
          // button reset
          $('#videodownload').button('reset');
      }
    });

    //Validations for url
    function isUrlValid(url) {
        return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    }    