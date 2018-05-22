const css = `
.lx-anim-corners {
  position: relative;
  /* default color, if color not set on the element */
  color: rgb(241, 72, 54);
}

.lx-anim-corners__container {}
.lx-anim-corners__container > i {
  display: block;
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  -webkit-backface-visibility: hidden;
  border-style: solid;
  border-color: currentColor;
}
.lx-anim-corners__container > i:nth-child(1) {
  top: -5px;
  left: -5px;
  border-right: none;
  border-bottom: none;
  animation: lxAnimCornersTopLeft 0.5s ease-out forwards;
}
.lx-anim-corners__container > i:nth-child(2) {
  bottom: -5px;
  right: -5px;
  border-top: none;
  border-left: none;
  animation: lxAnimCornersBottomRight 0.5s ease-out;
}

@keyframes lxAnimCornersTopLeft {
  from {
    opacity: 0;
    top: 0;
    left: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes lxAnimCornersBottomRight {
  from {
    opacity: 0;
    bottom: 0;
    right: 0;
  }
  to {
    opacity: 1;
  }
}
  `;

export default css;
