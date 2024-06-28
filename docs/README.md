# Gestão de Logística para Empresas de Transporte ( GLET )


**Albert Luís, albertluis123y88@hotmail.com**

**Lucas Randazzo, lucasrandazzo2@gmail.com**

**Lucas Giovine, lfalcone@sga.pucminas.br**

**Vitor Rebula, devrebula@gmail.com**

---

Professores:

** Cleiton Silva Tavares **

** Ivan Luiz Vieira de Araújo **

---

Curso de Engenharia de Software

Instituto de Informática e Ciências Exatas – Pontifícia Universidade Católica de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil

---

**Resumo** 

Desenvolvemos o GLET para que seja um aplicativo para logística de empresas de transporte, com o objetivo de otimizar e organizar as operações diárias. O aplicativo permite o cadastro de funcionários, que podem ser motoristas ou ajudantes, e veículos, com a possibilidade de atribuir manutenções a estes veículos. Além disso, é possível cadastrar fornecedores e associar materiais a eles, facilitando a gestão de suprimentos. Uma funcionalidade central do sistema é o cadastro de serviços, que permite agendar datas, prever prazos de término e associar funcionários e veículos a cada serviço. O objetivo principal do projeto é proporcionar uma ferramenta eficiente para a gestão logística, melhorando a coordenação e a execução das atividades. Como resultado relevante, o aplicativo demonstrou uma melhora significativa na eficiência operacional, reduzindo o tempo gasto na gestão de tarefas logísticas, além de aumentar a precisão e a confiabilidade das informações gerenciadas.

---


## 1. Introdução

O projeto consiste em um software para gestão de processos logísticos em empresas de transporte, partindo da gestão de frota e equipe, agendamento de serviços e gestão de estoque.

### 1.1 Contextualização

O Mercado de Transportes no Brasil é um dos principais eixos da economia Brasileira, fator que se tornou observável em 2018 durante greve do setor, mais especificamente dos caminhoneiros. Segundo estudo divulgado em 2018 pela Secretaria de Política Econômica do então Ministério da Fazenda, o Brasil obteve um prejuízo de 15,9 bilhões de reais em 10 dias de paralisação. O ocorrido prejudicou o abastecimento de supermercados, farmácias, postos de combustível, dentre outros pilares da sociedade. 

Dessa forma, é necessário ressaltar que a gestão de logística para as empresas do setor de transportes é um dos pontos mais cruciais de seus negócios. A operação é o que move as transportadores, e infelizmente há um número limitado de softwares de gestão, principalmente voltados às pequenas empresas ou para aquelas que buscam uma plataforma mais simples. Há aqueles que buscam plataformas mais robustas, que acabam sendo um alto investimento inacessível para organizações com menor poder aquisitivo, fazendo com que apenas as grandes empresas possam ter acesso a esse tipo de benefício. De acordo com o presidente do SEBRAE, Luiz Barretto, as pequenas empresas são responsáveis por cerca de 30% do PIB do Brasil, evidenciando que mais olhares deveriam ser direcionados a estas, não apenas no ramo da logística. 

### 1.2 Problema

Um dos problemas que as empresas do setor logístico brasileiro podem se deparar são a falta de integração entre as ferramentas utilizadas para gestão. Existem diversas maneiras de gerir o cadastro de funcionários, outras inúmeras para realizar a gestão de frota e fornecedores, incontáveis agendas para controle de operação e agendamento dos serviços. Porém, as plataformas que já se propoem a resolver tal problema acabam tendo valores inacessíveis e/ou incorporam funcionalidades demais, que podem acabar fugindo do básico essencial e não serem bem aproveitadas por empresas pequenas ou que buscam processos simples.

Com isso, muitas organizações que se enquadram em um perfil de pequeno porte, em uma situação de reestruturação ou que simplesmente buscam novas formas de gerência, acabam tomando decisões que impactarão negativamente seu futuro. Optam por ferramentas distintas para cada aspecto de uma logística, ferramentas complexas demais, ou com um valor que foge de seu orçamento. Essas escolhas podem ocasionar em processos morosos, repetitivos em quantidades desnecessárias ou em prejuízos financeiros futuramente, pedindo por uma reorganização que será muito mais demorada e custosa devido à grande base de dados que terão levantado durante sua atuação.

