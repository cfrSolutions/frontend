// import { useState } from "react";
// import {
//   User,
//   Mail,
//   Phone,
//   Building2,
//   MapPin,
//   Pencil,
//   Save,
//   X,
// } from "lucide-react";

// export default function BusinessProfile() {
//   // Get existing logged-in user data if it is already stored
//   const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

//   const [isEditing, setIsEditing] = useState(false);

//   const [profile, setProfile] = useState({
//     name: storedUser?.name || storedUser?.fullName || "",
//     email: storedUser?.email || "",
//     phone: storedUser?.phone || "",
//     company: storedUser?.company || storedUser?.companyName || "",
//     location: storedUser?.location || "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setProfile((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCancel = () => {
//     setProfile({
//       name: storedUser?.name || storedUser?.fullName || "",
//       email: storedUser?.email || "",
//       phone: storedUser?.phone || "",
//       company: storedUser?.company || storedUser?.companyName || "",
//       location: storedUser?.location || "",
//     });

//     setIsEditing(false);
//   };

//   const handleSave = () => {
//     // Frontend-only for now.
//     // We will connect this to your existing backend profile API later.
//     localStorage.setItem(
//       "user",
//       JSON.stringify({
//         ...storedUser,
//         ...profile,
//       })
//     );

//     setIsEditing(false);
//   };

//   const getInitials = () => {
//     if (!profile.name) return "U";

//     return profile.name
//       .split(" ")
//       .map((word) => word.charAt(0))
//       .join("")
//       .substring(0, 2)
//       .toUpperCase();
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-900">
//             My Profile
//           </h1>

//           <p className="mt-1 text-sm text-gray-500">
//             Manage your business account information
//           </p>
//         </div>

//         {!isEditing ? (
//           <button
//             onClick={() => setIsEditing(true)}
//             className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
//           >
//             <Pencil size={16} />
//             Edit Profile
//           </button>
//         ) : (
//           <div className="flex gap-2">
//             <button
//               onClick={handleCancel}
//               className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//             >
//               <X size={16} />
//               Cancel
//             </button>

//             <button
//               onClick={handleSave}
//               className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
//             >
//               <Save size={16} />
//               Save Changes
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Profile card */}
//       <div className="max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
//         {/* Profile top */}
//         <div className="border-b border-gray-200 px-6 py-8">
//           <div className="flex items-center gap-5">
//             <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl font-semibold text-white">
//               {getInitials()}
//             </div>

//             <div>
//               <h2 className="text-xl font-semibold text-gray-900">
//                 {profile.name || "Business User"}
//               </h2>

//               <p className="mt-1 text-sm text-gray-500">
//                 {profile.email || "No email available"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Personal information */}
//         <div className="p-6">
//           <h3 className="mb-5 text-lg font-semibold text-gray-900">
//             Personal Information
//           </h3>

//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//             {/* Name */}
//             <ProfileField
//               icon={<User size={18} />}
//               label="Full Name"
//               name="name"
//               value={profile.name}
//               editing={isEditing}
//               onChange={handleChange}
//               placeholder="Enter your full name"
//             />

//             {/* Email */}
//             <ProfileField
//               icon={<Mail size={18} />}
//               label="Email Address"
//               name="email"
//               type="email"
//               value={profile.email}
//               editing={isEditing}
//               onChange={handleChange}
//               placeholder="Enter your email"
//             />

//             {/* Phone */}
//             <ProfileField
//               icon={<Phone size={18} />}
//               label="Phone Number"
//               name="phone"
//               value={profile.phone}
//               editing={isEditing}
//               onChange={handleChange}
//               placeholder="Enter your phone number"
//             />

//             {/* Company */}
//             <ProfileField
//               icon={<Building2 size={18} />}
//               label="Company"
//               name="company"
//               value={profile.company}
//               editing={isEditing}
//               onChange={handleChange}
//               placeholder="Enter company name"
//             />

//             {/* Location */}
//             <ProfileField
//               icon={<MapPin size={18} />}
//               label="Location"
//               name="location"
//               value={profile.location}
//               editing={isEditing}
//               onChange={handleChange}
//               placeholder="Enter your location"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ProfileField({
//   icon,
//   label,
//   name,
//   type = "text",
//   value,
//   editing,
//   onChange,
//   placeholder,
// }) {
//   return (
//     <div>
//       <label className="mb-2 block text-sm font-medium text-gray-700">
//         {label}
//       </label>

//       {editing ? (
//         <div className="relative">
//           <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//             {icon}
//           </div>

//           <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             placeholder={placeholder}
//             className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
//           />
//         </div>
//       ) : (
//         <div className="flex min-h-[42px] items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
//           <span className="text-gray-400">{icon}</span>

