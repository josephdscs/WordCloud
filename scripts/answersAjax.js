$(function () {

    var $startDate = $('#startDate');
    var $endDate = $('#endDate');
    //var $content = $('#content');

    var siteTemplate = $('#site-template').html();

   /* function readAnswers(res) {
        $sites.append(Mustache.render(siteTemplate, site));
    };*/

    function addDays(anyDate) {
        var someDate = new Date(anyDate);
        var numberOfDaysToAdd = 7;
        someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
        var dd = someDate.getDate();
        var mm = someDate.getMonth() + 1;
        var y = someDate.getFullYear();

        var someFormattedDate = y + '-' + mm + '-' + dd;
        return someFormattedDate
    };


    $('#showMe').on('click', function () {

        let content = {
            "startDate": $startDate.val(),
            "endDate": $endDate.val(),
            "compareStartDate": addDays($startDate.val()),
            "compareEndDate": addDays($endDate.val()),
            "locale": "en",
            "categoryId": null,
            "articleType": null,
            "channel": null,
            "country": null,
            "breakdown": null,
            "sortType": 1,
            "pageSize": 40,
            "page": 1,
            "breakdownPageSize": 40
        };

        $.ajax({
            type: 'POST',
            url: 'https://wix.wixanswers.com/api/v1/analytics/tickets/topIssues',
            data: newSite,
            success: function (res) {
                readAnswers(res);
            }
        });
    });

    // listen to remove items that aren't there yet
    // delegate bc it applies to things that haven't been created and things that are existing
   /* $sites.delegate('.remove', 'click', function () {

        var $li = $(this).closest('li');

        $.ajax({
            type: 'DELETE',
            url: '/api/site/' + $(this).attr('data-id'),
            success: function () {
                $li.fadeOut(250, function () {
                    $(this).remove();
                });
            }
        });
    });
*/
   /* $sites.delegate('.editSite', 'click', function () {
        var $li = $(this).closest('li');

        $li.find('input.title').val($li.find('span.title').html());
        $li.find('input.content').val($li.find('span.content').html());
        $li.addClass('edit');
    });*/

  /*  $sites.delegate('.cancelEdit', 'click', function () {
        $(this).closest('li').removeClass('edit');
    });

    $sites.delegate('.saveEdit', 'click', function () {
        var $li = $(this).closest('li');

        //console.log('LI', $li);

        var site = {
            title: $li.find('input.title').val(),
            content: $li.find('input.content').val()
        };

        $.ajax({
            type: 'PUT',
            url: '/api/site/' + $li.attr('data-id'),
            data: site,
            success: function (newSite) {
                $li.find('span.title').html(site.title);
                $li.find('span.content').html(site.content);
                $li.removeClass('edit');
            },
            error: function () {
                alert('error updating site');
            }
        });
    });*/

});

//http://rest.learncode.academy/api/josephdscs/test