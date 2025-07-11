document.addEventListener("DOMContentLoaded", function () {
  NavegacionFija();
  CrearGaleria();
  Resaltar();
  ScrollNav();
});

function NavegacionFija() {
  const header = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");

  window.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function CrearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= 16; i++) {
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = "Imagen galeria";

    //Event handler
    imagen.onclick = function () {
      MostrarImagen(i);
    };
    galeria.appendChild(imagen);
  }
}

function MostrarImagen(indice) {
  const imagen = document.createElement("IMG");
  imagen.src = `src/img/gallery/full/${indice}.jpg`;
  imagen.alt = "Imagen galeria";
  //Generar modal
  const modal = document.createElement("DIV");
  modal.classList.add("modal");
  modal.onclick = cerrarModal;

  //Boton cerrar modal
  const cerrarModalBtn = document.createElement("BUTTON");
  cerrarModalBtn.textContent = "X";
  cerrarModalBtn.classList.add("btn-cerrar");
  cerrarModalBtn.onclick = cerrarModal;

  modal.appendChild(imagen);
  modal.appendChild(cerrarModalBtn);

  //Agregar HTML
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  body.appendChild(modal);
}

function cerrarModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("fade-out");

  setTimeout(() => {
    modal?.remove();

    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
  }, 500);
}

function Resaltar() {
  document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navlinks = document.querySelectorAll(".navegacion-principal a");
    let actual = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });

    navlinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + actual) {
        link.classList.add("active");
      }
    });
  });
}

function ScrollNav() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");

  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();

      const sectionScroll = e.target.getAttribute("href");
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}
