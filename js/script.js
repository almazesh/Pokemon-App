

for(var i =0 ; i < 20 ;i++){
    var hex =  '#' + Math.floor(Math.random()*16777215).toString(16)
}





// Random color


var offset = 0
var limit = 20
var count = 1

var state = 1118 / 20

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
    getDate(base , `offset=${offset}&limit=${limit}` , res =>{
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


const next = document.querySelector('.next')
var countRes = document.querySelector('.count')

next.addEventListener('click' , e=> {
    e.preventDefault();

    getDate(base ,`offset=${offset}&limit=${limit}` , res =>{
        if(state > res.count){
            container.innerHTML = `Empty`
        }else{
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
        }
    })

    offset+= 20
    count++

    countRes.innerHTML = count

    if(count > state){
        next.classList.add('disabled')
    }


    if(count > 1){
        prev.classList.remove('disabled')
    }

    

})












const prev = document.querySelector('.prev');

prev.addEventListener('click' , e=>{
    e.preventDefault();

    getDate(base ,`offset=${offset}&limit=${limit}` , res =>{
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
    offset-= 20
    count--

    countRes.innerHTML = count

    if(count < 1){
        prev.classList.add('disabled')
    }

    if(count < state){
        next.classList.remove('disabled')
    }

})




const search = document.querySelector('.search')


search.addEventListener('input' , e=>{
    var val = e.target.value.toUpperCase();

    getDate(base , '' , res =>{
        const find = res.results.map((item) => {
            if(item.name.toUpperCase().includes(val)){
                return`
                    <div class="col-xl-4 mt-5 ">
                        <div class="card" style="background:${hex};cursor:pointer" onclick="getSingle('${item.url}')">
                            <div class="card-header text-center text-light " style="text-transform:capitalize">
                                <h5>${item.name}</h5>
                            </div>
                        </div>
                    </div>
                `
            }
        }).join('')

        container.innerHTML = find

    })
})