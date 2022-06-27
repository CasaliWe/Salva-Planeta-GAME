
//Funções da file Index
function funcIndex(){
    document.getElementById('btn-inicial-index').addEventListener('click', ()=>{
           var tempoInput = document.getElementById('txtTempo').value
           window.location.href = "jogo.html?" + tempoInput
    })
}





//Funções da file inicio
function funcInicio(){

         
         //Efeito sonoro
         const tome = new Audio()
         tome.src = "./song/tome.mp3"
         const tiro = new Audio()
         tiro.src = "./song/tiro.mp3"
         const vitoria = new Audio()
         vitoria.src = "./song/vitoria-song.mp3"
         const regress = new Audio()
         regress.src = "./song/regres.mp3"
         const trilhaa = new Audio()
         trilhaa.src = "./song/trilhaa.mp3"



         //Som de tiro a cada clique
         document.getElementById('campo-jogo').addEventListener('click', ()=>{
               tiro.play()
         })



         
         //Contagem inical
         var inicalContagem = 3
         var diminui = setInterval(() => {
              document.getElementById('contagem-regress').textContent = `${inicalContagem}`
              inicalContagem--
              regress.play()
         }, 1000);
         
    //Clear contagem inicial e INICIO DO JOGO
    setTimeout(() => {
               document.getElementById('contagem-regress').remove()
               clearInterval(diminui)
               trilhaa.play()
               
               
        //Pontuação geral
         var pGeral = 0  
         var pLula = 0
         var pBozo = 0
         var pTrump = 0
         var pPutin = 0
         //tempo cronômetro
         var tempo = window.location.search
         tempo = tempo.replace('?', '')


         //Pegando personagem e tamanho da tela do jogo
         var personagem = document.querySelector('.personagem')
         var largura = 350 //igual ao px do container
         var altura = 420  //igual ao px do container 



        //Posição aleatória do personagem      
        var geraPersonagem = setInterval(randomPersonagem, 800);

        function randomPersonagem(){       
            var positionTop =  Math.floor(Math.random() * altura) - 80
            var positionLeft = Math.floor(Math.random() * largura) - 80

            positionTop = positionTop < 0 ? 0 : positionTop
            positionLeft = positionLeft < 0 ? 0 : positionLeft

            personagem.style.top = positionTop + 'px'
            personagem.style.left = positionLeft + 'px'
        } 



        //Mudança de presidente aleatório
        setInterval(() => {
            var aleatorio = Math.floor(Math.random() * 4) //De 0 a 4 radômico

             if(aleatorio == 0){
                  personagem.src = './img/lula.png'
             } else if(aleatorio == 1){
                personagem.src = './img/trump.png'
             } else if(aleatorio == 2){
                personagem.src = './img/bozo.png'
             } else if(aleatorio == 3){
                personagem.src = './img/putin.png'
             }
        }, 300);
                   

        
        
        //Acertando o personagem click
        document.querySelector('.personagem').addEventListener('click', ()=>{
            personagem.style.display = 'none'
            tome.play()
            acertouClick();
            pGeral++
            document.getElementById('mortes').textContent = `Mortes: ${pGeral}`
        })


        function acertouClick(){
                
                //Teste para ver qual presidente foi morto
                if(personagem.src.indexOf('lula')> -1){
                       pLula++
                } else if(personagem.src.indexOf('bozo')> -1) {
                       pBozo++
                } else if(personagem.src.indexOf('trump')> -1) {
                       pTrump++
                }  else if(personagem.src.indexOf('putin')> -1) {
                       pPutin++
                }

                setTimeout(() => {
                    personagem.style.display = 'block'  
                }, 100);                                    
        }  


        //Cronômetro
        var cronometro = setInterval(() => {
              tempo--
              document.getElementById('tempo').textContent = `Tempo: ${tempo}`
              if(tempo == 0){
                   clearInterval(geraPersonagem)
                   clearInterval(cronometro)
                   personagem.style.display = 'none'
                   document.getElementById('msg-final').style.display = 'block'
                   vitoria.play()
                   
                    //Inserir pontos na barra resultado final
                    document.getElementById('resTotal').textContent = `Total de mortes: ${pGeral}`
                    document.getElementById('resLula').textContent = `Lula: ${pLula}`
                    document.getElementById('resBozo').textContent = `Bolsonaro: ${pBozo}`
                    document.getElementById('resPutin').textContent = `Putin: ${pPutin}`
                    document.getElementById('resTrump').textContent = `Trump: ${pTrump}`

                   setTimeout(() => {
                       document.getElementById('msg-final').style.display = 'none'
                       document.getElementById('barra-final').style.cssText =  `height: 100vh; transition: all 1s;`
                   }, 2500);
              }
        }, 1000);

        //Reestart
        document.getElementById('reestart').addEventListener('click', ()=>{
            document.getElementById('barra-final').style.cssText =  `height: 0vh; transition: all 1s;`
            setTimeout(() => {
                window.location.href = "index.html"
            }, 1000);
        })

        
        //Sair
        document.getElementById('sair').addEventListener('click', ()=>{
               setTimeout(() => {
                    window.location.href = "index.html"
               }, 500);
        })


    }, 3800);
         
     
}