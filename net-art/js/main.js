const cursor = document.querySelector(".cursor-chaser")

document.addEventListener("mousemove", (event) => {

    const {width, height} = cursor.getBoundingClientRect()

    cursor.style.left = `${event.clientX - width / 10}px`
    cursor.style.top = `${event.clientY - height / 10}px`
})