const allresulturl = "https://research.utm.my/all-result/"
$(document).ready(function () {
	$.ajaxSetup({
		cache: false
	});
	$('#search').keyup(delay(function (e) {
		
		var searchField = $('#search').val();
		var expression = new RegExp(searchField, "i");
		var loopnama = 0,
			loopcoe = 0,
			looppub = 0,
			looprg = 0,
			loopip = 0,
			loopkwd = 0;
		if ($(this).val() != '') {
			$("#result").show();
			console.log('Loading')
			$("#result ul").html('Loading...');
			$.getJSON('https://www.utm.my/dev/ajaxsearch/json.php?q=' + searchField, function (data) {
				console.log('data loaded')
				$("#result ul").html('');
				$("#result ul").show();
				$.each(data, function (key, value) {
					if (loopnama < 3) {
						$content = '<li class="list-group-item link-class"><a href="https://utmscholar.utm.my/Scholar/ScholarInfoDetails/' + value.HASHID_INFO + '" target="_blank"> ' + value.NAMA;
						if (value.CENTER_OF_EXCELLENCE != null) {
							$content += ' | <span class="text-muted">' + value.CENTER_OF_EXCELLENCE
						}
						$content += ' | <span class="text-muted">' + value.SCHOOL + '</span></a></li>';
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
				// After key up
				if (loopnama > 0) {
					$('#result .people').show()
				} else {
					$('#result .people').hide()
				}
				if (loopkwd > 0) {
					$('#result .expertise').show()
				} else {
					$('#result .expertise').hide()
				}
				if (looprg > 0) {
					$('#result .research_group').show()
				} else {
					$('#result .research_group').hide()
				}
				if (loopcoe > 0) {
					$('#result .coe').show()
				} else {
					$('#result .coe').hide()
				}

				q = "&q=" + searchField
				type = ""
				if (loopnama >= 3) {
					type = "?type=expert"
					$('#result .people').append('<li class="list-group-item link-class"><a href="' + allresulturl + type + q + '">View All</a></li>');
				}
				if (looprg >= 3) {
					type = "?type=rg"
					$('#result .research_group').append('<li class="list-group-item link-class"><a href="' + allresulturl + type + q + '">View All</a></li>');
				}
				if (loopcoe >= 3) {
					type = "?type=coe"
					$('#result .coe').append('<li class="list-group-item link-class"><a href="' + allresulturl + type + q + '">View All</a></li>');
				}
			});
			$.getJSON('https://www.utm.my/dev/ajaxsearch/json_publication.php?q=' + searchField, function (datapub) {
				$.each(datapub, function (key, value) {
					if (looppub < 3) {
						$('#result .publication').append(
							'<li class="list-group-item link-class"><a href ' + value.SUB_JUDUL + '</span></li>');
						looppub++;
					}
				});
				if (looppub > 0) {
					$('#result .publication').show()
				} else {
					$('#result .publication').hide()
				}
				if (looppub >= 3) {
					type = "?type=publication"
					$('#result .publication').append('<li class="list-group-item link-class"><a href="' + allresulturl + type + q + '">View All</a></li>');
				}
			});
			$.getJSON('https://dgmicro.utm.my/api/ip/GetSearchIP?system=INNOCOMMS&validation=KEYAPI-INNOCOMMS-2021-0008&query=' + searchField, function (datapub) {
				$.each(datapub.GetSearchIP, function (key, value) {
					if (loopip < 3) {
						if (value.TITLE_INNOVATION != null) {
							console.log(value.TITLE_INNOVATION)
							$('#result .ip').append(
								'<li class="list-group-item link-class"> ' + value.TITLE_INNOVATION + '</span></li>');
							loopip++;
						}
					}
				});
				if (loopip > 0) {
					$('#result .ip').show()
				} else {
					$('#result .ip').hide()
				}
				type = "?type=ip"
				if (loopip >= 3) {
					$('#result .ip').append('<li class="list-group-item link-class"><a href="' + allresulturl + type + q + '">View All</a></li>');
				}
				console.log('loopip: '+loopip)
			});


		} else {
			$("#result").hide();
			$("#result ul").hide();
			loopnama = 0,
			loopcoe = 0,
			looppub = 0,
			looprg = 0,
			loopip = 0,
			loopkwd = 0;
		}
	}, 2000));

	//   $('#result').on('click', 'li', function () {

	//     var click_text = $(this).text().split('|');
	//     window.open($.trim(click_text[3]), '_blank');
	//     //   $('#search').val($.trim(click_text[3]));
	//     //   $("#result").html('');
	//   });

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