import { useState } from 'react';

/* Simulador "Máquina de versiones": seis cambios reales del Delivery System. Para cada uno eliges
   cuánto sube la versión (SemVer); si aciertas, se crea el tag y la entrada del CHANGELOG. */

const PASOS = [
  { cambio: 'Quitar -SNAPSHOT y declarar estables los contratos de core para la demo', ops: [['PATCH', '0.9.1'], ['MINOR', '0.10.0'], ['Estable', '1.0.0']], ok: 2, sec: 'Added',
    linea: 'Primera versión estable: pedido de punta a punta con los cinco módulos.', porque: 'La 1.0.0 dice «esta es la API pública y la vamos a respetar». Antes de 1.0.0 todo podía cambiar.' },
  { cambio: 'Corregir el costo de envío que no se copiaba de ReadyOrder (D-05)', ok: 2, sec: 'Fixed',
    linea: 'El costo de envío se copia de ReadyOrder.', porque: 'Solo corrige un error y no cambia ningún contrato: PATCH.' },
  { cambio: 'Agregar la pantalla de historial de entregas del repartidor', ok: 1, sec: 'Added',
    linea: 'Historial de entregas del repartidor.', porque: 'Es una función nueva y no rompe nada de lo que ya existía: MINOR (y PATCH vuelve a 0).' },
  { cambio: 'Corregir el texto del botón «Pagr» por «Pagar»', ok: 2, sec: 'Fixed',
    linea: 'Texto del botón Pagar.', porque: 'Una corrección pequeña: PATCH.' },
  { cambio: 'Agregar findCommerceIdsByMerchant a CatalogService (los demás métodos no cambian)', ok: 1, sec: 'Added',
    linea: 'CatalogService.findCommerceIdsByMerchant (D-08).', porque: 'Agregar un método al contrato es compatible: quien no lo usa no se entera. MINOR.' },
  { cambio: 'Cambiar UserService.isActiveWithRole para que reciba el correo en vez del UUID', ok: 0, sec: 'Changed',
    linea: 'UserService.isActiveWithRole recibe el correo (rompe compatibilidad).', porque: 'Los cuatro módulos que lo llaman dejan de compilar: rompe el contrato. MAJOR (y MINOR y PATCH vuelven a 0).' },
];
const SUBE = [['MAJOR', 'rompe contratos'], ['MINOR', 'agrega sin romper'], ['PATCH', 'solo corrige']];

function siguiente(v, i) {
  const [M, m, p] = v.split('.').map(Number);
  return i === 0 ? `${M + 1}.0.0` : i === 1 ? `${M}.${m + 1}.0` : `${M}.${m}.${p + 1}`;
}

export default function Versionador() {
  const [paso, setPaso] = useState(0);
  const [ver, setVer] = useState('0.9.0-SNAPSHOT');
  const [log, setLog] = useState([]);
  const [fb, setFb] = useState(null);
  const p = PASOS[paso];
  const fin = paso >= PASOS.length;
  const elegir = (i) => {
    if (fb?.ok) return;
    if (i !== p.ok) { setFb({ ok: false, t: 'No es esa. Piensa: ¿alguien que usa este código tendría que cambiar el suyo?' }); return; }
    const nueva = paso === 0 ? '1.0.0' : siguiente(ver, i);
    setVer(nueva);
    setLog([{ v: nueva, sec: p.sec, linea: p.linea }, ...log]);
    setFb({ ok: true, t: p.porque });
  };
  const avanzar = () => { setPaso(paso + 1); setFb(null); };
  const reiniciar = () => { setPaso(0); setVer('0.9.0-SNAPSHOT'); setLog([]); setFb(null); };
  const ops = p ? (p.ops || SUBE.map(([n], i) => [n, siguiente(ver, i)])) : [];

  return (
    <div className="sim versionador">
      <div className="ver-grid">
        <div className="ver-izq">
          <span className="mono ver-eti">versión actual</span>
          <b className="ver-num mono">{ver}</b>
          {!fin ? (
            <>
              <span className="mono ver-eti">cambio {paso + 1} de {PASOS.length}</span>
              <p className="ver-cambio">{p.cambio}</p>
              <div className="ver-ops">
                {ops.map(([n, v], i) => (
                  <button key={n} className={`ver-op ${fb?.ok && i === p.ok ? 'ok' : ''}`} onClick={() => elegir(i)} disabled={fb?.ok}>
                    <b>{n}</b><span className="mono">→ {v}</span>{!p.ops && <em>{SUBE[i][1]}</em>}
                  </button>
                ))}
              </div>
              {fb && <p className={`sim-msg ${fb.ok ? 'ok' : 'bad'}`}>{fb.ok ? '✓ ' : '✗ '}{fb.t}</p>}
              {fb?.ok && <button className="btn" onClick={avanzar}>{paso < PASOS.length - 1 ? 'Siguiente cambio →' : 'Terminar'}</button>}
            </>
          ) : (
            <>
              <p className="sim-msg ok">Seis cambios, seis versiones. Fíjense que solo uno subió MAJOR: el que obliga a los demás equipos a cambiar su código.</p>
              <button className="cbtn" onClick={reiniciar}>↺ Empezar otra vez</button>
            </>
          )}
        </div>
        <div className="ver-der">
          <span className="mono ver-eti">CHANGELOG.md y tags</span>
          <div className="ver-log">
            {!log.length && <p className="note">Aquí aparecerán las versiones que publiques.</p>}
            {log.map((e) => (
              <div key={e.v} className="ver-entrada">
                <code className="ver-tag">git tag -a v{e.v}</code>
                <b>## [{e.v}]</b>
                <span className={`mono ver-sec ${e.sec}`}>### {e.sec}</span>
                <p>- {e.linea}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
