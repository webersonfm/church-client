function validaCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, '')  // Remove caracteres não numéricos

  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false  // Verifica se todos os dígitos são iguais

  let soma = 0
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let digito1 = 11 - (soma % 11)
  if (digito1 > 9) digito1 = 0

  soma = 0
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i)
  }
  let digito2 = 11 - (soma % 11)
  if (digito2 > 9) digito2 = 0

  return (parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2)
}

function validaCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]/g, '')  // Remove caracteres não numéricos

  if (cnpj.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cnpj)) return false  // Verifica se todos os dígitos são iguais

  // Validação do primeiro dígito
  let soma = 0
  let peso = 5
  for (let i = 0; i < 12; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso
    peso = peso === 2 ? 9 : peso - 1
  }
  let digito1 = 11 - (soma % 11)
  if (digito1 > 9) digito1 = 0

  // Validação do segundo dígito
  soma = 0
  peso = 6
  for (let i = 0; i < 13; i++) {
    soma += parseInt(cnpj.charAt(i)) * peso
    peso = peso === 2 ? 9 : peso - 1
  }
  let digito2 = 11 - (soma % 11)
  if (digito2 > 9) digito2 = 0

  return (parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2)
}

function cpf(v) {
  if (!v) return ""
  v = v.replace(/\D/g, "")  // Remove tudo o que não é dígito
  
  // Valida o CPF antes de formatar
  if (v.length === 11 && !validaCPF(v)) {
    return "CPF inválido"
  }

  v = v.replace(/^(\d{3})(\d)/, "$1.$2")       // Coloca um ponto entre o terceiro e o quarto dígitos
  v = v.replace(/(\d{3})(\d)/, "$1.$2")       // Coloca um ponto entre o sexto e o sétimo dígitos
  v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2") // Coloca um hífen entre o nono e o décimo dígitos
  return v
}

function cnpj(v) {
  if (!v) return ""
  v = v.replace(/\D/g, "")  // Remove tudo o que não é dígito

  // Valida o CNPJ antes de formatar
  if (v.length === 14 && !validaCNPJ(v)) {
    return "CNPJ inválido"
  }

  v = v.replace(/^(\d{2})(\d)/, "$1.$2")             // Coloca ponto entre o segundo e o terceiro dígitos
  v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Coloca ponto entre o quinto e o sexto dígitos
  v = v.replace(/\.(\d{3})(\d)/, ".$1/$2")           // Coloca uma barra entre o oitavo e o nono dígitos
  v = v.replace(/(\d{4})(\d)/, "$1-$2")              // Coloca um hífen depois do bloco de quatro dígitos
  return v
}

export { cpf, cnpj }