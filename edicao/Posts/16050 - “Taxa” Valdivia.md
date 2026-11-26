---
tipo: "post"
post_id: 16050
aliases: ["“Taxa” Valdivia"]
publicado_em: "2011-12-20"
autor: "[[Pessoas/Bender|Bender]]"
temas: ["[[Temas/Tema 799d9789dd5c|Números]]","[[Temas/Tema 95b74b923492|Palmeiras]]"]
---

# “Taxa” Valdivia

LinkLinkLinkLink

[![[Anexos/eca0228ae85540967bc5.jpg]]
[Imagem (original)](<http://www.blablagol.com.br/wp-content/uploads/2011/12/belluzzo-simbolo-palmeiras-436.jpg>)](<http://www.blablagol.com.br/wp-content/uploads/2011/12/belluzzo-simbolo-palmeiras-436.jpg>)

Economista sem HP

O Palmeiras fechou um acordo com o banco Banif por Valdivia.

Segundo os dados da [reportagem](<https://web.archive.org/web/*/http://globoesporte.globo.com/futebol/times/palmeiras/noticia/2011/12/por-valdivia-palmeiras-faz-crediario-e-pagara-157-em-juros-ate-2015.html> "Captura ainda não verificada. Endereço original: http://globoesporte.globo.com/futebol/times/palmeiras/noticia/2011/12/por-valdivia-palmeiras-faz-crediario-e-pagara-157-em-juros-ate-2015.html"), o verdão pagará **157%** de juros. Fazendo os R$ 36 milhões atuais sobre os R$ 14 milhões iniciais chegamos em tal cifra. Mas vamos um pouco além dos jornalistas…

A matéria traz que o Palmeiras irá saldar a carta de crédito que tomou junto ao banco em 48 parcelas de R$ 750 mil cada. Excel ou HP12C na mão e *contas pra que te quero*.  
 n = 48  
 PV = -14.000.000  
 FV = ~~36.000.000~~ 0  
 PMT = 750.000  
 Na HP aperta o “i” para chamar a taxa. No excel já sai direto na fórmula TAXA.  
 Resultado: **Juros de ~~5,97%~~ 4,79% AO MÊS.**

O antigo presidente do Palmeiras formado em Economia foi o responsável pelo “negoção”. A direção atual tem que mandar essa:

*“Demos uma parceladinha. Como há juros, natural que o valor seja um pouco maior”* – Walter Munhoz, vice financeiro

Camarada meu outro dia foi pegar empréstimo no Banco do Brasil na pessoa física e conseguiu uma taxa de juros de 3% ao mês.


[31Comentarios](<http://www.blablagol.com.br/taxa-valdivia-16050#comments>) [[Posts/16050 - “Taxa” Valdivia|no acervo]]  [_Imagem não recuperada para leitura offline._ [Enviar por e-mail (original)](<http://www.blablagol.com.br/wp-content/plugins/wp-email/images/email.gif>)](<http://www.blablagol.com.br/taxa-valdivia-16050/email/>)[Enviar por e-mail](<http://www.blablagol.com.br/taxa-valdivia-16050/email/>)

# Comentários

## 20/12/2011 17:32 - [[Pessoas/Andre Bona|Andre Bona]] - #115184 ^comentario-115184

Os juros aí dão uma dica do risco que o Palmeiras representa para uma instituição financeira.

5,97% a.m. = 100,53% a.a. Vou tomar um café e depois vou apresentar o lucro do Banco na operação, que vai ajudar a bater a meta do semestre e arrancar no resultado final para os acionistas.

## 20/12/2011 18:40 - [[Pessoas/Andre Bona|Andre Bona]] - #115192 ^comentario-115192

Primeira observação:

Receio que Bender tenha calculado erroneamente a taxa de juros mensal, a saber:

PV: 14 MM (CHS)  
 PMT: 750 K  
 N: 48  
 i = 4,79% a.m e não 5,97%

## 21/12/2011 9:17 - Nome não exibido - #115271

Considerei o Valor Futuro na conta. Se não considerar, a HP ou o Excel colocam 0 (zero) para o Valor Futuro, e a taxa encontrada fica sendo a TIR (taxa interna de retorno), que foi o que vc encontrou na conta (4,79%).

E ainda fui conservador, pois fiz tb sem pagamento no período zero. Se colocar pagamento no período zero a taxa de juros mensal, inclusive, **aumenta para 6,26%**.

## 21/12/2011 16:38 - Nome não exibido - #115333

Para calcular a TIR na HP, usa-se o CF0, e CFJ e não PV, PMT e FV.

Essa sua conta está, com toda certeza, equivocada. Não é necessário usar o FV para determinação dos juros dessa operação. Apenas o principal, o prazo e o pmt.

## 21/12/2011 17:04 - Nome não exibido - #115343

Bona,  
 na HP ou Excel os resultados são:

taxa de juros com pagamento da primeira parcela em t1 = 5,97%  
 taxa de juros com pagamento da primeira parcela em t0 = 6,26%  
 TIR = 4,79%

Como trata-se de um financiamento utiliza-se a taxa de juros. Se fosse um projeto (investimento) poderíamos utilizar a TIR.

## 21/12/2011 17:09 - Nome não exibido - #115344

Sim, logo o que afirmei está correto. O juros da operação (OU TIR, neste caso) é 4,79% e não 5,97%.

## 21/12/2011 17:15 - Nome não exibido - #115346

De qualquer forma é totalmente fora de cogitação calcular com pagamento em T0. Isso é apenas uma forma acadêmica de apresentar a situação.

Se eu pego 14 milhoes e pago a primeira parcela de 750.000 em T0, obviamente não estou financiando 14 mm, mas sim 13.250.000 em 47 X 750 k.

## 21/12/2011 17:17 - Nome não exibido - #115347

Se preferir, não precisa usar HP ou Excel.

Achei um link aqui (muito fácil achar por sinal) que mostra a fórmula do cálculo. faz por ela que vai bater com o que to te falando.

[http://www.mundoeducacao.com.br/matematica/calculo-financiamento.htm](<https://web.archive.org/web/*/http://www.mundoeducacao.com.br/matematica/calculo-financiamento.htm> "Captura ainda não verificada. Endereço original: http://www.mundoeducacao.com.br/matematica/calculo-financiamento.htm")

## 21/12/2011 18:17 - Nome não exibido - #115356

E onde eu disse que sua conta estaria errada?

São conceitos. Há aqueles que gostam do payback como uma forma de avaliação. Uns preferem o VPL. Outros a TIR. A taxa de empréstimo é diferente da taxa de desconto para um mesmo fluxo.  
 Nesse caso, utilizei todos os dados disponíveis. O FV entrou na conta para o cálculo desse financiamento. E, utilizando tal dado, o resultado é 5,97%. Mas vc tem razão, poderia não ter utilizado. E, ignorando tal dado, o resultado é 4,79%. Que seria a TIR, mais usada para avaliação de projetos.

*“Se eu pego 14 milhoes e pago a primeira parcela de 750.000 em T0, obviamente não estou financiando 14 mm, mas sim 13.250.000 em 47 X 750 k.”*  
 Perfeito. Seu erro foi dizer (agora sim vou apontar um erro na sua concepção)

*“Isso é apenas uma forma acadêmica de apresentar a situação”*  
  **De forma alguma**. Eu inclusive já fiz um empréstimo junto ao banco dessa forma. É totalmente aplicável.

## 21/12/2011 18:51 - Nome não exibido - #115365

Sim, é aplicável, mas nao faz sentido.

## 21/12/2011 18:55 - Nome não exibido - #115367

Bender, o juros dessa operação é de 4,79% a.m., pelos dados que vc mostrou.

Se você quer comparar essa situação com as linhas de crédito utilizadas pela maior parte das pessoas, com parcelas fixas, essa taxa de juros é 4,79%.

Para avaliação de projetos, eu não usaria a TIR, mas sim o VPL, que considera o custo de oportunidade.

## 21/12/2011 19:03 - Nome não exibido - #115368

Sobre ser aplicável ou não, é o seguinte: o que interessa é você saber do custo do dinheiro que vc tá tomando.

Se o banco diz que a taxa de juros dele é de 5% a.m. com pagamento em T0, obviamente o custo do dinheiro pra você não é de 5% a.m. é maior.

Se o banco pratica o desconto comercial, que você bem lembrou, e divulga que a taxa de desconto é de 5%, então está claro que você está tomando o recurso a mais do que 5% a.m., uma vez que a modalidade de desconto comercial aplica a taxa sobre o valor de face e não sobre o valor “emprestado”.

Essas variáveis são milhares.

Eu entendi no seu post que a idéia era fazer um comparativo (como inclusive você fez no final de um amigo que foi no BB pleitear uma linha de crédito) com as taxas de mercado e mostrar o quao absurda aparenta ser o custo dessa operação num valor desse nível para uma instituição do tamanho do Palmeiras, ainda mais efetivado por um economista.

Posso te afirmar categoricamente que o 3% de taxa que você informou do seu amigo, pelas modalidades de crédito disponiveis no BB, compara-se ao 4,79% a.m. e a nenhuma outra taxa.

A idéia não era teorizar… enfim… aconteceu.

## 21/12/2011 22:42 - Nome não exibido - #115374

*“entendi no seu post que a idéia era fazer um comparativo (como inclusive você fez no final de um amigo que foi no BB pleitear uma linha de crédito) com as taxas de mercado e mostrar o quao absurda aparenta ser o custo dessa operação num valor desse nível para uma instituição do tamanho do Palmeiras, ainda mais efetivado por um economista.”*

Bona, é exatamente isso.  
 A conta que fiz esta certa. Mas vc tem razao quanto a comparaçao que eu quis fazer no post com referencia a taxa de 3% que consegue-se sem maiores problemas na pessoa fisica num banco comercial acessivel a todos. Portanto, corrigi o post pois faz **mais** sentido comparar com os 4,79% mesmo. Reconheço e agradeço-lhe.  
 Como o conceito do post esta correto, a ediçao foi facil, apenas troquei o numero.

Pois eh… sao milhares de variaveis… tem todos esses meandros das taxas de desconto e capitalizaçao. Eh desconto comercial, “por fora”, “por dentro”… O banco te diz que a taxa cobrada eh de 5% por um emprestimo, se vc for fazer a conta certamente dara mais de 5%, pois custos e outras tarifas estao embutidas na taxa.

Agora,

A cobrança da 1a prestaçao em t0 faz sentido ja que o banco rapa de cara essa parcela. A instituiçao te empresta 14, vc deve esses 14, mas so recebe 13,75. Isso é feito com frequencia.

VPL e TIR trabalham juntos, sao meio que complementares, ja que a TIR eh a taxa que torna o VPL nulo. Eh dificil ver um estudo abordando apenas um desses.

## 22/12/2011 0:48 - Nome não exibido - #115377

Blz.

Aí teríamos que detalhar também o CET – custo efetivo e não somente os juros e bla bla bla… didaticamente é desnecessário.

Eu sei dessa forma com cobrança em t0. Eu mesmo já fiz também operação dessa, como cliente, há tempos atrás. O lance é que é mais uma forma de esconder taxa. O que eu quis dizer que “não faz sentido” é que 99% não faz a conta real do custo do dinheiro e o banco não está mentindo ao dizer uma taxa que, se calculada corretamente, dá outro valor, mais alto, como custo do dinheiro no tempo. Enfim, técnicas de vendas e produtos com sofisticações exclusivamente para manipular.

Eu até fico contente quando vejo um médico da vida contratar operações assim. Os trocentos anos de estudo dele não servem pra nada nessa hora. Vai ser enrabado do mesmo jeito que um aposentado analfabeto de salário mínimo pelo INSS… é engraçado isso!

Uma vez eu li um artigo que fazia projeção do total de custo de juros na vida de uma pessoa de classe média. Rapaz, trabalhar bem essa questão pode levar uma pessoa a tornar-se milionária.

## 22/12/2011 9:29 - Nome não exibido - #115401

*“99% não faz a conta real do custo do dinheiro”*

A maioria não sabe fazer a conta. Vai trocar de carro e o vendedor da concessionária diz que os juros do financiamento são de 0,99% ao mês. Se vc fizer as contas com os mesmos dados que ele utilizou, vc verifica que os juros que vc paga efetivamente acaba saindo pra lá dos 2%.  
 Não estou dizendo que o cara está “mentindo”. Mas que ele está **omitindo** não tenho dúvidas. Faz parte da estratégia de vendas. Acontece o mesmo com relação ao gerente do banco. E também não culpo tal maioria que é ignorante quanto ao assunto. A reforma pra isso é estrutural. Tem que ser na base, na escola. Ao invés de ter que aprender as cadeias de carbono da química orgânica, o tempo deveria ser gasto em ensinar o moleque a calcular juros.  
 Por isso que aqui todo mundo estuda pra passar em concurso público e não para aprender. Brasileiro quer viver na mamata. Não é empreendedor.

## 20/12/2011 18:47 - [[Pessoas/Andre Bona|Andre Bona]] - #115197 ^comentario-115197

Dias antes da operação, chegou um investidor no banco com o valor de R$ 28.480.469,62, querendo investir no banco.

O banco então fechou um CDB com taxa pré-fixada de 1% ao mês (o que equivale a 116% do CDI – taxa novembro 2011)!.

O combinado entre o banco e o investidor é que esse mesmo CDB será resgatado em 48 parcelas compostas de juros + amortização.

Dessa forma o investidos fez o seguinte investimento:

Aplicação: R$ 28.480.469,62  
 Juros: 1% a.m.  
 Parcelas do resgate: 48  
 Valor de cada resgate: R$ 750.000,00

## 20/12/2011 21:27 - Nome não exibido - #115211

Teve FGO, FGI ou Fampe cobrindo 80% da operação? rsrsrsrsr

## 21/12/2011 7:52 - Nome não exibido - #115258

La garantia soy jo!

kkk…

## 20/12/2011 18:53 - [[Pessoas/Andre Bona|Andre Bona]] - #115199 ^comentario-115199

Encaixando a operação:

O investidor depositou os 28 milhoes e os quebrados na conta do banco.

Agora temos:

- O banco possui o compromisso de pagar 48 parcelas de 750 mil ao investidor  
 - O palmeiras possui o compromisso de pagar 48 parcelas ao banco  
 - O investidor depositou 28 milhoes  
 - O banco emprestou 14 milhoes ao Palmeiras  
 - O valor a receber do Palmeiras coincide com o valor a pagar ao investidor  
 - Portanto, a diferença entre 28.480.469,62 e 14.000.000,00 = 14.480.469,62  
 - Essa diferença, foi o lucro do banco na operação.

Gostaram do lucro???

É assim que funciona. O banco já coloca o dinheiro a vista no lucro. Como instituição intermediária, ele empresta o dinheiro dos clientes poupadores para os clientes investidores e fica com a diferença, o spread da taxa.

Agora cabe ao banco apenas monitorar as cobranças do compromisso do palmeiras e repassá-los ao investidor.

Qual o risco do banco? Se o Palmeiras não pagar, ele tá fodido. vai ter que tirar do bolso. Por isso deve ser criterioso na concessão do crédito. Se tiver o aval do C-13 (como tinha) melhor ainda.

## 20/12/2011 18:57 - Nome não exibido - #115200

Um banco americano faria diferente:

Considerando que 100% do CDI é uma boa taxa, ele diria ao cliente investidor: ofereço uma taxa de 0,86% ao mês = 100% CDI.

Mas se vc quiser COMPRAR A DIVIDA DO PALMEIRAS, posso te oferecer 1% ao mês = 116% do CDI.

Que diferença teria?

A diferença que NESTE CASO, o banqueiro americano, malandro que é, sai do risco. Agora o risco do Palmeiras não pagar, é DO CLIENTE. Foda-se, colocou o lucro no bolso e adeus!

## 21/12/2011 9:28 - Nome não exibido - #115273

Bona, é moleza verificar o spread bancário. Não precisa fazer conta. Basta verificar quanto o banco remunera sua grana quando o gerente quer te vender um CDB, e quanto ele cobra pelo uso do cheque especial.

## 21/12/2011 16:44 - Nome não exibido - #115334

Claro, não calculei pra mim nem pra você.

Calculei pra galera entender. Normalmente me dizem assim: “mas o banco só vai ter o lucro depois que o cliente pagar tudo”… não entendem que são eles mesmos que tornam o casamento dos prazos possível, assim como o lucro imediato. Quis mostrar como foi rentável e lucrativa a operação. Emprestou 14 milhoes e ganhou mais 14 no exemplo.

## 21/12/2011 8:43 - [[Pessoas/Johannes|Johannes]] - #115268 ^comentario-115268

Olha…

Vcs todos estão desconsiderando algo primordial nessa conta: o tempo onde o palmeiras deixou de pagar. A continha de padeiro que vcs estão fazendo só faria sentido se o empréstimo tivesse sido feito a data 0. Como foi feito há quase 2 anos atrás as contas são totlamente diferentes.

## 21/12/2011 9:36 - Nome não exibido - #115274

E o Palmeiras amortizou parte da dívida nesse período? Se sim, quanto? Ou pagou algo de juros nesse período? Se sim, qual taxa foi utilizada?

A notícia linkada no post é da mesma data do post, ontem 20/dez/2011 (o período zero considerado), e contém

*O clube parcelou a dívida que tem com o Banif em 48 pagamentos, de valores não confirmados oficialmente, mas que chegam a aproximadamente R$ 750 mil cada.*

A conta é feita a partir do fechamento do negócio entre credor e devedor com os dados que temos.

## 21/12/2011 16:33 - Nome não exibido - #115332

Perfeito.

## 22/12/2011 7:21 - [[Pessoas/Andre Bona|Andre Bona]] - #115387 ^comentario-115387

“VPL e TIR trabalham juntos, sao meio que complementares, ja que a TIR eh a taxa que torna o VPL nulo. Eh dificil ver um estudo abordando apenas um desses.”

Bender, eu discordo. Vou expor meu raciocínio:

A TIR do projeto não tem nada a ver com o VPL. Eu acho que pode-se desprezar completamente a TIR para análise de viabilidade de projetos.

Veja:

Se vou analisar um projeto, utilizo o VPL. Ao utilizar o VPL, preciso definir uma taxa de retorno mínima. Hoje eu definiria essa taxa como? Bom, se a Selic é 11% a.a. e o risco do projeto é moderado, não aceito menos do que 25% a.a. Então utilizo o 25% a.a. como parâmetro.

Faço o VPL, se der positivo, a decisão de investir é positiva. Caso contrário, não haverá investimento.

Pronto! Tá decidido! Não preciso da TIR aqui.

Se o VPL for nulo, aí posso afirmar apenas que a TIR é igual a taxa de retorno mínima aceitável. Mas a TIR por si só, não me diz nada.

Outro ponto:

Calculo a TIR de um projeto. 5% a.a.  
 Então uso a TIR para o cálclo do VPL. O VPL deu positivo? Não. Sempre dará nulo pois usei a mesma taxa. Não ajuda na decisão de investir ou não. Pois se a Selic é 11%, por exemplo, pra que eu vou investir num projeto de retorno de 5%? Ou se a TIR for 10% e a inflação projetada para o período também for 10%? Não vale de nada, sacou?

Serve apenas pra vc dizer: esse projeto pode dar x% de retorno a.a. Mas isso não basta. Porque a taxa mínima de retorno é o parâmetro que você vai usar. a taxa mínima e o VPL são plenamente suficientes para a tomada de decisão. A TIR nem precisa ser calculada.

## 22/12/2011 9:20 - Nome não exibido - #115400

A TIR pode ajudar a definir a tomada de decisão caso 2 projetos possuam VPL similares. São infinitas contas e vários instrumentos para avaliação. A TIR é mais um parâmetro. O projeto que tem TIR maior, será mais atrativo.

## 22/12/2011 16:57 - Nome não exibido - #115427

Cara, mas terá maior TIR aquele projeto cujo VPL seja mais elevado. certo?

Logico que estamos considerando o mesmo volume de investimento necessário.

## 22/12/2011 21:45 - Nome não exibido - #115443

Considerando o mesmo volume inicial, acho que sim. Com volumes iniciais de investimento diferentes ja nao tenho certeza.

## 22/12/2011 21:59 - Nome não exibido - #115447

Volumes diferentes, também, a TIR nao dá a resposta absoluta. O que é melhor? UMA OPORTUNIDADE com TIR de 10% com valor absoluto de retorno de 1 milhao ou uma TIR de 8% com volume absoluto de 100 milhoes?

## 22/12/2011 22:36 - Nome não exibido - #115451

Fiz um exemplo no excel com volumes iniciais diferentes.  
 Projeto A: -7, 2, 3, 1.  
 Projeto B: -5, 1, 0, 3.  
 Os VPLs sao iguais, porém a TIR A \> TIR B.
