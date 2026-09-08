// import {
//   Camera,
//   Pencil,
// } from "lucide-react";
// import { useState, useEffect } from "react";
// import api from "../services/api";
// import CountryList from "country-list-with-dial-code-and-flag";
// import LocationMap from "../components/LocationMap";
// import { useRef } from "react";

// /* ================= MAIN ================= */
// const PROFESSION_SEGMENTS = {
//   HEALTHCARE: [
//     "Doctor",
//     "Nurse",
//     "Pharmacist",
//     "Physiotherapist",
//     "Dentist",
//     "Hospital Administrator",
//   ],

//   IT: [
//     "Engineer",
//     "IT Professional",
//     "Software Engineer",
//     "Developer",
//   ],

//   EDUCATION: [
//     "Teacher",
//     "Professor",
//     "Lecturer",
//   ],

//   BUSINESS: [
//     "Business Owner",
//     "Entrepreneur",
//     "Consultant",
//   ],
// };

// const getUserSegment = (profession) => {
//   if (!profession) return null;

//   for (const [segment, list] of Object.entries(PROFESSION_SEGMENTS)) {
//     if (list.includes(profession)) return segment;
//   }

//   return "OTHER";
// };

// export default function UserProfile() {
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [activeTab, setActiveTab] = useState("core");

//   // ✅ COUNTRY DATA (npm)
//   const countries = CountryList.getAll();

//   const [form, setForm] = useState({
//     // CORE MODULE
//     firstName: "",
//     lastName: "",
//     email: "",
//     dob: "",
//     gender: "",
//     country: "India",
//     postalCode: "",
//      address: "",
//     education: "",
//     employmentStatus: "",
//     profession:"",
//     incomeRange: "",

//     // B2B
//     industry: "",
//     companySize: "",
//     seniority: "",

//     // CONTACT
//     phone: "",
//     countryCode: "IN",
//     whatsapp: "",
    
//   });

//   useEffect(() => {
//   const loadProfile = async () => {
//     try {
//       const [meRes, profileRes] = await Promise.all([
//         api.get("/auth/me"),
//         api.get("/users/profile")
//       ]);

//       setUser(meRes.data.user);

//       setForm(prev => ({
//         ...prev,
//         ...profileRes.data,
//         dob: profileRes.data?.dob
//     ? profileRes.data.dob.substring(0, 10)
//     : ""
//       }));

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   loadProfile();
// }, []);


 


//   // const handleChange = (e) =>
//   //   setForm({ ...form, [e.target.name]: e.target.value });
// const handleChange = (e) => {
//   const { name, value } = e.target;

//   setForm((prev) => ({
//     ...prev,
//     [name]: value,

//     ...(name === "employmentStatus" && value !== "Employed"
//       ? {
//           profession: "",
//           specialty: "",
//           workSetting: "",
//           patientVolume: "",
//           prescribingAuthority: "",
//         }
//       : {}),
//   }));
// };

//   const handleSave = async () => {
//     await api.put("/users/profile", form);
//     setEditMode(false);
//     alert("Profile updated");
//   };

//   if (!user) return <div>Loading...</div>;
// // const upload = multer({
// //   dest: "uploads/",
// //   limits: { fileSize: 500 * 1024 }, // 500KB limit
// // });

//   return (
    
//     <div className="max-w-7xl space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-semibold">My Profile</h1>
//           <p className="text-sm text-gray-500">
//             Manage your demographic & professional information
//           </p>
//         </div>

//         {!editMode && (
//           <button
//             onClick={() => setEditMode(true)}
//             className="flex items-center gap-2 px-4 py-2 border border-orange-300 rounded-lg"
//           >
//             <Pencil size={14} /> Edit Profile
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* LEFT */}
//        <div className="space-y-6">
//   <ProfileCard user={user} profile={form} />
//   <SecurityCard />
// </div>

        

//         {/* RIGHT */}
//         <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-400 shadow-sm">
//           {/* TABS */}
//           <div className="flex gap-4 border-b border-gray-400 px-6 pt-4">
//             <TabButton label="Core Profile" active={activeTab === "core"} onClick={() => setActiveTab("core")} />
//             <TabButton label="Professional" active={activeTab === "advanced"} onClick={() => setActiveTab("advanced")} />
//               <TabButton label="Consumer & Lifestyle Module" active={activeTab === "consumer"} onClick={() => setActiveTab("consumer")} />
//             {/* <TabButton label="Security" active={activeTab === "security"} onClick={() => setActiveTab("security")} /> */}
            
//           </div>
// {/* MAP BELOW ALL CARDS
// <div className="px-6 pb-6">
//   <Section title="Your Current Location" />

//   <LocationMap
//     onAddressFetched={(data) => {
//       setForm((prev) => ({
//         ...prev,
//         country: data.country || prev.country,
//         postalCode: data.postalCode || prev.postalCode,
//         address: data.fullAddress,
//       }));
//     }}
//   />
// </div> */}

//           {/* CONTENT */}
//           <div className="p-6 space-y-6">
//             {activeTab === "core" && (
//               <CoreTab
//                 form={form}
//                 editMode={editMode}
//                 onChange={handleChange}
//                 countries={countries}
//                 setForm={setForm}
//               />
//             )}

//             {activeTab === "advanced" && (
//               <AdvancedTab
//                 form={form}
//                 editMode={editMode}
//                 onChange={handleChange}
//               />
//             )}

//             {activeTab === "consumer" && (
//               <ConsumerTab
//                 form={form}
//                 editMode={editMode}
//                 onChange={handleChange}
//               />
//             )}

//             {activeTab === "security" && <SecurityTab />}

//             {editMode && (
//               <div className="flex justify-end gap-3 pt-4">
//                 <button onClick={() => setEditMode(false)} className="px-5 py-2 border rounded-lg">
//                   Cancel
//                 </button>
//                 <button onClick={handleSave} className="px-5 py-2 bg-[#aaaaaa] text-white rounded-lg">
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </div>
          
//         </div>
        
//       </div>
//       {/* ✅ FULL-WIDTH MAP CARD (BELOW ALL CARDS) */}
// <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-6">
//   <h3 className="text-lg font-semibold mb-2">
//     Your Current Location
//   </h3>

//   <p className="text-sm text-gray-500 mb-4">
//     Location detected from your device.
//   </p>

//   <div className="overflow-hidden rounded-xl border border-gray-400">
//     <LocationMap
//       onAddressFetched={(data) => {
//         setForm((prev) => ({
//           ...prev,
//           country: data.country || prev.country,
//           postalCode: data.postalCode || prev.postalCode,
//           address: data.fullAddress,
//         }));
//       }}
//     />
    
//   </div>
// </div>
//     </div>
//   );
// }

// /* ================= CORE MODULE ================= */

// function CoreTab({ form, editMode, onChange, countries, setForm }) {
//   return (
//     <>
//       <Section title="Core Demographic Information" />

//       <TwoCol>
//         <Input label="First Name" name="firstName" value={form.firstName} editable={editMode} onChange={onChange} />
//         <Input label="Last Name" name="lastName" value={form.lastName} editable={editMode} onChange={onChange} />
//       </TwoCol>

//       <Input label="Date of Birth" type="date" name="dob" value={form.dob} editable={editMode} onChange={onChange} />

//       <SelectInput
//         label="Gender Identity"
//         name="gender"
//         value={form.gender}
//         onChange={onChange}
//         options={[
//           "Male",
//           "Female",
//           "Non-binary",
//           "Prefer not to say",
//         ]}
//       />

//       <PhoneInput
//         label="Phone Number"
//         name="phone"
//         value={form.phone}
//         countryCode={form.countryCode}
//         countries={countries}
//         editable={editMode}
//         onChange={onChange}
//         onCountryChange={(code) =>
//           onChange({ target: { name: "countryCode", value: code } })
//         }
//       />

//       <Input
//         label="Zip / Postal Code"
//         name="postalCode"
//         value={form.postalCode}
//         editable={editMode}
//         onChange={onChange}
//       />

//       <SelectInput
//         label="Country of Residence"
//         name="country"
//         value={form.country}
//         onChange={onChange}
//         options={countries.map((c) => c.name)}
//       />
//       <Input
//   label="Address"
//   name="address"
//   value={form.address}
//   editable={false}
// />

//       {/* MAP BELOW ALL CARDS */}
// {/* <div className="mt-4">
//   <LocationMap
//     onAddressFetched={(data) => {
//       setForm((prev) => ({
//         ...prev,
//         country: data.country || prev.country,
//         postalCode: data.postalCode || prev.postalCode,
//         address: data.fullAddress,
//       }));
//     }}
//   />
// </div> */}
//     </>
//   );
// }

// /* ================= ADVANCED (B2B) ================= */

// function AdvancedTab({ form, editMode, onChange }) {
//   const isEmployed = ["Full-time", "Part-time", "Self-employed"].includes(
//     form.employmentStatus
//   );