### 1.3 Objetivo geral

O objetivo geral do projeto é propor uma plataforma integrada, onde as empresas de transporte consigam realizar a gestão dos pilares mais básicos de uma logística. Estes são: gestão de frota, gestão de equipe, agendamento/consulta em calendário e gestão de fornecedores. Diferente de outras plataformas, a GLET traz simplicidade, praticidade e acessibilidade em um só lugar, para aquelas empresas iniciantes no mercado ou que estão buscando reestruturação. 

#### 1.3.1 Objetivos específicos

1. Promover um software que seja capaz de realizar agendamento de serviços, considerando a frota disponível, a mão de obra e as especificações descritas para o mesmo;
2. Desenvolver um sistema onde o responsável pela logística tenha fácil acesso e consiga cadastrar e alterar dados rapidamente, de acordo com função, qualidade, observações e especificicações de sua equipe operacional;
3. Estabelecer uma aplicação que seja capaz de gerir todos os aspectos relacionados à frota;
4. Prover uma plataforma que será capaz de exibir dados dos fornecedores da empresa cadastrada, como por exemplo produtos comprados, preço, condições de compra, dentre outros, de fácil acesso à consultas.

### 1.4 Justificativas

Tendo em vista as dificuldades que passam empresas pequenas ou empresas em processo de reestruturação de gerência logística, as quais estão em busca de uma plataforma mais simples, o software GLET se mostra como uma solução para tais problemas. A escolha inadequada da ferramenta que irá gerir um negócio pode ocasionar em mal uso da plataforma dentro do cenário corporativo, gastos excessivos com uma solução mal explorada, difícil entendimento, dentre diversas outras consequências. Assim, observamos uma necessidade em contribuir para um maior lucro a essas empresas, através de uma aplicação com ótimo custo-benefício, funcionalidades chave para um negócio em ascensão e de fácil uso.

## 2. Participantes do processo

Por se tratar de um software personalizado e não de uso extensivo, os participantes do processo estariam sempre relacionados à empresa que estiver utilizado os serviços, sendo de diversas idades, culturas e costumes. Porém, é possível abordá-los como 4 grupos no geral, sendo eles:

| Número | Participante do Processo |
| -------- | ------------------------- |
| 1 | O gestor logístico: esse será o principal usuário do sistema, uma vez sendo o responsável por realizar processos cadastrais de frota e equipe, assim como acompanhar os serviços agendados; |
| 2 | A equipe de Vendas: ao conseguir fechar um serviço, entrará no software e realizará o agendamento, registrando as exigências específicas quanto a equipe, veículo, e outras possíveis observações; |
| 3 | O time de compras: constantemente em contato com os fornecedores, realizando o cadastro dos mesmos e adquirindo ferramentas necessárias para o funcionamento da empresa em seus conformes; |
| 4 | O cliente: embora não estará em contato direto com o software, será o consumidor final, que terá em sua experiência contratando uma empresa de logística um reflexo do bom uso do software GLET; |

Ao analisar os 4 principais participantes do processo, estabelecemos a criação de 4 Personas, sendo estas referentes a cada um dos participantes do processo. Dessa forma, vamos observar o comportamento, hábitos, rotina e especificidades de cada um dos 4 e entender como a solução impactaria em cada uma de suas vidas.


