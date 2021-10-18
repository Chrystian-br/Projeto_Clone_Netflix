$(function(){

    // Modificando o header de acordo com o scrollTop
    setInterval(()=>{
        var docScroll = $('body').scrollTop();

        if(docScroll > 0){
            $('header').css('background-color','#333')
        } else {
            $('header').css('background-color','transparent')
        }
    },100)

    // Aplicando efeitos no vídeo
    const video = document.getElementById('video-destaque');
    video.volume = 0;

    videoPlay();
    function videoPlay(){
        setTimeout(()=>{
            $('#video-destaque').fadeIn(1000);

            setTimeout(()=>{
                $('#video-destaque').fadeOut(500);
                video.currentTime = 0;

                videoPlay();
            }, 51000)
        },3000)
    }

    
    $('.mute').click(function(){
        let icon = $(this).find('i');

        if(icon.hasClass('fa-volume-mute') == true){
            icon.removeClass('fa-volume-mute').addClass('fa-volume-up');

            video.volume = 0.7;
        } else {
            icon.removeClass('fa-volume-up').addClass('fa-volume-mute');

            video.volume = 0;
        }
    })


    // Criando a lista de filmes em cartaz
    fetch('https://api.themoviedb.org/3/configuration?api_key=b368348c5d0f8e68285a3b26f014ec1b', {
        method: 'GET'
    })
    .then(response => response.json())
    .then((json)=>{
        let baseURL = `${json.images.base_url}/original`;
        
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=b368348c5d0f8e68285a3b26f014ec1b', {
            method: 'GET'
        })
        .then(response => response.json())
        .then((json)=>{
            for(let i = 0; i < json.results.length; i++){
                let img = baseURL + json.results[i].backdrop_path;
                let title = json.results[i].title;
                let desc = json.results[i].overview;
                let date = json.results[i].release_date;

                $('.vitrine').append(`
                    <div class="vitrine-single">
                    <img src="${img}">
                    <div class="info-vitrine-single">
                        <h2>${title}</h2>
                        <p>${desc}</p>
                        <span>${date}</span>
                    </div> <!--info-vitrine-single-->
                </div> <!--vitrine-single-->
                `)
            }
        })
    })
    .catch((err)=>{
        console.log(err)
    })

})