//   // const userSegment = getUserSegment(form.profession);
//   const userSegment = form.employmentStatus === "Employed" ? getUserSegment(form.profession) : null;

//   return (
//     <>
//       <Section title="Professional & Business Details" />
// <SelectInput
//         label="Highest Education Level"
//         name="education"
//         value={form.education}
//         onChange={onChange}
//         options={[
//           "High School",
//           "Diploma",
//           "Bachelor’s Degree",
//           "Master’s Degree",
          
//         ]}
//       />

//       <SelectInput
//         label="Employment Status"
//         name="employmentStatus"
//         value={form.employmentStatus}
//         onChange={onChange}
//         options={[
//           "Full-time",
//           "Part-time",
//           "Self-employed",
//           "Unemployed",
//           "Student",
//           "Retired",
//           "Employed",
//         ]}
//       />
// {form.employmentStatus === "Employed" && (
//   <SelectInput
//     label="Profession"
//     name="profession"
//     value={form.profession}
//     onChange={onChange}
//     options={[
//       "Doctor",
//       "Engineer",
//       "Teacher",
//       "Lawyer",
//       "Chartered Accountant",
//       "Nurse",
//       "Pharmacist",
//       "IT Professional",
//       "Business Owner",
//       "Other",
//     ]}
//   />
// )}

//       <SelectInput
//         label="Household Income (Annual)"
//         name="incomeRange"
//         value={form.incomeRange}
//         onChange={onChange}
//         options={[
//           "Below ₹5L",
//           "₹5L – ₹10L",
//           "₹10L – ₹25L",
//           "Above ₹25L",
//         ]}
//       />
//       {/* ================= EMPLOYMENT (COMMON) ================= */}
//       {isEmployed && (
//         <>
//           <Input
//             label="Industry"
//             name="industry"
//             value={form.industry}
//             editable={editMode}
//             onChange={onChange}
//           />

//           <SelectInput
//             label="Company Size"
//             name="companySize"
//             value={form.companySize}
//             onChange={onChange}
//             options={["1–10", "11–50", "51–200", "201–1000", "1000+"]}
//           />

//           <SelectInput
//             label="Seniority Level"
//             name="seniority"
//             value={form.seniority}
//             onChange={onChange}
//             options={["Entry", "Manager", "Director", "VP / C-Level"]}
//           />
//         </>
//       )}

//       {/* ================= HEALTHCARE MODULE ================= */}
//       {userSegment === "HEALTHCARE" && (
//         <>
//           <Section title="Healthcare Professional Details" />

//           <Input
//             label="Healthcare Profession"
//             name="profession"
//             value={form.profession}
//             editable={editMode}
//             onChange={onChange}
//           />

//           <Input
//             label="Primary Specialty"
//             name="specialty"
//             value={form.specialty}
//             editable={editMode}
//             placeholder="Cardiology, Oncology, Pediatrics, etc."
           
//             onChange={onChange}
//           />

//           <SelectInput
//             label="Work Setting"
//             name="workSetting"
//             value={form.workSetting}
//             onChange={onChange}
//             editable={editMode}
//             options={[
//               "Private Practice",
//               "Public Hospital",
//               "Academic / Research",
//               "Community Clinic",
//             ]}
//           />

//           <Input
//             label="Patients Seen Per Week"
//             name="patientVolume"
//             value={form.patientVolume}
//             editable={editMode}
//             onChange={onChange}
//           />

//           <SelectInput
//             label="Prescribing Authority"
//             name="prescribingAuthority"
//             value={form.prescribingAuthority}
//             editable={editMode}
//             onChange={onChange}
//             options={["Yes", "No"]}
//           />
//         </>
//       )}

//       {/* ================= OTHER PROFESSIONS (LOCKED) ================= */}
//       {userSegment &&
//         ["IT", "EDUCATION", "BUSINESS", "OTHER"].includes(userSegment) && (
//           <div className="border border-dashed rounded-lg p-4 text-sm text-gray-500 bg-orange-50">
//             Professional profiling questions for this profession are not
//             available yet.
//           </div>
//         )}

//       {/* ================= NO PROFESSION ================= */}
      
//     </>
//   );
// }


// function ConsumerTab({ form, editMode, onChange, countries }) {
//   return (
//     <>
//       <Section title="Consumer & Lifestyle Module" />

//       <Input
//         label="Household Composition"
//         placeholder="How many people, including yourself, live in your household?"
//         name="household"
//         value={form.household}
//         editable={editMode}
//         onChange={onChange}
//       />
//       <Input
//         label="Parental Status"
//         placeholder="parental status"
//         name="parental"
//         value={form.parental}
//         editable={editMode}
//         onChange={onChange}
//       />
//        <Input
//         label="Primary Decision Maker"
//         placeholder="primary Decision"
//         name="primary"
//         value={form.primary}
//         editable={editMode}
//         onChange={onChange}
//       />
//        <Input
//         label="Ownership"
//         name="ownership"
//         value={form.ownership}
//         editable={editMode}
//         onChange={onChange}
//       />
//       <Input
//         label="Tech Stack"
//         placeholder="tech stack"
//         name="techStack"
//         value={form.techStack}
//         editable={editMode}
//         onChange={onChange}
//       />
//       <Input
//         label="Health (General)"
//         name="health"
//         value={form.health}
//         editable={editMode}
//         onChange={onChange}
//       />
//     </>
//   );
// }

// /* ================= SECURITY ================= */

// function SecurityTab() {
//   return (
//     <div className="space-y-4">
//       <p className="text-sm text-gray-500">
//         Security features help protect your account and improve panel trust.
//       </p>
//       <div className="border rounded-lg p-4">Two-Step Authentication (Coming Soon)</div>
//       <div className="border rounded-lg p-4">Logged-in Devices (Coming Soon)</div>
//     </div>
//   );
// }

// function SecurityCard() {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchSessions = () => {
//     api.get("/security/sessions").then((res) => {
//       setSessions(res.data.sessions);
//       setLoading(false);
//     });
//   };

//   useEffect(fetchSessions, []);

//   const deleteSession = async (id) => {
//     if (!window.confirm("Log out this device?")) return;

//     try {
//       await api.delete(`/security/sessions/${id}`);
//       fetchSessions(); // refresh list
//     } catch (err) {
//       alert(err.response?.data?.message || "Unable to log out device");
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl border border-gray-400 shadow-sm p-6">
//       <h3 className="text-lg font-semibold mb-2">Security</h3>

//       {loading ? (
//         <p className="text-sm text-gray-400">Loading devices…</p>
//       ) : (
//         <>
//           <p className="text-sm text-gray-500 mb-4">
//             You are currently logged in on{" "}
//             <span className="font-semibold">{sessions.length}</span>{" "}
//             device{sessions.length > 1 && "s"}
//           </p>

//           <div className="space-y-2">
//             {sessions.map((s) => (
//               <div
//                 key={s.id}
//                 className="flex justify-between items-center border rounded-lg px-3 py-2 text-sm"
//               >
//                 <div>
//                   <p className="font-medium">
//                     {s.device || "Unknown"} – {s.os || "Unknown"}
//                   </p>
//                   <p className="text-xs text-gray-400">
//                     Last active:{" "}
//                     {new Date(s.lastActiveAt).toLocaleString()}
//                   </p>
//                 </div>

//                 {s.isCurrent ? (
//                   <span className="text-[#aaaaaa] font-medium">
//                     Current
//                   </span>
//                 ) : (
//                   <button
//                     onClick={() => deleteSession(s.id)}
//                     className="text-red-500 text-xs font-medium hover:underline"
//                   >
//                     Log out
//                   </button>
//                 )}
//               </div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }



// /* ================= SHARED COMPONENTS ================= */

// // function ProfileCard({ user }) {
// //   const [open, setOpen] = useState(false);
// //   return (
// //     <Card center>
// //       <div className="relative">
// //         <div className="w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center text-[#1bbdac] text-4xl font-semibold">
// //           {user.name?.charAt(0)}
// //         </div>
// //         <button className="absolute bottom-2 right-2 bg-[#1bbdac] text-white p-2 rounded-full">
// //           <Camera size={16} />
// //         </button>
// //       </div>

// //       <h3 className="mt-4 font-semibold text-lg">{user.name}</h3>
// //       <p className="text-sm text-gray-500">Member since Jan 2026</p>
// //       <h3 className="font-semibold mt-6 mb-4">Change Password</h3>
// //       <div className="w-full text-left px-2">
       

// //       {!open ? (
// //         /* SHOW BUTTON FIRST */
// //         <button
// //           onClick={() => setOpen(true)}
// //           className="w-full bg-[#1bbdac] text-white py-2 rounded-lg"
// //         >
// //           Change Password
// //         </button>
// //       ) : (
// //         /* SHOW FORM AFTER CLICK */
// //         <div className="space-y-4">
// //           <PasswordInput label="Current Password" />
// //           <PasswordInput label="New Password" />
// //           <PasswordInput label="Confirm Password" />