| Vitor | Antes do GLET | Depois do GLET |
| ------------- | ------------- | ------------- |
| Descrição Geral  | Vitor, 31 anos, é responsável por administrar e gerenciar o setor logístico de sua empresa. Graduado em administração, com MBA em logística, trabalha como supervisor geral do setor há 3 anos. É altamente motivado por melhorias, sempre busca por novas maneiras de integrar a equipe e melhorar o serviço prestado. É extremamente competitivo e apaixonado pelo mundo automobilístico, buscando sempre crescer e mostrar seu valor dentro da empresa.| Gestor Logístico |
| Rotina | Atualmente, a rotina de Vitor é bem massante. Tem como sua principal tarefa diária auxiliar os vendedores na marcação e agendamento dos serviços, observando a capacidade operacional e de frota. | Agora também supervisiona os demais serviços que estão sendo realizados no dia, e passa uma breve parte do seu tempo conversando com os ajudantes e motoristas, buscando entender onde podem melhorar. No fim da tarde, Vitor retorna ao escritório, confere os documentos a serem lançados e rapidamente realiza o cadastro dos mesmos. |
| Motivação no Trabalho  | Vitor busca fazer reuniões e treinamentos com os responsáveis por mover as operações, porém, acaba não tendo muito tempo, uma vez que está concentrado em diversas tarefas repetitivas. Com isso, grande parte do seu dia é obrigatoriamente em um computador, não podendo estar tão presente como gostaria nas operações. | Está cada vez mais integrado com o setor operacional e sua equipe como um todo, fazendo reuniões, palestras e treinamentos, acompanhando os serviços de perto, podendo entender cada vez mais onde melhorar, e altamente motivado pois consegue ver de perto os frutos do seu trabalho. |
| Relacionamento Gestor-Equipe | Embora Vitor faça o máximo possível para manter um contato próximo com a sua equipe, seu relacionamento é conturbado, uma vez que, por não conseguir estar presente em todos os setores, não compreende todas as demandas e especificações. Dessa forma, o stress e clima com certos funcionários não está adequado. | Agora que Vitor está mais integrado com outros setores além do time de vendas, o clima organizacional melhorou. Vitor compreende de perto o surgimento dos problemas, não fica dentro de um escritório dando ordens sem entender ao certo o que ocorre. Consegue falar com propriedade, ajudando-os a obter melhores resultados. |


| Lucas | Antes do GLET | Depois do GLET |
| ------------- | ------------- | ------------- |
| Descrição Geral  | Lucas, 27 anos, formado em Administração com Pós-Graduação em Gestão Comercial. Sempre foi um jovem apaixonado por vendas, extrovertido, buscando manter-se atualizado sobre estratégias de marketing e persuasão. Tem o sonho de ter seu próprio negócio. Atualmente, trabalha em uma transportadora, onde gosta bastante do que faz, uma vez que tem a possibilidade e liberdade de mostrar sua criatividade e inovação. |  Participante da Equipe de Vendas |
| Rotina | Lucas trabalha presencialmente apenas 2 vezes por semana, que é quando busca realizar as pendências e inconveniências que surgem nos agendamentos dos serviços via telefone. Tem como função principal função a captação de novas empresas, porém, encontra dificuldades ao avaliar custos operacionais e a entender a situação do time operacional em sua empresa. | Lucas, ainda trabalhando duas vezes presencialmente, utiliza parte de seus dias presenciais para visitar setores da empresa que trabalha e participar dos treinamentos feitos pelo Vitor, permitindo que entenda melhor a situação da organização e possa acompanhar as vendas de acordo com os recursos que têm disponível, evitando erros na hora de fechar um contrato. Dessa forma, seu tempo trabalhando presencialmente não é mais gasto apenas agendando serviços e resolvendo erros, já que, devido a uma maior acertividade e velocidade em fazer a maior parte dos seus agendamentos semanais online, pode visitar o operacional e se atualizar sobre a situação atual. | 
| Motivação no Trabalho  | A motivação principal de Lucas é conseguir fechar contratos. Entretanto, fica extremamente frustrado por não conseguir fechar um negócio devido a uma informação que não chegou a ele corretamente, ou pela falta de momentos para entender a situação da sua empresa. | Lucas encontra-se altamente motivado, pois com mais conhecimento sobre a operação de sua empresa, tornou-se um vendedor melhor. |
| Relacionamento Gestor-Equipe | O relacionamento de Lucas com todos os times é muito saudável, todos possibilitam que ele trabalhe com autonomia para agir da forma que ele achar mais eficiente. Por outro lado, o clima não é bom com o setor operacional, que acaba omitindo certas informações chave, na sua visão. | Lucas, através dos treinamentos de Vitor, conseguiu estabelecer um bom relacionamento com o setor operacional, ao entender que a dificuldade de certas informações chegarem até ele eram frutos da falta de integração dos times como um todo, e não devido à incompetência do operacional. |


