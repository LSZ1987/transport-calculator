const selectList = document.querySelector('.selectList')
const showDPDD = document.querySelector('.showDPDD')
const showGLSS = document.querySelector('.showGLSS')
const numberPackages = document.querySelector('.numberPackages')
const showFinalPrice = document.querySelector('.showFinalPrice')
const dpddLogo = document.querySelector('.dpddLogo')
const glssLogo = document.querySelector('.glssLogo')
const truckGLSS = document.querySelector('.truckGLSS')
const truckDPDD = document.querySelector('.truckDPDD')


axios
  .get('countryprice.json')
  .then(res => {

    res.data.pricesEurope.forEach(item => {
      selectList.append(new Option(item.country))

    })

  })

  .catch(() => console.log('error'))

const showPrice = () => {
  const selected = selectList.value
  // console.log(selected);

  axios
    .get('countryprice.json')
    .then(res => {

      res.data.pricesEurope.forEach(item => {
        if (selected === item.country) {
          showDPDD.textContent = `${item.DPDD} Euro`
          showGLSS.textContent = `${item.GLSS} Euro`
        }

      })

    })

    .catch(() => console.log('error'))

  numberPackages.disabled = false;
  numberPackages.value = ''
  numberPackages.placeholder = 'enter packages'
  showFinalPrice.textContent = 'waiting for packages'
  showFinalPrice.classList.remove('error')
  glssLogo.classList.remove('logoCheck')
  dpddLogo.classList.remove('logoCheck')
  truckGLSS.classList.remove('showTruck')
  truckDPDD.classList.remove('showTruck')

}

const calculatePrice = () => {

  const dpddEuro = showDPDD.textContent
  const glssEuro = showGLSS.textContent
  const userVal = numberPackages.value
  const dpddMatch = parseInt(dpddEuro.match(/(\d+)/)[0])
  const glssMatch = parseInt(glssEuro.match(/(\d+)/)[0])

  if (dpddMatch > glssMatch) {
    showFinalPrice.textContent = `${glssMatch * userVal} Euro by GLSS`
    glssLogo.classList.add('logoCheck')
    dpddLogo.classList.remove('logoCheck')
    truckGLSS.classList.add('showTruck')
    truckDPDD.classList.remove('showTruck')
    showFinalPrice.classList.remove('error')
  } else if (dpddMatch < glssMatch) {
    showFinalPrice.textContent = `${dpddMatch * userVal} Euro by DPDD`
    glssLogo.classList.remove('logoCheck')
    dpddLogo.classList.add('logoCheck')
    truckGLSS.classList.remove('showTruck')
    truckDPDD.classList.add('showTruck')
    showFinalPrice.classList.remove('error')
  } else if (dpddMatch === glssMatch) {
    showFinalPrice.textContent = `${dpddMatch * userVal} Euro both`
    glssLogo.classList.add('logoCheck')
    dpddLogo.classList.add('logoCheck')
    truckGLSS.classList.add('showTruck')
    truckDPDD.classList.add('showTruck')
    showFinalPrice.classList.remove('error')
  }

  if (isNaN(dpddMatch * userVal) || isNaN(glssMatch * userVal)) {
    showFinalPrice.textContent = `need enter number`
    showFinalPrice.classList.add('error')
    glssLogo.classList.remove('logoCheck')
    dpddLogo.classList.remove('logoCheck')
    truckGLSS.classList.remove('showTruck')
    truckDPDD.classList.remove('showTruck')
  } else if ((dpddMatch * userVal === 0) || (glssMatch * userVal === 0)) {
    showFinalPrice.textContent = `need add something`
    showFinalPrice.classList.add('error')
    glssLogo.classList.remove('logoCheck')
    dpddLogo.classList.remove('logoCheck')
    truckGLSS.classList.remove('showTruck')
    truckDPDD.classList.remove('showTruck')
  }

}

numberPackages.addEventListener('keyup', calculatePrice)

dpddLogo.addEventListener('click', function () {
  window.open('')
})
glssLogo.addEventListener('click', function () {
  window.open('')
})





