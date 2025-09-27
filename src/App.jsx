import { useState } from "react";

export default function Home() {
  const signos = [
    { signo: "Aries", inicio: "03-21", fin: "04-19", emoji: "♈", horoscopo: "Hoy es un buen día para tomar decisiones valientes." },
    { signo: "Tauro", inicio: "04-20", fin: "05-20", emoji: "♉", horoscopo: "La paciencia será tu mejor aliada el día de hoy." },
    { signo: "Géminis", inicio: "05-21", fin: "06-20", emoji: "♊", horoscopo: "La comunicación te abrirá nuevas oportunidades." },
    { signo: "Cáncer", inicio: "06-21", fin: "07-22", emoji: "♋", horoscopo: "Dedica tiempo a tu familia y verás grandes recompensas." },
    { signo: "Leo", inicio: "07-23", fin: "08-22", emoji: "♌", horoscopo: "Tu liderazgo brilla y serás el centro de atención." },
    { signo: "Virgo", inicio: "08-23", fin: "09-22", emoji: "♍", horoscopo: "La organización será clave para alcanzar tus metas." },
    { signo: "Libra", inicio: "09-23", fin: "10-22", emoji: "♎", horoscopo: "El equilibrio y la armonía guiarán tu día." },
    { signo: "Escorpio", inicio: "10-23", fin: "11-21", emoji: "♏", horoscopo: "La pasión y la intensidad marcarán tus decisiones." },
    { signo: "Sagitario", inicio: "11-22", fin: "12-21", emoji: "♐", horoscopo: "La aventura te espera, atrévete a explorar." },
    { signo: "Capricornio", inicio: "12-22", fin: "01-19", emoji: "♑", horoscopo: "La disciplina te llevará a cumplir tus sueños." },
    { signo: "Acuario", inicio: "01-20", fin: "02-18", emoji: "♒", horoscopo: "Las ideas innovadoras transformarán tu entorno." },
    { signo: "Piscis", inicio: "02-19", fin: "03-20", emoji: "♓", horoscopo: "La intuición será tu mejor herramienta hoy." },
  ];

  const [nombrePersona, setNombrePersona] = useState("");
  const [fecha, setFecha] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcularSigno = () => {
    if (!fecha) return;

    const [anio, mes, dia] = fecha.split("-").map(Number);
    const fechaNac = new Date(anio, mes - 1, dia);

    const signoEncontrado = signos.find((s) => {
      const [inicioMes, inicioDia] = s.inicio.split("-").map(Number);
      const [finMes, finDia] = s.fin.split("-").map(Number);

      const inicio = new Date(anio, inicioMes - 1, inicioDia);
      const fin = new Date(anio, finMes - 1, finDia);

      if (inicioMes > finMes) {
        // Signos que cruzan de diciembre a enero
        return (
          (fechaNac >= inicio && fechaNac <= new Date(anio, 11, 31)) ||
          (fechaNac >= new Date(anio, 0, 1) && fechaNac <= fin)
        );
      } else {
        return fechaNac >= inicio && fechaNac <= fin;
      }
    });

    setResultado({ persona: nombrePersona, ...signoEncontrado });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-6">Horóscopo React</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        
        {/* Formulario */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4">
          <label className="text-lg font-semibold text-gray-700">
            Nombre
            <input
              type="text"
              value={nombrePersona}
              onChange={(e) => setNombrePersona(e.target.value)}
              placeholder="Escribe tu nombre"
              className="mt-2 w-full p-2 border rounded focus:ring-2 focus:ring-purple-400"
            />
          </label>

          <label className="text-lg font-semibold text-gray-700">
            Fecha de nacimiento
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              className="mt-2 w-full p-2 border rounded focus:ring-2 focus:ring-purple-400"
            />
          </label>

          <button
            onClick={calcularSigno}
            className="bg-purple-600 text-white py-2 rounded-lg mt-4 hover:bg-purple-700 transition"
          >
            Calcular signo
          </button>
        </div>

        {/* Resultado */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center">
          {resultado ? (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {resultado.persona}, tu signo zodiacal es <br />
                {resultado.signo} {resultado.emoji}
              </h2>
              <p className="text-gray-600 text-lg italic mb-4">
                {resultado.horoscopo}
              </p>
            </>
          ) : (
            <p className="text-gray-500">Ingresa tus datos para ver tu horóscopo ✨</p>
          )}
        </div>
      </div>
    </div>
  );
}
