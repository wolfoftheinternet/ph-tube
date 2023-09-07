const loadTube = async(category) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category}`);
    const data = await res.json();
    let tubes = data.data;

    // Sort tubes based on views
    tubes.sort((a, b) => parseFloat(b?.others?.views) - parseFloat(a?.others?.views)); 

    displayTube(tubes);
}
loadTube(1000);

const displayTube = tubes => {
    const tubeContainer = document.getElementById('tube-container');
    tubeContainer.textContent = '';
    
    const icon = document.getElementById('no-data-found');
    if(tubes.length < 1) {
        icon.classList.remove('hidden');
    } else {
        icon.classList.add('hidden');
    }

    tubes.forEach(tube => {
        const tubeCard = document.createElement('div');
        tubeCard.classList = `card mt-2`;

        tubeCard.innerHTML = `
        <div class="relative">
            <figure class="relative"><img class="w-64 h-44" src="${tube?.thumbnail}" /></figure>
        <div id="time-data" class=" text-xs font-extralight text-white bg-black absolute bottom-2 px-1 rounded-md right-10">${convertSeconds(tube?.others?.posted_date)}</div>
        </div>
        <div class="card-body">
        <div class="flex gap-2">
            <img class="h-10 w-10 rounded-full" src="${tube?.authors[0]?.profile_picture}">
            <h2 class="card-title">${tube?.title}</h2>
        </div>
        <div class="flex">
            <p class="">${tube?.authors[0]?.profile_name}</p>
            <img class="h-4 w-4" src= ${tube?.authors[0]?.verified ? 'img/verified.png' : ''} alt="">
        </div>
            <p>${tube?.others?.views} views</p>
        </div>
        `;

        tubeContainer.appendChild(tubeCard);    
    });
}

     // // time
     const convertSeconds = (seconds) =>    {
        const hours = Math.trunc( seconds/ 3600);
        const minutes = Math.trunc((seconds % 3600) / 60);
      
        if (hours > 0) {
          return `${hours}hrs ${minutes}mins ago`
        }else {
            return ``
        }
        
      }

// sort by
let viewArray = [];
const sortBy = tube =>{
   const views =parseFloat(tube?.others?.views);
   viewArray.forEach(function(views) {
    viewArray.push(views);
  });
  
} 
console.log(viewArray)





// four buttons
const allbtn= () =>{
    loadTube(1000);
}
const music =() =>{
    loadTube(1001); 
}
const comedy =() =>{
    loadTube(1003);   
}
const drawing =() =>{
    loadTube(1005);
}

// go to blog page
const blogPage = () =>{
    location.href = "blog.html";    
}
