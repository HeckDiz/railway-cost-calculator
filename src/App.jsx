import { useState, useMemo } from "react";

/**
 * Railway Hobby Plan Cost Calculator
 * Rates: RAM $10/GB-mo, CPU $20/vCPU-mo, Storage $0.15/GB-mo, Egress $0.05/GB
 * plus $5 subscription that includes $5 usage credit.
 */
export default function App() {
  const [memory,   setMemory]   = useState(0.5);   // GB
  const [cpu,      setCpu]      = useState(0.10);  // vCPU
  const [storage,  setStorage]  = useState(1);     // GB
  const [egress,   setEgress]   = useState(0);     // GB / month

  const costs = useMemo(() => {
    const ram   = memory  * 10;
    const cpuC  = cpu     * 20;
    const vol   = storage * 0.15;
    const net   = egress  * 0.05;
    const usage = ram + cpuC + vol + net;
    const over  = Math.max(0, usage - 5);   // $5 credit
    return { ram, cpuC, vol, net, usage, over, total: 5 + over };
  }, [memory, cpu, storage, egress]);

  const usd = n => `$${n.toFixed(2)}`;

  return (
    <div style={{maxWidth: 460, margin: "3rem auto", fontFamily: "sans-serif"}}>
      <h2>Railway Hobby Cost Estimator</h2>

      <label>Memory limit (GB): {memory}</label>
      <input type="range" min="0.25" max="8" step="0.25"
             value={memory} onChange={e => setMemory(+e.target.value)} />

      <label>Average CPU (vCPU): {cpu}</label>
      <input type="range" min="0.05" max="8" step="0.05"
             value={cpu} onChange={e => setCpu(+e.target.value)} />

      <label>Persistent storage (GB): {storage}</label>
      <input type="range" min="0" max="5" step="0.1"
             value={storage} onChange={e => setStorage(+e.target.value)} />

      <label>Monthly egress (GB): {egress}</label>
      <input type="range" min="0" max="100" step="1"
             value={egress} onChange={e => setEgress(+e.target.value)} />

      <hr />

      <p>Resource cost: <strong>{usd(costs.usage)}</strong></p>
      <p>  · RAM {usd(costs.ram)}   CPU {usd(costs.cpuC)}   Vol {usd(costs.vol)}   Net {usd(costs.net)}</p>
      <p>Overage after $5 credit: <strong>{usd(costs.over)}</strong></p>
      <p style={{fontSize: "1.2rem"}}>Estimated bill: <strong>{usd(costs.total)}</strong></p>
    </div>
  );
}
