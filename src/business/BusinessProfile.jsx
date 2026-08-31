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
  Globe2,
  Navigation,
  MapPinned,
} from "lucide-react";

import api from "../services/api";
import CountryList from "country-list-with-dial-code-and-flag";
import LocationMap from "../components/LocationMap";

export default function BusinessProfile() {
  const emptyProfile = {
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    location: "",
    postalCode: "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [showCountryList, setShowCountryList] = useState(false);
  const [manualCountry, setManualCountry] = useState(false);

  const [profile, setProfile] = useState(emptyProfile);
  const [originalProfile, setOriginalProfile] =
    useState(emptyProfile);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  // Country list from npm package
  const countries = CountryList.getAll();

  // ---------------------------------------
  // GET PROFILE
  // ---------------------------------------
  useEffect(() => {
    fetchBusinessProfile();
  }, []);

  const fetchBusinessProfile = async () => {
    try {
      setLoading(true);

      setMessage({
        type: "",
        text: "",
      });

      const response = await api.get(
        "/business/profile"
      );

      const data = response?.data?.profile || {};

      const profileData = {
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        company: data.company || "",
        country: data.country || "",
        location: data.location || "",
        postalCode: data.postalCode || "",
      };

      setProfile(profileData);
      setOriginalProfile(profileData);
    } catch (error) {
      console.error(
        "Failed to load business profile:",
        error
      );

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
  // LOCATION DETECTED
  // ---------------------------------------
  const handleLocationFetched = (data) => {
  if (!data) return;

  const detectedCountry = data.country || "";

  const matchedCountry = countries.find(
    (country) =>
      country.name?.toLowerCase() ===
      detectedCountry.toLowerCase()
  );

  const countryName =
    matchedCountry?.name || detectedCountry;

  setProfile((prev) => ({
    ...prev,

    // Only automatically set country if
    // user has not manually selected one.
    country:
      !manualCountry && countryName
        ? countryName
        : prev.country,

    postalCode:
      data.postalCode || prev.postalCode,

    location:
      data.fullAddress || prev.location,
  }));
};
  // ---------------------------------------
  // START EDIT
  // ---------------------------------------
  const handleCountrySelect = (country) => {
  setProfile((prev) => ({
    ...prev,
    country: country.name,
  }));

  setManualCountry(true);
  setCountrySearch("");
  setShowCountryList(false);
};

  const handleEdit = () => {
    setMessage({
      type: "",
      text: "",
    });
    setCountrySearch("");
    setShowCountryList(false);

    setIsEditing(true);
  };

  // ---------------------------------------
  // CANCEL
  // ---------------------------------------
  const handleCancel = () => {
    setProfile(originalProfile);
    setManualCountry(false);
    setCountrySearch("");
    setShowCountryList(false);

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
        country: profile.country.trim(),
        location: profile.location.trim(),
        postalCode: profile.postalCode.trim(),
      };

      const response = await api.put(
        "/business/profile",
        payload
      );

      const updatedData =
        response?.data?.profile;

      if (updatedData) {
        const updatedProfile = {
          name: updatedData.name || "",
          email: updatedData.email || "",
          phone: updatedData.phone || "",
          company: updatedData.company || "",
          country: updatedData.country || "",
          location: updatedData.location || "",
          postalCode:
            updatedData.postalCode || "",
        };

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);
      } else {
        setOriginalProfile({
          ...profile,
          ...payload,
        });
      }

      setIsEditing(false);

      setMessage({
        type: "success",
        text:
          response?.data?.message ||
          "Business profile updated successfully.",
      });
    } catch (error) {
      console.error(
        "Failed to update business profile:",
        error
      );

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
      .map((word) =>
        word.charAt(0)
      )
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // ---------------------------------------
  // COUNTRY FLAG
  // ---------------------------------------
  const getCountry = () => {
    if (!profile.country) return null;

    return countries.find(
      (country) =>
        country.name?.toLowerCase() ===
        profile.country.toLowerCase()
    );
  };

  const selectedCountry = getCountry();

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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
                <User size={18} />
              </div>

              <h1 className="text-2xl font-semibold text-gray-900">
                My Profile
              </h1>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Manage your business account and location
              information.
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
            >
              <Pencil size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <X size={16} />
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
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

        {/* ================= MESSAGE ================= */}
        {message.text && (
          <div
            className={`mb-6 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
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

        {/* ================= PROFILE ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* LEFT PROFILE CARD */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* Profile hero */}
              <div className="bg-black px-6 py-8 text-white">
                <div className="flex flex-col items-center text-center">

                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-2xl font-bold text-black shadow-lg">
                    {getInitials()}
                  </div>

                  <h2 className="mt-4 text-xl font-semibold">
                    {profile.name ||
                      "Business User"}
                  </h2>

                  <p className="mt-1 break-all text-sm text-gray-300">
                    {profile.email ||
                      "No email available"}
                  </p>
                </div>
              </div>

              {/* Account summary */}
              <div className="space-y-4 p-6">

                <SummaryItem
                  icon={<Mail size={17} />}
                  label="Login Email"
                  value={
                    profile.email ||
                    "Not available"
                  }
                />

                <SummaryItem
                  icon={<Building2 size={17} />}
                  label="Company"
                  value={
                    profile.company ||
                    "Not provided"
                  }
                />

                <SummaryItem
                  icon={<Globe2 size={17} />}
                  label="Country"
                  value={
                    profile.country ||
                    "Not detected"
                  }
                  flag={
                    selectedCountry?.flag ||
                    selectedCountry?.emoji
                  }
                />

              </div>
            </div>
          </div>

          {/* RIGHT INFORMATION */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-200 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <User size={19} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Personal Information
                    </h3>

                    <p className="text-sm text-gray-500">
                      Your business account details
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
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

                  {/* READ ONLY LOGIN EMAIL */}
                  <ProfileField
                    icon={<Mail size={18} />}
                    label="Login Email"
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

                  {/* COUNTRY */}
                 <div className="relative">
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Country
  </label>

  {isEditing ? (
    <>
      <button
        type="button"
        onClick={() =>
          setShowCountryList((prev) => !prev)
        }
        className="flex min-h-[46px] w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-3 text-left transition focus:border-black focus:ring-1 focus:ring-black"
      >
        <Globe2
          size={18}
          className="shrink-0 text-gray-400"
        />

        {selectedCountry?.flag && (
          <span className="text-xl">
            {selectedCountry.flag}
          </span>
        )}

        <span className="flex-1 truncate text-sm text-gray-800">
          {profile.country || "Select country"}
        </span>

        <span className="text-xs text-gray-400">
          ▼
        </span>
      </button>

      {showCountryList && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">

          {/* SEARCH */}
          <div className="border-b border-gray-200 p-3">
            <input
              type="text"
              value={countrySearch}
              onChange={(e) =>
                setCountrySearch(e.target.value)
              }
              onClick={(e) =>
                e.stopPropagation()
              }
              placeholder="Search country..."
              autoFocus
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          {/* COUNTRY LIST */}
          <div className="max-h-64 overflow-y-auto p-1">

            {countries
              .filter((country) =>
                country.name
                  ?.toLowerCase()
                  .includes(
                    countrySearch.toLowerCase()
                  )
              )
              .map((country) => (
                <button
                  key={
                    country.code ||
                    country.name
                  }
                  type="button"
                  onClick={() =>
                    handleCountrySelect(country)
                  }
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition hover:bg-gray-100 ${
                    profile.country ===
                    country.name
                      ? "bg-gray-100 font-medium"
                      : ""
                  }`}
                >
                  {country.flag && (
                    <span className="text-xl">
                      {country.flag}
                    </span>
                  )}

                  <span className="flex-1">
                    {country.name}
                  </span>

                  {profile.country ===
                    country.name && (
                    <CheckCircle
                      size={16}
                      className="text-gray-700"
                    />
                  )}
                </button>
              ))}

            {countries.filter((country) =>
              country.name
                ?.toLowerCase()
                .includes(
                  countrySearch.toLowerCase()
                )
            ).length === 0 && (
              <div className="px-3 py-6 text-center text-sm text-gray-500">
                No country found
              </div>
            )}

          </div>
        </div>
      )}
    </>
  ) : (
    <div className="flex min-h-[46px] items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3">

      <Globe2
        size={18}
        className="text-gray-400"
      />

      {selectedCountry?.flag && (
        <span className="text-xl">
          {selectedCountry.flag}
        </span>
      )}

      <span className="text-sm text-gray-800">
        {profile.country ||
          "Not detected"}
      </span>
    </div>
  )}

  <p className="mt-1.5 text-xs text-gray-400">
    {isEditing
      ? "Automatically detected initially. You can change it manually."
      : "Country based on your saved profile location."}
  </p>
