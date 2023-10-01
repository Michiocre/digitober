document.addEventListener("mousemove", parallax);

function parallax(event) {
    console.log('move')
    this.querySelectorAll(".parallax-wrap .parallax").forEach((shift) => {
        const pX = shift.getAttribute("pX");
        const pY = shift.getAttribute("pY");
        const x = (window.innerWidth - event.pageX) * pX;
        const y = (window.innerHeight - event.pageY) * pY;

        shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}