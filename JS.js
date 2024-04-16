let pole = document.querySelector(".pole")

let search = document.querySelector(".search")

let fetchAddress = "https://wjs-api.vercel.app/api/books";

let button = document.querySelector(".button")

async function getInfo(fetchAddress) {
    let response = await fetch(fetchAddress)
    return await response.json()
}


async function loadSite(fetchAddress) {

    let data = await getInfo(fetchAddress)

    console.log(data)

    data.forEach(item => {
        let box = document.createElement("div")
        box.className = "box"
        box.classList.add("singleBook")

        let title = document.createElement("span")
        title.append(item.title)

        let id = document.createElement("span")
        id.append(item._id)

        let button = document.createElement("button")
        button.innerText = "Details!"

        button.addEventListener("click", () => {
            pole.innerText = ""
            loadDetail(`https://wjs-api.vercel.app/api/books/${item._id}`)

        })

        box.append(title)
        box.append(id)
        box.append(button)
        pole.append(box)

    })
}

async function loadDetail(fetchAddress) {

    let oneItem = await getInfo(fetchAddress)

    let box = document.createElement("div")
    box.className = "box"
    box.classList.add("singleBook")

    let title = document.createElement("span")
    title.append("Title :"+oneItem.title)

    let id = document.createElement("span")
    id.append("ID :"+oneItem._id)

    let pageCount = document.createElement("span")
    pageCount.append("Page Count :"+oneItem.pageCount)

let description = document.createElement("span")
    description.append("Description :"+oneItem.shortDescription)

    let goBack = document.createElement("button")
    goBack.append("Go Back")

    goBack.addEventListener("click", () => {

        pole.innerText = ""
        loadSite("https://wjs-api.vercel.app/api/books")

    })




    box.append(title)
    box.append(id)
    box.append(pageCount)
    box.append(description)
    box.append(goBack)
    pole.append(box)

}

async function searchFunction(){

    let data = await getInfo(fetchAddress)

    data.forEach(item => {

        if (data.title.contains(search.innerHTML)) {

            let box = document.createElement("div")
            box.className = "box"
            box.classList.add("singleBook")

            let title = document.createElement("span")
            title.append(item.title)

            let id = document.createElement("span")
            id.append(item._id)

            let button = document.createElement("button")
            button.innerText = "Details!"

            button.addEventListener("click", () => {
                pole.innerText = ""
                loadDetail(`https://wjs-api.vercel.app/api/books/${item._id}`)

            })

            box.append(title)
            box.append(id)
            box.append(button)
            pole.append(box)

        } })

}

button.addEventListener("click", () => {

        pole.innerText = ""
        loadSite(`https://wjs-api.vercel.app/api/books?search=${search.value}`)

})

loadSite(fetchAddress)