//           <span className="text-sm text-gray-800">
//             {value || "Not provided"}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Pencil,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import api from "../services/api";

export default function BusinessProfile() {
  const emptyProfile = {
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState(emptyProfile);
  const [originalProfile, setOriginalProfile] = useState(emptyProfile);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // ---------------------------------------
  // GET PROFILE
  // ---------------------------------------
  useEffect(() => {
    fetchBusinessProfile();
  }, []);

  const fetchBusinessProfile = async () => {
    try {
      setLoading(true);
      setMessage({ type: "", text: "" });

      const response = await api.get("/business/profile");

      const data = response?.data?.profile || {};

      const profileData = {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "",
        location: data.location || "",
      };

      setProfile(profileData);
      setOriginalProfile(profileData);
    } catch (error) {
      console.error("Failed to load business profile:", error);

      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          "Failed to load your profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------
  // INPUT CHANGE
  // ---------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ---------------------------------------
  // START EDITING
  // ---------------------------------------
  const handleEdit = () => {
    setMessage({
      type: "",
      text: "",
    });

    setIsEditing(true);
  };

  // ---------------------------------------
  // CANCEL
  // ---------------------------------------
  const handleCancel = () => {
    setProfile(originalProfile);

    setMessage({
      type: "",
      text: "",
    });

    setIsEditing(false);
  };

  // ---------------------------------------
  // SAVE
  // ---------------------------------------
  const handleSave = async () => {
    try {
      setSaving(true);

      setMessage({
        type: "",
        text: "",
      });

      const payload = {
        name: profile.name.trim(),
        phone: profile.phone.trim(),
        company: profile.company.trim(),
        location: profile.location.trim(),
      };

      const response = await api.put(
        "/business/profile",
        payload
      );

      const updatedData = response?.data?.profile;

      if (updatedData) {
        const updatedProfile = {
          name: updatedData.name || "",
          email: updatedData.email || "",
          phone: updatedData.phone || "",
          company: updatedData.company || "",
          location: updatedData.location || "",
        };

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);
      } else {
        setOriginalProfile(payload);
      }

      setIsEditing(false);

      setMessage({
        type: "success",
        text:
          response?.data?.message ||
          "Business profile updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update business profile:", error);

      setMessage({
        type: "error",
        text:
          error?.response?.data?.message ||
          "Failed to update your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------
  // INITIALS
  // ---------------------------------------
  const getInitials = () => {
    if (!profile.name?.trim()) {
      return "U";
    }

    return profile.name
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // ---------------------------------------
  // LOADING
  // ---------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2
              size={18}
              className="animate-spin"
            />

            Loading profile...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your business account information
          </p>
        </div>

        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* MESSAGE */}
      {message.text && (
        <div
          className={`mb-5 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={18} />
          ) : (
            <AlertCircle size={18} />
          )}

          <span>{message.text}</span>
        </div>
      )}

      {/* PROFILE CARD */}
      <div className="max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* PROFILE HEADER */}
        <div className="border-b border-gray-200 px-6 py-8">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-2xl font-semibold text-white">
              {getInitials()}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {profile.name || "Business User"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {profile.email || "No email available"}
              </p>
            </div>
          </div>
        </div>

        {/* INFORMATION */}
        <div className="p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-900">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ProfileField
              icon={<User size={18} />}
              label="Full Name"
              name="name"
              value={profile.name}
              editing={isEditing}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            {/* <ProfileField
              icon={<Mail size={18} />}
              label="Email Address"
              name="email"
              type="email"
              value={profile.email}
              editing={isEditing}
              onChange={handleChange}
              placeholder="Enter your email"
            /> */}
            <ProfileField
            icon={<Mail size={18} />}
            label="Email Address"
            name="email"
            value={profile.email}
            editing={false}
            />

            <ProfileField
              icon={<Phone size={18} />}
              label="Phone Number"
              name="phone"
              value={profile.phone}
              editing={isEditing}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            <ProfileField
              icon={<Building2 size={18} />}
              label="Company"
              name="company"
              value={profile.company}
              editing={isEditing}
              onChange={handleChange}
              placeholder="Enter company name"
            />

            <ProfileField
              icon={<MapPin size={18} />}
              label="Location"
              name="location"
              value={profile.location}
              editing={isEditing}
              onChange={handleChange}
              placeholder="Enter your location"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({
  icon,
  label,
  name,
  type = "text",
  value,
  editing,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      {editing ? (
        <div className="relative">
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>

          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      ) : (
        <div className="flex min-h-[42px] items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5">
          <span className="text-gray-400">
            {icon}
          </span>

          <span className="text-sm text-gray-800">
            {value || "Not provided"}
          </span>
        </div>
      )}
    </div>
  );
}