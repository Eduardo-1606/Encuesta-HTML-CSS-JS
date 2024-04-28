document.addEventListener('DOMContentLoaded', function(){
    const encuestaForm = document.getElementById('encuestaForm');
    const encuestasGrid = document.getElementById('encuestasGrid');

    if (!encuestasGrid){
        console.error('No se encontro el elemento encuestasGrid en el DOM');
        return;
    }

    cargarEncuestas();

    encuestaForm.addEventListener('submit', function(event){
        event.preventDefault();
        const material = encuestaForm.querySelector('#material').value.trim();
        const color = encuestaForm.querySelector('#color').value.trim();
        const longitud = encuestaForm.querySelector('#longitud').value.trim();

        if (material !== '' && color !== '' && longitud !== ''){
            guardarEncuesta(material, color, longitud);
            encuestaForm.reset();
        } else{
            alert('Por favor responda todas las preguntas')
        }
    });

    function cargarEncuestas(){
     encuestasGrid.innerHTML = '';
        const encuesta = JSON.parse(localStorage.getItem('encuestas')) || [];
        encuesta.forEach(function(encuesta, index){
            const encuestaHTML = `
            <div class="encuesta">
                <p><strong>Encuesta ${index + 1}:</strong></p>
                <p>Material: ${encuesta.material}</p>
                <p>Color: ${encuesta.color}</p>
                <p>Longitud: ${encuesta.longitud}</p>
                <button class="eliminar" data-index="${index}">Eliminar</button>
            </div>
            `;
            encuestasGrid.innerHTML += encuestaHTML
        });
    }

    function guardarEncuesta(material, color, longitud){
        const encuestas = JSON.parse(localStorage.getItem('encuestas')) || [];
        encuestas.push({material, color, longitud});
        localStorage.setItem('encuestas', JSON.stringify(encuestas));
        cargarEncuestas();
    }

    encuestasGrid.addEventListener('click', function(event){
        if (event.target.classList.contains('eliminar')){
            const index = event.target.dataset.index;
            eliminarEncuesta(index);
        }
    });

    function eliminarEncuesta(index){
        const encuestas = JSON.parse(localStorage.getItem('encuestas')) || [];
        encuestas.splice(index, 1);
        localStorage.setItem('encuestas', JSON.stringify(encuestas));
        cargarEncuestas();
    }


});