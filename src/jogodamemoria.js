class JogodaMemoria{
    /*
        Se mandar um obj = {tela: 1, idade:2, etc:3} 
        vai ignorar o resto das propriedades e pegar somente a propriedade tela

    */
    constructor({ tela , util}){
        this.tela = tela
        this.util = util
        this.heroisIniciais = [
            {img: './arquivos/batman.png', nome: 'batman'},
            {img: './arquivos/ciclop.png', nome: 'ciclop'},
            {img: './arquivos/deadpool.png', nome: 'deadpool'},
            {img: './arquivos/mulhermaravilha.png', nome: 'mulhermaravilha'}
        ]

        this.iconePadrao = './arquivos/default.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }
// nao precisamos do static neste caso
//coloca todos os herois na tela

    inicializar(){
        this.tela.atualizarImagens(this.heroisIniciais)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
        this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this))

    }

   async embaralhar(){
        const copias = this.heroisIniciais
        //duplicar herois
        .concat(this.heroisIniciais)

        .map(item =>{
            return Object.assign({}, item, {id: Math.random()/0.5})
        })

        .sort(()=> Math.random()-0.5)

        
        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()
        const idDoIntervalo = this.tela.iniciarContador()

        //vamos Esperar 1 segundo para atualiar a tela 

        await this.util.timeout(3000)
        this.tela.limparContador(idDoIntervalo)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
            
       

    }

    esconderHerois(herois){
        //vamos trocar a imagem de todos os herois existentes pelo icone padrao
        // como fizemos no constructor vamos extrair somente o necessário
        // usado a sintaxe ({chave: 1}) estamos falando que só vamos retornar o que tiver 
        //dentro dos parenteses
        //quando noa usamos : (exemplo do id), o Js entende que o nome é o mesmo do valor. ex: id: id, vida apenas id 

        const heroisOcultos = herois.map(({nome, id}) =>({
            id,
            nome,
            img: this.iconePadrao
        }))

        //Atualizamos a tela com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)
        // guarda os herois para saber quem quais os IDs, depois
        this.heroisEscondidos = heroisOcultos
    }

    exibirHerois(nomeHeroi){
        //vamos procurar o heroi pelo nome em nosos Heroisiniciais, obter somente a img dele
        const { img } = this.heroisIniciais.find(({ nome }) => nomeHeroi === nome) 
        this.tela.exibirHerois(nomeHeroi, img)
    }

    verificarSelecao(id, nome) {
        const item = { id, nome}
        // alert(`Olá: ${nome}, id: ${id}`)
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados) {
            case 0: 
                this.heroisSelecionados.push(item)
                break;
            case 1: 
                const [ opcao1 ] = this.heroisSelecionados
                // zerar itens, para nao selecionar mais de dois
                this.heroisSelecionados = []
                let deveMostrarMensagem = false
                if(opcao1.nome === item.nome && opcao1.id !== id) {
                    deveMostrarMensagem = true 
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    return;
                }
                this.tela.exibirMensagem(false)
                break;
        }
    }

    mostrarHeroisEscondidos() {
        const heroisEscondidos = this.heroisEscondidos
        for (const heroi of heroisEscondidos) {
            const { img } = this.heroisIniciais.find(item => item.nome === heroi.nome)
            heroi.img = img
        }
        this.tela.atualizarImagens(heroisEscondidos)
    }

    jogar(){
       this.embaralhar()
    }
}