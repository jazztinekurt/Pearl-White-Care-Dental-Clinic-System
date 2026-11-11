const ST = (() => {
  /* ---------- Clinic setup ---------- */
  const branches = [
    {
      id: "amparo",
      name: "Amparo",
      main: true,
      address: "13 Makabud St., Amparo Subdivision, North Caloocan City",
      card: false,
    },
    {
      id: "capitol",
      name: "Capitol Park",
      address: "Capitol Park Homes II, Caloocan City",
      card: false,
    },
    {
      id: "lagro",
      name: "Lagro",
      address:
        "Unit 2D, Ava & Ham Bldg, Bristol St., North Fairview, Quezon City",
      card: true,
    },
  ];
  // Sample dentist names, the same ones the patient pages use
  const dentists = [
    {
      id: "santos",
      name: "Dr. Maria Santos",
      short: "Dr. Santos",
      spec: "Orthodontics",
      branches: ["amparo", "lagro"],
    },
    {
      id: "reyes",
      name: "Dr. Juan Reyes",
      short: "Dr. Reyes",
      spec: "Endodontics",
      branches: ["amparo", "capitol"],
    },
    {
      id: "cruz",
      name: "Dr. Ana Cruz",
      short: "Dr. Cruz",
      spec: "Oral surgery",
      branches: ["capitol", "lagro"],
    },
  ];
  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "5:30 PM",
  ];

  // Sample price list (₱). Replace with the clinic's real fees.
  const priceList = [
    { id: "consult", name: "Consultation", price: 500 },
    { id: "cleaning", name: "Cleaning (oral prophylaxis)", price: 800 },
    { id: "filling", name: "Filling, per tooth", price: 1200 },
    { id: "extraction", name: "Simple extraction, per tooth", price: 1500 },
    { id: "wisdom", name: "Wisdom tooth removal", price: 6000 },
    {
      id: "rootcanal",
      name: "Root canal, per tooth",
      price: 12000,
      plan: true,
    },
    {
      id: "braces",
      name: "Braces (metal), full treatment",
      price: 30000,
      plan: true,
    },
    { id: "complete", name: "Complete denture", price: 15000, plan: true },
    { id: "partial", name: "Partial denture", price: 9000, plan: true },
    { id: "xray-pa", name: "X-ray, periapical", price: 300 },
    { id: "xray-pano", name: "X-ray, panoramic", price: 1200 },
  ];
  // Prices changed in the owner's Settings page
  try {
    const custom = JSON.parse(sessionStorage.getItem("ad_prices") || "{}");
    priceList.forEach((x) => custom[x.id] && (x.price = custom[x.id]));
  } catch (e) {}

  /* ---------- Patients (sample) ---------- */
  const basePatients = [
    {
      id: "P-0142",
      first: "Maria",
      last: "Lopez",
      sex: "F",
      dob: "2004-03-18",
      mobile: "0917 123 4567",
      email: "maria.lopez@email.com",
      branch: "amparo",
      since: "2026-08-06",
      status: "Active",
      plan: { name: "Braces plan", total: 30000, paid: 18000 },
      contact: "Rosa Lopez (mother), 0918 765 4321",
    },
    {
      id: "P-0119",
      first: "Bea",
      last: "Santiago",
      sex: "F",
      dob: "2001-11-02",
      mobile: "0916 555 0119",
      email: "bea.santiago@email.com",
      branch: "amparo",
      since: "2026-03-14",
      status: "Active",
      plan: { name: "Braces plan", total: 30000, paid: 24000 },
    },
    {
      id: "P-0107",
      first: "Paolo",
      last: "Garcia",
      sex: "M",
      dob: "1999-06-25",
      mobile: "0927 410 0107",
      email: "paolo.g@email.com",
      branch: "lagro",
      since: "2026-09-02",
      status: "Active",
      plan: { name: "Braces plan", total: 30000, paid: 9000 },
    },
    {
      id: "P-0128",
      first: "Carlo",
      last: "Reyes",
      sex: "M",
      dob: "1997-01-30",
      mobile: "0905 128 2210",
      email: "carlo.reyes@email.com",
      branch: "capitol",
      since: "2025-11-20",
      status: "Active",
      plan: { name: "Braces plan", total: 30000, paid: 28500 },
    },
    {
      id: "P-0133",
      first: "Isabel",
      last: "Cruz",
      sex: "F",
      dob: "2010-05-09",
      mobile: "0919 133 4545",
      email: "",
      branch: "amparo",
      since: "2026-11-11",
      status: "New",
    },
    {
      id: "P-0136",
      first: "Jomar",
      last: "Dela Cruz",
      sex: "M",
      dob: "1988-08-14",
      mobile: "0998 136 7788",
      email: "jomar.dc@email.com",
      branch: "capitol",
      since: "2026-10-28",
      status: "Active",
      plan: { name: "Root canal plan (tooth 36)", total: 12000, paid: 4000 },
    },
    {
      id: "P-0098",
      first: "Ana",
      last: "Villanueva",
      sex: "F",
      dob: "1975-12-01",
      mobile: "0917 098 3131",
      email: "ana.v@email.com",
      branch: "lagro",
      since: "2024-02-17",
      status: "Active",
    },
    {
      id: "P-0115",
      first: "Grace",
      last: "Lim",
      sex: "F",
      dob: "1958-04-22",
      mobile: "0918 115 6262",
      email: "",
      branch: "lagro",
      since: "2026-07-08",
      status: "Active",
      plan: { name: "Complete denture plan", total: 15000, paid: 7000 },
    },
    {
      id: "P-0150",
      first: "Rico",
      last: "Tan",
      sex: "M",
      dob: "1992-02-11",
      mobile: "0921 150 9090",
      email: "",
      branch: "capitol",
      since: "2026-11-11",
      status: "New",
    },
    {
      id: "P-0144",
      first: "Liane",
      last: "Ramos",
      sex: "F",
      dob: "2003-09-19",
      mobile: "0915 144 1212",
      email: "liane.r@email.com",
      branch: "lagro",
      since: "2026-10-30",
      status: "Active",
    },
    {
      id: "P-0155",
      first: "Kevin",
      last: "Navarro",
      sex: "M",
      dob: "2008-07-07",
      mobile: "0926 155 3434",
      email: "kevin.n@email.com",
      branch: "amparo",
      since: "2026-11-09",
      status: "New",
    },
    {
      id: "P-0139",
      first: "Andrea",
      last: "Pascual",
      sex: "F",
      dob: "1995-10-03",
      mobile: "0917 139 8080",
      email: "andrea.p@email.com",
      branch: "capitol",
      since: "2026-05-21",
      status: "Active",
    },
    {
      id: "P-0157",
      first: "Joy",
      last: "Bautista",
      sex: "F",
      dob: "1990-12-24",
      mobile: "0908 157 2323",
      email: "joy.b@email.com",
      branch: "capitol",
      since: "2026-11-10",
      status: "New",
    },
    {
      id: "P-0158",
      first: "Rhea",
      last: "Mercado",
      sex: "F",
      dob: "2006-01-15",
      mobile: "0939 158 4646",
      email: "rhea.m@email.com",
      branch: "lagro",
      since: "2026-11-10",
      status: "New",
    },
    {
      id: "P-0159",
      first: "Nina",
      last: "Flores",
      sex: "F",
      dob: "1983-03-03",
      mobile: "0947 159 5757",
      email: "nina.flores@email.com",
      branch: "capitol",
      since: "2026-11-11",
      status: "New",
    },
    {
      id: "P-0061",
      first: "Leo",
      last: "Castillo",
      sex: "M",
      dob: "1969-08-30",
      mobile: "0917 061 1414",
      email: "",
      branch: "capitol",
      since: "2023-06-12",
      status: "Active",
    },
    {
      id: "P-0042",
      first: "Teresa",
      last: "Aquino",
      sex: "F",
      dob: "1950-02-27",
      mobile: "0918 042 0303",
      email: "",
      branch: "amparo",
      since: "2022-09-05",
      status: "Inactive",
    },
  ];

  /* ---------- Session memory ---------- */
  function load(key, fallback) {
    try {
      const v = JSON.parse(sessionStorage.getItem(key));
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function save(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  /* ---------- Activity log for the owner's audit trail ---------- */
  const ACTORS = {
    front: ["Liza Mendoza", "Receptionist"],
    dentist: ["Dr. Maria Santos", "Dentist"],
    owner: ["Dr. Jena Tan-Booth", "Clinic owner"],
  };
  function log(actor, type, action) {
    const list = load("audit", []);
    const [user, role] = ACTORS[actor] || ACTORS.front;
    list.unshift({ at: new Date().toISOString(), user, role, type, action });
    save("audit", list.slice(0, 200));
  }

  /* ---------- Dates ---------- */
  const iso = (d) =>
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0");
  const toDate = (s) => new Date(s + "T00:00:00");
  function offsetIso(n) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + n);
    return iso(d);
  }
  const today = () => offsetIso(0);
  // Next open day (Mon to Sat) at or after n days from today
  function openDay(n) {
    let k = n;
    while (toDate(offsetIso(k)).getDay() === 0) k++;
    return offsetIso(k);
  }
  const longDate = (s) =>
    toDate(s).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const shortDate = (s) =>
    toDate(s).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  const peso = (n) => "₱" + Math.round(n).toLocaleString("en-US");
  const esc = (s) =>
    String(s).replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
  const param = (name) => new URLSearchParams(location.search).get(name);

  /* ---------- Lookups ---------- */
  const branch = (id) => branches.find((b) => b.id === id);
  const dentist = (id) => dentists.find((d) => d.id === id);
  function patients() {
    const added = load("st_patients", []);
    return basePatients
      .concat(added)
      .map((p) => Object.assign({}, p, { name: p.first + " " + p.last }));
  }
  const patient = (id) => patients().find((p) => p.id === id);

  /* ---------- Appointments ---------- */
  // Today, fixed so it matches the dashboards
  const T = today();
  const fixedToday = [
    [
      "santos",
      "amparo",
      "9:00 AM",
      "P-0133",
      "Consultation",
      "Done",
      "Walk-in",
    ],
    [
      "santos",
      "amparo",
      "10:00 AM",
      "P-0142",
      "Orthodontics check",
      "Checked in",
      "Online",
    ],
    [
      "santos",
      "amparo",
      "11:00 AM",
      "P-0119",
      "Braces adjustment",
      "Checked in",
      "Phone",
    ],
    [
      "santos",
      "amparo",
      "3:00 PM",
      "P-0107",
      "Braces adjustment",
      "Booked",
      "Messenger",
    ],
    [
      "santos",
      "amparo",
      "4:00 PM",
      "P-0155",
      "Orthodontics consult",
      "Booked",
      "Online",
    ],
    ["reyes", "capitol", "9:00 AM", "P-0128", "Cleaning", "Done", "Phone"],
    [
      "reyes",
      "capitol",
      "10:00 AM",
      "P-0136",
      "Root canal (visit 2 of 3)",
      "Done",
      "Phone",
    ],
    ["reyes", "capitol", "1:00 PM", "P-0150", "Check-up", "Booked", "Walk-in"],
    ["reyes", "capitol", "4:00 PM", "P-0139", "Filling", "Booked", "Messenger"],
    ["cruz", "lagro", "9:00 AM", "P-0098", "Extraction", "Done", "Phone"],
    [
      "cruz",
      "lagro",
      "2:00 PM",
      "P-0115",
      "Denture fitting",
      "Booked",
      "Phone",
    ],
    [
      "cruz",
      "lagro",
      "4:00 PM",
      "P-0144",
      "Wisdom tooth removal",
      "Booked",
      "Online",
    ],
  ];

  // Online requests waiting for the front desk (dates relative to today)
  const baseRequests = [
    {
      ref: "PW-2026-0151",
      patient: "P-0142",
      service: "Cleaning",
      dentist: "reyes",
      branch: "amparo",
      date: openDay(9),
      time: "2:00 PM",
      sent: "2 days ago",
      concern: "",
    },
    {
      ref: "PW-2026-0158",
      patient: "P-0158",
      service: "Orthodontics consult",
      dentist: "santos",
      branch: "lagro",
      date: openDay(3),
      time: "10:00 AM",
      sent: "Yesterday",
      concern: "Crooked front teeth, interested in braces.",
    },
    {
      ref: "PW-2026-0157",
      patient: "P-0157",
      service: "Extraction",
      dentist: "cruz",
      branch: "capitol",
      date: openDay(5),
      time: "3:00 PM",
      sent: "Yesterday",
      concern: "Broken molar, upper right. Hurts when chewing.",
    },
    {
      ref: "PW-2026-0159",
      patient: "P-0159",
      service: "Check-up",
      dentist: "reyes",
      branch: "capitol",
      date: openDay(1),
      time: "9:00 AM",
      sent: "This morning",
      concern: "",
    },
  ];

  // Generated bookings on the other days. A dentist works at one of
  // their branches for the whole day and is never booked twice at once.
  function generated() {
    const pool = [
      "P-0061",
      "P-0139",
      "P-0144",
      "P-0098",
      "P-0128",
      "P-0119",
      "P-0107",
      "P-0115",
      "P-0136",
    ]; // active patients only
    const what = {
      santos: ["Braces adjustment", "Braces check", "Orthodontics consult"],
      reyes: ["Cleaning", "Filling", "Root canal"],
      cruz: ["Extraction", "Check-up", "Denture fitting"],
    };
    const sources = ["Online", "Phone", "Walk-in", "Messenger"];
    const reserved = new Set(
      baseRequests
        .filter((r) => r.ref !== "PW-2026-0157")
        .map((r) => r.dentist + r.date + r.time),
    );
    const out = [];
    let n = 0;
    for (let off = -6; off <= 14; off++) {
      if (off === 0) continue;
      const date = offsetIso(off);
      if (toDate(date).getDay() === 0) continue;
      dentists.forEach((d, di) => {
        const bIdx = Math.abs(off + [0, 1, 1][di]) % 2;
        times.forEach((t, ti) => {
          if (reserved.has(d.id + date + t)) return;
          // Even spread of bookings: about 4 in 10 slots taken
          const r =
            Math.sin(off * 12.9898 + di * 78.233 + ti * 37.719) * 43758.5453;
          const h = Math.floor((r - Math.floor(r)) * 10);
          if (h > 3) return;
          n++;
          out.push({
            ref: "PW-2026-1" + String(1000 + n).slice(1),
            date,
            time: t,
            dentist: d.id,
            branch: d.branches[bIdx],
            patient: pool[(n * 3 + di) % pool.length],
            service: what[d.id][(off + ti + 30) % 3],
            status:
              off < 0
                ? h === 3 && (ti + di) % 4 === 0
                  ? "No-show"
                  : "Done"
                : "Booked",
            source: sources[(n + ti) % 4],
          });
        });
      });
    }
    // The clash for the demo: Dr. Cruz is already booked when Joy Bautista asks for 3:00 PM
    const clash = baseRequests.find((r) => r.ref === "PW-2026-0157");
    const i = out.findIndex(
      (a) =>
        a.dentist === "cruz" && a.date === clash.date && a.time === clash.time,
    );
    const blocker = {
      ref: "PW-2026-0099",
      date: clash.date,
      time: clash.time,
      dentist: "cruz",
      branch: "lagro",
      patient: "P-0061",
      service: "Extraction",
      status: "Booked",
      source: "Phone",
    };
    if (i >= 0) out[i] = blocker;
    else out.push(blocker);
    return out;
  }

  const baseAppointments = fixedToday
    .map((r, i) => ({
      ref: "PW-2026-02" + String(10 + i),
      date: T,
      time: r[2],
      dentist: r[0],
      branch: r[1],
      patient: r[3],
      service: r[4],
      status: r[5],
      source: r[6],
    }))
    .concat(generated());

  function appointments() {
    const changes = load("st_changes", {});
    const added = load("st_added", []);
    return baseAppointments
      .concat(added)
      .map((a) => Object.assign({}, a, changes[a.ref] || {}));
  }
  const appointment = (ref) => appointments().find((a) => a.ref === ref);
  const active = (a) => a.status !== "Cancelled" && a.status !== "No-show";
  const sortByTime = (a, b) =>
    a.date === b.date
      ? times.indexOf(a.time) - times.indexOf(b.time)
      : a.date < b.date
        ? -1
        : 1;

  // Double-booking check across all branches
  function conflict(dentistId, date, time, ignoreRef) {
    return (
      appointments().find(
        (a) =>
          active(a) &&
          a.ref !== ignoreRef &&
          a.dentist === dentistId &&
          a.date === date &&
          a.time === time,
      ) || null
    );
  }

  function nextRef() {
    const n = load("st_seq", 160) + 1;
    save("st_seq", n);
    return "PW-2026-0" + n;
  }
  function addAppointment(a) {
    const added = load("st_added", []);
    const appt = Object.assign({ ref: nextRef(), status: "Booked" }, a);
    added.push(appt);
    save("st_added", added);
    log(
      "front",
      "Booking",
      "Booked appointment " +
        appt.ref +
        " (" +
        (appt.source || "walk-in").toLowerCase() +
        ")",
    );
    return appt;
  }
  function updateAppointment(ref, patch) {
    const changes = load("st_changes", {});
    changes[ref] = Object.assign({}, changes[ref] || {}, patch);
    save("st_changes", changes);
    if (patch.status === "Done")
      log("dentist", "Booking", "Finished visit " + ref);
    else if (patch.status)
      log("front", "Booking", patch.status + ": appointment " + ref);
    else log("front", "Booking", "Changed appointment " + ref);
  }

  /* ---------- Requests ---------- */
  function requests() {
    const handled = load("st_handled", {});
    return baseRequests.map((r) => Object.assign({}, r, handled[r.ref] || {}));
  }
  const pending = () => requests().filter((r) => !r.state);
  function handle(ref, state, extra) {
    const handled = load("st_handled", {});
    handled[ref] = Object.assign(
      {
        state,
        at: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
      },
      extra || {},
    );
    save("st_handled", handled);
  }
  // Confirm puts the request on the calendar, unless the dentist is taken
  function confirmRequest(ref) {
    const r = requests().find((x) => x.ref === ref);
    const c = conflict(r.dentist, r.date, r.time);
    if (c) return { ok: false, request: r, conflict: c };
    const added = load("st_added", []);
    added.push({
      ref: r.ref,
      date: r.date,
      time: r.time,
      dentist: r.dentist,
      branch: r.branch,
      patient: r.patient,
      service: r.service,
      status: "Booked",
      source: "Online",
    });
    save("st_added", added);
    handle(ref, "Confirmed");
    log("front", "Booking", "Confirmed online request " + ref);
    return { ok: true, request: r };
  }
  function rejectRequest(ref, reason) {
    handle(ref, "Rejected", { reason });
    log("front", "Booking", "Rejected online request " + ref);
  }

  /* ---------- Billing and payments ---------- */
  // Charges sent from the dentist's notes (D6) that are not billed yet
  const baseCharges = [
    {
      id: "C-1",
      patient: "P-0136",
      appt: "PW-2026-0216",
      dentist: "reyes",
      items: [
        { name: "Root canal, visit 2 of 3 (plan installment)", amount: 4000 },
      ],
      plan: true,
    },
  ];
  function charges() {
    const done = load("st_billed", []);
    return baseCharges
      .concat(load("st_new_charges", []))
      .filter((c) => !done.includes(c.id));
  }
  // Called from the dentist's notes ("Send charges to billing")
  function addCharge(c) {
    const list = load("st_new_charges", []);
    const charge = Object.assign(
      { id: "C-" + (list.length + 2) + "-" + (Date.now() % 10000) },
      c,
    );
    list.push(charge);
    save("st_new_charges", list);
    log("dentist", "Billing", "Sent charges to billing for " + c.patient);
    return charge;
  }
  const markBilled = (id) =>
    save("st_billed", load("st_billed", []).concat(id));

  const basePayments = [
    {
      or: "OR-00419",
      date: T,
      time: "10:42 AM",
      patient: "P-0119",
      desc: "Braces plan installment",
      method: "QR code",
      ref: "GC-58810342",
      amount: 3000,
      branch: "amparo",
      cashier: "Liza Mendoza",
    },
    {
      or: "OR-00420",
      date: T,
      time: "9:40 AM",
      patient: "P-0133",
      desc: "Consultation",
      method: "Cash",
      amount: 500,
      branch: "amparo",
      cashier: "Liza Mendoza",
    },
    {
      or: "OR-00421",
      date: T,
      time: "9:55 AM",
      patient: "P-0128",
      desc: "Cleaning, braces plan installment",
      method: "Cash",
      amount: 2500,
      branch: "capitol",
      cashier: "Ramon Diaz",
    },
    {
      or: "OR-00422",
      date: T,
      time: "10:05 AM",
      patient: "P-0098",
      desc: "Simple extraction, 1 tooth",
      method: "Cash",
      amount: 1500,
      branch: "lagro",
      cashier: "Ramon Diaz",
    },
    {
      or: "OR-00412",
      date: offsetIso(-1),
      time: "4:20 PM",
      patient: "P-0115",
      desc: "Complete denture plan installment",
      method: "Card",
      ref: "BDO-771203",
      amount: 2000,
      branch: "lagro",
      cashier: "Ramon Diaz",
    },
    {
      or: "OR-00409",
      date: offsetIso(-1),
      time: "11:05 AM",
      patient: "P-0139",
      desc: "Cleaning",
      method: "QR code",
      ref: "GC-58723118",
      amount: 800,
      branch: "capitol",
      cashier: "Liza Mendoza",
    },
  ];
  function payments() {
    return load("st_payments", [])
      .concat(basePayments)
      .sort((a, b) => (a.or < b.or ? 1 : -1));
  }
  // Balance on a patient's plan, including payments recorded this session
  function plan(pid) {
    const p = patient(pid);
    const bills = load("st_plans", {});
    const base = bills[pid] || (p && p.plan);
    if (!base) return null;
    const extra = load("st_payments", [])
      .filter((x) => x.patient === pid && x.toPlan)
      .reduce((n, x) => n + x.amount, 0);
    const paid = base.paid + extra;
    return {
      name: base.name,
      total: base.total,
      paid,
      left: Math.max(0, base.total - paid),
    };
  }
  function setPlan(pid, planObj) {
    const bills = load("st_plans", {});
    bills[pid] = planObj;
    save("st_plans", bills);
  }
  function addPayment(p) {
    const list = load("st_payments", []);
    const n = load("st_or", 422) + 1;
    save("st_or", n);
    const pay = Object.assign(
      {
        or: "OR-00" + n,
        date: today(),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        cashier: "Liza Mendoza",
      },
      p,
    );
    list.push(pay);
    save("st_payments", list);
    log(
      "front",
      "Payment",
      "Recorded a " +
        peso(pay.amount) +
        " " +
        pay.method.toLowerCase() +
        " payment (" +
        pay.or +
        ")",
    );
    return pay;
  }
  const payment = (or) => payments().find((p) => p.or === or);

  /* ---------- UI helpers ---------- */
  const badgeClass = {
    Booked: "",
    "Checked in": "ok",
    Done: "",
    Confirmed: "ok",
    Pending: "wa",
    Rejected: "no",
    Cancelled: "no",
    "No-show": "no",
    New: "wa",
    Active: "ok",
    Inactive: "",
  };
  const badge = (s) =>
    '<span class="bd' +
    (badgeClass[s] ? " " + badgeClass[s] : "") +
    '">' +
    s +
    "</span>";

  // Count of pending requests on the sidebar link; pages call it again after changes
  function refreshCount() {
    const link = document.querySelector('.sb .nv[href="staff-requests.html"]');
    if (!link) return;
    const old = link.querySelector(".count");
    if (old) old.remove();
    const n = pending().length;
    if (n)
      link.insertAdjacentHTML(
        "beforeend",
        ' <span class="count">' + n + "</span>",
      );
  }
  document.addEventListener("DOMContentLoaded", refreshCount);

  return {
    branches,
    dentists,
    times,
    priceList,
    branch,
    dentist,
    patients,
    patient,
    appointments,
    appointment,
    active,
    sortByTime,
    conflict,
    addAppointment,
    updateAppointment,
    requests,
    pending,
    confirmRequest,
    rejectRequest,
    refreshCount,
    charges,
    addCharge,
    markBilled,
    payments,
    payment,
    plan,
    setPlan,
    addPayment,
    log,
    today,
    offsetIso,
    openDay,
    toDate,
    longDate,
    shortDate,
    peso,
    esc,
    param,
    badge,
    load,
    save,
  };
})();
