document.addEventListener("mousemove", parallax);

function parallax(event) {
    this.querySelectorAll(".parallax-wrap .parallax").forEach((shift) => {
        const pX = shift.getAttribute("pX");
        const pY = shift.getAttribute("pY");
        let x = (window.innerWidth - event.pageX) * pX;
        let y = (window.innerHeight - event.pageY) * pY;

        shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}