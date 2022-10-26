const selectList2 = document.querySelector('.selectList2')
const showOnePal = document.querySelector('.showOnePal')
const showSpedition = document.querySelector('.showSpedition')
const showCompare = document.querySelector('.showCompare')
const selectListPackage = document.querySelector('.selectList')
const compareButton = document.querySelector('.compareButton')
const ranebLogo = document.querySelector('.ranebLogo')
const dakersLogo = document.querySelector('.dakersLogo')
const truckGLSS2 = document.querySelector('.truckGLSS')
const truckDPDD2 = document.querySelector('.truckDPDD')
const truckSpedition = document.querySelector('.truckSpedition')


axios
    .get('customers.json')
    .then(res => {

        res.data.palettesCustomers.forEach(item => {
            selectList2.append(new Option(item.name))
        })

    })

    .catch(() => console.log('error'))

const checkPalette = () => {

    const selectedCustomer = selectList2.value
    // console.log(selectedCustomer);

    axios
        .get('customers.json')
        .then(res => {

            res.data.palettesCustomers.forEach(item => {
                if (selectedCustomer === item.name) {
                    showOnePal.textContent = `${item.onePal} Euro`
                    showSpedition.textContent = `${item.spedition}`
                    console.log(item.spedition);
                }

                if (showSpedition.textContent === 'Raneb') {
                    ranebLogo.classList.add('logoCheck')
                    dakersLogo.classList.remove('logoCheck')
                    truckSpedition.classList.add('showTruck')
                    truckSpedition.classList.remove('showTruck2')
                } else if(showSpedition.textContent === 'Dakers') {
                    ranebLogo.classList.remove('logoCheck')
                    dakersLogo.classList.add('logoCheck')
                    truckSpedition.classList.remove('showTruck')
                    truckSpedition.classList.add('showTruck2')
                }

            })

            const showPackageOptions = () => {

                axios
                    .get('countryprice.json')
                    .then(res => {

                        res.data.pricesEurope.forEach(item => {

                            if (selectList2.value[0] === item.country[1]) {
                                selectListPackage.value = item.country
                                showPrice()

                            }

                        })

                    })
                    .catch(() => console.log(`error`))

            }

            showPackageOptions()

        })
        .catch(() => console.log(`error`))
    showCompare.textContent = `waiting for action`
    showCompare.classList.remove('error')
    compareButton.disabled = false
}

const compareFunction = () => {

    const dpddEuro2 = showDPDD.textContent
    const glssEuro2 = showGLSS.textContent
    const paletteEuro = showOnePal.textContent
    const dpddMatch = parseInt(dpddEuro2.match(/(\d+)/)[0])
    const glssMatch = parseInt(glssEuro2.match(/(\d+)/)[0])
    const paletteMatch = parseInt(paletteEuro.match(/(\d+)/)[0])


    console.log(`dpdd ${dpddMatch}`);
    console.log(`glss ${glssMatch}`);
    console.log(`palette ${paletteMatch}`);

    if (dpddMatch < glssMatch) {
        showCompare.textContent = `Can fit ${Math.floor(paletteMatch / dpddMatch)} packages by DPDD`
        showCompare.classList.remove('error')
    } else if (glssMatch < dpddMatch) {
        showCompare.textContent = `Can fit ${Math.floor(paletteMatch / glssMatch)} packages by GLSS`
        showCompare.classList.remove('error')
    } else {
        showCompare.textContent = `Can fit ${Math.floor(paletteMatch / dpddMatch)} packages both`
        showCompare.classList.remove('error')
    }

    if (selectList2.value[0] !== selectListPackage.value[1]) {
        showCompare.textContent = `origin country must be the same`
        showCompare.classList.add('error')
    }

}

compareButton.addEventListener('click', compareFunction)

ranebLogo.addEventListener('click', function() {
    window.open('')
})
dakersLogo.addEventListener('click', function() {
    window.open('')
})
