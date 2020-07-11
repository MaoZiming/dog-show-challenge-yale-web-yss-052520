document.addEventListener('DOMContentLoaded', () => {

    const table_body = document.querySelector("#table-body")
    const dog_form = document.querySelector("#dog-form")
    let form_id
    load_dogs()
    function load_dogs(){
        table_body.innerHTML = ""
        fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(res => add_dogs(res))
    }

    function add_dogs(dogs){
        dogs.forEach(dog => add_dog(dog))
    }

    function add_dog(dog){
        const tr = document.createElement("tr")
        const td_name = document.createElement("td")
        td_name.innerText = dog.name
        const td_breed = document.createElement("td")
        td_breed.innerText = dog.breed
        const td_sex = document.createElement("td")
        td_sex.innerText = dog.sex
        const td_btn = document.createElement("td")
        td_btn.innerHTML = "<button>Edit</button>"

        td_btn.addEventListener("click", function(){
            dog_form[0].value = dog.name
            dog_form[1].value = dog.breed
            dog_form[2].value = dog.sex
            form_id = dog.id
        })
        tr.append(td_name, td_breed, td_sex, td_btn) 
        table_body.append(tr)      
    }

    dog_form.addEventListener("submit", function(){
        event.preventDefault()

        const configObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: dog_form[0].value,
              breed: dog_form[1].value,
              sex: dog_form[2].value
            })
        }
        fetch(`http://localhost:3000/dogs/${form_id}`, configObj)
        .then(res => res.json())
        .then(res => {
            load_dogs()
        })
    })
})