// //           <div className="flex gap-3 pt-2">
// //             <button
// //               onClick={() => setOpen(false)}
// //               className="w-full border py-2 rounded-lg"
// //             >
// //               Cancel
// //             </button>

// //           <button className="w-full bg-[#1bbdac] text-white py-2 rounded-lg">
// //               Update Password
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //       </div>
// //     </Card>
    
// //   );
// // }
// function ProfileCard({ user, profile }) {
//   const [open, setOpen] = useState(false);
//   const [preview, setPreview] = useState(null);
//   const fileInputRef = useRef();

  

// useEffect(() => {
//   if (profile?.profileImage) {
//     setPreview(profile.profileImage);
//   }
// }, [profile]);


//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("image", file);

//     const res = await api.post("/users/upload-profile", formData);

//     // update preview immediately
//     setPreview(res.data.image);
//   };


//   return (
//     <Card center>
//       <div className="relative group cursor-pointer">
//         {/* HIDDEN FILE INPUT */}
//         <input
//           type="file"
//           accept="image/*"
//           className="hidden"
//           ref={fileInputRef}
//           onChange={handleImageChange}
//         />

//         {/* PROFILE IMAGE */}
//         {preview ? (
//           <img
//             src={preview}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover border"
//             onClick={() => fileInputRef.current.click()}
//           />
//         ) : (
//           <div
//             onClick={() => fileInputRef.current.click()}
//             className="w-32 h-32 rounded-full border-4 border-orange-400 bg-gray-200 flex items-center justify-center text-orange-500 text-4xl font-semibold"
//           >
//             {user.name?.charAt(0)}
//           </div>
//         )}

//         {/* CAMERA ICON */}
//         <div
//           onClick={() => fileInputRef.current.click()}
//           className="absolute bottom-2 right-2 bg-orange-500 text-white p-2 rounded-full shadow-md"
//         >
//           <Camera size={16} />
//         </div>
//       </div>

//       <h3 className="mt-4 font-semibold text-lg">{user.name}</h3>
//       <p className="text-sm text-gray-500">
//   Member since{" "}
//   {user?.createdAt
//     ? new Date(user.createdAt).toLocaleString("en-IN", {
//         month: "short",
//         year: "numeric",
//       })
//     : ""}
// </p>


//       {/* PASSWORD SECTION SAME AS BEFORE */}
//       <h3 className="font-semibold mt-6 mb-4">Change Password</h3>

//       {!open ? (
//         <button
//           onClick={() => setOpen(true)}
//           className="w-full bg-[#aaaaaa] text-white py-2 rounded-lg"
//         >
//           Change Password
//         </button>
//       ) : (
//         <div className="space-y-4 w-full">
//           <PasswordInput label="Current Password" />
//           <PasswordInput label="New Password" />
//           <PasswordInput label="Confirm Password" />

//           <div className="flex gap-3 pt-2">
//             <button
//               onClick={() => setOpen(false)}
//               className="w-full border py-2 rounded-lg"
//             >
//               Cancel
//             </button>
//             <button className="w-full bg-[#aaaaaa] text-white py-2 rounded-lg">
//               Update Password
//             </button>
//           </div>
//         </div>
//       )}
//     </Card>
//   );
// }

// function TabButton({ label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`pb-3 text-sm font-medium ${
//         active ? "border-b-2 border-[#feb32c] text-orange-500" : "text-gray-500"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// function Section({ title }) {
//   return <h3 className="text-lg font-semibold">{title}</h3>;
// }

// function TwoCol({ children }) {
//   return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
// }

// function Input({ label, name, value, editable, onChange, type = "text" }) {
//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <input
//         name={name}
//         type={type}
//         value={value || ""}
//         onChange={onChange}
//         readOnly={!editable}
//         className={`w-full border rounded-lg px-3 py-2 ${
//           editable ? "bg-white border-[#1bbdac]" : "bg-gray-50"
//         }`}
//       />
//     </div>
//   );
// }

// function SelectInput({ label, name, value, onChange, options }) {
//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <select name={name} value={value || ""} onChange={onChange} className="w-full border rounded-lg px-3 py-2">
//         <option value="">Select</option>
//         {options.map((o) => (
//           <option key={o} value={o}>{o}</option>
//         ))}
//       </select>
//     </div>
//   );
// }
// function Card({ children, center }) {
//   return (
//     <div
//       className={`bg-white rounded-2xl border border-gray-400 shadow-sm p-6 space-y-4 ${
//         center ? "flex flex-col items-center text-center" : ""
//       }`}
//     >
//       {children}
//     </div>
//   );
// }

// function PasswordInput({ label }) {
//   return (
//     <div>
//       <label className="text-sm font-medium mb-1 block">{label}</label>
//       <input
//         type="password"
//         className="w-full border rounded-lg px-3 py-2"
//       />
//     </div>
//   );
// }

// function PhoneInput({ label, name, value, countryCode, countries, editable, onChange, onCountryChange }) {
//   const selected = countries.find((c) => c.code === countryCode) || countries[0];

//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <div className="flex gap-2">
//         <select
//           value={selected.code}
//           onChange={(e) => onCountryChange(e.target.value)}
//           disabled={!editable}
//           className="border rounded-lg px-2"
//         >
//           {countries.map((c) => (
//             <option key={c.code} value={c.code}>
//               {c.flag} {c.dial_code}
//             </option>
//           ))}
//         </select>
//         <input
//           name={name}
//           value={value || ""}
//           onChange={onChange}
//           readOnly={!editable}
//           className="flex-1 border rounded-lg px-3 py-2"
//         />
//       </div>
//     </div>
//   );
// }



import {
  Camera,
  Pencil,
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../services/api";
import CountryList from "country-list-with-dial-code-and-flag";
import LocationMap from "../components/LocationMap";
import { useRef } from "react";

/* ================= MAIN ================= */
const PROFESSION_SEGMENTS = {
  HEALTHCARE: [
    "Doctor",
    "Nurse",
    "Pharmacist",
    "Physiotherapist",
    "Dentist",
    "Hospital Administrator",
  ],

  IT: [
    "Engineer",
    "Software Developer",
    "IT Professional",
    "DevOps / SRE",
    "Data Scientist",
    "Data Engineer",
    "Cybersecurity Specialist",
    "IT Support / System Administrator",
    "Engineering Manager",
    "Product Manager",
  ],

  EDUCATION: [
    "Teacher",
    "K-12 Teacher",
    "Special Education Teacher",
    "Professor",
    "University Researcher",
    "Lecturer",
    "Academic Administrator",
    "Principal",
  ],

  BUSINESS: [
    "Business Owner",
    "Founder / Entrepreneur",
    "CEO / Executive",
    "Management Consultant",
    "Operations Manager",
    "Project Manager",
    "Sales / Business Development",
  ],

  FINANCE: [
    "Financial Analyst",
    "Chartered Accountant",
    "Accountant",
    "Investment Banker",
    "Financial Planner",
    "Auditor",
    "Risk Manager",
  ],
};

const getUserSegment = (profession) => {
  if (!profession) return null;

  for (const [segment, list] of Object.entries(PROFESSION_SEGMENTS)) {
    if (list.includes(profession)) return segment;
  }

  return "OTHER";
};

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("core");
  const [successMsg, setSuccessMsg] = useState("");
  // ✅ COUNTRY DATA (npm)
  const countries = CountryList.getAll();

  const [form, setForm] = useState({
    // CORE MODULE
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    country: "India",
    postalCode: "",
     address: "",
    education: "",
    employmentStatus: "",
    profession:"",
    incomeRange: "",

    // B2B
    industry: "",
    companySize: "",
    seniority: "",

    // CONTACT
    phone: "",
    countryCode: "IN",
    whatsapp: "",

    // Healthcare
  healthcareRole: "",
  specialty: "",
  workSetting: "",
  healthcareExperience: "",
  patientVolume: "",
  prescribingAuthority: "",
  healthcareChallenge: "",

  // IT
  itRole: "",
  itDomain: "",
  itEmploymentType: "",
  itExperience: "",
  itChallenge: "",

  // Education
  educationRole: "",
  institutionType: "",
  teachingMethod: "",
  educationExperience: "",
  educationChallenge: "",

  // Business
  businessRole: "",
  businessCompanySize: "",
  businessIndustry: "",
  businessExperience: "",
  businessChallenge: "",

  // Finance
  financeRole: "",
  financeSpecialization: "",
  financeOrganizationType: "",
  financeExperience: "",
  financeChallenge: "",


  household: "",
  parental: "",
  primary: "",
  ownership: "",
  techStack: "",

  // Lifestyle
  alcoholConsumption: "",
  smokingHabit: "",
  vapingHabit: "",
  physicalActivity: "",
  dietaryPreference: "",
  sleepDuration: "",

  // Shopping
  shoppingPreference: "",
  onlineShoppingFrequency: "",

  // Travel
  travelFrequency: "",
  travelType: "",

  // Entertainment
  entertainmentPreference: "",
   // Pets
  petOwnership: "",
  petType: "",
  petCount: "",

  // Vehicle
  carOwnership: "",
  vehicleType: "",
  vehicleCount: "",
  vehicleUsage: "",
    
  });

  useEffect(() => {
  const loadProfile = async () => {
    try {
      const [meRes, profileRes] = await Promise.all([
        api.get("/auth/me"),
        api.get("/users/profile")
      ]);

      setUser(meRes.data.user);

      setForm(prev => ({
        ...prev,
        ...profileRes.data,
        dob: profileRes.data?.dob
    ? profileRes.data.dob.substring(0, 10)
    : ""
      }));

    } catch (err) {
      // console.error(err);
    }
  };

  loadProfile();
}, []);


 


  // const handleChange = (e) =>
  //   setForm({ ...form, [e.target.name]: e.target.value });
const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,

    ...(name === "employmentStatus" && value !== "Employed"
      ? {
          profession: "",
          specialty: "",
          healthcareRole: "",
          workSetting: "",
          patientVolume: "",
          prescribingAuthority: "",

          itRole: "",
          itDomain: "",
          itEmploymentType: "",
          itExperience: "",
          itChallenge: "",

          educationRole: "",
          institutionType: "",
          teachingMethod: "",
          educationExperience: "",
          educationChallenge: "",

          businessRole: "",
          businessCompanySize: "",
          businessIndustry: "",
          businessExperience: "",
          businessChallenge: "",

          financeRole: "",
          financeSpecialization: "",
          financeOrganizationType: "",
          financeExperience: "",
          financeChallenge: "",
        }
      : {}),

      ...(name === "profession"
      ? {
          specialty: "",
          healthcareRole: "",
          workSetting: "",
          patientVolume: "",
          prescribingAuthority: "",
          itRole: "",
          itDomain: "",
          itEmploymentType: "",
          itExperience: "",
          itChallenge: "",
          educationRole: "",
          institutionType: "",
          teachingMethod: "",
          educationExperience: "",
          educationChallenge: "",
          businessRole: "",
          businessCompanySize: "",
          businessIndustry: "",
          businessExperience: "",
          businessChallenge: "",
          financeRole: "",
          financeSpecialization: "",
          financeOrganizationType: "",
          financeExperience: "",
          financeChallenge: "",
        }
      : {}),
  }));
};

  // const handleSave = async () => {
  //   await api.put("/users/profile", form);
  //   setEditMode(false);
  //   alert("Profile updated");
  // };

  const handleSave = async () => {
  try {
    await api.put("/users/profile", form);
    setEditMode(false);

    setSuccessMsg("Profile updated successfully");

    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);

  } catch (err) {
    setSuccessMsg("Failed to update profile");
  }
};

  if (!user) return <div>Loading...</div>;
// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 500 * 1024 }, // 500KB limit
// });

 return (
  <div className="min-h-screen bg-[#f3f1ee] relative">

    {/* ORANGE HEADER BACKGROUND ONLY TOP */}
    <div className="absolute top-0 left-0 w-full h-[240px] bg-gradient-to-r from-orange-300 to-orange-500" />

    {/* CONTENT WRAPPER */}
    <div className="relative max-w-7xl mx-auto px-6 pt-14 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center text-white">
        <div>
          <h1 className="text-3xl font-semibold">My Profile</h1>
          <p className="text-sm opacity-80">
            Manage your demographic & professional information
          </p>
        </div>

        {!editMode && (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-xl shadow-md"
          >
            <Pencil size={14} /> Edit Profile
          </button>
        )}
      </div>
{successMsg && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <div className="bg-white rounded-2xl shadow-2xl px-14 py-12 text-center animate-scaleIn">

      {/* GREEN CIRCLE */}
      <div className="w-28 h-28 mx-auto rounded-full border-[10px] border-green-400 flex items-center justify-center">
        <span className="text-green-500 text-5xl">✓</span>
      </div>

      {/* TEXT */}
      <h2 className="mt-6 text-2xl font-semibold text-gray-700">
        Success!
      </h2>

      <p className="text-gray-400 mt-2">
        {successMsg}
      </p>

    </div>

  </div>
)}
      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        {/* LEFT */}
        <div className="space-y-6">
          <ProfileCard user={user} profile={form} />
          <SecurityCard />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 backdrop-blur-xl 
        bg-white/20 
        border border-white/30 
        rounded-3xl 
        shadow-xl 
        p-3 ">

          {/* TABS */}
          <div className="flex gap-4 border-b border-gray-200 px-6 pt-6">
            <TabButton
              label="Core Profile"
              active={activeTab === "core"}
              onClick={() => setActiveTab("core")}
            />
            <TabButton
              label="Professional"
              active={activeTab === "advanced"}
              onClick={() => setActiveTab("advanced")}
            />
            <TabButton
              label="Consumer & Lifestyle Module"
              active={activeTab === "consumer"}
              onClick={() => setActiveTab("consumer")}
            />
          </div>

          {/* CONTENT */}
          <div className="p-6 space-y-6">
            {activeTab === "core" && (
              <CoreTab
                form={form}
                editMode={editMode}
                onChange={handleChange}
                countries={countries}
                setForm={setForm}
              />
            )}

            {activeTab === "advanced" && (
              <AdvancedTab
                form={form}
                editMode={editMode}
                onChange={handleChange}
              />
            )}

            {activeTab === "consumer" && (
              <ConsumerTab
                form={form}
                editMode={editMode}
                onChange={handleChange}
              />
            )}

            {activeTab === "security" && <SecurityTab />}

            {editMode && (
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setEditMode(false)}
                  className="px-5 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-orange-500 text-white rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FULL WIDTH LOCATION CARD */}
      <div className="bg-white/70 rounded-2xl shadow-lg p-6 mt-6">
        <h3 className="text-lg font-semibold mb-2">
          Your Current Location
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Location detected from your device.
        </p>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <LocationMap
            onAddressFetched={(data) => {
              setForm((prev) => ({
                ...prev,
                country: data.country || prev.country,
                postalCode: data.postalCode || prev.postalCode,
                address: data.fullAddress,
              }));
            }}
          />
        </div>
      </div>

    </div>
  </div>
);

}

/* ================= CORE MODULE ================= */

function CoreTab({ form, editMode, onChange, countries, setForm }) {
  return (
    <>
      <Section title="Core Demographic Information" />

      <TwoCol>
        <Input label="First Name" name="firstName" value={form.firstName} editable={editMode} onChange={onChange} />
        <Input label="Last Name" name="lastName" value={form.lastName} editable={editMode} onChange={onChange} />
      </TwoCol>

      <Input label="Date of Birth" type="date" name="dob" value={form.dob} editable={editMode} onChange={onChange} />

      <SelectInput
        label="Gender Identity"
        name="gender"
        value={form.gender}
        onChange={onChange}
        options={[
          "Male",
          "Female",
          "Non-binary",
          "Prefer not to say",
        ]}
      />

      <PhoneInput
        label="Phone Number"
        name="phone"
        value={form.phone}
        countryCode={form.countryCode}
        countries={countries}
        editable={editMode}
        onChange={onChange}
        onCountryChange={(code) =>
          onChange({ target: { name: "countryCode", value: code } })
        }
      />

      <Input
        label="Zip / Postal Code"
        name="postalCode"
        value={form.postalCode}
        editable={editMode}
        onChange={onChange}
      />

      <SelectInput
        label="Country of Residence"
        name="country"
        value={form.country}
        onChange={onChange}
        options={countries.map((c) => c.name)}
  //        options={countries.map((c) => ({
  //   label: `${c.name} (${form.postalCode || ""})`,
  //   value: c.code
  // }))}
      />
      <Input
  label="Address"
  name="address"
  value={form.address}
  editable={false}
/>

      {/* MAP BELOW ALL CARDS */}
{/* <div className="mt-4">
  <LocationMap
    onAddressFetched={(data) => {
      setForm((prev) => ({
        ...prev,
        country: data.country || prev.country,
        postalCode: data.postalCode || prev.postalCode,
        address: data.fullAddress,
      }));
    }}
  />
</div> */}
    </>
  );
}

/* ================= ADVANCED (B2B) ================= */

