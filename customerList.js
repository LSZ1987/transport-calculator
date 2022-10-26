const openCustomerList = document.querySelector('.openCustomerList')
const customerDiv = document.querySelector('.customerList')
const listLeft = document.querySelector('.listLeft')
const selectListCustomer = document.querySelector('.selectList2')


const makeList = () => {

    axios
        .get('customers.json')
        .then(res => {

            res.data.palettesCustomers.forEach(item => {

                const customerP = document.createElement('p')
                customerP.textContent = `${item.name} / ${item.fullname}`
                listLeft.append(customerP)
                customerP.classList.add('p')

                const findCustomer = document.querySelector('.findCustomer')
                const customerItems = document.querySelectorAll('.listLeft p')


                const search = () => {
                    customerItems.forEach(item => {

                        const match = new RegExp(findCustomer.value, 'i').test(item.textContent)

                        if (!match) {
                            item.style.display = 'none'
                        } else {
                            item.style.display = 'block'
                        }

                    })
                }

                findCustomer.addEventListener('keyup', search)

                customerP.addEventListener('click', function() {
                    // console.log(customerP.textContent.substring(0, 5))
                    selectListCustomer.value = customerP.textContent.substring(0, 5)
                    checkPalette()
                })

            })

        })

        .catch(() => console.log(`error`))

}

makeList()

openCustomerList.addEventListener('click', function () {
    customerDiv.classList.toggle('listOpen')
})

