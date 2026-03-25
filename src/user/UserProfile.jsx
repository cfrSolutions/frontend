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
    "IT Professional",
    "Software Engineer",
    "Developer",
  ],

  EDUCATION: [
    "Teacher",
    "Professor",
    "Lecturer",
  ],

  BUSINESS: [
    "Business Owner",
    "Entrepreneur",
    "Consultant",
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
          workSetting: "",
          patientVolume: "",
          prescribingAuthority: "",
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

    setSuccessMsg("✅ Profile updated successfully");

    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);

  } catch (err) {
    setSuccessMsg("❌ Failed to update profile");
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
  <div className="fixed top-6 right-6 z-50">
    <div className="bg-white border border-green-200 shadow-xl px-6 py-4 rounded-2xl flex items-center gap-3 animate-fade-in">
      
      <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-xl">
        ✓
      </div>

      <div>
        <p className="font-semibold text-gray-800">{successMsg}</p>
        <p className="text-xs text-gray-400">Your changes were saved</p>
      </div>

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
  const isEmployed = ["Full-time", "Part-time", "Self-employed"].includes(
    form.employmentStatus
  );

  // const userSegment = getUserSegment(form.profession);
  const userSegment = form.employmentStatus === "Employed" ? getUserSegment(form.profession) : null;

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
{form.employmentStatus === "Employed" && (
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

          <Input
            label="Healthcare Profession"
            name="profession"
            value={form.profession}
            editable={editMode}
            onChange={onChange}
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
        </>
      )}

      {/* ================= OTHER PROFESSIONS (LOCKED) ================= */}
      {userSegment &&
        ["IT", "EDUCATION", "BUSINESS", "OTHER"].includes(userSegment) && (
          <div className="border border-dashed rounded-lg p-4 text-sm text-gray-500 bg-orange-50">
            Professional profiling questions for this profession are not
            available yet.
          </div>
        )}

      {/* ================= NO PROFESSION ================= */}
      
    </>
  );
}


function ConsumerTab({ form, editMode, onChange, countries }) {
  return (
    <>
      <Section title="Consumer & Lifestyle Module" />

      <Input
        label="Household Composition"
        placeholder="How many people, including yourself, live in your household?"
        name="household"
        value={form.household}
        editable={editMode}
        onChange={onChange}
      />
      <Input
        label="Parental Status"
        placeholder="parental status"
        name="parental"
        value={form.parental}
        editable={editMode}
        onChange={onChange}
      />
       <Input
        label="Primary Decision Maker"
        placeholder="primary Decision"
        name="primary"
        value={form.primary}
        editable={editMode}
        onChange={onChange}
      />
       <Input
        label="Ownership"
        name="ownership"
        value={form.ownership}
        editable={editMode}
        onChange={onChange}
      />
      <Input
        label="Tech Stack"
        placeholder="tech stack"
        name="techStack"
        value={form.techStack}
        editable={editMode}
        onChange={onChange}
      />
      <Input
        label="Health (General)"
        name="health"
        value={form.health}
        editable={editMode}
        onChange={onChange}
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
  const fileInputRef = useRef();

  

useEffect(() => {
  if (profile?.profileImage) {
    setPreview(profile.profileImage);
  }
}, [profile]);


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await api.post("/users/upload-profile", formData);

    // update preview immediately
    setPreview(res.data.image);
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
          accept="image/*"
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

function SelectInput({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <select name={name} value={value || ""} onChange={onChange} className="w-full border rounded-lg px-3 py-2">
        <option value="">Select</option>
        {options.map((o, index) => (
          // <option key={o} value={o}>{o}</option>
          <option key={`${o}-${index}`} value={o}>{o}</option>
        ))}

        {/* {options.map((o) => (
  <option key={o.value} value={o.value}>
    {o.label}
  </option>
))} */}

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