| Pedro | Antes do GLET | Depois do GLET |
| ------------- | ------------- | ------------- |
| Descrição Geral  | Pedro, 23 anos, é formado em Administração. Atualmente trabalha como gestor de compras em uma transportadora. Organizado, proativo e paciente, Pedro consegue comprar os materiais e peças sempre com o melhor preço e qualidade possível, um verdadeiro prodígio para o Setor.  | Participante do Time de Compras |
| Rotina | Pedro constantemente marca reuniões com os Vendedores de diferentes locais, buscando criar uma tabela de preços dos materiais e peças, que constantemente sofre mudanças conforme as negociações de preços. Pedro encontra dificuldades no tempo de compra, uma vez que precisa se comunicar diretamente com o Gestor de Logística para saber como está o Abastecimento nas Operações. Assim, ocorrem imprevistos como falta de estoque, aumentando os custos operacionais. | Pedro continua com uma rotina parecida, porém, ao invés de atualizar a sua planilha de cotações, Pedro atualiza o GLET. Consegue acessar todas as informações que precisa bem detalhadas e atualizadas, sem precisar contatar o gestor logístico. |
| Motivação no Trabalho  | Pedro é motivado pelos restultados de seu trabalho. Por ser bastante perfeccionista, acaba cobrando demais de si quando ocorre algum imprevisto de estoque. | Pedro agora se encontra em um ótimo clima, tendo todas as ferramentas necessárias para que não haja nenhum imprevisto com o estoque.|
| Relacionamento Gestor-Equipe | Pedro se dá bem com todos os gestores, apesar de alguns desentendimentos com o gestor de logística, uma vez que acaba levando a culpa pela falta de recursos nas operações. | Pedro se dá bem com todos gestores, seus pequenos desentendimentos com o Gestor de Logística foram resolvidos, e Pedro se encontra muito mais integrado e bem relacionado com o resto da equipe. |


| Thiago | Antes do GLET | Depois do GLET |
| ------------- | ------------- | ------------- |
| Descrição Geral  | Thiago, 41 anos, é o CEO de uma madeireira. Atualmente responsável por acompanhar a expedição em sua empresa, que é feita por uma transportadora terceira que realiza o transporte de sua sede até os clientes. Por ter começado sua empresa há pouco tempo, Thiago anda muito ocupado pois estão aumentando a expedição, o que o impede de acompanhar os envios de perto. | O cliente | 
| Rotina | Thiago conta com mais dois funcionários no setor administrativo, porém, devido ao momento em que a empresa se encontra, administrar todos os envios está sendo muito cansativo. | Thiago, agora com o gestor de Logística da empresa terceira mais presente na operação, consegue focar mais no administrativo de sua empresa, demandando menos tempo em acompanhar o processo da logística. |
| Motivação no Trabalho  | Por ser um empresário, Thiago está sempre motivado a buscar melhorias na prestação de serviço e na qualidade do seu produto, não medindo esforços para ver seu negócio prosperar. Infelizmente está exausto devido à forte necessidade em acompanhar os processos da empresa terceira, que está cometendo muitos erros. |  Com um gestor logístico mais interado na operação, Thiago pôde focar suas energias em prosperar a estrutura interna de sua empresa, permitindo que a terceirização demande pouco de seu tempo. |
| Relacionamento com a Transportadora | Thiago estava a poucos passos de encerrar seu contrato com a transportadora, por mais que tivesse uma boa relação com Vitor. Estavam ocorrendo muitos problemas por parte da logística, o que afetava diretamente seus negócios. | Thiago, mais do que nunca, se encontra feliz com o serviço prestado pela transportadora. Os erros internos acabaram, fruto de uma melhor integração entre os setores da terceira.|

É válido destacar o impacto causado pelo uso do GLET não apenas dentro da própria logística, mas também para o cliente.

## 3. Modelagem do processo de negócio

### 3.1. Análise da situação atual

O setor logístico conta com diversas áreas e processos, que são responsáveis por estabelecer o equilíbrio e funcionamento adequado do setor. Dentre as principais áreas, temos a equipe, a frota, os serviços e os fornecedores, sendo esses os mais importantes para que o setor funcione de forma flúida. 

