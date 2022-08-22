const btnCategory = document.getElementById('btnCategory')

btnCategory.addEventListener("click",(e)=>{

    document.querySelector(".column-1").classList.toggle("appear-column")
    document.querySelector(".column-2").classList.toggle("width-column")
    document.querySelector(".seciton-productos").classList.toggle("rows-none")
 

})



