const truckIcon = document.querySelector('.fa-truck-front')
const wrapper1 = document.querySelector('.appWrapper')
const wrapper2 = document.querySelector('.appWrapper2')


const startApp = () => {
setTimeout(() => {
    wrapper1.classList.add('showApp')
    wrapper2.classList.add('showApp')   

}, '2000')    

}

startApp()