Atualmente, para realizar a gestão da mão de obra (equipe) e gestão de frotas, existem diversas ferramentas no mercado. Algumas empresas mais tradicionais utilizam do [Excel](https://www.microsoft.com/pt-br/microsoft-365/excel)[1], já outras, buscam por sistemas cadastrais na internet, muitas vezes feitos sob encomenda. Exemplos de plataformas já existentes são a [Tiny](https://tiny.com.br/integracoes/#logistica)[2], feita pela Olist, e o Sistema ERP da [Omie]([url](https://www.omie.com.br/sistema-erp/?utm_source=bing&utm_medium=cpc&utm_campaign=(Bing)%20(Inbound)%20(search)%20Branding%20-%20Omie&utm_term=omie%20erp&msclkid=ca8486ff1cc415ad4106e0f6995db61f))[3]. São plataformas robustas que abrigam diversas funcionalidades além das propostas pela GLET, o que pode acarretar no desuso de certas ferramentas e portanto em um desperdício de capital por parte da empresa contratante, caso essa esteja procurando apenas pela gestão logística. Assim sendo, para empresas mais tradicionais e/ou menores, muitas destas tarefas são feitas manualmente ou de forma inadequeada, devido a ausência de plataformas baratas, simples e/ou intuitivas no mercado. 

Dessa forma, unindo os dois pilares abordados anteriormente, um trabalho deve ser realizado com a frota mais adequada e com a melhor equipe possível para a situação em questão. Atualmente, caso surja um novo serviço, é necessário buscar o Gestor para que esse informe a disponibilidade, conferindo os serviços do dia, a mão de obra e frota disponível através de uma agenda, física ou digital. Exemplos de plataformas de agendas online são a [Reservio](https://www.reservio.com/pt-br?utm_source=bing&utm_medium=cpc&utm_campaign=brand_pt_br&utm_term=reservio&msclkid=ae454ccc9869117f34702ac51f477a85&utm_content=Reservio)[4] e a [Sabesim](https://www.sabesim.com.br/)[5], que acabam também não integradas com o resto dos serviços expostos nos parágrafos acima desta sessão.

Por último, mas não menos importante para o funcionamento do setor, deve-se haver o controle dos fornecedores que disponibilizam os produtos responsáveis por abastecer o estoque da empresa, desde caixas, papelões, ou até mesmo EPI'S (Equipamento de proteção individual). O controle de fornecedores é geralmente feito pelo time de compras (depende do organograma de cada empresa), e algumas ferramentas já existentes para tal são a Tiny, descrita anteriormente nesta sessão, e o Excel. Tal time pode se submeter a processos demorados devido à falta de integração com os outros setores, como por exemplo ausência de acompanhamento em tempo real dos materiais em estoque, realizados por aqueles na linha de frente do negócio.

Portanto, é válido ressaltar que todos os processos abordados, essenciais para o funcionamento do setor, necessitam de recursos para funcionarem corretamente. Através da integração proposta pela GLET, descrita melhor na sessão posterior, será mais fácil para os usuários do software acompanharem efetivamente o funcionamento da empresa e gerirem suas necessidades.

### 3.2. Descrição geral da proposta

Face ao exposto, mostra-se de alto valor uma integração eficiente no ramo logístico. Dessa forma, o software GLET visa propor uma plataforma de integração centralizada e acessível pela web entre os principais setores que compõem uma logística eficiente: a gestão de equipe e frota, gestão de fornecedores e o agendamento/acompanhamento de serviços. 

A gestão de equipe visa armazenar dados dos colaboradores, tais como nome, função e observações e/ou restrições específicas que seu supervisor queira adicionar. A gestão de frota segue a mesma linha de raciocínio, armazenando informações relevantes sobre os veículos, tais como manutenções realizadas, manutenções futuras, capacidades para armazenamento e peso, recomendações específicas e/ou restrições. O agendamento dos serviços, onde antes seria necessário consultar o responsável logístico, agora permite que os vendedores consigam ter uma noção mais específica de qual seria a mão de obra e frota disponíveis para realizar um determinado serviço em uma determinada data. Assim, permitindo que outros setores estejam mais integrados com o setor operacional. Dessa maneira, da mesma forma que a integração pelo GLET será benéfica ao setor comercial, o setor de compras também será beneficiado, uma vez que o responsável pelas operações de compras poderão atentar-se às demandas em determinado período.

É válido ressaltar que o GLET é uma plataforma ampla que busca atender a diferentes empresas de transporte, fazendo com que elas possam adaptar o software às suas necessidades. Buscamos fazer com que as organizações possam funcionar com uma melhor comunicação entre os setores internos, proporcionando uma melhor qualidade no serviço final. 

### 3.3. Modelagem dos processos

[PROCESSO 1 - Gestão de Equipe](processes/processo-1-gestao-de-Equipe.md "Detalhamento do Processo 1.")

[PROCESSO 2 - Gestão de Frota](processes/processo-2-gestao-frota.md "Detalhamento do Processo 2.")

[PROCESSO 3 - Gestão de Fornecedores](processes/processo-3-gestao-de-fornecedores.md "Detalhamento do Processo 3.")

[PROCESSO 4 - Agendamento de Serviços](processes/processo-4-agendamento-servicos.md "Detalhamento do Processo 4")

[PROCESSO 5 - Gestão de manutenções](processes/processo-5-gestao-de-manutencoes.md "Detalhamento do Processo 5")

## 4. Projeto da solução

O documento a seguir apresenta o detalhamento do projeto da solução. São apresentadas duas seções que descrevem, respectivamente: modelo relacional e tecnologias.

[Projeto da solução](solution-design.md)


## 5. Indicadores de desempenho

O documento a seguir apresenta os indicadores de desempenho dos processos.

[Indicadores de desempenho dos processos](performance-indicators.md)


## 6. Interface do sistema

A sessão a seguir apresenta a descrição do produto de software desenvolvido. 

[Documentação da interface do sistema](interface.md)

## 7. Conclusão

Como conclusão do Trabalho Interdisciplinar do período, o desenvolvimento da aplicação foi de alto impacto no aprendizado de todos os integrantes do grupo. Foi possível refinar o domínio de todos acerca de front end, back end e aplicar também os conceitos aprendidos em paralelo na disciplina de Bancos de Dados. Todos os participantes estão satisfeitos com o resultado, porém, esperamos agregar ainda mais valor à aplicação, como trocar os campos relativos a datas no processo de "Serviços" para a classe localTime. 

# REFERÊNCIAS

Referências utilizadas no projeto, tais como aplicativos similares já existentes no mercado, podem ser encontrados abaixo.

## Referências

**[1]** MICROSOFT. Excel. Disponível em: <https://www.microsoft.com/pt-br/microsoft-365/excel>. Acesso em: 17 jun. 2024.

**[2]** TINY. Tiny Integrações. Disponível em: <https://tiny.com.br/integracoes/#logistica>. Acesso em: 17 jun. 2024.

**[3]** OMIE. Omie Sistema ERP. Disponível em: <https://www.omie.com.br/sistema-erp/?utm_source=bing&utm_medium=cpc&utm_campaign=(Bing)%20(Inbound)%20(search)%20Branding%20-%20Omie&utm_term=omie%20erp&msclkid=ca8486ff1cc415ad4106e0f6995db61f>. Acesso em: 17 jun. 2024.

**[4]** RESERVIO. Reservio. Disponível em: <https://www.reservio.com/pt-br?utm_source=bing&utm_medium=cpc&utm_campaign=brand_pt_br&utm_term=reservio&msclkid=ae454ccc9869117f34702ac51f477a85&utm_content=Reservio>. Acesso em: 17 jun. 2024.

**[5]** SABESIM. Sabesim. Disponível em: <https://www.sabesim.com.br/>. Acesso em: 17 jun. 2024.

# APÊNDICES

## Apêndice A - Código fonte

[Código do front-end](../src/front) -- repositório do código do front-end

[Código do back-end](../src/back)  -- repositório do código do back-end


## Apêndice B - Apresentação final


[Slides da apresentação final](other-files/GLET.pdf)


[Vídeo da apresentação final](video/GLETLogistica.webm)






