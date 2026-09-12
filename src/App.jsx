import { useState } from "react";
import "./index.css";

const materials = [
  { name: "PCB", icon: "▦", rate: 290, trend: "+6%", tone: "mint" },
  { name: "Cables", icon: "⌁", rate: 130, trend: "+3%", tone: "yellow" },
  { name: "LCD Panel", icon: "▣", rate: 95, trend: "→ 1%", tone: "blue" },
  { name: "Battery", icon: "▰", rate: 160, trend: "+4%", tone: "rose" },
  { name: "CRT", icon: "▤", rate: 80, trend: "→ 0%", tone: "purple" },
  { name: "Motors", icon: "⚙", rate: 180, trend: "+2%", tone: "orange" },
  { name: "Mixed Plastics", icon: "♲", rate: 55, trend: "→ 0%", tone: "green" },
];

const transactions = [
  ["PCB", "10 kg", "KC-2026-00124", "₹2,900", "12 Sep 2026"],
  ["Cables", "25 kg", "KC-2026-00108", "₹3,250", "04 Sep 2026"],
  ["Mixed Plastics", "40 kg", "KC-2026-00091", "₹2,300", "29 Aug 2026"],
];

const availableLots = [
  {
    id: "KC-2026-00124",
    material: "PCB",
    weight: 10,
    condition: "Mixed / Used",
    estimated: 2900,
    offer: 2850,
    distance: 4.2,
    pickup: true,
    date: "12 Sep 2026",
  },
  {
    id: "KC-2026-00125",
    material: "Cables",
    weight: 25,
    condition: "Sorted",
    estimated: 3100,
    offer: 3050,
    distance: 6.8,
    pickup: true,
    date: "12 Sep 2026",
  },
  {
    id: "KC-2026-00130",
    material: "LCD Panel",
    weight: 15,
    condition: "Used",
    estimated: 1425,
    offer: 1350,
    distance: 9.1,
    pickup: false,
    date: "11 Sep 2026",
  },
];

const copy = {
  en: {
    home: "Home",
    prices: "Prices",
    recycler: "Recycler",
    earnings: "Earnings",
    safety: "Safety",
    welcome: "Namaste, Demo Collector",
    tagline: "Sell e-waste safely & fairly",
    create: "Create E-Waste Lot",
    active: "Active lot",
    looking: "Looking for recycler",
    board: "Price Board",
    boardSub: "Demo rates • location and condition can change prices",
    find: "Find Authorized Recycler",
    estimate: "Value Estimate",
    confirm: "Confirm Handover",
    receipt: "Handover Confirmed",
    ledger: "Earnings Ledger",
    safetyTitle: "Safety First",
    dashboard: "Partner Dashboard",
  },
  hi: {
    home: "होम",
    prices: "भाव",
    recycler: "रीसायकलर",
    earnings: "कमाई",
    safety: "सुरक्षा",
    welcome: "नमस्ते, डेमो कलेक्टर",
    tagline: "ई-कचरा सुरक्षित और सही दाम पर बेचें",
    create: "ई-कचरे का लॉट बनाएं",
    active: "चल रहा लॉट",
    looking: "रीसायकलर की तलाश",
    board: "आज का भाव",
    boardSub: "डेमो भाव • जगह और हालत से भाव बदल सकता है",
    find: "अधिकृत रीसायकलर खोजें",
    estimate: "अनुमानित कीमत",
    confirm: "हैंडओवर पक्का करें",
    receipt: "हैंडओवर पूरा हुआ",
    ledger: "कमाई का हिसाब",
    safetyTitle: "सुरक्षा पहले",
    dashboard: "पार्टनर डैशबोर्ड",
  },
};

