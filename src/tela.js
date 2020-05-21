const util = Util
const ID_CONTEUDO = "conteudo"
const ID_JOGAR = "jogar"
const ID_MOSTRAR = "mostrarTudo"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const ID_BOTAO_MOSTRAR_TUDO = "mostrarTudo"
const MENSAGENS = {
    sucesso: {
        texto: "Combinação correta!",
        classe: "alert-success"
    },
    erro: {
        texto: "Combinação incorreta!",
        classe: "alert-danger"
    }
}
class Tela{
    static obterCodigoHtml(item) {
        return `
        <div class="col-md-3">
                <div class="card" style="width: 50%;" onclick ="window.verificarSelecao('${item.id}','${item.nome}')">
                    <img name="${item.nome}" src="${item.img}" class="card-img-top" alt="..." />
                </div>
                <br />
            </div>  
        
        
        `
    }  

    static alterarConteudoHTML(codigoHTML){
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHTML
    } 

    static gerarStringHTMLPorImagem(itens){
        //  Para cada item da lista vai executar a função obterCodigoHTML
        //  e ao  final vai concatenar tudo em uma unica string
        //  muda de Array para string

        return itens.map(Tela.obterCodigoHtml).join('')
    }

    static atualizarImagens(itens){
        const codigoHTML = Tela.gerarStringHTMLPorImagem(itens)
        Tela.alterarConteudoHTML(codigoHTML)
    }

    static configurarBotaoJogar(funcaoOnClick){
        const btnJogar = document.getElementById(ID_JOGAR)
        btnJogar.onclick = funcaoOnClick

    }

    static configurarBotaoVerificarSelecao(funcaoOnClick){
        window.verificarSelecao = funcaoOnClick
    } 

    static exibirHerois(nome,img){

        // para cada elemento encontrado, vamos trocar sua img

        const elements = document.getElementsByName(nome)
        elements.forEach(item => (item.src = img))
    }

    static async exibirMensagem(sucesso = true) {
        
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso) {
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
        }
        else {
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText = MENSAGENS.erro.texto
        }

        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIVEL)
        
    }

    static exibirCarregando(mostrar = true){
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar){
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carregando.classList.add(CLASSE_INVISIVEL)

    }

    static iniciarContador(){
        let contarAte = 3
        const elementoContador = document.getElementById(ID_CONTADOR)
        const identificadorNoTexto = "$$contador"
        const textoPadrao = `Começando em ${identificadorNoTexto} segundos ...`

        const atualizarTexto = ()=>(elementoContador.innerHTML = textoPadrao.replace(identificadorNoTexto, contarAte--))
        atualizarTexto()
        const idDoIntervalo = setInterval(atualizarTexto, 1000)
        return idDoIntervalo

    }

    static limparContador(idDoIntervalo){
        clearInterval(idDoIntervalo)
        document.getElementById(ID_CONTADOR).innerHTML = ""
    }

    static configurarBotaoMostrarTudo(funcaoOnclick) {
        const btnMostrarTudo = document.getElementById(ID_BOTAO_MOSTRAR_TUDO)
        btnMostrarTudo.onclick = funcaoOnclick
    }

}