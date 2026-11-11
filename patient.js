/* ==========================================================
   PEARL WHITE: shared sample data and helpers for the patient pages.
   Prototype only. Everything here is sample data; changes the user
   makes (new bookings, cancellations, reschedules, read alerts) are
   kept in sessionStorage so they show up across pages until the tab
   is closed.
   ========================================================== */

const PW = (() => {
  /* ---------- Sample data ---------- */
  const branches = [
    { id: "amparo", name: "Amparo", main: true, address: "13 Makabud St., Amparo Subdivision, North Caloocan City", pay: "Cash, GCash, bank transfer" },
    { id: "capitol", name: "Capitol Park Homes II", address: "Capitol Park Homes II, Caloocan City", pay: "Cash, GCash, bank transfer" },
    { id: "lagro", name: "Lagro", address: "Unit 2D, Ava & Ham Bldg, Bristol St., North Fairview, Quezon City", pay: "Cash, GCash, bank transfer, debit/credit card" },
  ];

  const services = [
    { id: "general", name: "General dentistry", desc: "Check-ups, cleaning, fillings and everyday care." },
    { id: "ortho", name: "Orthodontics", desc: "Braces that straighten teeth over several visits.", plan: true },
    { id: "endo", name: "Endodontics", desc: "Root canal treatment to save a damaged tooth." },
    { id: "surgery", name: "Oral surgery", desc: "Tooth extraction, including wisdom teeth." },
    { id: "dentures", name: "Dentures", desc: "Complete or partial sets, fitted over multiple visits.", plan: true },
  ];

  // Every dentist also does general dentistry. Sample names: replace with
  // the clinic's real dentists.
  const dentists = [
    { id: "santos", name: "Dr. Maria Santos", ini: "MS", spec: "ortho", bio: "Straightens teeth for teens and adults.", branches: ["amparo", "lagro"] },
    { id: "reyes", name: "Dr. Juan Reyes", ini: "JR", spec: "endo", bio: "Root canal treatment to save infected or damaged teeth.", branches: ["amparo", "capitol"] },
    { id: "cruz", name: "Dr. Ana Cruz", ini: "AC", spec: "surgery", bio: "Extractions, including wisdom teeth.", branches: ["capitol", "lagro"] },
  ];

  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "5:30 PM"];

  // status: Pending | Confirmed | Completed | Cancelled | Missed
  const baseAppointments = [
    { ref: "PW-2026-0142", date: "2026-11-13", time: "10:00 AM", title: "Orthodontics check", service: "ortho", dentist: "santos", branch: "amparo", status: "Confirmed" },
    { ref: "PW-2026-0151", date: "2026-11-20", time: "2:00 PM", title: "Cleaning", service: "general", dentist: "reyes", branch: "amparo", status: "Pending" },
    { ref: "PW-2026-0128", date: "2026-10-22", time: "9:00 AM", title: "Wire change", service: "ortho", dentist: "santos", branch: "amparo", status: "Completed" },
    { ref: "PW-2026-0117", date: "2026-10-08", time: "9:00 AM", title: "Braces adjustment", service: "ortho", dentist: "santos", branch: "amparo", status: "Completed" },
    { ref: "PW-2026-0109", date: "2026-09-24", time: "10:00 AM", title: "Braces adjustment", service: "ortho", dentist: "santos", branch: "amparo", status: "Completed" },
    { ref: "PW-2026-0104", date: "2026-09-17", time: "2:00 PM", title: "Cleaning", service: "general", dentist: "reyes", branch: "amparo", status: "Cancelled", note: "Cancelled by you on Sep 15." },
    { ref: "PW-2026-0098", date: "2026-09-10", time: "9:00 AM", title: "Braces check", service: "ortho", dentist: "santos", branch: "amparo", status: "Completed" },
    { ref: "PW-2026-0090", date: "2026-08-27", time: "1:00 PM", title: "Braces installation", service: "ortho", dentist: "santos", branch: "amparo", status: "Completed" },
    { ref: "PW-2026-0083", date: "2026-08-13", time: "10:00 AM", title: "Records and X-rays", service: "ortho", dentist: "santos", branch: "amparo", status: "Completed" },
    { ref: "PW-2026-0071", date: "2026-08-06", time: "11:00 AM", title: "Consultation", service: "general", dentist: "santos", branch: "amparo", status: "Completed" },
    { ref: "PW-2026-0062", date: "2026-07-16", time: "3:00 PM", title: "Check-up", service: "general", dentist: "reyes", branch: "capitol", status: "Missed", note: "No show. Book again any time." },
  ];

  // Treatment notes for completed visits (shown on Treatment history)
  const treatments = {
    "PW-2026-0128": { procedure: "Archwire changed to 0.016 NiTi", teeth: "Upper and lower arch", notes: "Brackets are settling well. Next check in 3 weeks.", xrays: [] },
    "PW-2026-0117": { procedure: "Elastic ties replaced, wire tightened", teeth: "Upper and lower arch", notes: "Mild soreness expected for 2 to 3 days.", xrays: [] },
    "PW-2026-0109": { procedure: "Wire adjustment", teeth: "Upper arch", notes: "Good progress on upper crowding.", xrays: [] },
    "PW-2026-0098": { procedure: "Bracket check, one bracket re-bonded", teeth: "Tooth 22", notes: "Avoid hard and sticky food.", xrays: [] },
    "PW-2026-0090": { procedure: "Metal braces installed", teeth: "Upper and lower arch", notes: "Braces plan started: 12 visits, ₱30,000 total.", xrays: [] },
    "PW-2026-0083": { procedure: "Impressions, photos and X-rays", teeth: "Full mouth", notes: "Records taken for the braces plan.", xrays: [
      { label: "Panoramic X-ray", src: "images/x-ray/img1.jpg" },
      { label: "Periapical X-ray, tooth 36", src: "images/x-ray/img2.jpg" },
      { label: "Cephalometric X-ray", src: "images/x-ray/img4.jpg" },
    ] },
    "PW-2026-0071": { procedure: "Oral exam and consultation", teeth: "Full mouth", notes: "Crowding on upper and lower front teeth. Braces recommended.", xrays: [
      { label: "Periapical X-ray, tooth 11", src: "images/x-ray/img3.jpg" },
    ] },
  };

  const payments = {
    plan: { name: "Braces plan (Orthodontics)", total: 30000 },
    schedule: [
      { due: "2026-08-27", label: "Down payment", amount: 9000, status: "Paid" },
      { due: "2026-09-24", label: "Installment 1 of 7", amount: 3000, status: "Paid" },
      { due: "2026-10-22", label: "Installment 2 of 7", amount: 3000, status: "Paid" },
      { due: "2026-11-05", label: "Installment 3 of 7", amount: 3000, status: "Paid" },
      { due: "2026-11-13", label: "Installment 4 of 7", amount: 3000, status: "Due" },
      { due: "2026-12-11", label: "Installment 5 of 7", amount: 3000, status: "Upcoming" },
      { due: "2027-01-08", label: "Installment 6 of 7", amount: 3000, status: "Upcoming" },
      { due: "2027-02-05", label: "Installment 7 of 7", amount: 3000, status: "Upcoming" },
    ],
    history: [
      { date: "2026-11-05", desc: "Braces plan, installment 3", method: "Cash", branch: "amparo", amount: 3000, receipt: "OR-00418" },
      { date: "2026-10-22", desc: "Braces plan, installment 2", method: "GCash", branch: "amparo", amount: 3000, receipt: "OR-00391" },
      { date: "2026-09-24", desc: "Braces plan, installment 1", method: "Bank transfer", branch: "amparo", amount: 3000, receipt: "OR-00352" },
      { date: "2026-08-27", desc: "Braces plan, down payment", method: "Cash", branch: "amparo", amount: 9000, receipt: "OR-00307" },
      { date: "2026-08-13", desc: "Records and X-rays", method: "Cash", branch: "amparo", amount: 1500, receipt: "OR-00284" },
      { date: "2026-08-06", desc: "Consultation", method: "Cash", branch: "amparo", amount: 500, receipt: "OR-00271" },
    ],
  };

  const baseNotifications = [
    { id: "n1", type: "appointment", text: "Your Nov 13 appointment is confirmed.", when: "Today", channel: "SMS", link: "patient-appointment-details.html?ref=PW-2026-0142", unread: true },
    { id: "n2", type: "appointment", text: "We received your request for Nov 20 (Cleaning). The clinic will confirm soon.", when: "Nov 9", channel: "Email", link: "patient-appointment-details.html?ref=PW-2026-0151", unread: true },
    { id: "n8", type: "reminder", text: "Reminder: your ₱3,000 braces installment is due on Nov 13, at your next visit.", when: "Yesterday", channel: "SMS", link: "patient-payments.html", unread: true },
    { id: "n3", type: "payment", text: "Payment of ₱3,000 recorded. Thank you.", when: "Nov 5", channel: "Email", link: "patient-payments.html", unread: false },
    { id: "n4", type: "reminder", text: "Reminder: bring your retainer case to your next visit.", when: "Oct 22", channel: "SMS", link: "patient-history.html", unread: false },
    { id: "n5", type: "reminder", text: "Reminder: your appointment is tomorrow at 9:00 AM, Amparo branch.", when: "Oct 21", channel: "SMS", link: "patient-appointment-details.html?ref=PW-2026-0128", unread: false },
    { id: "n6", type: "payment", text: "Payment of ₱3,000 recorded. Thank you.", when: "Oct 22", channel: "Email", link: "patient-payments.html", unread: false },
    { id: "n7", type: "appointment", text: "Your Sep 17 cleaning was cancelled as you requested.", when: "Sep 15", channel: "SMS", link: "patient-appointment-details.html?ref=PW-2026-0104", unread: false },
  ];

  /* ---------- Session storage (prototype memory) ---------- */
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

  /* ---------- Lookups ---------- */
  const byId = (list, id) => list.find((x) => x.id === id);
  const branch = (id) => byId(branches, id);
  const service = (id) => byId(services, id);
  const dentist = (id) => byId(dentists, id);

  /* ---------- Appointments (sample + this session's changes) ---------- */
  function appointments() {
    const changes = load("pw_changes", {});
    const requests = load("pw_requests", []);
    const list = baseAppointments.map((a) => Object.assign({}, a, changes[a.ref] || {}));
    requests.forEach((r) => list.push(Object.assign({}, r, changes[r.ref] || {})));
    return list.sort((a, b) => (a.date < b.date ? 1 : -1));
  }
  const appointment = (ref) => appointments().find((a) => a.ref === ref);
  const isUpcoming = (a) => a.status === "Pending" || a.status === "Confirmed";

  function changeAppointment(ref, patch) {
    const changes = load("pw_changes", {});
    changes[ref] = Object.assign({}, changes[ref] || {}, patch);
    save("pw_changes", changes);
  }

  /* ---------- Booking in progress ---------- */
  const booking = () => load("pw_booking", {});
  const setBooking = (patch) => save("pw_booking", Object.assign(booking(), patch));
  const clearBooking = () => save("pw_booking", {});

  function submitBooking() {
    const b = booking();
    const s = service(b.service);
    if (b.reschedule) {
      changeAppointment(b.reschedule, { date: b.date, time: b.time, dentist: b.dentist, status: "Pending", note: "Rescheduled by you. Waiting for the clinic to confirm the new time." });
      clearBooking();
      return b.reschedule;
    }
    const requests = load("pw_requests", []);
    const ref = "PW-2026-0" + (160 + requests.length);
    requests.push({ ref, date: b.date, time: b.time, title: s ? s.name : "Appointment", service: b.service, dentist: b.dentist, branch: b.branch, status: "Pending", concern: b.concern || "", note: "Submitted online. Waiting for the clinic to confirm." });
    save("pw_requests", requests);
    clearBooking();
    return ref;
  }

  /* ---------- Slots: sample "real-time" availability ---------- */
  function bookableDays(count) {
    const out = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    while (out.length < count) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0) out.push(iso(d)); // Mon to Sat
    }
    return out;
  }
  function isTaken(branchId, dentistId, dateIso, timeIdx) {
    const day = Number(dateIso.slice(8, 10));
    const b = branches.findIndex((x) => x.id === branchId);
    const dn = dentists.findIndex((x) => x.id === dentistId);
    return (timeIdx * 7 + b * 3 + dn * 5 + day * 5) % 4 === 0;
  }

  /* ---------- Notifications ---------- */
  function notifications() {
    const read = load("pw_read", []);
    const extra = load("pw_requests", []).map((r) => ({
      id: "req-" + r.ref, type: "appointment", text: "We received your request for " + shortDate(r.date) + " (" + r.title + "). The clinic will confirm soon.",
      when: "Just now", channel: "Email", link: "patient-appointment-details.html?ref=" + r.ref, unread: true,
    }));
    return extra.concat(baseNotifications).map((n) => Object.assign({}, n, { unread: n.unread && !read.includes(n.id) }));
  }
  function markRead(ids) {
    const read = load("pw_read", []);
    save("pw_read", Array.from(new Set(read.concat(ids))));
  }

  /* ---------- Formatting ---------- */
  function iso(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  const toDate = (s) => new Date(s + "T00:00:00");
  const longDate = (s) => toDate(s).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  const shortDate = (s) => toDate(s).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const peso = (n) => "₱" + n.toLocaleString("en-US");
  const badge = (status) => {
    const cls = { Confirmed: "ok", Completed: "", Pending: "wa", Cancelled: "no", Missed: "no", Paid: "ok", Due: "wa", Upcoming: "" }[status];
    return '<span class="bd' + (cls ? " " + cls : "") + '">' + status + "</span>";
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const param = (name) => new URLSearchParams(location.search).get(name);

  /* ---------- Signed-in patient (sample) ---------- */
  function fillUser() {
    let first = "Maria";
    let full = "Maria Lopez";
    try {
      const n = sessionStorage.getItem("pw_first_name");
      if (n) {
        first = n;
        full = n;
      }
    } catch (e) {}
    document.querySelectorAll("[data-user-name]").forEach((el) => (el.textContent = full));
    document.querySelectorAll("[data-user-first]").forEach((el) => (el.textContent = first));
    document.querySelectorAll("[data-user-ini]").forEach(
      (el) => (el.textContent = full.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase()),
    );
    // Unread count on the sidebar's Notifications link
    const unread = notifications().filter((n) => n.unread).length;
    const link = document.querySelector('.sb .nv[href="patient-notifications.html"]');
    if (link && unread) link.insertAdjacentHTML("beforeend", ' <span class="count">' + unread + "</span>");
  }
  document.addEventListener("DOMContentLoaded", fillUser);

  return {
    branches, services, dentists, times, payments, treatments,
    branch, service, dentist,
    appointments, appointment, isUpcoming, changeAppointment,
    booking, setBooking, clearBooking, submitBooking,
    bookableDays, isTaken,
    notifications, markRead,
    longDate, shortDate, toDate, peso, badge, esc, param, load, save,
  };
})();
