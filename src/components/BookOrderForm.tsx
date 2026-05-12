"use client";

import { useMemo, useState } from "react";
import styles from "./BookOrderForm.module.css";

export type Variant = { id: string; label: string; price: number; stock: string };
export type Shipping = { id: string; label: string; price: number; eta: string };

type Props = {
  variants: Variant[];
  shipping: Shipping[];
};

type Step = 1 | 2 | 3 | 4 | 5 | "done";

export function BookOrderForm({ variants, shipping }: Props) {
  const [step, setStep] = useState<Step>(1);
  const [variantId, setVariantId] = useState(variants[0].id);
  const [qty, setQty] = useState(1);
  const [shippingId, setShippingId] = useState(shipping[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");

  const selectedVariant = useMemo(
    () => variants.find((v) => v.id === variantId) ?? variants[0],
    [variantId, variants]
  );
  const selectedShipping = useMemo(
    () => shipping.find((s) => s.id === shippingId) ?? shipping[0],
    [shippingId, shipping]
  );

  const total = selectedVariant.price * qty + selectedShipping.price;

  const next = () => {
    setStep((s) => (s === "done" ? s : ((Math.min(5, (s as number) + 1)) as Step)));
  };
  const prev = () => {
    setStep((s) => (s === "done" || s === 1 ? s : ((Math.max(1, (s as number) - 1)) as Step)));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = "ARIH-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderId(id);
    setStep("done");
  };

  const progress =
    step === "done" ? 100 : Math.round(((step as number) - 1) / 4 * 100);

  return (
    <div className={styles.wrap}>
      <form className={styles.form} onSubmit={submit}>
        <ol className={styles.stepNav}>
          {[1, 2, 3, 4, 5].map((n) => (
            <li
              key={n}
              className={`${styles.stepItem} ${step === n ? styles.stepCurrent : ""} ${typeof step === "number" && step > n ? styles.stepDone : ""}`}
            >
              <span className={styles.stepNum}>{n.toString().padStart(2, "0")}</span>
              <span className={styles.stepLabel}>
                {n === 1 && "Različica"}
                {n === 2 && "Količina"}
                {n === 3 && "Dostava"}
                {n === 4 && "Podatki"}
                {n === 5 && "Povzetek"}
              </span>
            </li>
          ))}
        </ol>

        <div className={styles.progress}>
          <span className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>

        {step === 1 && (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Izberite različico</legend>
            <div className={styles.options}>
              {variants.map((v) => (
                <label
                  key={v.id}
                  className={`${styles.option} ${variantId === v.id ? styles.optionActive : ""}`}
                >
                  <input
                    type="radio"
                    name="variant"
                    value={v.id}
                    checked={variantId === v.id}
                    onChange={() => setVariantId(v.id)}
                  />
                  <span className={styles.optLabel}>{v.label}</span>
                  <span className={styles.optMeta}>
                    {v.price.toFixed(2)} € · {v.stock}
                  </span>
                </label>
              ))}
            </div>
            <div className={styles.nav}>
              <span />
              <button type="button" className={styles.btn} onClick={next}>
                Naprej →
              </button>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Količina</legend>
            <div className={styles.qty}>
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Manj"
              >
                −
              </button>
              <input
                type="number"
                value={qty}
                min={1}
                max={50}
                onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
              <button
                type="button"
                className={styles.qtyBtn}
                onClick={() => setQty((q) => Math.min(50, q + 1))}
                aria-label="Več"
              >
                +
              </button>
            </div>
            <p className={styles.note}>
              Pri količini 5+ lahko za posebne pakete pišete na{" "}
              <a href="mailto:knjiga@arih.si">knjiga@arih.si</a>.
            </p>
            <div className={styles.nav}>
              <button type="button" className={styles.btnGhost} onClick={prev}>
                ← Nazaj
              </button>
              <button type="button" className={styles.btn} onClick={next}>
                Naprej →
              </button>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Dostava</legend>
            <div className={styles.options}>
              {shipping.map((s) => (
                <label
                  key={s.id}
                  className={`${styles.option} ${shippingId === s.id ? styles.optionActive : ""}`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value={s.id}
                    checked={shippingId === s.id}
                    onChange={() => setShippingId(s.id)}
                  />
                  <span className={styles.optLabel}>{s.label}</span>
                  <span className={styles.optMeta}>
                    {s.price.toFixed(2)} € · {s.eta}
                  </span>
                </label>
              ))}
            </div>
            <div className={styles.nav}>
              <button type="button" className={styles.btnGhost} onClick={prev}>
                ← Nazaj
              </button>
              <button type="button" className={styles.btn} onClick={next}>
                Naprej →
              </button>
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Vaši podatki</legend>
            <div className={styles.fields}>
              <label className={styles.field}>
                <span>Ime in priimek</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Janez Novak"
                />
              </label>
              <label className={styles.field}>
                <span>E-pošta</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ime@primer.si"
                />
              </label>
              <label className={styles.field}>
                <span>Naslov</span>
                <input type="text" required placeholder="Ulica in hišna številka" />
              </label>
              <label className={styles.field}>
                <span>Pošta in mesto</span>
                <input type="text" required placeholder="1000 Ljubljana" />
              </label>
              <label className={`${styles.field} ${styles.fieldWide}`}>
                <span>Opomba (neobvezno)</span>
                <textarea rows={2} placeholder="Posvetilo, opombe za dostavo …" />
              </label>
              <label className={`${styles.field} ${styles.fieldCheck}`}>
                <input type="checkbox" required />
                <span>Strinjam se s pogoji prodaje in pravili o zasebnosti.</span>
              </label>
            </div>
            <div className={styles.nav}>
              <button type="button" className={styles.btnGhost} onClick={prev}>
                ← Nazaj
              </button>
              <button type="button" className={styles.btn} onClick={next}>
                Naprej →
              </button>
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Povzetek naročila</legend>
            <dl className={styles.summary}>
              <dt>Različica</dt>
              <dd>
                {selectedVariant.label}{" "}
                <span className={styles.dim}>({selectedVariant.price.toFixed(2)} €)</span>
              </dd>
              <dt>Količina</dt>
              <dd>{qty}</dd>
              <dt>Dostava</dt>
              <dd>
                {selectedShipping.label}{" "}
                <span className={styles.dim}>
                  ({selectedShipping.price.toFixed(2)} €, {selectedShipping.eta})
                </span>
              </dd>
              <dt>Naročnik</dt>
              <dd>{name || "—"}</dd>
              <dt>E-pošta</dt>
              <dd>{email || "—"}</dd>
              <dt className={styles.summaryTotal}>Skupaj</dt>
              <dd className={styles.summaryTotal}>{total.toFixed(2)} €</dd>
            </dl>
            <div className={styles.nav}>
              <button type="button" className={styles.btnGhost} onClick={prev}>
                ← Nazaj
              </button>
              <button type="submit" className={styles.btn}>
                Pošlji naročilo (demo)
              </button>
            </div>
            <p className={styles.note}>
              Po oddaji prejmete e-pošto z navodili za plačilo. To je demo — pravo
              procesiranje plačila se vklopi pri integraciji.
            </p>
          </fieldset>
        )}

        {step === "done" && (
          <fieldset className={`${styles.fieldset} ${styles.done}`}>
            <legend className={styles.legend}>Hvala</legend>
            <p>
              Vaše naročilo je bilo zabeleženo. (Demo — v živem sistemu bi tu
              prejeli potrdilo na e-pošto in povezavo do plačila.)
            </p>
            <p className={styles.note}>
              Številka demo-naročila: <strong>{orderId}</strong>
            </p>
            <p>
              <a href="/">← Nazaj na domačo stran</a>
            </p>
          </fieldset>
        )}
      </form>

      <aside className={styles.total} aria-live="polite">
        <div className={styles.totalRow}>
          <span>Različica</span>
          <span>{selectedVariant.label}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Količina</span>
          <span>{qty}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Dostava</span>
          <span>{selectedShipping.label}</span>
        </div>
        <hr className={styles.hr} />
        <div className={`${styles.totalRow} ${styles.totalSum}`}>
          <span>Skupaj</span>
          <span>{total.toFixed(2)} €</span>
        </div>
      </aside>
    </div>
  );
}
