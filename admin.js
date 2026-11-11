/* ==========================================================
   PEARL WHITE: sample data for the clinic owner (admin) pages.
   Loaded after staff.js. The owner sees accounts, schedules,
   money and activity, never clinical records. Prototype only:
   changes are kept in sessionStorage until the tab is closed.
   ========================================================== */

const AD = (() => {
  /* ---------- Staff accounts ---------- */
  const baseUsers = [
    { id: "U-01", name: "Dr. Jena Tan-Booth", email: "jena.tanbooth@pearlwhite.ph", mobile: "0917 000 0101", role: "Clinic owner", branches: ["amparo", "capitol", "lagro"], status: "Active", last: "Today, 8:05 AM" },
    { id: "U-02", name: "Dr. Maria Santos", email: "maria.santos@pearlwhite.ph", mobile: "0917 000 0102", role: "Dentist", spec: "Orthodontics", branches: ["amparo", "lagro"], status: "Active", last: "Today, 9:58 AM" },
    { id: "U-03", name: "Dr. Juan Reyes", email: "juan.reyes@pearlwhite.ph", mobile: "0917 000 0103", role: "Dentist", spec: "Endodontics", branches: ["amparo", "capitol"], status: "Active", last: "Today, 8:47 AM" },
    { id: "U-04", name: "Dr. Ana Cruz", email: "ana.cruz@pearlwhite.ph", mobile: "0917 000 0104", role: "Dentist", spec: "Oral surgery", branches: ["capitol", "lagro"], status: "Active", last: "Yesterday, 5:12 PM" },
    { id: "U-05", name: "Liza Mendoza", email: "liza.mendoza@pearlwhite.ph", mobile: "0917 000 0105", role: "Receptionist", branches: ["amparo"], status: "Active", last: "Today, 8:31 AM" },
    { id: "U-06", name: "Ramon Diaz", email: "ramon.diaz@pearlwhite.ph", mobile: "0917 000 0106", role: "Receptionist", branches: ["capitol", "lagro"], status: "Active", last: "Today, 8:40 AM" },
    { id: "U-08", name: "Joan Perez", email: "joan.perez@pearlwhite.ph", mobile: "0917 000 0108", role: "Dental assistant", branches: ["capitol"], status: "Active", last: "Today, 8:52 AM" },
    { id: "U-07", name: "Carla Bautista", email: "carla.bautista@pearlwhite.ph", mobile: "0917 000 0107", role: "Receptionist", branches: ["lagro"], status: "Deactivated", last: "Sep 30, 2026" },
  ];
  const PATIENT_ACCOUNTS = 1262; // sample total; the pages list only the sample patients

  // What each role can open (role-based access control, from the thesis)
  const access = {
    "Clinic owner": ["Dashboard and reports", "User and staff accounts", "Master schedule (view)", "Audit trail", "Archive", "System settings"],
    Dentist: ["Own schedule and availability", "Patient records, dental chart and X-rays", "Treatment notes and charges"],
    "Dental assistant": ["Dentist's schedule (view)", "Help keep patient records up to date", "Upload X-rays and photos to patient records"],
    Receptionist: ["Master calendar and bookings", "Appointment requests", "Patient registration and profiles (no clinical records)", "Billing, payments and receipts", "SMS reminders"],
  };

  function users() {
    const edits = ST.load("ad_users", {});
    const added = ST.load("ad_users_new", []);
    return baseUsers.concat(added).map((u) => Object.assign({}, u, edits[u.id] || {}));
  }
  const user = (id) => users().find((u) => u.id === id);
  function saveUser(u) {
    if (baseUsers.some((b) => b.id === u.id) || ST.load("ad_users_new", []).some((b) => b.id === u.id)) {
      const edits = ST.load("ad_users", {});
      edits[u.id] = Object.assign({}, edits[u.id] || {}, u);
      ST.save("ad_users", edits);
    } else {
      const added = ST.load("ad_users_new", []);
      added.push(u);
      ST.save("ad_users_new", added);
    }
  }
  function nextUserId() {
    return "U-" + String(baseUsers.length + ST.load("ad_users_new", []).length + 1).padStart(2, "0");
  }
  // Patient portal accounts the owner has deactivated
  const patientStatus = (id) => (ST.load("ad_pdeact", []).includes(id) ? "Deactivated" : null);
  function setPatientActive(id, on) {
    const list = ST.load("ad_pdeact", []).filter((x) => x !== id);
    if (!on) list.push(id);
    ST.save("ad_pdeact", list);
  }

  /* ---------- Earlier activity (before this session) ---------- */
  function baseAudit() {
    const at = (days, h, m) => {
      const d = ST.toDate(ST.offsetIso(-days));
      d.setHours(h, m);
      return d.toISOString();
    };
    return [
      { at: at(0, 10, 42), user: "Liza Mendoza", role: "Receptionist", type: "Payment", action: "Recorded a ₱3,000 qr code payment (OR-00419)" },
      { at: at(0, 10, 15), user: "Liza Mendoza", role: "Receptionist", type: "Booking", action: "Checked in: appointment PW-2026-0212" },
      { at: at(0, 9, 58), user: "Dr. Maria Santos", role: "Dentist", type: "Record", action: "Added treatment notes to P-0133" },
      { at: at(0, 9, 30), user: "Ramon Diaz", role: "Receptionist", type: "Account", action: "Registered new patient P-0150 (consent signed)" },
      { at: at(0, 8, 40), user: "Ramon Diaz", role: "Receptionist", type: "Login", action: "Logged in" },
      { at: at(0, 8, 31), user: "Liza Mendoza", role: "Receptionist", type: "Login", action: "Logged in" },
      { at: at(0, 8, 5), user: "Dr. Jena Tan-Booth", role: "Clinic owner", type: "Login", action: "Logged in" },
      { at: at(1, 18, 0), user: "System", role: "System", type: "SMS", action: "Sent 18 SMS reminders" },
      { at: at(1, 17, 12), user: "Dr. Ana Cruz", role: "Dentist", type: "Login", action: "Logged out" },
      { at: at(1, 16, 20), user: "Ramon Diaz", role: "Receptionist", type: "Payment", action: "Recorded a ₱2,000 card payment (OR-00412)" },
      { at: at(1, 11, 2), user: "Liza Mendoza", role: "Receptionist", type: "Booking", action: "Cancelled: appointment PW-2026-1044" },
      { at: at(2, 15, 44), user: "Dr. Jena Tan-Booth", role: "Clinic owner", type: "Settings", action: "Changed the price of Cleaning (oral prophylaxis)" },
      { at: at(3, 9, 15), user: "Unknown", role: "—", type: "Login", action: "Failed login for liza.mendoza@pearlwhite.ph (wrong password)" },
      { at: at(6, 14, 30), user: "Dr. Jena Tan-Booth", role: "Clinic owner", type: "Account", action: "Archived 12 inactive patient records" },
      { at: at(42, 17, 0), user: "Dr. Jena Tan-Booth", role: "Clinic owner", type: "Account", action: "Deactivated staff account U-07 (Carla Bautista)" },
    ];
  }
  function audit() {
    return ST.load("audit", []).concat(baseAudit()).sort((a, b) => (a.at < b.at ? 1 : -1));
  }

  /* ---------- Archive ---------- */
  const baseArchive = [
    { id: "AR-031", kind: "Patient", name: "Ernesto Valdez", ref: "P-0012", branch: "amparo", since: "2026-11-05", why: "No visit since 2023" },
    { id: "AR-030", kind: "Patient", name: "Lorna Sison", ref: "P-0019", branch: "capitol", since: "2026-11-05", why: "No visit since 2023" },
    { id: "AR-029", kind: "Patient", name: "Miguel Santos", ref: "P-0027", branch: "lagro", since: "2026-11-05", why: "Patient asked to archive (RA 10173)" },
    { id: "AR-024", kind: "Transaction", name: "Braces plan, fully paid", ref: "Paolo Reyes · ₱28,000", branch: "amparo", since: "2026-10-01", why: "Closed: balance ₱0" },
    { id: "AR-023", kind: "Transaction", name: "Complete denture plan, fully paid", ref: "Nora Lim · ₱15,000", branch: "lagro", since: "2026-09-15", why: "Closed: balance ₱0" },
    { id: "AR-020", kind: "Treatment", name: "Root canal, tooth 46 (3 visits)", ref: "Lorna Sison · P-0019", branch: "capitol", since: "2026-08-30", why: "Treatment completed" },
  ];
  const suggested = [
    { id: "SG-1", kind: "Patient", name: "Teresa Aquino", ref: "P-0042", branch: "amparo", why: "Inactive. Last visit Feb 2024" },
    { id: "SG-2", kind: "Transaction", name: "Root canal plan, fully paid", ref: "Andrea Pascual · ₱12,000", branch: "capitol", why: "Closed: balance ₱0" },
  ];
  function archive() {
    const restored = ST.load("ad_restored", []);
    const added = ST.load("ad_archived", []);
    return added.concat(baseArchive).filter((a) => !restored.includes(a.id));
  }
  const suggestions = () => suggested.filter((s) => !ST.load("ad_archived", []).some((a) => a.from === s.id));

  /* ---------- Report figures ---------- */
  // Daily numbers per branch. The last days come from the shared appointments
  // and payments; earlier days are sample history so the reports have depth.
  const BR = ["amparo", "capitol", "lagro"];
  const SERVICES = ["General dentistry", "Orthodontics", "Endodontics", "Oral surgery", "Dentures"];
  const serviceOf = (s) =>
    /brace|ortho/i.test(s) ? "Orthodontics" : /root/i.test(s) ? "Endodontics" : /extract|wisdom/i.test(s) ? "Oral surgery" : /denture/i.test(s) ? "Dentures" : "General dentistry";
  function hash(n) {
    const x = Math.sin(n * 9301 + 49297) * 233280;
    return x - Math.floor(x);
  }
  function day(iso) {
    const d = ST.toDate(iso);
    if (d.getDay() === 0) return null; // closed
    const off = Math.round((d - ST.toDate(ST.today())) / 86400000);
    const out = {};
    const appts = ST.appointments().filter((a) => a.date === iso);
    BR.forEach((b, bi) => {
      if (off > -7 && off <= 14) {
        // Recent days: from the shared data
        const here = appts.filter((a) => a.branch === b);
        const pays = ST.payments().filter((p) => p.date === iso && p.branch === b);
        const mix = {};
        here.filter((a) => a.status !== "Cancelled").forEach((a) => (mix[serviceOf(a.service)] = (mix[serviceOf(a.service)] || 0) + 1));
        const seedRev = off >= 0 ? 0 : Math.round((here.filter((a) => a.status === "Completed").length * (1800 + hash(off * 7 + bi) * 900)) / 50) * 50;
        out[b] = {
          bookings: here.filter((a) => a.status !== "Cancelled").length,
          noshow: here.filter((a) => a.status === "Missed").length,
          fresh: Math.round(hash(off * 3 + bi) * 2),
          revenue: off > 0 ? 0 : pays.reduce((n, p) => n + p.amount, 0) + seedRev,
          mix,
        };
      } else {
        const h = hash(off * 13 + bi * 7);
        const base = [11, 7, 5][bi] + (d.getDay() === 6 ? 3 : 0);
        const bookings = Math.max(2, Math.round(base + (h - 0.5) * 6));
        const mix = {};
        SERVICES.forEach((s, si) => {
          const share = [0.38, 0.27, 0.12, 0.14, 0.09][si];
          mix[s] = Math.round(bookings * share * (0.7 + hash(off * 5 + si + bi) * 0.6));
        });
        out[b] = {
          bookings,
          noshow: h > 0.82 ? 1 : 0,
          fresh: Math.round(hash(off * 3 + bi) * 2.4),
          revenue: Math.round((bookings * (1500 + hash(off + bi * 11) * 1600)) / 50) * 50,
          mix,
        };
      }
    });
    return out;
  }
  function range(fromIso, toIso) {
    const rows = [];
    const d = ST.toDate(fromIso);
    const end = ST.toDate(toIso);
    while (d <= end) {
      const iso = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      const v = day(iso);
      if (v) rows.push({ date: iso, v });
      d.setDate(d.getDate() + 1);
    }
    return rows;
  }

  /* ---------- Settings ---------- */
  const defaultHours = "Mon to Sat, 9:00 AM – 6:00 PM";
  const smsDefaults = {
    confirm: "Hi {name}! Your Pearl White appointment on {date} at {time}, {branch} branch, is confirmed. Ref {ref}.",
    reminder: "Hi {name}! Pearl White Dental reminder: {date}, {time} with {dentist} at {branch}. Call (02) 0000 0000 to reschedule.",
    reschedule: "Hi {name}, your Pearl White appointment moved to {date} at {time}, {branch} branch. Reply if this does not work.",
    reject: "Hi {name}, we could not confirm your request for {date} at {time}. Please pick another time in the patient portal.",
    payment: "Hi {name}! Pearl White reminder: your {plan} payment of {amount} is due on your next visit. Balance: {balance}.",
  };
  const sms = () => Object.assign({}, smsDefaults, ST.load("ad_sms", {}));

  /* ---------- CSV export ---------- */
  function downloadCsv(name, rows) {
    const csv = rows.map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(",")).join("\r\n");
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  const roleClass = { "Clinic owner": "wa", Dentist: "ok", "Dental assistant": "ok", Receptionist: "", System: "", "—": "no" };
  const roleBadge = (r) => '<span class="bd' + (roleClass[r] ? " " + roleClass[r] : "") + '">' + r + "</span>";

  return {
    users, user, saveUser, nextUserId, access, PATIENT_ACCOUNTS, patientStatus, setPatientActive,
    audit, archive, suggestions, range, day, SERVICES, BR,
    defaultHours, sms, smsDefaults, downloadCsv, roleBadge,
  };
})();