function App() {
  const [lang, setLang] = useState("en");
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("home");
  const [pageHistory, setPageHistory] = useState(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [material, setMaterial] = useState(materials[0]);
  const [weight, setWeight] = useState("10");
  const [photo, setPhoto] = useState(false);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [pickupStep, setPickupStep] = useState(1);
  const [handoverConfirmed, setHandoverConfirmed] = useState(false);
  const [paymentPaid, setPaymentPaid] = useState(false);
  const t = copy[lang];
  const value = Number(weight || 0) * material.rate;
  const go = (next) => {
    setPage(next);
    setPageHistory((current) => [...current.slice(0, historyIndex + 1), next]);
    setHistoryIndex((current) => current + 1);
  };
  const goBack = () => {
    if (historyIndex === 0) return;
    const nextIndex = historyIndex - 1;
    setHistoryIndex(nextIndex);
    setPage(pageHistory[nextIndex]);
  };
  const goForward = () => {
    if (historyIndex >= pageHistory.length - 1) return;
    const nextIndex = historyIndex + 1;
    setHistoryIndex(nextIndex);
    setPage(pageHistory[nextIndex]);
  };
  const chooseRole = (nextRole) => {
    setRole(nextRole);
    const startingPage = nextRole === "recycler" ? "dashboard" : "home";
    setPage(startingPage);
    setPageHistory([startingPage]);
    setHistoryIndex(0);
  };
  if (!role)
    return (
      <RoleChooser lang={lang} setLang={setLang} chooseRole={chooseRole} />
    );
  const nav = [
    { id: "home", icon: "⌂", label: t.home },
    { id: "prices", icon: "₹", label: t.prices },
    { id: "recyclers", icon: "♲", label: t.recycler },
    { id: "earnings", icon: "▤", label: t.earnings },
    { id: "safety", icon: "✚", label: t.safety },
  ];
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="top-left">
          <div className="history-controls">
            <button
              className="history-button"
              aria-label="Go back"
              title="Go back"
              disabled={historyIndex === 0}
              onClick={goBack}
            >
              ←
            </button>
            <button
              className="history-button"
              aria-label="Go forward"
              title="Go forward"
              disabled={historyIndex >= pageHistory.length - 1}
              onClick={goForward}
            >
              →
            </button>
          </div>
          <div className="brand">
            <span className="brand-mark">♲</span>
            <span>
              <b>Kabadiwala</b>
              <strong>Connect</strong>
            </span>
          </div>
        </div>
        <div className="top-actions">
          <span className="offline">
            <i /> Offline-ready
          </span>
          <button
            className="lang"
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
          >
            {lang === "en" ? "हिंदी" : "English"}
          </button>
          <button className="role-switch" onClick={() => setRole(null)}>
            Switch role
          </button>
        </div>
      </header>
      <main
        className={`main-content ${role === "recycler" ? "recycler-content" : ""}`}
      >
        {role === "recycler" ? (
          <RecyclerPortal
            page={page}
            go={go}
            offerSubmitted={offerSubmitted}
            setOfferSubmitted={setOfferSubmitted}
            pickupStep={pickupStep}
            setPickupStep={setPickupStep}
            handoverConfirmed={handoverConfirmed}
            setHandoverConfirmed={setHandoverConfirmed}
            paymentPaid={paymentPaid}
            setPaymentPaid={setPaymentPaid}
          />
        ) : (
          <>
            {page === "home" && <Home t={t} go={go} />}
            {page === "create" && (
              <Create
                t={t}
                material={material}
                setMaterial={setMaterial}
                weight={weight}
                setWeight={setWeight}
                photo={photo}
                setPhoto={setPhoto}
                go={go}
              />
            )}
            {page === "estimate" && (
              <Estimate
                t={t}
                material={material}
                weight={weight}
                value={value}
                go={go}
              />
            )}
            {page === "prices" && <Prices t={t} />}
            {page === "recyclers" && (
              <Recyclers
                t={t}
                go={go}
                material={material}
                weight={weight}
                value={value}
              />
            )}
            {page === "confirm" && (
              <Confirm
                t={t}
                material={material}
                weight={weight}
                value={value}
                go={go}
              />
            )}
            {page === "receipt" && (
              <Receipt t={t} weight={weight} value={value} go={go} />
            )}
            {page === "earnings" && <Earnings t={t} />}
            {page === "safety" && <Safety t={t} />}
          </>
        )}
      </main>
      {role === "collector" &&
        !["create", "estimate", "confirm", "receipt"].includes(page) && (
          <nav className="bottom-nav">
            {nav.map((item) => (
              <button
                key={item.id}
                className={page === item.id ? "active" : ""}
                onClick={() => go(item.id)}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        )}
    </div>
  );
}

const Header = ({ eyebrow, title, sub }) => (
  <div className="page-heading">
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {sub && <p className="subtle">{sub}</p>}
    </div>
  </div>
);
const Button = ({ children, onClick, secondary = false }) => (
  <button
    className={`primary-btn ${secondary ? "secondary-btn" : ""}`}
    onClick={onClick}
  >
    {children}
    <span>→</span>
  </button>
);

function RoleChooser({ lang, setLang, chooseRole }) {
  const hindi = lang === "hi";
  return (
    <div className="role-screen">
      <header className="topbar role-topbar">
        <div className="brand">
          <span className="brand-mark">♲</span>
          <span>
            <b>Kabadiwala</b>
            <strong>Connect</strong>
          </span>
        </div>
        <button className="lang" onClick={() => setLang(hindi ? "en" : "hi")}>
          {hindi ? "English" : "हिंदी"}
        </button>
      </header>
      <main className="role-content">
        <div className="role-symbol">♲</div>
        <p className="eyebrow">
          KABADIWALA CONNECT <span className="demo-pill">DEMO</span>
        </p>
        <h1>{hindi ? "आप कौन हैं?" : "How are you joining today?"}</h1>
        <p className="role-subtitle">
          {hindi
            ? "अपना काम चुनें और शुरू करें"
            : "Choose your work to get started"}
        </p>
        <div className="role-options">
          <button
            className="role-card collector-role"
            onClick={() => chooseRole("collector")}
          >
            <span>♲</span>
            <div>
              <b>{hindi ? "कबाड़ीवाला" : "Kabadiwala"}</b>
              <small>
                {hindi
                  ? "ई-कचरा बेचें और कमाई देखें"
                  : "Sell e-waste and track earnings"}
              </small>
            </div>
            <strong>→</strong>
          </button>
          <button
            className="role-card recycler-role"
            onClick={() => chooseRole("recycler")}
          >
            <span>▣</span>
            <div>
              <b>{hindi ? "रीसायकलर पार्टनर" : "Recycler Partner"}</b>
              <small>
                {hindi
                  ? "लॉट स्वीकार करें और पिकअप संभालें"
                  : "Accept lots and manage pickups"}
              </small>
            </div>
            <strong>→</strong>
          </button>
        </div>
        <div className="role-note">
          <i /> Prototype demo • Choose either view to explore
        </div>
      </main>
    </div>
  );
}

function Home({ t, go }) {
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">
            KABADIWALA CONNECT <span className="demo-pill">DEMO</span>
          </p>
          <h1>{t.welcome}</h1>
          <p className="hero-copy">{t.tagline}</p>
        </div>
        <div className="hero-orbit">
          <span>₹</span>
          <i>♲</i>
        </div>
      </section>
      <Button onClick={() => go("create")}>＋ {t.create}</Button>
      <div className="section-label">{t.active}</div>
      <div className="lot-card">
        <div className="lot-icon">▦</div>
        <div className="lot-info">
          <b>
            PCB <small>10 kg</small>
          </b>
          <span>Lot ID: KC-2026-00124</span>
          <em>{t.looking}</em>
        </div>
        <strong>₹2,900</strong>
      </div>
      <div className="feature-grid">
        <button onClick={() => go("prices")}>
          <span className="feature-icon yellow-bg">₹</span>
          <b>{t.board}</b>
          <small>Check today&apos;s prices</small>
        </button>
        <button onClick={() => go("recyclers")}>
          <span className="feature-icon mint-bg">♲</span>
          <b>{t.recycler}</b>
          <small>Connect with verified partners</small>
        </button>
        <button onClick={() => go("earnings")}>
          <span className="feature-icon blue-bg">▤</span>
          <b>{t.earnings}</b>
          <small>View your earnings</small>
        </button>
        <button onClick={() => go("safety")}>
          <span className="feature-icon rose-bg">✚</span>
          <b>{t.safety}</b>
          <small>Learn safe handling</small>
        </button>
      </div>
      <button className="partner-link" onClick={() => go("dashboard")}>
        ▣ {t.dashboard}
        <span>→</span>
      </button>
    </>
  );
}

function Create({
  t,
  material,
  setMaterial,
  weight,
  setWeight,
  photo,
  setPhoto,
  go,
}) {
  return (
    <>
      <Header eyebrow="NEW LOT" title={t.create} sub="Only 3 simple steps" />
      <div className="step-list">
        <div className="step">
          <span className="step-num">1</span>
          <div className="step-content">
            <b>Add a photo</b>
            <small>Helps us identify your material</small>
            <button
              className={`photo-box ${photo ? "added" : ""}`}
              onClick={() => setPhoto(true)}
            >
              <span>{photo ? "✓" : "▣"}</span>
              {photo ? "Photo added" : "Add Photo"}
            </button>
          </div>
        </div>
        <div className="step">
          <span className="step-num">2</span>
          <div className="step-content">
            <b>Select material</b>
            <small>What are you selling today?</small>
            <div className="material-scroll">
              {materials.map((item) => (
                <button
                  key={item.name}
                  className={material.name === item.name ? "selected" : ""}
                  onClick={() => setMaterial(item)}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="step">
          <span className="step-num">3</span>
          <div className="step-content">
            <b>Approximate weight</b>
            <small>Enter weight in kilograms</small>
            <label className="weight-input">
              <input
                type="number"
                min="1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <span>kg</span>
            </label>
          </div>
        </div>
      </div>
      <Button onClick={() => go("estimate")}>Get Value Estimate</Button>
    </>
  );
}

function Estimate({ t, material, weight, value, go }) {
  return (
    <>
      <Header
        eyebrow="STEP 2 OF 3"
        title={t.estimate}
        sub="Here is an approximate value for your lot"
      />
      <div className="estimate-card">
        <div className="ai-chip">✦ SIMULATED AI DETECTION</div>
        <div className="detected">
          <span className="large-material">{material.icon}</span>
          <div>
            <small>Material detected</small>
            <h2>{material.name}</h2>
            <p>{weight} kg • 94% confidence</p>
          </div>
          <span className="check">✓</span>
        </div>
        <div className="big-value">
          <small>Estimated value</small>
          <strong>₹{value.toLocaleString("en-IN")}</strong>
          <span>₹{material.rate}/kg</span>
        </div>
        <div className="range-row">
          <span>Market range</span>
          <b>
            ₹{Math.round(value * 0.86).toLocaleString("en-IN")} – ₹
            {Math.round(value * 1.07).toLocaleString("en-IN")}
          </b>
        </div>
        <div className="best-offer">
          <span>BEST RECYCLER OFFER</span>
          <b>₹{material.rate}/kg</b>
        </div>
      </div>
      <p className="prototype-note">
        ⓘ Prototype estimate • verify the final rate before sale
      </p>
      <Button onClick={() => go("recyclers")}>{t.find}</Button>
    </>
  );
}

function Prices({ t }) {
  return (
    <>
      <Header eyebrow="TRANSPARENT PRICES" title={t.board} sub={t.boardSub} />
      <div className="chart-card">
        <div>
          <small>Average demo buying rate</small>
          <strong>
            ₹164 <span>/ kg</span>
          </strong>
        </div>
        <div className="chart">
          <span style={{ height: "32%" }} />
          <span style={{ height: "48%" }} />
          <span style={{ height: "42%" }} />
          <span style={{ height: "70%" }} />
          <span style={{ height: "62%" }} />
          <span style={{ height: "88%" }} />
          <span style={{ height: "78%" }} />
        </div>
        <div className="chart-labels">
          <span>06 Sep</span>
          <span>Today</span>
        </div>
      </div>
      <div className="price-list">
        {materials.slice(0, 5).map((item) => (
          <div className="price-row" key={item.name}>
            <span className={`material-icon ${item.tone}`}>{item.icon}</span>
            <div>
              <b>{item.name}</b>
              <small>Demo rate</small>
            </div>
            <strong>
              ₹{item.rate}
              <small>/kg</small>
            </strong>
            <em className={item.trend.includes("+") ? "up" : ""}>
              {item.trend}
            </em>
          </div>
        ))}
      </div>
    </>
  );
}

function Recyclers({ t, go, material }) {
  return (
    <>
      <Header
        eyebrow="MATCHED FOR YOUR LOT"
        title={t.recycler}
        sub="Demo partners matched by rate, distance and pickup"
      />
      <div className="best-match">✦ BEST MATCH</div>
      <RecyclerCard
        name="GreenCycle Recycling"
        distance="8.4 km"
        offer={material.rate}
        pickup="Pickup available"
        best
        onClick={() => go("confirm")}
      />
      <RecyclerCard
        name="EcoLoop Materials"
        distance="13.1 km"
        offer={material.rate - 15}
        pickup="Self-drop"
        onClick={() => go("confirm")}
      />
      <p className="prototype-note">
        ⓘ Fictional demo recycler data • authorization shown for prototype only
      </p>
    </>
  );
}
const RecyclerCard = ({ name, distance, offer, pickup, best, onClick }) => (
  <div className={`recycler-card ${best ? "best" : ""}`}>
    <div className="recycler-avatar">♲</div>
    <div className="recycler-main">
      <div className="recycler-title">
        <b>{name}</b>
        {best && <span>✓ Verified demo</span>}
      </div>
      <p>
        ⌖ {distance} &nbsp; • &nbsp; {pickup}
      </p>
      <strong>
        ₹{offer}
        <small>/kg offer</small>
      </strong>
      <button onClick={onClick}>
        Select Recycler <span>→</span>
      </button>
    </div>
  </div>
);

function Confirm({ t, material, weight, value, go }) {
  return (
    <>
      <Header
        eyebrow="ALMOST DONE"
        title={t.confirm}
        sub="Check the details before we create your record"
      />
      <div className="confirm-card">
        <div className="confirm-row">
          <span>Lot ID</span>
          <b>KC-2026-00124</b>
        </div>
        <div className="confirm-row">
          <span>Material</span>
          <b>
            {material.name} • {weight} kg
          </b>
        </div>
        <div className="confirm-row">
          <span>Recycler</span>
          <b>GreenCycle Recycling</b>
        </div>
        <div className="confirm-row">
          <span>Quoted price</span>
          <b className="green-text">₹{value.toLocaleString("en-IN")}</b>
        </div>
        <div className="location-demo">
          ⌖ GPS captured <b>Demo location</b>
          <small>12 Sep 2026 • Demo timestamp</small>
        </div>
      </div>
      <Button onClick={() => go("receipt")}>Confirm & Generate Receipt</Button>
    </>
  );
}
function Receipt({ t, weight, value, go }) {
  return (
    <div className="receipt-page">
      <div className="success-mark">✓</div>
      <p className="eyebrow">DIGITAL TRACEABILITY</p>
      <h1>{t.receipt}</h1>
      <p className="subtle">Digital handover record created</p>
      <div className="receipt-card">
        <div className="receipt-top">
          <span>Reference</span>
          <b>KC-HO-874321</b>
        </div>
        <div className="receipt-grid">
          <span>
            Lot
            <br />
            <b>KC-2026-00124</b>
          </span>
          <span>
            Weight
            <br />
            <b>{weight} kg</b>
          </span>
          <span>
            Final value
            <br />
            <b>₹{value.toLocaleString("en-IN")}</b>
          </span>
          <span>
            Payment
            <br />
            <b className="green-text">Paid ✓</b>
          </span>
        </div>
        <div className="qr">
          ▦<small>Verifiable QR / Reference</small>
        </div>
      </div>
      <Button onClick={() => go("earnings")}>View Earnings</Button>
    </div>
  );
}
function Earnings({ t }) {
  return (
    <>
      <Header
        eyebrow="YOUR RECORDS"
        title={t.ledger}
        sub="Every sale in one simple place"
      />
      <div className="earnings-total">
        <div>
          <small>Total recorded earnings</small>
          <strong>₹8,450</strong>
          <span>3 completed transactions</span>
        </div>
        <span className="earnings-icon">₹</span>
      </div>
      <div className="section-label">Recent transactions</div>
      <div className="transactions">
        {transactions.map((row) => (
          <div className="transaction" key={row[2]}>
            <span className="transaction-icon">
              {row[0] === "PCB" ? "▦" : "♲"}
            </span>
            <div>
              <b>
                {row[0]} <small>• {row[1]}</small>
              </b>
              <small>
                {row[2]} · {row[4]}
              </small>
            </div>
            <strong>
              {row[3]}
              <small>Paid ✓</small>
            </strong>
          </div>
        ))}
      </div>
    </>
  );
}
function Safety({ t }) {
  const cards = [
    ["🔥", "Do not burn cables", "Avoid open-air burning and toxic fumes."],
    [
      "🔋",
      "Handle batteries carefully",
      "Avoid puncturing, crushing or unsafe opening.",
    ],
    ["⚠", "CRT caution", "Do not break or dismantle CRTs casually."],
    [
      "🧤",
      "Use basic protection",
      "Use gloves and keep hazardous material separated.",
    ],
  ];
  return (
    <>
      <Header
        eyebrow="CARE FOR YOURSELF"
        title={t.safetyTitle}
        sub="Small steps keep you and our planet safe"
      />
      <div className="safety-list">
        {cards.map((card) => (
          <div className="safety-card" key={card[1]}>
            <span>{card[0]}</span>
            <div>
              <b>{card[1]}</b>
              <p>{card[2]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="offline-card">
        <span>◉</span>
        <div>
          <b>Low connectivity mode</b>
          <p>Your data will sync when connectivity returns.</p>
        </div>
      </div>
    </>
  );
}
const Status = ({ children, tone = "green" }) => (
  <span className={`status ${tone}`}>{children}</span>
);

function RecyclerPortal({
  page,
  go,
  offerSubmitted,
  setOfferSubmitted,
  pickupStep,
  setPickupStep,
  handoverConfirmed,
  setHandoverConfirmed,
  paymentPaid,
  setPaymentPaid,
}) {
  const [selectedLot, setSelectedLot] = useState(null);
  const [search, setSearch] = useState("");
  const [materialFilter, setMaterialFilter] = useState("All");
  const [offerPrice, setOfferPrice] = useState("290");
  const [rate, setRate] = useState(290);
  const filteredLots = availableLots.filter(
    (lot) =>
      (materialFilter === "All" || lot.material === materialFilter) &&
      `${lot.id} ${lot.material}`.toLowerCase().includes(search.toLowerCase()),
  );
  const openLot = (lot) => {
    setSelectedLot(lot);
    go("lot-detail");
  };
  const nav = [
    { id: "dashboard", icon: "⌂", label: "Dashboard" },
    { id: "lots", icon: "▣", label: "Available Lots" },
    { id: "offers", icon: "₹", label: "Pricing & Offers" },
    { id: "pickup", icon: "⌁", label: "Pickup" },
    { id: "handover", icon: "♢", label: "Handover" },
    { id: "payments", icon: "▤", label: "Payments" },
    { id: "purchases", icon: "▥", label: "Purchase History" },
    { id: "notifications", icon: "♧", label: "Notifications" },
    { id: "profile", icon: "⚙", label: "Profile" },
  ];
  const content =
    page === "dashboard" ? (
      <RecyclerDashboard go={go} />
    ) : page === "lots" ? (
      <AvailableLots
        lots={filteredLots}
        search={search}
        setSearch={setSearch}
        materialFilter={materialFilter}
        setMaterialFilter={setMaterialFilter}
        openLot={openLot}
      />
    ) : page === "lot-detail" ? (
      <LotDetail lot={selectedLot || availableLots[0]} go={go} />
    ) : page === "offers" ? (
      <Offers
        rate={rate}
        setRate={setRate}
        offerPrice={offerPrice}
        setOfferPrice={setOfferPrice}
        offerSubmitted={offerSubmitted}
        setOfferSubmitted={setOfferSubmitted}
        go={go}
      />
    ) : page === "pickup" ? (
      <Pickup step={pickupStep} setStep={setPickupStep} go={go} />
    ) : page === "handover" ? (
      <Handover
        confirmed={handoverConfirmed}
        setConfirmed={setHandoverConfirmed}
        go={go}
      />
    ) : page === "payments" ? (
      <Payments paid={paymentPaid} setPaid={setPaymentPaid} />
    ) : page === "purchases" ? (
      <Purchases go={go} />
    ) : page === "purchase-detail" ? (
      <PurchaseDetail go={go} />
    ) : page === "notifications" ? (
      <Notifications />
    ) : (
      <Profile />
    );
  return (
    <div className="recycler-portal">
      <aside className="portal-sidebar">
        <div className="portal-brand">
          <span className="brand-mark">♲</span>
          <div>
            <b>Kabadiwala</b>
            <strong>Connect</strong>
          </div>
        </div>
        <div className="portal-identity">
          <span>GC</span>
          <div>
            <b>GreenCycle Recycling</b>
            <small>VERIFIED — DEMO</small>
          </div>
        </div>
        <nav>
          {nav.map((item) => (
            <button
              key={item.id}
              className={
                page === item.id ||
                (page === "lot-detail" && item.id === "lots")
                  ? "active"
                  : ""
              }
              onClick={() => go(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <button className="collector-link" onClick={() => go("home")}>
          ← Collector App
        </button>
      </aside>
      <section className="portal-main">
        <div className="portal-mobile-head">
          <button onClick={() => go("dashboard")}>☰</button>
          <b>Recycler Partner Portal</b>
          <span>●</span>
        </div>
        <nav className="portal-mobile-nav">
          {nav.slice(0, 6).map((item) => (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              onClick={() => go(item.id)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        {content}
      </section>
    </div>
  );
}

const PortalTitle = ({ eyebrow, title, sub }) => (
  <div className="portal-title">
    <div>
      <p className="eyebrow">
        {eyebrow} <span className="demo-pill">DEMO DATA</span>
      </p>
      <h1>{title}</h1>
      <p>{sub}</p>
    </div>
    <button className="notification-button">
      ♧<i>3</i>
    </button>
  </div>
);
function RecyclerDashboard({ go }) {
  return (
    <>
      <PortalTitle
        eyebrow="PARTNER PORTAL"
        title="Recycler Dashboard"
        sub="Manage e-waste lots, offers, pickups and transactions."
      />
      <div className="portal-stats">
        <Stat label="Available lots" value="12" note="↑ 4 this week" />
        <Stat label="My active offers" value="5" note="2 leading" />
        <Stat
          label="Pending pickups"
          value="4"
          note="Needs attention"
          tone="orange"
        />
        <Stat
          label="Awaiting payment"
          value="2"
          note="₹10,350 total"
          tone="orange"
        />
        <Stat label="Completed purchases" value="28" note="↑ 12% this month" />
      </div>
      <div className="quick-actions">
        <Quick
          title="Find new lots"
          text="View nearby e-waste"
          action="Browse Lots"
          onClick={() => go("lots")}
        />
        <Quick
          title="Manage pricing"
          text="Update buying rates"
          action="Update Prices"
          onClick={() => go("offers")}
        />
        <Quick
          title="Pickup"
          text="4 pending pickups"
          action="Manage Pickup"
          onClick={() => go("pickup")}
        />
        <Quick
          title="Payments"
          text="2 payments pending"
          action="View Payments"
          onClick={() => go("payments")}
        />
      </div>
      <div className="portal-grid">
        <section className="portal-panel">
          <PanelHead
            title="New lot request"
            link="View all"
            onClick={() => go("lots")}
          />
          <LotRow lot={availableLots[0]} onClick={() => go("lot-detail")} />
        </section>
        <section className="portal-panel">
          <PanelHead title="Traceability" link="KC-HO-874321" />
          <Timeline compact />
        </section>
      </div>
    </>
  );
}
const Stat = ({ label, value, note, tone }) => (
  <div className="portal-stat">
    <span>{label}</span>
    <strong>{value}</strong>
    <em className={tone}>{note}</em>
  </div>
);
const Quick = ({ title, text, action, onClick }) => (
  <div className="quick-card">
    <span>
      {title === "Find new lots"
        ? "▣"
        : title === "Manage pricing"
          ? "₹"
          : title === "Pickup"
            ? "⌁"
            : "▤"}
    </span>
    <div>
      <b>{title}</b>
      <small>{text}</small>
      <button onClick={onClick}>{action} →</button>
    </div>
  </div>
);
const PanelHead = ({ title, link, onClick }) => (
  <div className="panel-heading">
    <h2>{title}</h2>
    <button onClick={onClick}>{link} →</button>
  </div>
);
const money = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
function LotRow({ lot, onClick }) {
  return (
    <div className="lot-row">
      <div className="lot-symbol">▦</div>
      <div className="lot-row-main">
        <b>
          {lot.id} <Status tone="blue">AVAILABLE</Status>
        </b>
        <span>
          {lot.material} • {lot.weight} kg • {lot.distance} km away
        </span>
      </div>
      <strong>
        {money(lot.offer)}
        <small>best offer</small>
      </strong>
      <button onClick={onClick}>View details →</button>
    </div>
  );
}
function AvailableLots({
  lots,
  search,
  setSearch,
  materialFilter,
  setMaterialFilter,
  openLot,
}) {
  return (
    <>
      <PortalTitle
        eyebrow="MARKETPLACE"
        title="Available E-Waste Lots"
        sub="Find and purchase suitable material from collectors."
      />
      <div className="filters">
        <input
          placeholder="Search lot or material"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={materialFilter}
          onChange={(e) => setMaterialFilter(e.target.value)}
        >
          {["All", ...materials.map((item) => item.name)].map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <select>
          <option>Best Match</option>
          <option>Highest Quantity</option>
          <option>Nearest</option>
          <option>Newest</option>
        </select>
      </div>
      <div className="lot-table-head">
        <span>LOT DETAILS</span>
        <span>VALUE / OFFER</span>
        <span>PICKUP</span>
        <span>ACTION</span>
      </div>
      <div className="lot-list">
        {lots.map((lot) => (
          <div className="available-lot" key={lot.id}>
            <div className="available-main">
              <div className="lot-symbol">▦</div>
              <div>
                <b>{lot.id}</b>
                <strong>
                  {lot.material} <small>• {lot.weight} kg</small>
                </strong>
                <span>
                  {lot.condition} • {lot.distance} km away
                </span>
              </div>
            </div>
            <div className="available-value">
              <b>{money(lot.estimated)}</b>
              <span>Best: {money(lot.offer)}</span>
            </div>
            <div>
              <Status>● Pickup available</Status>
              <small className="created">Created {lot.date}</small>
            </div>
            <div className="lot-actions">
              <Status tone="blue">Available</Status>
              <button onClick={() => openLot(lot)}>View Details</button>
              <button className="outline-button" onClick={() => openLot(lot)}>
                Make Offer
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
function LotDetail({ lot, go }) {
  return (
    <>
      <button className="back-link" onClick={() => go("lots")}>
        ← Available lots
      </button>
      <PortalTitle
        eyebrow="LOT DETAILS"
        title={`Lot ${lot.id}`}
        sub="Review the material before making your offer."
      />
      <div className="detail-layout">
        <section className="portal-panel detail-card">
          <div className="photo-placeholder">
            ▦<span>Demo material photograph</span>
          </div>
          <div className="detail-grid">
            <Info label="Material" value={lot.material} />
            <Info label="Approximate weight" value={`${lot.weight} kg`} />
            <Info label="Condition" value={lot.condition} />
            <Info label="Collection date" value={lot.date} />
            <Info label="Collection location" value="Demo Location" />
            <Info label="Collector" value="Demo Collector" />
          </div>
        </section>
        <section className="portal-panel detail-card">
          <h2>Price information</h2>
          <div className="price-highlight">
            <span>Estimated value</span>
            <b>{money(lot.estimated)}</b>
          </div>
          <div className="price-highlight">
            <span>Current best offer</span>
            <b>{money(lot.offer)}</b>
          </div>
          <div className="detail-note">
            ⌖ Pickup available <b>{lot.distance} km estimated distance</b>
          </div>
          <h2>Traceability</h2>
          <Info label="Lot ID" value={lot.id} />
          <Info label="Collection timestamp" value="12 Sep 2026 • Demo" />
          <div className="detail-buttons">
            <button onClick={() => go("offers")}>Make Offer →</button>
            <button className="outline-button" onClick={() => go("pickup")}>
              Request Pickup
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
const Info = ({ label, value }) => (
  <div className="info">
    <span>{label}</span>
    <b>{value}</b>
  </div>
);
function Offers({
  rate,
  setRate,
  offerPrice,
  setOfferPrice,
  offerSubmitted,
  setOfferSubmitted,
}) {
  return (
    <>
      <PortalTitle
        eyebrow="BUYING RATES"
        title="Pricing & Offers"
        sub="Set your buying prices and manage offers for available lots."
      />
      <section className="portal-panel rate-panel">
        <PanelHead title="My buying rates" link="Rates are demo data" />
        {materials.map((item) => (
          <div className="rate-row" key={item.name}>
            <span className="rate-material">{item.icon}</span>
            <b>{item.name}</b>
            <strong>
              {money(item.name === "PCB" ? rate : item.rate)}
              <small>/ kg</small>
            </strong>
            <Status>Active</Status>
            <button onClick={() => setRate(item.rate)}>Edit</button>
          </div>
        ))}
        <div className="edit-rate">
          <b>Edit PCB rate</b>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <span>/kg</span>
          <button onClick={() => setRate(rate)}>✓ Buying price updated</button>
        </div>
      </section>
      <section className="portal-panel offer-panel">
        <PanelHead title="Make offer · KC-2026-00124" link="PCB • 10 kg" />
        <div className="offer-summary">
          <span>Estimated {money(2900)}</span>
          <span>Current best {money(2850)}</span>
        </div>
        <label>
          Your price per kg
          <input
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
          />
        </label>
        <p className="suggested">
          Suggested: ₹290/kg · Total offer:{" "}
          <b>{money(Number(offerPrice || 0) * 10)}</b>
        </p>
        {offerSubmitted ? (
          <div className="success-banner">
            ✓ Offer submitted · <b>Offer Active</b>
          </div>
        ) : (
          <button
            className="green-button"
            onClick={() => setOfferSubmitted(true)}
          >
            Submit Offer →
          </button>
        )}
      </section>
      <section className="portal-panel">
        <PanelHead title="Active offers" link="5 total" />
        {[
          ["KC-2026-00124", "PCB", "10 kg", "₹2,900", "Leading"],
          ["KC-2026-00125", "Cables", "25 kg", "₹3,100", "Pending"],
          ["KC-2026-00130", "LCD", "15 kg", "₹1,425", "Accepted"],
        ].map((row) => (
          <div className="offer-row" key={row[0]}>
            <b>{row[0]}</b>
            <span>
              {row[1]} • {row[2]}
            </span>
            <strong>{row[3]}</strong>
            <Status
              tone={
                row[4] === "Accepted"
                  ? "green"
                  : row[4] === "Pending"
                    ? "yellow"
                    : "blue"
              }
            >
              {row[4]}
            </Status>
          </div>
        ))}
      </section>
    </>
  );
}
function Pickup({ step, setStep, go }) {
  const labels = [
    "Offer Accepted",
    "Pickup Scheduled",
    "Pickup Started",
    "Material Collected",
    "Handover Confirmed",
    "Payment Completed",
  ];
  return (
    <>
      <PortalTitle
        eyebrow="LOGISTICS"
        title="Pickup Management"
        sub="Manage collection and transportation of accepted lots."
      />
      <div className="tabs">
        <button className="active">Upcoming (4)</button>
        <button>In Progress</button>
        <button>Completed</button>
      </div>
      <section className="portal-panel pickup-card">
        <div className="pickup-header">
          <div>
            <span className="pickup-id">PK-87421</span>
            <h2>KC-2026-00124 · PCB</h2>
            <p>10 kg · Demo Location · 4.2 km away</p>
          </div>
          <Status tone="orange">{labels[step]}</Status>
        </div>
        <div className="stepper">
          {labels.map((label, index) => (
            <div className={index <= step ? "done" : ""} key={label}>
              <i /> <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="pickup-meta">
          <span>
            Scheduled <b>Today · 4:30 PM</b>
          </span>
          <span>
            Collector <b>Demo Collector</b>
          </span>
        </div>
        {step < 5 ? (
          <button className="green-button" onClick={() => setStep(step + 1)}>
            {step === 1
              ? "Mark Pickup Started"
              : step === 2
                ? "Mark Material Collected"
                : step === 3
                  ? "Proceed to Handover"
                  : "Continue"}{" "}
            →
          </button>
        ) : (
          <button className="green-button" onClick={() => go("handover")}>
            Open Handover →
          </button>
        )}
      </section>
      <section className="portal-panel pickup-card muted-pickup">
        <b>PK-87422 · Cables • 25 kg</b>
        <span>Tomorrow · 11:00 AM · 6.8 km</span>
        <Status tone="orange">Pickup Scheduled</Status>
      </section>
    </>
  );
}
function Handover({ confirmed, setConfirmed, go }) {
  return (
    <>
      <PortalTitle
        eyebrow="VERIFICATION"
        title={confirmed ? "Handover Confirmed" : "Handover & Verification"}
        sub="Complete the simulated checks before material enters recycling."
      />
      {confirmed ? (
        <div className="confirmed-card">
          <div className="success-mark">✓</div>
          <h2>Handover Confirmed</h2>
          <p>Digital traceability record created.</p>
          <strong>KC-HO-874321</strong>
          <Timeline />
          <button className="green-button" onClick={() => go("payments")}>
            Go to Payments →
          </button>
        </div>
      ) : (
        <section className="portal-panel verify-card">
          <div className="handover-summary">
            <b>KC-2026-00124</b>
            <span>PCB · 10 kg · Demo Collector</span>
            <strong>₹2,900</strong>
          </div>
          {[
            "Material category verified",
            "Approximate weight verified",
            "Photograph matched",
            "Collection location recorded",
            "Lot ID verified",
          ].map((item) => (
            <label key={item}>
              <input type="checkbox" defaultChecked /> {item}
            </label>
          ))}
          <button className="green-button" onClick={() => setConfirmed(true)}>
            Confirm Handover →
          </button>
        </section>
      )}
    </>
  );
}
function Timeline({ compact = false }) {
  return (
    <div className={`timeline ${compact ? "compact" : ""}`}>
      {[
        "Lot Created",
        "Pickup Scheduled",
        "Material Collected",
        "Handover Confirmed",
        "Sent for Recycling",
      ].map((item, index) => (
        <div className={index < 4 ? "done" : ""} key={item}>
          <i>{index < 4 ? "✓" : ""}</i>
          <span>
            {item}
            <small>{index < 4 ? "12 Sep 2026" : "Next step"}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
function Payments({ paid, setPaid }) {
  return (
    <>
      <PortalTitle
        eyebrow="FINANCE"
        title="Payments"
        sub="Track payments associated with purchased lots."
      />
      <div className="payment-stats">
        <Stat label="Total purchases" value="₹82,450" note="28 lots" />
        <Stat label="Paid" value="₹72,100" note="Completed" />
        <Stat label="Pending" value="₹10,350" note="2 payments" tone="orange" />
      </div>
      <section className="portal-panel">
        <PanelHead title="Payment activity" link="Demo ledger" />
        {[
          ["KC-HO-874321", "PCB", "₹2,900", "Today", true],
          ["KC-HO-872110", "Cables", "₹3,250", "08 Sep", true],
          ["KC-HO-870034", "Plastics", "₹2,300", "02 Sep", paid],
        ].map((row) => (
          <div className="payment-row" key={row[0]}>
            <b>{row[0]}</b>
            <span>{row[1]}</span>
            <strong>{row[2]}</strong>
            <span>{row[3]}</span>
            <Status tone={row[4] ? "green" : "yellow"}>
              {row[4] ? "Paid" : "Pending"}
            </Status>
            {!row[4] && (
              <button onClick={() => setPaid(true)}>Mark paid</button>
            )}
          </div>
        ))}
      </section>
    </>
  );
}
function Purchases({ go }) {
  return (
    <>
      <PortalTitle
        eyebrow="RECORDS"
        title="Purchase History"
        sub="View all previously purchased e-waste lots."
      />
      <div className="history-tools">
        <input placeholder="Search lot, material or location" />
        <select>
          <option>All materials</option>
          <option>PCB</option>
          <option>Cables</option>
        </select>
        <select>
          <option>All payments</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>
      <section className="portal-panel">
        <div className="purchase-head">
          <span>LOT ID / MATERIAL</span>
          <span>WEIGHT</span>
          <span>LOCATION</span>
          <span>PRICE</span>
          <span>STATUS</span>
        </div>
        {[
          ["KC-2026-00124", "PCB", "10 kg", "Demo Location", "₹2,900", "Paid"],
          [
            "KC-2026-00118",
            "Cables",
            "25 kg",
            "Demo Location",
            "₹3,250",
            "Paid",
          ],
          [
            "KC-2026-00110",
            "Mixed Plastics",
            "40 kg",
            "Demo Location",
            "₹2,300",
            "Pending",
          ],
        ].map((row) => (
          <button
            className="purchase-row"
            key={row[0]}
            onClick={() => go("purchase-detail")}
          >
            <b>
              {row[0]}
              <small>{row[1]}</small>
            </b>
            <span>{row[2]}</span>
            <span>{row[3]}</span>
            <strong>{row[4]}</strong>
            <Status tone={row[5] === "Paid" ? "green" : "yellow"}>
              {row[5]} · Completed
            </Status>
          </button>
        ))}
      </section>
    </>
  );
}
function PurchaseDetail({ go }) {
  return (
    <>
      <button className="back-link" onClick={() => go("purchases")}>
        ← Purchase history
      </button>
      <PortalTitle
        eyebrow="TRANSACTION DETAIL"
        title="Purchase KC-2026-00124"
        sub="Complete traceability for this purchased lot."
      />
      <div className="detail-layout">
        <section className="portal-panel detail-card">
          <h2>Purchase summary</h2>
          <div className="detail-grid">
            <Info label="Material" value="PCB" />
            <Info label="Weight" value="10 kg" />
            <Info label="Purchase price" value="₹2,900" />
            <Info label="Price per kg" value="₹290" />
            <Info label="Collector" value="Demo Collector" />
            <Info label="Collection location" value="Demo Location" />
            <Info label="Pickup" value="Completed" />
            <Info label="Handover" value="Confirmed" />
            <Info label="Payment" value="Paid" />
          </div>
          <div className="detail-note">
            Traceability reference <b>KC-HO-874321</b>
          </div>
        </section>
        <section className="portal-panel detail-card">
          <h2>Journey timeline</h2>
          <Timeline />
        </section>
      </div>
    </>
  );
}
function Notifications() {
  return (
    <>
      <PortalTitle
        eyebrow="UPDATES"
        title="Notifications"
        sub="Important activity from your connected lots."
      />
      <section className="portal-panel notification-list">
        {[
          "New PCB lot available nearby",
          "Your offer for KC-2026-00124 was accepted",
          "Pickup scheduled for today",
          "Handover KC-HO-874321 confirmed",
          "Payment ₹2,900 marked completed",
        ].map((item, i) => (
          <div key={item}>
            <span>{i === 0 ? "▣" : i === 1 ? "✓" : "♧"}</span>
            <b>{item}</b>
            <small>
              {i + 1} hour{i ? "s" : ""} ago
            </small>
          </div>
        ))}
      </section>
    </>
  );
}
function Profile() {
  return (
    <>
      <PortalTitle
        eyebrow="ACCOUNT"
        title="Recycler Profile"
        sub="Your demo partner profile and service settings."
      />
      <section className="portal-panel profile-card">
        <div className="profile-avatar">GC</div>
        <h2>GreenCycle Recycling</h2>
        <Status>✓ Verified — Demo</Status>
        <div className="profile-grid">
          <Info label="Type" value="E-Waste Recycler" />
          <Info label="Service area" value="25 km" />
          <Info label="Pickup" value="Available" />
          <Info label="Contact" value="+91 90000 00000 (Demo)" />
        </div>
        <h3>Accepted materials</h3>
        <div className="material-tags">
          PCB · Cables · LCD · Battery · Motors
        </div>
        <p className="prototype-note">
          Authorization and contact details are fictional prototype data.
        </p>
      </section>
    </>
  );
}

export default App;