function AdvancedTab({ form, editMode, onChange }) {
  const isEmployed = ["Full-time", "Part-time", "Self-employed", "Employed",].includes(
    form.employmentStatus
  );

  // const userSegment = getUserSegment(form.profession);
  // const userSegment = form.employmentStatus === isEmployed ? getUserSegment(form.profession) : null;
  const userSegment = isEmployed
  ? getUserSegment(form.profession)
  : null;

  return (
    <>
      <Section title="Professional & Business Details" />
<SelectInput
        label="Highest Education Level"
        name="education"
        value={form.education}
        onChange={onChange}
        options={[
          "High School",
          "Diploma",
          "Bachelor’s Degree",
          "Master’s Degree",
          "PHD",
        ]}
      />

      <SelectInput
        label="Employment Status"
        name="employmentStatus"
        value={form.employmentStatus}
        onChange={onChange}
        options={[
          "Full-time",
          "Part-time",
          "Self-employed",
          "Unemployed",
          "Student",
          "Retired",
          "Employed",
        ]}
      />
{/* {form.employmentStatus === "Employed" && (
  <SelectInput
    label="Profession"
    name="profession"
    value={form.profession}
    onChange={onChange}
    options={[
      "Doctor",
      "Engineer",
      "Teacher",
      "Lawyer",
      "Chartered Accountant",
      "Nurse",
      "Pharmacist",
      "IT Professional",
      "Business Owner",
      "Other",
      "Dentist",
    ]}
  />
)} */}

{/* {isEmployed && (
  <SelectInput
    label="Profession"
    name="profession"
    value={form.profession}
    onChange={onChange}
    options={[
      "Doctor",
      "Nurse",
      "Pharmacist",
      "Physiotherapist",
      "Dentist",
      "Hospital Administrator",

      "Engineer",
      "Software Developer",
      "IT Professional",
      "DevOps / SRE",
      "Data Scientist",
      "Data Engineer",
      "Cybersecurity Specialist",
      "IT Support / System Administrator",
      "Engineering Manager",
      "Product Manager",

      "Teacher",
      "K-12 Teacher",
      "Special Education Teacher",
      "Professor",
      "University Researcher",
      "Lecturer",
      "Academic Administrator",
      "Principal",

      "Business Owner",
      "Founder / Entrepreneur",
      "CEO / Executive",
      "Management Consultant",
      "Operations Manager",
      "Project Manager",
      "Sales / Business Development",

      "Financial Analyst",
      "CA",
      "Accountant",
      "Investment Banker",
      "Financial Planner",
      "Auditor",
      "Risk Manager",

      "Lawyer",
      "Chartered Accountant",
      "Other",

      
    ]}
  />
)} */}

{isEmployed && (
  <SelectInput
    label="Profession"
    name="profession"
    value={form.profession}
    onChange={onChange}
    options={[
      {
        label: "Healthcare",
        options: [
          "Doctor",
          "Nurse",
          "Pharmacist",
          "Physiotherapist",
          "Dentist",
          "Hospital Administrator",
        ],
      },

      {
        label: "IT & Technology",
        options: [
          "Engineer",
          "Software Developer",
          "IT Professional",
          "DevOps / SRE",
          "Data Scientist",
          "Data Engineer",
          "Cybersecurity Specialist",
          "IT Support / System Administrator",
          "Engineering Manager",
          "Product Manager",
        ],
      },

      {
        label: "Education",
        options: [
          "Teacher",
          "K-12 Teacher",
          "Special Education Teacher",
          "Professor",
          "University Researcher",
          "Lecturer",
          "Academic Administrator",
          "Principal",
        ],
      },

      {
        label: "Business & Management",
        options: [
          "Business Owner",
          "Founder / Entrepreneur",
          "CEO / Executive",
          "Management Consultant",
          "Operations Manager",
          "Project Manager",
          "Sales / Business Development",
        ],
      },

      {
        label: "Finance & Accounting",
        options: [
          "Financial Analyst",
          "Chartered Accountant",
          "Accountant",
          "Investment Banker",
          "Financial Planner",
          "Auditor",
          "Risk Manager",
        ],
      },

      {
        label: "Other",
        options: [
          "Lawyer",
          "Other",
        ],
      },
    ]}
  />
)}

      <SelectInput
        label="Household Income (Annual)"
        name="incomeRange"
        value={form.incomeRange}
        onChange={onChange}
        options={[
          "Below ₹5L",
          "₹5L – ₹10L",
          "₹10L – ₹25L",
          "Above ₹25L",
        ]}
      />
      {/* ================= EMPLOYMENT (COMMON) ================= */}
      {isEmployed && (
        <>
          <Input
            label="Industry"
            name="industry"
            value={form.industry}
            editable={editMode}
            onChange={onChange}
          />

          <SelectInput
            label="Company Size"
            name="companySize"
            value={form.companySize}
            onChange={onChange}
            options={["1–10", "11–50", "51–200", "201–1000", "1000+"]}
          />

          <SelectInput
            label="Seniority Level"
            name="seniority"
            value={form.seniority}
            onChange={onChange}
            options={["Entry", "Manager", "Director", "VP / C-Level"]}
          />
        </>
      )}

      {/* ================= HEALTHCARE MODULE ================= */}
      {userSegment === "HEALTHCARE" && (
        <>
          <Section title="Healthcare Professional Details" />

          {/* <Input
            label="Healthcare Profession"
            name="profession"
            value={form.profession}
            editable={editMode}
            onChange={onChange}
          /> */}
          <SelectInput
  label="Primary Specialization / Role"
  name="healthcareRole"
  value={form.healthcareRole}
  onChange={onChange}
  options={[
    "General Practitioner / Family Physician",
    "Medical Specialist",
    "Surgeon",
    "Registered Nurse / Nurse Practitioner",
    "Clinical Pharmacist",
    "Physiotherapist",
    "Occupational Therapist",
    "Dentist",
    "Healthcare Administrator / Practice Manager",
  ]}
/>

          <Input
            label="Primary Specialty"
            name="specialty"
            value={form.specialty}
            editable={editMode}
            placeholder="Cardiology, Oncology, Pediatrics, etc."
           
            onChange={onChange}
          />

          <SelectInput
            label="Work Setting"
            name="workSetting"
            value={form.workSetting}
            onChange={onChange}
            editable={editMode}
            options={[
              "Private Practice",
              "Public Hospital",
              "Academic / Research",
              "Community Clinic",
            ]}
          />

           <SelectInput
      label="Years of Experience"
      name="healthcareExperience"
      value={form.healthcareExperience}
      onChange={onChange}
      options={[
        "0–2 years",
        "3–5 years",
        "6–10 years",
        "11–20 years",
        "20+ years",
      ]}
    />

          <Input
            label="Patients Seen Per Week"
            name="patientVolume"
            value={form.patientVolume}
            editable={editMode}
            onChange={onChange}
          />

          <SelectInput
            label="Prescribing Authority"
            name="prescribingAuthority"
            value={form.prescribingAuthority}
            editable={editMode}
            onChange={onChange}
            options={["Yes", "No"]}
          />
          <SelectInput
      label="Primary Professional Challenge"
      name="healthcareChallenge"
      value={form.healthcareChallenge}
      onChange={onChange}
      options={[
        "Administrative burden / EHR documentation",
        "Patient load and time constraints",
        "Burnout and work-life balance",
        "Regulatory or insurance requirements",
        "Staffing and workforce challenges",
        "Patient access and care coordination",
      ]}
    />
        </>
      )}

      {/* ================= OTHER PROFESSIONS (LOCKED) ================= */}
      {/* {userSegment &&
        ["IT", "EDUCATION", "BUSINESS", "OTHER"].includes(userSegment) && (
          <div className="border border-dashed rounded-lg p-4 text-sm text-gray-500 bg-orange-50">
            Professional profiling questions for this profession are not
            available yet.
          </div>
        )} */}

      {/* ================= IT MODULE ================= */}
{userSegment === "IT" && (
  <>
    <Section title="IT & Technology Professional Details" />

    <SelectInput
      label="Primary Role / Focus"
      name="itRole"
      value={form.itRole}
      onChange={onChange}
      options={[
        "Software Engineer / Developer",
        "DevOps / Site Reliability Engineer",
        "Data Scientist",
        "Data Engineer",
        "Cybersecurity Specialist",
        "IT Support / Systems Administrator",
        "Engineering Manager",
        "Product Manager",
      ]}
    />

    <SelectInput
      label="Primary Technology Domain"
      name="itDomain"
      value={form.itDomain}
      onChange={onChange}
      options={[
        "Cloud Computing",
        "Web & Mobile Development",
        "Artificial Intelligence / Machine Learning",
        "Data & Analytics",
        "Cybersecurity",
        "Enterprise IT & Infrastructure",
      ]}
    />

    <SelectInput
      label="Employment Type"
      name="itEmploymentType"
      value={form.itEmploymentType}
      onChange={onChange}
      options={[
        "Full-time Employee - Product Company",
        "Full-time Employee - Service / Consulting",
        "Freelancer / Independent Contractor",
        "Startup Employee",
        "Government / Public Sector",
      ]}
    />

    <SelectInput
      label="Years of Professional Experience"
      name="itExperience"
      value={form.itExperience}
      onChange={onChange}
      options={[
        "0–2 years",
        "3–5 years",
        "6–10 years",
        "11–20 years",
        "20+ years",
      ]}
    />

    <SelectInput
      label="Primary Professional Challenge"
      name="itChallenge"
      value={form.itChallenge}
      onChange={onChange}
      options={[
        "Keeping up with rapidly changing technologies",
        "Managing technical debt",
        "Cross-functional communication and alignment",
        "Unrealistic project timelines",
        "Hiring and retaining technical talent",
        "Cybersecurity and data protection",
      ]}
    />
  </>
)}

{/* ================= EDUCATION MODULE ================= */}
{userSegment === "EDUCATION" && (
  <>
    <Section title="Education Professional Details" />

    <SelectInput
      label="Primary Role / Level"
      name="educationRole"
      value={form.educationRole}
      onChange={onChange}
      options={[
        "K-12 Teacher",
        "Special Education Teacher",
        "University Professor",
        "University Researcher",
        "College Lecturer / Instructor",
        "Academic Administrator",
        "Principal",
      ]}
    />

    <SelectInput
      label="Institution Type"
      name="institutionType"
      value={form.institutionType}
      onChange={onChange}
      options={[
        "Public School / District",
        "Private / Independent School",
        "Community College",
        "Four-Year University / College",
        "Vocational / Technical Institution",
        "Online Education Institution",
      ]}
    />

    <SelectInput
      label="Primary Teaching Delivery Method"
      name="teachingMethod"
      value={form.teachingMethod}
      onChange={onChange}
      options={[
        "In-person / On-campus",
        "Fully Online",
        "Hybrid / Blended",
      ]}
    />

    <SelectInput
      label="Years of Teaching / Education Experience"
      name="educationExperience"
      value={form.educationExperience}
      onChange={onChange}
      options={[
        "0–2 years",
        "3–5 years",
        "6–10 years",
        "11–20 years",
        "20+ years",
      ]}
    />

    <SelectInput
      label="Primary Professional Challenge"
      name="educationChallenge"
      value={form.educationChallenge}
      onChange={onChange}
      options={[
        "Student engagement and motivation",
        "Administrative workload and grading",
        "Resource and funding constraints",
        "Integrating new educational technology",
        "Teacher workload and burnout",
        "Curriculum development",
      ]}
    />
  </>
)}

{/* ================= BUSINESS MODULE ================= */}
{userSegment === "BUSINESS" && (
  <>
    <Section title="Business & Management Professional Details" />

    <SelectInput
      label="Primary Role / Function"
      name="businessRole"
      value={form.businessRole}
      onChange={onChange}
      options={[
        "Business Owner / Founder",
        "CEO / C-Level Executive",
        "Management Consultant",
        "Strategy Consultant",
        "Operations Manager",
        "Project Manager",
        "Sales / Business Development",
        "Marketing Manager",
        "Finance Manager",
        "Human Resources Manager",
      ]}
    />

    <SelectInput
      label="Company Size"
      name="businessCompanySize"
      value={form.businessCompanySize}
      onChange={onChange}
      options={[
        "Solo Entrepreneur / Freelancer",
        "Small Business (1–50 employees)",
        "Mid-market (51–250 employees)",
        "Enterprise (250+ employees)",
      ]}
    />

    <SelectInput
      label="Primary Industry Focus"
      name="businessIndustry"
      value={form.businessIndustry}
      onChange={onChange}
      options={[
        "B2B SaaS / Technology",
        "Retail / E-commerce",
        "Professional Services",
        "Manufacturing / Supply Chain",
        "Healthcare",
        "Financial Services",
        "Education",
        "Other",
      ]}
    />

    <SelectInput
      label="Years of Professional Experience"
      name="businessExperience"
      value={form.businessExperience}
      onChange={onChange}
      options={[
        "0–2 years",
        "3–5 years",
        "6–10 years",
        "11–20 years",
        "20+ years",
      ]}
    />

    <SelectInput
      label="Primary Professional Challenge"
      name="businessChallenge"
      value={form.businessChallenge}
      onChange={onChange}
      options={[
        "Scaling operations and growth",
        "Cash flow and financial management",
        "Talent acquisition and retention",
        "Navigating market competition",
        "Customer acquisition and retention",
        "Digital transformation",
        "Economic uncertainty",
      ]}
    />
  </>
)}

{/* ================= FINANCE MODULE ================= */}
{userSegment === "FINANCE" && (
  <>
    <Section title="Finance Professional Details" />

    <SelectInput
      label="Primary Role / Function"
      name="financeRole"
      value={form.financeRole}
      onChange={onChange}
      options={[
        "Financial Analyst",
        "Chartered Accountant (CA)",
        "Accountant",
        "Investment Banker",
        "Financial Planner",
        "Auditor",
        "Risk Manager",
      ]}
    />

    <SelectInput
      label="Primary Area of Expertise"
      name="financeSpecialization"
      value={form.financeSpecialization}
      onChange={onChange}
      options={[
        "Accounting & Financial Reporting",
        "Financial Planning & Analysis",
        "Investment & Wealth Management",
        "Corporate Finance",
        "Investment Banking",
        "Audit & Assurance",
        "Risk Management",
        "Taxation",
        "Treasury",
        "Compliance",
      ]}
    />

    <SelectInput
      label="Organization Type"
      name="financeOrganizationType"
      value={form.financeOrganizationType}
      onChange={onChange}
      options={[
        "Bank / Financial Institution",
        "Investment / Asset Management Firm",
        "Accounting / Audit Firm",
        "Insurance Company",
        "Fintech Company",
        "Corporate / Private Company",
        "Government / Public Sector",
        "Independent / Self-employed",
      ]}
    />

    <SelectInput
      label="Years of Professional Experience"
      name="financeExperience"
      value={form.financeExperience}
      onChange={onChange}
      options={[
        "0–2 years",
        "3–5 years",
        "6–10 years",
        "11–20 years",
        "20+ years",
      ]}
    />

    <SelectInput
      label="Primary Professional Challenge"
      name="financeChallenge"
      value={form.financeChallenge}
      onChange={onChange}
      options={[
        "Regulatory and compliance requirements",
        "Financial reporting and accuracy",
        "Market volatility and uncertainty",
        "Risk management",
        "Client acquisition and retention",
        "Technology and digital transformation",
        "Data security and privacy",
        "Talent acquisition and retention",
      ]}
    />
  </>
)}
      
    </>
  );
}


