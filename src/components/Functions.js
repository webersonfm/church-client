function cpf(v) {
    v = v.replace(/\D/g, "")                    // Remove tudo o que não é dígito
    v = v.replace(/^(\d{3})(\d)/, "$1.$2")       // Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, "$1.$2")       // Coloca um ponto entre o sexto e o sétimo dígitos
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") // Coloca um hífen entre o nono e o décimo dígitos
    return v
}

function cnpj(v) {
    v = v.replace(/\D/g, "")                           // Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, "$1.$2")             // Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")           // Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, "$1-$2")              // Coloca um hífen depois do bloco de quatro dígitos
    return v
}

export { cpf, cnpj }