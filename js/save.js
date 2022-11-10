/* This file was used to work on and keep the integrity of the original
click/mouseover event algorithm. It is not used in the game. */

/* Proximity thing */

document.querySelectorAll(".square").forEach(item => { item.addEventListener('mouseover', (ev) => {

    const x = ev.offsetX;
    const y = ev.offsetY;
    const el_size = ev.target.getBoundingClientRect();
    const el_height = el_size.height;
    
    let side = 0;
    if (x/y < 1) {
        side = 0;
    } else { side = 1;
    }
    
    let side2 = 0;
    if (x / (el_height - y) < 1) {
    side2 = 0;
    } else {
        side2 = 1;
    }
    
    let target = ev.target;
    
    if (side == 0 && side2 == 0) {
        let prevStyle = target.style;
        drawDotted(target, 'left', prevStyle);
        //target.style['border-left'] = '1px solid black';
    } else if (side == 0 && side2 == 1) {
        let prevStyle = target.style;
        drawDotted(target, 'bottom', prevStyle);
        //target.style['border-bottom'] = '1px solid black';
    } else if  (side == 1 && side2 == 0) {
        let prevStyle = target.style;
        drawDotted(target, 'top', prevStyle);
        //target.style['border-top'] = '1px solid black';
    } else if (side == 1 && side2 == 1) {
        let prevStyle = target.style;
        drawDotted(target, 'right', prevStyle);
        //target.style['border-right'] = '1px solid black';
    }
    });
});