// function ConsumerTab({ form, editMode, onChange, countries }) {
//   return (
//     <>
//       <Section title="Consumer & Lifestyle Module" />

//       <Input
//         label="Household Composition"
//         placeholder="How many people, including yourself, live in your household?"
//         name="household"
//         value={form.household}
//         editable={editMode}
//         onChange={onChange}
//       />
//       <Input
//         label="Parental Status"
//         placeholder="parental status"
//         name="parental"
//         value={form.parental}
//         editable={editMode}
//         onChange={onChange}
//       />
//        <Input
//         label="Primary Decision Maker"
//         placeholder="primary Decision"
//         name="primary"
//         value={form.primary}
//         editable={editMode}
//         onChange={onChange}
//       />
//        <Input
//         label="Ownership"
//         name="ownership"
//         value={form.ownership}
//         editable={editMode}
//         onChange={onChange}
//       />
//       <Input
//         label="Tech Stack"
//         placeholder="tech stack"
//         name="techStack"
//         value={form.techStack}
//         editable={editMode}
//         onChange={onChange}
//       />
//       <Input
//         label="Health (General)"
//         name="health"
//         value={form.health}
//         editable={editMode}
//         onChange={onChange}
//       />
//       <Section title="Lifestyle Preference" />
//       <Input
//         label="Drinking Habits"
//         placeholder="Did you drink alchol or any other beverages ?"
//         name="lifestyle"
//         value={form.lifestyle}
//         editable={editMode}
//         onChange={onChange}
//       />
//     </>
//   );
// }

