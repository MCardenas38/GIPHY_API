var topic=["cats","dogs","squirrl","fish","rabbit"];
    function create_buttons(){
        $("#buttons").empty();
        for(var i=0;i<topic.length;++i){
            $("#buttons").append($("<button>").attr('data-name',topic[i]).attr('data-state','still').text(topic[i]).attr("class","search"));
        }
    }

    create_buttons();

    $("#Submit").on("click",function(){
        event.preventDefault();
        topic.push($("#button_add").val());
        $("#button_add").val("");
        create_buttons();
    });

    $(document).on("click", ".search",function(){
        $("#pics").empty();
        var title= $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        title + "&api_key=k4I9UuSHelNzdQoHY9zqoWfDi4OYbnsT";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response);
            var target= response.data;
            for(var i=0;i<10;++i){
                var new_div= $("<div>").attr("class", "hold_pic").append($("<p>").text("Rating: "+target[i].rating)).append($("<img>").attr("src",target[i].images.fixed_width_still.url).attr("state","still").attr("still",target[i].images.fixed_width_still.url).attr("motion",target[i].images.fixed_width.url));
                $("#pics").append(new_div);
            }

        });

    });

    $(document).on("click", "img",function(){
        var state= $(this).attr("state");
        console.log(state);
        if(state==="still"){
            $(this).attr("state","active");
            $(this).attr("src",$(this).attr("motion"));
        }
        else{
            $(this).attr("state","still");
            $(this).attr("src",$(this).attr("still"));
        }
    });