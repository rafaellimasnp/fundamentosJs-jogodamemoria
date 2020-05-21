function onLoad(){

    const dependencias = {
        tela: Tela, // agora a tela é uma classe global
        util: Util
    }

    //inicializar jogo da memoria
    const jogoDaMemoria = new JogodaMemoria(dependencias)
    jogoDaMemoria.inicializar()

    
}    

window.onload = onLoad;