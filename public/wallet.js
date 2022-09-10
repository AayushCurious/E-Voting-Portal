const wallet=document.getElementById('wallet');
const extra=document.getElementById('extra');
const con=document.getElementById('con');
const results=document.getElementById('results')
const idCode=document.getElementById('idCode')
const listExecutive=document.getElementById('listExecutive')
const listViceExecutive=document.getElementById('listViceExecutive')
const vote=document.getElementById('Vote')
const voteresults=document.getElementById('VOTERESULTS')
const phone=document.getElementById('Xelec')
const senior=document.getElementById('Senior')
const vice=document.getElementById('Vice')
const nota=document.getElementById('NOTA')
const ticker=document.getElementById('ticker')
const checker=document.getElementById('password')
const naam=document.getElementById('username')

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
console.log(vw)



    async function connectWallet(){
        accounts=await window.ethereum.request({method:"eth_requestAccounts"}).catch((err)=>{
            console.log(err.code);
            })
    wallet.style.position="absolute";
    wallet.style.top="5%"
    wallet.style.left="80%"
    wallet.innerText="The Wallet Is Connected"
    con.style.display="none";
    results.style.display="block";
    listExecutive.style.display="block";
    listViceExecutive.style.display="block"
    const cip=(accounts[0].substring(5,13))
    idCode.innerText=cip
    
    }

function votex(){
    if(document.getElementById('01ee').checked==true){
        document.getElementById('02ee').disabled=true
        document.getElementById('03ee').disabled=true
        document.getElementById('04ee').disabled=true
    }
    else if(document.getElementById('01ee').checked==false){
        document.getElementById('02ee').disabled=false
        document.getElementById('03ee').disabled=false
        document.getElementById('04ee').disabled=false
    }

    if(document.getElementById('02ee').checked==true){
        document.getElementById('01ee').disabled=true
        document.getElementById('03ee').disabled=true
        document.getElementById('04ee').disabled=true
    }

    else if(document.getElementById('02ee').checked==false){
        document.getElementById('01ee').disabled=false
    }

    if(document.getElementById('03ee').checked==true){
        document.getElementById('01ee').disabled=true
        document.getElementById('02ee').disabled=true
        document.getElementById('04ee').disabled=true
    }

    if(document.getElementById('04ee').checked==true){
        document.getElementById('01ee').disabled=true
        document.getElementById('02ee').disabled=true
        document.getElementById('03ee').disabled=true 
    }
}

function votey(){
    if(document.getElementById('01dd').checked==true){
        document.getElementById('02dd').disabled=true
        document.getElementById('03dd').disabled=true
        document.getElementById('04dd').disabled=true
    }
    else if(document.getElementById('01dd').checked==false){
        document.getElementById('02dd').disabled=false
        document.getElementById('03dd').disabled=false
        document.getElementById('04dd').disabled=false
    }

    if(document.getElementById('02dd').checked==true){
        document.getElementById('01dd').disabled=true
        document.getElementById('03dd').disabled=true
        document.getElementById('04dd').disabled=true
    }

    else if(document.getElementById('02dd').checked==false){
        document.getElementById('01dd').disabled=false
    }

    if(document.getElementById('03dd').checked==true){
        document.getElementById('01dd').disabled=true
        document.getElementById('02dd').disabled=true
        document.getElementById('04dd').disabled=true
    }

    if(document.getElementById('04dd').checked==true){
        document.getElementById('01dd').disabled=true
        document.getElementById('02dd').disabled=true
        document.getElementById('03dd').disabled=true 
    }
}
function Vote(){
    vote.innerText="You Have Voted !"
       vote.style.cursor="disabled"
       listExecutive.style.display="none"
       listViceExecutive.style.display="none"
   
for(i=1;i<5;i++){
    if(document.getElementById('0'+i+'ee').checked==true){
        senior.value='0'+i+'ee'
    }
}

for(i=1;i<5;i++){
    if(document.getElementById('0'+i+'dd').checked==true){
        vice.value='0'+i+'dd'
    }
}

ticker.click();
console.log(ticker.checked)



if(ticker.checked==true){
    document.getElementById('Button').click();
}
}
function Votephone(){
    phone.innerHTML="~You Have Voted~!"
       phone.style.cursor="disabled"
       phone.style.top="50%"
       listExecutive.style.display="none"
       listViceExecutive.style.display="none"
       for(i=1;i<5;i++){
        if(document.getElementById('0'+i+'ee').checked==true){
            senior.value='0'+i+'ee'
        }
    }
    
    for(i=1;i<5;i++){
        if(document.getElementById('0'+i+'dd').checked==true){
           vice.value='0'+i+'dd'
        }
    }
   document.getElementById('Button').click()
   }

function func(){
    console.log('consolemessage:Vote is sumbitted')
}


function pass(){
if(checker.value=="admin123"&& naam.value=="admin"){
   document.getElementById('VOTERESULTS').innerText="Your password has matched Please click on this link to view live results"
   checker.value=""
   naam.value=""
}
}