function ConsumerTab({ form, editMode, onChange, countries }) {
  return (
    <>
      <Section title="Consumer & Lifestyle Module" />

      {/* ================= HOUSEHOLD ================= */}
      <Section title="Household & Family" />

      <SelectInput
        label="Household Composition"
        name="household"
        value={form.household}
        onChange={onChange}
        options={[
          "Live alone",
          "2 people",
          "3 people",
          "4 people",
          "5 people",
          "6 or more people",
          "Prefer not to say",
        ]}
      />

      <SelectInput
        label="Parental Status"
        name="parental"
        value={form.parental}
        onChange={onChange}
        options={[
          "Parent / Guardian",
          "Not a parent",
          "Prefer not to say",
        ]}
      />

      <SelectInput
        label="Primary Household Decision Maker"
        name="primary"
        value={form.primary}
        onChange={onChange}
        options={[
          "Primarily me",
          "Primarily another household member",
          "Shared equally",
          "Depends on the purchase",
          "Prefer not to say",
        ]}
      />

      {/* ================= OWNERSHIP ================= */}
      <Section title="Ownership & Technology" />

      <SelectInput
        label="Home Ownership"
        name="ownership"
        value={form.ownership}
        onChange={onChange}
        options={[
          "Own",
          "Rent",
          "Living with family",
          "Other",
          "Prefer not to say",
        ]}
      />

      <Input
        label="Technology & Devices Used"
        placeholder="e.g. Smartphone, Laptop, Tablet, Smart TV"
        name="techStack"
        value={form.techStack}
        editable={editMode}
        onChange={onChange}
      />

      {/* ================= LIFESTYLE ================= */}
      <Section title="Lifestyle Preferences" />

      {/* DRINKING */}
      <SelectInput
        label="Alcohol Consumption"
        name="alcoholConsumption"
        value={form.alcoholConsumption}
        onChange={onChange}
        options={[
          "Never",
          "Rarely",
          "Occasionally",
          "1–2 times per week",
          "3–4 times per week",
          "5 or more times per week",
          "Prefer not to say",
        ]}
      />

      {/* SMOKING */}
      <SelectInput
        label="Smoking / Tobacco Use"
        name="smokingHabit"
        value={form.smokingHabit}
        onChange={onChange}
        options={[
          "Never",
          "Former smoker",
          "Occasionally",
          "Daily",
          "Prefer not to say",
        ]}
      />

      {/* VAPING */}
      <SelectInput
        label="Vaping / E-cigarette Use"
        name="vapingHabit"
        value={form.vapingHabit}
        onChange={onChange}
        options={[
          "Never",
          "Former user",
          "Occasionally",
          "Daily",
          "Prefer not to say",
        ]}
      />

      {/* EXERCISE */}
      <SelectInput
        label="Physical Activity"
        name="physicalActivity"
        value={form.physicalActivity}
        onChange={onChange}
        options={[
          "Rarely or never",
          "1–2 days per week",
          "3–4 days per week",
          "5 or more days per week",
          "Prefer not to say",
        ]}
      />

      {/* DIET */}
      <SelectInput
        label="Dietary Preference"
        name="dietaryPreference"
        value={form.dietaryPreference}
        onChange={onChange}
        options={[
          "No specific preference",
          "Vegetarian",
          "Vegan",
          "Pescatarian",
          "Jain",
          "Halal",
          "Other",
          "Prefer not to say",
        ]}
      />

      {/* SLEEP */}
      <SelectInput
        label="Typical Sleep Duration"
        name="sleepDuration"
        value={form.sleepDuration}
        onChange={onChange}
        options={[
          "Less than 5 hours",
          "5–6 hours",
          "7–8 hours",
          "9–10 hours",
          "More than 10 hours",
          "Prefer not to say",
        ]}
      />

      {/* ================= SHOPPING ================= */}
      <Section title="Shopping & Consumer Behavior" />

      <SelectInput
        label="Preferred Shopping Method"
        name="shoppingPreference"
        value={form.shoppingPreference}
        onChange={onChange}
        options={[
          "Mostly online",
          "Mostly physical stores",
          "Both equally",
          "Depends on the product",
          "Prefer not to say",
        ]}
      />

      <SelectInput
        label="Online Shopping Frequency"
        name="onlineShoppingFrequency"
        value={form.onlineShoppingFrequency}
        onChange={onChange}
        options={[
          "Rarely",
          "Once a month or less",
          "2–3 times per month",
          "Weekly",
          "Several times per week",
          "Prefer not to say",
        ]}
      />

      {/* ================= TRAVEL ================= */}
      <Section title="Travel & Leisure" />

      <SelectInput
        label="Travel Frequency"
        name="travelFrequency"
        value={form.travelFrequency}
        onChange={onChange}
        options={[
          "Rarely",
          "1–2 times per year",
          "3–5 times per year",
          "6 or more times per year",
          "Prefer not to say",
        ]}
      />

      <SelectInput
        label="Preferred Travel Type"
        name="travelType"
        value={form.travelType}
        onChange={onChange}
        options={[
          "Domestic travel",
          "International travel",
          "Both",
          "Business travel",
          "Leisure travel",
          "Adventure travel",
          "Family travel",
          "Prefer not to say",
        ]}
      />

      {/* ================= ENTERTAINMENT ================= */}
      <Section title="Entertainment & Media" />

      <SelectInput
        label="Primary Entertainment Preference"
        name="entertainmentPreference"
        value={form.entertainmentPreference}
        onChange={onChange}
        options={[
          "Movies & TV",
          "Music",
          "Gaming",
          "Sports",
          "Reading",
          "Social Media",
          "Podcasts",
          "Outdoor Activities",
          "Other",
          "Prefer not to say",
        ]}
      />

      <Section title="Pets & Animals" />

<SelectInput
  label="Do you currently own a pet?"
  name="petOwnership"
  value={form.petOwnership}
  onChange={onChange}
  options={[
    "Yes",
    "No",
    "Prefer not to say",
  ]}
/>

<SelectInput
  label="Type of Pet"
  name="petType"
  value={form.petType}
  onChange={onChange}
  options={[
    "Dog",
    "Cat",
    "Bird",
    "Fish",
    "Rabbit",
    "Reptile",
    "Other",
    "Multiple types",
    "Prefer not to say",
  ]}
/>

<SelectInput
  label="Number of Pets"
  name="petCount"
  value={form.petCount}
  onChange={onChange}
  options={[
    "1",
    "2",
    "3",
    "4 or more",
    "Prefer not to say",
  ]}
/>
<Section title="Vehicle & Transportation" />

<SelectInput
  label="Do you own or have access to a car?"
  name="carOwnership"
  value={form.carOwnership}
  onChange={onChange}
  options={[
    "Own a car",
    "Lease a car",
    "Company-provided car",
    "Have access to a household car",
    "Do not own or have access to a car",
    "Prefer not to say",
  ]}
/>

<SelectInput
  label="Primary Vehicle Type"
  name="vehicleType"
  value={form.vehicleType}
  onChange={onChange}
  options={[
    "Sedan",
    "Hatchback",
    "SUV",
    "MPV / Minivan",
    "Toyota",
    "Volkswagen",
    "Ford",
    "Honda",
    "Chevrolet",
    "Nissan",
    "Hyundai",
    "Kia",
    "BMW",
    "Mercedes-Benz",
    "Audi",
    "Lexus",
    "Porsche",
    "Ferrari",
    "Lamborghini",
    "Volvo",
    "Subaru",
    "Mazda",
    "Jeep",
    "Tesla",
    "Pickup Truck",
    "Coupe / Sports Car",
    "Electric Vehicle (EV)",
    "Hybrid",
    "Motorcycle / Scooter",
    "Other",
    "Prefer not to say",
  ]}
/>

<SelectInput
  label="Number of Vehicles in Household"
  name="vehicleCount"
  value={form.vehicleCount}
  onChange={onChange}
  options={[
    "None",
    "1",
    "2",
    "3",
    "4 or more",
    "Prefer not to say",
  ]}
/>

<SelectInput
  label="Primary Vehicle Usage"
  name="vehicleUsage"
  value={form.vehicleUsage}
  onChange={onChange}
  options={[
    "Daily commuting",
    "Family / household transportation",
    "Business / work",
    "Long-distance travel",
    "Occasional personal use",
    "Mostly recreational",
    "Other",
    "Prefer not to say",
  ]}
/>
    </>
  );
}

/* ================= SECURITY ================= */

function SecurityTab() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        Security features help protect your account and improve panel trust.
      </p>
      <div className="border rounded-lg p-4">Two-Step Authentication (Coming Soon)</div>
      <div className="border rounded-lg p-4">Logged-in Devices (Coming Soon)</div>
    </div>
  );
}

