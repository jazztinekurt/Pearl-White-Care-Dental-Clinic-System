/* ==========================================================
   PEARL WHITE: clinical sample data for the dentist pages.
   Loaded after staff.js, which holds the shared clinic data
   (patients, appointments, branches). Only dentists see what is
   in this file. Prototype only: notes, chart changes and uploads
   are kept in sessionStorage until the tab is closed.
   ========================================================== */

const DN = (() => {
  const ME = "santos"; // signed-in dentist for the prototype

  /* ---------- Tooth chart legend: from the clinic's paper form ---------- */
  const legend = [
    { code: "C", name: "Dental caries", kind: "cav" },
    { code: "C1", name: "Caries with vital pulp exposed", kind: "cav" },
    { code: "C2", name: "Caries with non-vital pulp exposed", kind: "cav" },
    { code: "X", name: "Indicated for extraction", kind: "cav" },
    { code: "RF", name: "Retained root fragment", kind: "cav" },
    { code: "AM", name: "Amalgam filling", kind: "fill" },
    { code: "Co", name: "Composite resin", kind: "fill" },
    { code: "CoI", name: "Composite inlay", kind: "fill" },
    { code: "GIC", name: "Glass ionomer cement", kind: "fill" },
    { code: "MI", name: "Metal inlay", kind: "fill" },
    { code: "GC", name: "Gold crown", kind: "crown" },
    { code: "PorJC", name: "Porcelain jacket crown", kind: "crown" },
    { code: "PJC", name: "Plastic jacket crown", kind: "crown" },
    { code: "AB", name: "Bridge abutment", kind: "crown" },
    { code: "P", name: "Pontic", kind: "crown" },
    { code: "M", name: "Missing due to extraction", kind: "miss" },
    { code: "Un", name: "Unerupted", kind: "un" },
  ];
  // FDI numbering, as the patient sees it facing them
  const upper = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  const lower = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
  const surfaces = [
    ["M", "Mesial"], ["O", "Occlusal"], ["D", "Distal"], ["B", "Buccal"], ["L", "Lingual"],
  ];

  /* ---------- Clinical records (sample) ---------- */
  const records = {
    "P-0142": {
      medical: { conditions: [], allergies: "None reported", meds: "None", pregnant: "No" },
      dental: "Two fillings (2022). Last cleaning 2024.",
      plan: { name: "Braces (metal)", done: 6, of: 12, started: "2026-08-27", next: "Wire change in 3 weeks" },
      chart: {
        36: { code: "Co", surfaces: ["O"], note: "2022" },
        46: { code: "AM", surfaces: ["O", "B"], note: "2022" },
        37: { code: "C", surfaces: ["O"], note: "Small, watch" },
        22: { code: "", surfaces: [], note: "Bracket re-bonded Sep 10" },
        38: { code: "Un", surfaces: [], note: "" },
        48: { code: "Un", surfaces: [], note: "" },
      },
      visits: [
        { date: "2026-10-22", title: "Wire change", procedure: "Archwire changed to 0.016 NiTi", teeth: "Upper and lower arch", notes: "Brackets are settling well. Next check in 3 weeks." },
        { date: "2026-10-08", title: "Braces adjustment", procedure: "Elastic ties replaced, wire tightened", teeth: "Upper and lower arch", notes: "Mild soreness expected for 2 to 3 days." },
        { date: "2026-09-24", title: "Braces adjustment", procedure: "Wire adjustment", teeth: "Upper arch", notes: "Good progress on upper crowding." },
        { date: "2026-09-10", title: "Braces check", procedure: "Bracket check, one bracket re-bonded", teeth: "Tooth 22", notes: "Avoid hard and sticky food." },
        { date: "2026-08-27", title: "Braces installation", procedure: "Metal braces installed", teeth: "Upper and lower arch", notes: "Braces plan started: 12 visits, ₱30,000 total." },
        { date: "2026-08-13", title: "Records and X-rays", procedure: "Impressions, photos and X-rays", teeth: "Full mouth", notes: "Records taken for the braces plan." },
        { date: "2026-08-06", title: "Consultation", procedure: "Oral exam and consultation", teeth: "Full mouth", notes: "Crowding on upper and lower front teeth. Braces recommended." },
      ],
      xrays: [
        { label: "Panoramic X-ray", date: "2026-08-13", src: "images/x-ray/img1.jpg" },
        { label: "Periapical X-ray, tooth 36", date: "2026-08-13", src: "images/x-ray/img2.jpg" },
        { label: "Cephalometric X-ray", date: "2026-08-13", src: "images/x-ray/img4.jpg" },
        { label: "Periapical X-ray, tooth 11", date: "2026-08-06", src: "images/x-ray/img3.jpg" },
      ],
    },
    "P-0119": {
      medical: { conditions: ["Asthma"], allergies: "Penicillin", meds: "Salbutamol inhaler as needed", pregnant: "No" },
      dental: "Extraction of 14 and 24 for braces (2026).",
      plan: { name: "Braces (metal)", done: 9, of: 12, started: "2026-03-14", next: "Adjustment today" },
      chart: { 14: { code: "M", surfaces: [], note: "Extracted for ortho" }, 24: { code: "M", surfaces: [], note: "Extracted for ortho" }, 26: { code: "Co", surfaces: ["O", "D"], note: "" } },
      visits: [{ date: "2026-10-14", title: "Braces adjustment", procedure: "Wire tightened, power chain upper", teeth: "Upper arch", notes: "Space closing well." }],
      xrays: [],
    },
    "P-0107": {
      medical: { conditions: [], allergies: "None reported", meds: "None", pregnant: "Not applicable" },
      dental: "No past treatment.",
      plan: { name: "Braces (metal)", done: 3, of: 12, started: "2026-09-02", next: "Adjustment today" },
      chart: { 16: { code: "C", surfaces: ["O"], note: "Refer for filling" } },
      visits: [{ date: "2026-10-21", title: "Braces adjustment", procedure: "First wire change", teeth: "Upper and lower arch", notes: "Oral hygiene needs work around brackets." }],
      xrays: [],
    },
    "P-0128": {
      medical: { conditions: ["High blood pressure"], allergies: "None reported", meds: "Losartan 50 mg daily", pregnant: "Not applicable" },
      dental: "Braces since Nov 2025.",
      plan: { name: "Braces (metal)", done: 11, of: 12, started: "2025-11-20", next: "Retainer fitting next visit" },
      chart: { 46: { code: "PorJC", surfaces: [], note: "2019" } },
      visits: [{ date: "2026-10-28", title: "Braces check", procedure: "Final alignment check", teeth: "Upper and lower arch", notes: "Ready for debond and retainers next visit." }],
      xrays: [],
    },
    "P-0133": {
      medical: { conditions: [], allergies: "None reported", meds: "None", pregnant: "Not applicable" },
      dental: "First dental visit in 3 years.",
      chart: {},
      visits: [{ date: null, title: "Consultation", procedure: "Oral exam", teeth: "Full mouth", notes: "Mild crowding lower front. Discussed braces with parent." }],
      xrays: [],
    },
  };

  /* ---------- Session memory ---------- */
  const key = (k, pid) => "dn_" + k + "_" + pid;
  function record(pid) {
    const base = records[pid] || { medical: null, dental: "", chart: {}, visits: [], xrays: [] };
    const chart = Object.assign({}, base.chart, ST.load(key("chart", pid), {}));
    Object.keys(chart).forEach((t) => chart[t] === null && delete chart[t]);
    const visits = ST.load(key("notes", pid), []).concat(base.visits).map((v) => Object.assign({}, v, { date: v.date || ST.today() }));
    const xrays = ST.load(key("xrays", pid), []).concat(base.xrays);
    const plan = base.plan ? Object.assign({}, base.plan, ST.load(key("plan", pid), {})) : ST.load(key("plan", pid), null);
    return Object.assign({}, base, { chart, visits, xrays, plan });
  }
  function setTooth(pid, tooth, entry) {
    const c = ST.load(key("chart", pid), {});
    c[tooth] = entry; // null clears it
    ST.save(key("chart", pid), c);
    ST.log("dentist", "Record", "Updated the dental chart of " + pid);
  }
  function addNote(pid, note) {
    ST.save(key("notes", pid), [note].concat(ST.load(key("notes", pid), [])));
    ST.log("dentist", "Record", "Added treatment notes to " + pid);
  }
  function addXray(pid, x) {
    const list = ST.load(key("xrays", pid), []);
    list.unshift(x);
    try {
      sessionStorage.setItem(key("xrays", pid), JSON.stringify(list));
      ST.log("dentist", "Record", "Uploaded an image to " + pid);
      return true;
    } catch (e) {
      return false; // storage full: the image is too big for the prototype
    }
  }
  const legendItem = (code) => legend.find((l) => l.code === code);

  /* ---------- My patients ---------- */
  const mine = () => ST.appointments().filter((a) => a.dentist === ME);
  function myPatients() {
    const ids = new Set(mine().map((a) => a.patient));
    Object.keys(records).forEach((id) => ids.add(id));
    return ST.patients().filter((p) => ids.has(p.id));
  }
  const age = (dob) => (dob ? Math.floor((Date.now() - ST.toDate(dob)) / 31557600000) : null);

  return { ME, legend, upper, lower, surfaces, legendItem, record, setTooth, addNote, addXray, mine, myPatients, age };
})();
