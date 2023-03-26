const input=document.querySelector('input');
const btn=document.querySelector('button');
const dictionary=document.querySelector('.dictionary-app')
const result=document.querySelector('.Result')





async function dictionaryfun(word){
    const res= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
   
    .then(res => res.json())
    console.log(res);
    if(res.title=='No Definitions Found'){
        // let heading=document.createElement('h3');
        // heading.innerText='No results found';
        //  result.appendChild(heading);
        //  const data='';
        //  return data;
        dictionary.innerHTML =`
        <div class="card">
       
       
            <div class="prop"><h1>Oops 😟</h1></div>

            <div class="property"><p>${res.message}</p></div>
          
        <div class="property">
            <span>Resolution:</span>
            <span>${res.resolution}</span>
        </div>
        </div>`
        const data='';
         return data;
        
    }
   
 else{
   
    return res[0];
}
}
btn.addEventListener('click', fetchAndCreateCard);
async function fetchAndCreateCard(){
    if(input.value===''){
        window.location.href = 'http://www.google.com  ';
    }
 

    else{
    const data = await dictionaryfun(input.value);
    console.log(data);
    if(data!=''){
    let partOfSpeechArray =[]
    for(let i=0;i<data.meanings.length-1;i++){
        partOfSpeechArray.push(data.meanings[i].partOfSpeech)
    }
   
    dictionary.innerHTML =`
    <div class="card">
                <div class="property">
                    <span>Word:</span>
                    <span>${data.word}</span>
                </div>
           
            <div class="property">
                <span>phonetics:</span>
                <span>${data.phonetic}</span>
            </div>
            <div class="property">
                <span>
                <audio controls src="${data.phonetics[0].audio}">
                </audio>
                </span>
                
            </div>
            <div class="property">
                <span>Definition:</span>
                <span>${data.meanings[0].definitions[0].definition}</span>
            </div>
            <div class="property">
                <span>Example:</span>
                <span>${data.meanings[0].definitions[0].example}</span>
            </div>
            <div class="property">
                <span>Parts of speech:</span>
       <span>${partOfSpeechArray.map(e =>e).join(`, `)}</span>
            </div>
            <div class="property">
            
            <a href="${data.sourceUrls}">More Details</a>
            
        </div>
            
  
        </div>`
    }
    input.value='';
} 
}
// dictionaryfun('table');
