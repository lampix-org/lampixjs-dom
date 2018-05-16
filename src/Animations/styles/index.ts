const css = `
.lx-anim-corners {
  position: relative;
}
.lx-anim-corners::before,
.lx-anim-corners::after {
  display: block;
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  -webkit-backface-visibility: hidden;
}
.lx-anim-corners::before {
  border-top: 3px solid red;
  border-left: 3px solid red;
  animation: cornersFadeInTop 0.5s ease-out forwards;
}
.lx-anim-corners::after {
  bottom: -5px;
  right: -5px;
  border-bottom: 3px solid red;
  border-right: 3px solid red;
  animation: cornersFadeInBottom 0.5s ease-out forwards;
}
@keyframes cornersFadeInTop {
  from {
    opacity: 0;
    top: 0;
    left: 0;
  }

  to {
    opacity: 1;
    top: -6px;
    left: -6px;
  }
}
@keyframes cornersFadeInBottom {
  from {
    opacity: 0;
    bottom: 0;
    right: 0;
  }

  to {
    opacity: 1;
    bottom: -6px;
    right: -6px;
  }
}
  `;

export default css;
