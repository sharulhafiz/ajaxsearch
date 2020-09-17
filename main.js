	$(document).ready(function () {
	  $.ajaxSetup({
	    cache: false
	  });
	  $('#search').keyup(delay(function (e) {
	    console.log('tekan')

	    $("#result ul").show();
	    $("#result ul").html('');
	    var searchField = $('#search').val();
	    var expression = new RegExp(searchField, "i");
	    var loopnama = 0,
	      loopcoe = 0,
	      looppub = 0,
		  looprg = 0;
		  loopkwd = 0;
	    if ($(this).val() != '') {
	      $.getJSON('https://www.utm.my/dev/ajaxsearch/json.php?q=' + searchField, function (data) {
	        console.log('data loaded')
	        $.each(data, function (key, value) {
	          if (loopnama < 3) {
	            $content = '<li class="list-group-item link-class"> ' + value.NAMA;
	            if (value.CENTER_OF_EXCELLENCE != null) {
	              $content += ' | <span class="text-muted">' + value.CENTER_OF_EXCELLENCE
	            }
	            $content += ' | <span class="text-muted">' + value.SCHOOL + '</span></li>';
	            $('#result .people').append($content);
	            loopnama++;
	          }
	          if (loopkwd < 3) {
	            if (value.KEYWORDS != null) {
	              $('#result .expertise').append(
	                '<li class="list-group-item link-class"> ' + value
	                .KEYWORDS + '</span></li>');
	              loopkwd++;
	            }

	          }
	          if (looprg < 3) {
	            if (value.RESEARCH_GROUP != null) {
	              $('#result .research_group').append(
	                '<li class="list-group-item link-class"> ' + value
	                .RESEARCH_GROUP + '</span></li>');
	              looprg++;
	            }

	          }
	          if (loopcoe < 3) {
	            if (value.CENTER_OF_EXCELLENCE != null) {
	              $('#result .coe').append(
	                '<li class="list-group-item link-class"> ' + value
	                .CENTER_OF_EXCELLENCE + '</span></li>');
	              loopcoe++;
	            }

	          }

	        });
	      });
	      $.getJSON('https://www.utm.my/dev/ajaxsearch/json_publication.php?q=' + searchField, function (datapub) {
	        $.each(datapub, function (key, value) {
	          if (looppub < 3) {
	            $('#result .publication').append(
	              '<li class="list-group-item link-class"> ' + value
	              .SUB_JUDUL + '</span></li>');
	            looppub++;
	          }
	        });
	      });


	    }
	  }, 2000));

	  $('#result').on('click', 'li', function () {

	    var click_text = $(this).text().split('|');
	    window.open($.trim(click_text[3]), '_blank');
	    //   $('#search').val($.trim(click_text[3]));
	    //   $("#result").html('');
	  });

	  function delay(callback, ms) {
	    var timer = 0;
	    return function () {
	      var context = this,
	        args = arguments;
	      clearTimeout(timer);
	      timer = setTimeout(function () {
	        callback.apply(context, args);
	      }, ms || 0);
	    };
	  }
	});
