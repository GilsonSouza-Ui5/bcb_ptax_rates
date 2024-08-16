  
const PtaxReader = {};

PtaxReader.getUSDPtax = async function() {
    const bcb_ptax_url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?";
    
    var _today = new Date();
    const _dtCotacao = new Date(new Date().setDate(new Date().getDate()-(_today.getDay() == 1 ? 3 : 1)));
    
    let _formatted_date = ( _dtCotacao.getMonth() +1) + "-" + _dtCotacao.getDate() + "-" + _dtCotacao.getFullYear();

    const ptaxApiUrl = 
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='" + _formatted_date + "'&$top=1&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao";

    console.log("Calling API at:", ptaxApiUrl);
    return await fetch(ptaxApiUrl)
  .then(response => {
    if (!response.ok) {
       throw new Error("Erro de Comunicação com o servidor do banco Central");
    }
    return response.json();
  })
  .then(data => {
    console.log("Retornou Dados!", data);
    return data;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

module.exports = PtaxReader;