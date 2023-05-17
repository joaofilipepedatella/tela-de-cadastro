class Validator {

    constructor(){
        this.validations = [            
            'data-min-length',
            'data-max-length',
            'data-only-letters',
            'data-email-validate',
            'data-required',            
            'data-equal',
            'data-password-validate'
        ]    
    }

    //iniciar a validação de todos os campos

    validate(form) {

        //resgata todas as validacoes
        let currentValidations = document.querySelectorAll('form .error-validation')

        if(currentValidations.length){
            this.cleanValidations(currentValidations)
        }

        //pegar os inputs
        let inputs = form.getElementsByTagName('input')        

        //transforma uma HTMLCollection -> Array

        let inputsArray = [...inputs]

        //loop nos inputs e validação mediante aos que for encontrado

        inputsArray.forEach(function(input, obj){

            //loop em todas as validações existentes

            for(let i = 0; this.validations.length > i; i++){

                if(input.getAttribute(this.validations[i]) != null) {

                    //limpando a string para virar um método
                    let method = this.validations[i].replace("data-","").replace("-" , "")

                    //valor do input
                    let value = input.getAttribute(this.validations[i])

                    //invocar o método
                    this[method](input, value)
                } 
            }
        }, this)
    }

    minlength(input, minValue) {

        let inputLength = input.value.length

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`

        if(inputLength < minValue) {
            this.printMessage(input, errorMessage)
        }
    }

    maxlength(input, maxValue) {
        let inputLength = input.value.length

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`

        if(inputLength > maxValue) {
            this.printMessage(input, errorMessage)
        }
    }

    //metodo que confirma que ha apenas letras na string
    onlyletters(input){
        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value

        let errorMessage = `Este campo nao aceita numeros, nem caracteres especiais`

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage)
        }
    }

    //metodo para validar o email
    emailvalidate(input){
        let re = /\S+@\S+\.\S+/

        let email = input.value

        let errorMessage = `Insira um email no padrao email@email.com`

        if(!re.test(email)){
            this.printMessage(input, errorMessage)
        }
    }


    //verificar se um campo esta igual ao outro
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0]

        let errorMessage = `Este campo precisa ser igual ao ${inputName}`

        if(input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage)
        }
    }


    //metodo para exibir inputs que sao necessarios
    required(input){

        let inputValue = input.value

        if(inputValue === '') {
            let errorMessage = `Este campo e obrigatorio`

            this.printMessage(input, errorMessage)
        }
    }

    //validando password
    passwordvalidate(input){

        //explodir String em Array
        let charArr = input.value.split("")

        let uppercases = 0
        let numbers = 0

        for(let i = 0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases++

            }else if(!isNaN(parseInt(charArr[i]))){
                numbers++
            }
        }

        if(uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa de um caractere maiusculo e um numero`

            this.printMessage(input, errorMessage)
        }
    }

    //método para imprimir mensagens de erro na tela
    printMessage(input, msg) {

        //checa os erros presentes no input
        let errorsQty = input.parentNode.querySelector('.error-validation')


        //imprimir erros so se nao houver erros
        if(errorsQty === null){
        let template = document.querySelector('.error-validation').cloneNode(true)

        template.textContent = msg

        let inputParent = input.parentNode

        template.classList.remove('template')

        inputParent.appendChild(template)
        }
    }

    //limpa as validacoes da tela
    cleanValidations(validations){
        validations.forEach(el => el.remove())
    }
}

let form = document.getElementById("register-form")
let submit = document.getElementById("btn-submit")

let validator = new Validator()

// evento dispara as validações

submit.addEventListener('click', function(e) {
    e.preventDefault()

    validator.validate(form)
})