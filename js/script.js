

for(var i =0 ; i < 20 ;i++){
    var hex =  '#' + Math.floor(Math.random()*16777215).toString(16)
}





// Random color




const container = document.querySelector('.row')


const base = 'https://pokeapi.co/api/v2/pokemon'

function getDate(url ,query , cb){
    fetch(`${url}?${query}`)
    .then(res => res.json())
    .then(r => {
        cb(r)
    })
}


window.addEventListener('load' , () =>{
    getDate(base , 'offset=0&limit=20' , res =>{
        const temp = res.results.map(item =>{
            return`
                <div class="col-xl-4 mt-5 ">
                    <div class="card" style="background:${hex};cursor:pointer" onclick="getSingle('${item.url}')">
                        <div class="card-header text-center text-light " style="text-transform:capitalize">
                            <h5>${item.name}</h5>
                        </div>
                    </div>
                </div>
            `
        }).join('')

        container.innerHTML = temp
    })
})

function getSingle(url){
    getDate(url, ' ' , res =>{
        console.log(res)
        container.innerHTML = `
                <div class="col-xl-12 mt-5  mb-5">
                    <div class="card bg-dark text-light">
                        <div class="card-header text-center text-light" style="text-transform:capitalize">
                            <h5>${res.name}</h5>
                        </div>
                        <div class="card-body container">
                            <div class="d-flex justify-content-around">
                                <img src="${res.sprites.front_shiny}"  >
                                <div>
                                    <h5>Experience: ${res.base_experience}</h5>
                                    <h5>Height: ${res.height}</h5>
                                    <h5>Weight: ${res.weight}</h5>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `

    })
}