function SecurityCard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = () => {
    api.get("/security/sessions").then((res) => {
      setSessions(res.data.sessions);
      setLoading(false);
    });
  };

  useEffect(fetchSessions, []);

  const deleteSession = async (id) => {
    if (!window.confirm("Log out this device?")) return;

    try {
      await api.delete(`/security/sessions/${id}`);
      fetchSessions(); // refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Unable to log out device");
    }
  };

  return (
    <div className="backdrop-blur-xl 
        bg-white/20 
        rounded-3xl 
        shadow-xl border border-gray-300
        p-8">
      <h3 className="text-lg font-semibold mb-2">Security</h3>

      {loading ? (
        <p className="text-sm text-gray-400">Loading devices…</p>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">
            You are currently logged in on{" "}
            <span className="font-semibold">{sessions.length}</span>{" "}
            device{sessions.length > 1 && "s"}
          </p>

          <div className="space-y-2">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="flex justify-between items-center border rounded-lg px-3 py-2 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {s.device || "Unknown"} – {s.os || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Last active:{" "}
                    {new Date(s.lastActiveAt).toLocaleString()}
                  </p>
                </div>

                {s.isCurrent ? (
                  <span className="text-[#aaaaaa] font-medium">
                    Current
                  </span>
                ) : (
                  <button
                    onClick={() => deleteSession(s.id)}
                    className="text-red-500 text-xs font-medium hover:underline"
                  >
                    Log out
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}



/* ================= SHARED COMPONENTS ================= */

// function ProfileCard({ user }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <Card center>
//       <div className="relative">
//         <div className="w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center text-[#1bbdac] text-4xl font-semibold">
//           {user.name?.charAt(0)}
//         </div>
//         <button className="absolute bottom-2 right-2 bg-[#1bbdac] text-white p-2 rounded-full">
//           <Camera size={16} />
//         </button>
//       </div>

//       <h3 className="mt-4 font-semibold text-lg">{user.name}</h3>
//       <p className="text-sm text-gray-500">Member since Jan 2026</p>
//       <h3 className="font-semibold mt-6 mb-4">Change Password</h3>
//       <div className="w-full text-left px-2">
       

//       {!open ? (
//         /* SHOW BUTTON FIRST */
//         <button
//           onClick={() => setOpen(true)}
//           className="w-full bg-[#1bbdac] text-white py-2 rounded-lg"
//         >
//           Change Password
//         </button>
//       ) : (
//         /* SHOW FORM AFTER CLICK */
//         <div className="space-y-4">
//           <PasswordInput label="Current Password" />
//           <PasswordInput label="New Password" />
//           <PasswordInput label="Confirm Password" />

//           <div className="flex gap-3 pt-2">
//             <button
//               onClick={() => setOpen(false)}
//               className="w-full border py-2 rounded-lg"
//             >
//               Cancel
//             </button>

//           <button className="w-full bg-[#1bbdac] text-white py-2 rounded-lg">
//               Update Password
//             </button>
//           </div>
//         </div>
//       )}
//       </div>
//     </Card>
    
//   );
// }
function ProfileCard({ user, profile }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef();

  

useEffect(() => {
  if (profile?.profileImage) {
    setPreview(profile.profileImage);
  }
}, [profile]);


  // const handleImageChange = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   const res = await api.post("/users/upload-profile", formData);

  //   // update preview immediately
  //   setPreview(res.data.image);
  // };

  const handleImageChange = async (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  // Clear previous error
  setImageError("");

  // =========================
  // FRONTEND SIZE VALIDATION
  // =========================
  const MAX_SIZE = 2 * 1024 * 1024; // 2 MB

  if (file.size > MAX_SIZE) {
    setImageError("Image must be smaller than 2 MB.");
    e.target.value = "";
    return;
  }

  // =========================
  // FRONTEND TYPE VALIDATION
  // =========================
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (!allowedTypes.includes(file.type)) {
    setImageError("Only JPG, JPEG, and PNG images are allowed.");
    e.target.value = "";
    return;
  }

  try {
    setImageUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await api.post(
      "/users/upload-profile",
      formData
    );

    setPreview(res.data.image);

  } catch (err) {
    

    if (err.response?.status === 413) {
      setImageError(
        "Image is too large. Please choose an image smaller than 2 MB."
      );
    } else {
      setImageError(
        err.response?.data?.message ||
        "Failed to upload profile image."
      );
    }

  } finally {
    setImageUploading(false);

    // Allow selecting the same file again
    e.target.value = "";
  }
};

const [passwords, setPasswords] = useState({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const handlePasswordChange = (e) => {
  const { name, value } = e.target;

  setPasswords((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleUpdatePassword = async () => {
  if (passwords.newPassword !== passwords.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await api.put("/auth/change-password", {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });

    alert("Password updated successfully");

    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setOpen(false);
  } catch (err) {
    alert(err.response?.data?.message || "Failed to update password");
  }
};
  return (
    <Card center>
      
      <div className="relative group cursor-pointer ">

        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          hidden
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* CIRCLE */}
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            onClick={() => fileInputRef.current.click()}
            className="w-36 h-36 rounded-full object-cover border-[3px] border-orange-400"
          />
        ) : (
          <div
            onClick={() => fileInputRef.current.click()}
            className="w-36 h-36 rounded-full bg-[#f7f1e7] border-[3px] border-orange-400 flex items-center justify-center"
          >
            <span className="text-5xl font-semibold text-orange-500 tracking-wide">
              {user.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          </div>
        )}

        {/* CAMERA FLOAT BUTTON */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="absolute bottom-3 right-3 bg-orange-500 text-white p-2 rounded-full shadow-md hover:scale-105 transition"
        >
          <Camera size={16} />
        </div>
        {imageError && (
  <p className="mt-3 text-sm text-red-500 font-medium text-center">
    {imageError}
  </p>
)}
      </div>

      {/* NAME */}
      <h3 className="mt-6 text-xl font-semibold text-gray-800">
        {user.name}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Member since{" "}
        {user?.createdAt
          ? new Date(user.createdAt).toLocaleString("en-IN", {
              month: "short",
              year: "numeric",
            })
          : ""}
      </p>

      {/* CHANGE PASSWORD BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="mt-6 w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition"
      >
        Change Password
      </button>

      {open && (
        <div className="space-y-4 w-full mt-6">
          <PasswordInput
  label="Current Password"
  name="currentPassword"
  value={passwords.currentPassword}
  onChange={handlePasswordChange}
/>

<PasswordInput
  label="New Password"
  name="newPassword"
  value={passwords.newPassword}
  onChange={handlePasswordChange}
/>

<PasswordInput
  label="Confirm Password"
  name="confirmPassword"
  value={passwords.confirmPassword}
  onChange={handlePasswordChange}
/>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => setOpen(false)}
              className="w-full border py-2 rounded-lg"
            >
              Cancel
            </button>
          <button
  onClick={handleUpdatePassword}
  className="w-full bg-orange-500 text-white py-2 rounded-lg"
>
  Update Password
</button>
          </div>
        </div>
      )}
    </Card>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`pb-3 text-sm font-medium ${
        active ? "border-b-3 border-red-500 text-black" : "text-gray-500"
      }`}
    >
      {label}
    </button>
  );
}
// #feb32c
function Section({ title }) {
  return <h3 className="text-lg font-semibold">{title}</h3>;
}

function TwoCol({ children }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function Input({ label, name, value, editable, onChange, type = "text" }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        value={value || ""}
        onChange={onChange}
        readOnly={!editable}
        className={`w-full border rounded-lg px-3 py-2 ${
          editable ? "bg-white border-[#1bbdac]" : "bg-gray-50"
        }`}
      />
    </div>
  );
}

// function SelectInput({ label, name, value, onChange, options }) {
//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <select name={name} value={value || ""} onChange={onChange} className="w-full border rounded-lg px-3 py-2">
//         <option value="">Select</option>
//         {options.map((o, index) => (
//           // <option key={o} value={o}>{o}</option>
//           <option key={`${o}-${index}`} value={o}>{o}</option>
//         ))}

//         {/* {options.map((o) => (
//   <option key={o.value} value={o.value}>
//     {o.label}
//   </option>
// ))} */}

//       </select>
//     </div>
//   );
// }

function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Select</option>

        {options.map((option, index) => {
          // =========================
          // GROUPED OPTIONS
          // =========================
          if (
            typeof option === "object" &&
            option.options
          ) {
            return (
              <optgroup
                key={`${option.label}-${index}`}
                label={option.label}
              >
                {option.options.map((item, itemIndex) => (
                  <option
                    key={`${item}-${itemIndex}`}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </optgroup>
            );
          }

          // =========================
          // NORMAL OPTIONS
          // =========================
          return (
            <option
              key={`${option}-${index}`}
              value={option}
            >
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function Card({ children, center }) {
  return (
    <div
      className={`backdrop-blur-xl 
        bg-white/20 
        border border-white/30 
        rounded-3xl 
        shadow-xl 
        p-8 ${
        center ? "flex flex-col items-center text-center" : ""
      }`}
    >
      {children}
    </div>
  );
}

function PasswordInput({ label, name, value, onChange }) {
  return (
    <div>
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <input
        type="password"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2"
      />
    </div>
  );
}

function PhoneInput({ label, name, value, countryCode, countries, editable, onChange, onCountryChange }) {
  const selected = countries.find((c) => c.code === countryCode) || countries[0];

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <select
          value={selected.code}
          onChange={(e) => onCountryChange(e.target.value)}
          disabled={!editable}
          className="border rounded-lg px-2"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.dial_code}
            </option>
          ))}
        </select>
        <input
          name={name}
          value={value || ""}
          onChange={onChange}
          readOnly={!editable}
          className="flex-1 border rounded-lg px-3 py-2"
        />
      </div>
    </div>
  );
}