</div>

                  {/* POSTAL CODE */}
                  <ProfileField
                    icon={<MapPinned size={18} />}
                    label="Postal Code"
                    name="postalCode"
                    value={profile.postalCode}
                    editing={isEditing}
                    onChange={handleChange}
                    placeholder="Postal code"
                  />

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= LOCATION ================= */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-6 py-5">
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <Navigation size={19} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Current Location
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Your location is detected from your
                  device and used to determine your country.
                </p>
              </div>

            </div>
          </div>

          {/* Address */}
          <div className="border-b border-gray-200 p-6">

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Detected Address
            </label>

            <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

              <MapPin
                size={19}
                className="mt-0.5 shrink-0 text-gray-500"
              />

              <span className="text-sm leading-6 text-gray-800">
                {profile.location ||
                  "Waiting for location detection..."}
              </span>

            </div>

            {profile.country && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

                {selectedCountry?.flag && (
                  <span className="text-lg">
                    {selectedCountry.flag}
                  </span>
                )}

                <span>
                  Detected country:
                </span>

                <span className="font-medium text-gray-800">
                  {profile.country}
                </span>
              </div>
            )}
          </div>

          {/* MAP */}
          <div className="p-6">

            <div className="mb-3 flex items-center justify-between">

              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  Location Map
                </h4>

                <p className="mt-1 text-xs text-gray-500">
                  Allow location access when your browser
                  asks for permission.
                </p>
              </div>

              <Navigation
                size={18}
                className="text-gray-400"
              />

            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <LocationMap
                onAddressFetched={
                  handleLocationFetched
                }
              />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

/* ================================================= */
/* PROFILE FIELD */
/* ================================================= */

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
            value={value || ""}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>
      ) : (
        <div className="flex min-h-[46px] items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-3">
          <span className="text-gray-400">
            {icon}
          </span>

          <span className="break-all text-sm text-gray-800">
            {value || "Not provided"}
          </span>
        </div>
      )}
    </div>
  );
}

/* ================================================= */
/* SUMMARY ITEM */
/* ================================================= */

function SummaryItem({
  icon,
  label,
  value,
  flag,
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-gray-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          {label}
        </p>

        <div className="mt-1 flex items-center gap-2">
          {flag && (
            <span className="text-lg">
              {flag}
            </span>
          )}

          <p className="break-all text-sm font-medium text-gray-800">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}