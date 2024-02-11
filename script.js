// require('dotenv').config();

// console.log(process.env);
// let apiKey = process.env.API_KEY; // Remove the quotes

// console.log(apiKey);

const container=document.querySelector(".container");

const optionsContainer=document.querySelector(".option-container");



// "in" stands for india

const country="in";
const options=["general","entertainment","health","science","sports","technolgoy",];


let requestURL;

let apiKey=""
const generateUI=(articles)=>{

    for(let item of articles){
        let card=document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML=`<div class="news-image-container">
        <img src="${item.urlToImage || "./newspaper.jpg" }"alt="" /></div>
        <div class="news-content"> 
        <div class="news-title">${item.title}</div>
        <div class="news-description">${item.description || item.content || ""} </div>
        <a href="${item.url}" target="_blank" class="view-button"> Read More</a>
        </div>`
        container.appendChild(card);
    }
};

// news api call
const getNews=async()=>{
    container.innerHTML="";
    let response=await fetch(requestURL);
    if(!response.ok){
        alert("Data unavailable at the moment.please try again later");
        return false;

    }
    let data =await response.json();
    console.log(data);
    generateUI(data.articles)
};

//category selection
const selectCategory=(e,category)=>{
    let option=document.querySelectorAll(".option");
    option.forEach((element)=>{
        element.classList.remove("active");
    
});
requestURL=`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
e.target.classList.add("active");
getNews();
};

//option buttons
const createOptions=()=>{
    for(let i of options){

        optionsContainer.innerHTML+=`<button class="option ${
            i == "general" ? "active" : ""
        }" onclick="selectCategory(event,'${i}')">${i}</button>`;
         
    }
};

 

const init=()=>{
    optionsContainer.innerHTML="";
    getNews();
    createOptions();

}

window.onload=()=>{
    requestURL=`https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
} 
