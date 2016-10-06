$(function(){
  // ask the server for songs, and then draw them
  getSongs();

  // listen for submit events and send new songs to the server
  $('form').on('submit', function(event){


      //console.log('check this', songs);
      event.preventDefault();
      var formData = $(this).serialize();
      $.ajax({
        type: 'POST',
        url: '/songs',
        data: formData,
        success: getSongs,
        //function to alert user that song is not alreay in list
        statusCode: {418: function () {
          alert('Your Not Orginal');
        }},

      });//end of ajax

    $(this).find('input[type=text]').val('');

  });//end of form submit
});

function getSongs() {
  $.ajax({
    type: 'GET',
    url: '/songs',
    success: function(songs){


      $('#songs').empty();
      var n = 0
      var dateAdded =timeStamp();//Date ();//make a variable that equals internal date funtion
      //console.log('todays date',dateAdded);
      $('#hideThis').val(dateAdded);

      songs.forEach(function(song){

        var $li = $('<li id="li'+n+'"></li>');
        $li.css('border', 'solid');
        $li.append('<p name=title >'+ song.title + '</p>');
        $li.append('<p name=artist >by: '+ song.artist + '</p>');
        $li.append('<p name=dateAdded >Date Added to List: ' + dateAdded + '</p>')//add date to list
        $li.append('<button type=click class=removeButton id="'+n+'">Remove</button>');
        n+=1;
        $('#songs').append($li);

        //console.log('object of songs', songs);//see object

        //button function to remove object from array
        //failed at removing info from server so setled for remove from html
        $('.removeButton').click(function () {
                var i = parseInt(this.id);
               console.log('button test ' + i);
               $("#li"+ i).remove();
               });
      });
    }
  });
}
//cleaner date funtion then built in date funtion
function timeStamp() {
  var d = new Date();

  var month = d.getMonth()+1;
  var day = d.getDate();

  var output = d.getFullYear() + '/' +
      ((''+month).length<2 ? '0' : '') + month + '/' +
      ((''+day).length<2 ? '0' : '') + day;
  //console.log(output);
  return output;
}
