import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import countryLanguage from "country-language";
import ct from "countries-and-timezones";
import {
  Briefcase,
  Globe,
  Users,
  Clock,
  BarChart3,
  Calendar,
  Smartphone,
  Monitor,
  Tablet,
} from "lucide-react";
import api from "../services/api";
import langs from "langs";
import ProfilingSection from "./ProfilingSection";
import BuildSurvey from "./BuildSurvey";


export const getLanguagesByCountry = (
  countryCode
) => {

  const result =
    countryLanguage.getCountryLanguages(
      countryCode
    );

  if (!result) return [];

  return result.map((lang) => {

    const language =
      langs.where(
        "1",
        lang.iso639_1
      );

    return language?.name;
  });

};
const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },

  { code: "GB", name: "United Kingdom" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "PL", name: "Poland" },

  { code: "IN", name: "India" },
  { code: "CN", name: "China" },
  { code: "JP", name: "Japan" },
  { code: "KR", name: "South Korea" },
  { code: "SG", name: "Singapore" },
  { code: "ID", name: "Indonesia" },
  { code: "PH", name: "Philippines" },
  { code: "TH", name: "Thailand" },
  { code: "VN", name: "Vietnam" },
  { code: "MY", name: "Malaysia" },

  { code: "AU", name: "Australia" },
  { code: "NZ", name: "New Zealand" },

  { code: "BR", name: "Brazil" },
  { code: "AR", name: "Argentina" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "PE", name: "Peru" },

  { code: "AE", name: "United Arab Emirates" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "ZA", name: "South Africa" },
];


// const profileLibrary = [
//   {
//     id: 1,
//     category: "Demographic",
//     code: "AGE",
//     question: "What is your age?",
//     type: "range"
//   },
//   {
//     id: 2,
//     category: "Demographic",
//     code: "GENDER",
//     question: "Are you...?",
//     type: "single punch"
//   },
//   {
//     id: 3,
//     category: "Demographic",
//     code: "MARITAL_STATUS",
//     question: "What is your marital status?",
//     type: "single punch"
//   },
//   {
//     id: 4,
//     category: "Automotive",
//     code: "CAR_OWNER",
//     question: "Do you own a car?",
//     type: "single punch"
//   }
// ];

export default function TargetGroupForm() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const timezones = Intl.supportedValuesOf("timeZone");
  const [marketTimezone, setMarketTimezone] = useState("");
  const { projectId, targetGroupId } = useParams();
  const isNew = !targetGroupId || targetGroupId === "new";
  const [search, setSearch] = useState("");
  const [expandedProfile, setExpandedProfile] = useState(null);
  const [profileLibrary, setProfileLibrary] =
  useState([]);
  const [activeProfile, setActiveProfile] =
  useState(null);
const [conditions,
setConditions] = useState([
  {
    min:"",
    max:"",
    quota:100
  }
]);

const [user, setUser] = useState(null);

useEffect(() => {
  api.get("/auth/me")
    .then((res) => {
      setUser(res.data.user);
    });
}, []);
const [openBuilder, setOpenBuilder] =
  useState(false);

const [surveyUrl, setSurveyUrl] = useState("");
const [showProfileCondition,
  setShowProfileCondition] =
  useState(false);
  const filteredProfiles =
  profileLibrary.filter(profile =>
    profile.code
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    profile.question
      .toLowerCase()
      .includes(search.toLowerCase())
  );
const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    sector: "",
    market: "",
    language: "",
    targetCompletes: 90,
    overQuotaAction: "QUOTA",
    ageFrom: 18,
    ageTo: 63,
    gender: "All",
    loi: 90,
    incidence: 90,
    timeline: 90,
    openEnded: 2,
    cpi: 0, 
    totalCost: 0,
    timezone: "Asia/Kolkata",
  startTime: "09:00",
  endTime: "18:00",
  startDate: "",
  endDate: "",
    description: "",
    devices: {
      mobile: true,
      desktop: true,
      tablet: true,
    },
    containsPII: false,
    profiles: [],   
  });

 const [showProfiles, setShowProfiles] =
  useState(false);

const [selectedProfiles, setSelectedProfiles] =
  useState([]);
// const languages =
//   countryLanguage.getCountryLanguages("IN");

//   const langs =
//   countryLanguage.getCountryLanguages(
//     form.market
//   ) || [];

const result =
  countryLanguage.getCountryLanguages(
    form.market
  );
const languages =
  getLanguagesByCountry(
    form.market
  );
// console.log(result);

// useEffect(() => {
//   console.log("Market:", form.market);

//   console.log(
//     countryLanguage.getCountryLanguages(
//       form.market
//     )
//   );
// }, [form.market]);

// console.log(
//   "Languages:",
//   languages
// );

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Remove the error as soon as user changes the field
  setErrors((prev) => ({
    ...prev,
    [name]: "",
    general: "",
  }));
};

const marketTimezones =
  form.market
    ? ct.getCountry(form.market)?.timezones || []
    : [];

let convertedStart = "";
let convertedEnd = "";

if (
  form.startDate &&
  form.startTime &&
  form.endDate &&
  form.endTime &&
  form.timezone &&
  marketTimezone
) {

  const startLocal =
    `${form.startDate} ${form.startTime}`;

  const endLocal =
    `${form.endDate} ${form.endTime}`;

  const startUtc =
    fromZonedTime(
      startLocal,
      form.timezone
    );

  const endUtc =
    fromZonedTime(
      endLocal,
      form.timezone
    );

  convertedStart =
    formatInTimeZone(
      startUtc,
      marketTimezone,
      "MMM d, yyyy HH:mm"
    );

  convertedEnd =
    formatInTimeZone(
      endUtc,
      marketTimezone,
      "MMM d, yyyy HH:mm"
    );
}

// useEffect(() => {
//   if (!targetGroupId) return;

//   api
//     .get(
//       `/projects/${projectId}/target-group/${targetGroupId}`
//     )
//     .then((res) => {
//       // setForm(res.data);
//       setForm(prev => ({
//   ...prev,
//   ...res.data
// }));
//  setSelectedProfiles(
//     res.data.profiles || []
//   );
//     });
// }, []);

useEffect(() => {
  // =========================================
  // NEW TARGET GROUP
  // =========================================

  if (isNew) {
    setForm({
      sector: "",
      market: "",
      language: "",

      targetCompletes: "",
      overQuotaAction: "QUOTA",
      ageFrom: "",
      ageTo: "",

      gender: "All",

      loi: "",
      incidence: "",
      timeline: "",
      openEnded: "",

      cpi: 0,
      totalCost: 0,

      timezone: "Asia/Kolkata",
      startTime: "09:00",
      endTime: "18:00",
      startDate: "",
      endDate: "",

      description: "",

      devices: {
        mobile: false,
        desktop: false,
        tablet: false,
      },

      containsPII: false,
      profiles: [],
      surveyUrl: "",
    });

    setSelectedProfiles([]);

    setMarketTimezone("");

    return;
  }

  // =========================================
  // EXISTING TARGET GROUP
  // =========================================

  const loadTargetGroup = async () => {
    try {
      const res = await api.get(
        `/projects/${projectId}/target-group/${targetGroupId}`
      );

      const group = res.data;

      setForm((prev) => ({
        ...prev,
        ...group,
      }));

      setSelectedProfiles(
        group.profiles || []
      );

    } catch (err) {
      console.error(
        "Failed to load target group:",
        err
      );
    }
  };

  loadTargetGroup();

}, [projectId, targetGroupId, isNew]);

useEffect(() => {
  const zones =
    ct.getCountry(form.market)?.timezones || [];

  if (zones.length) {
    setMarketTimezone(zones[0]);
  }
}, [form.market]);

  const handleDevice = (type) => {
    setForm({
      ...form,
      devices: {
        ...form.devices,
        [type]: !form.devices[type],
      },
    });
  };

// useEffect(() => {

//   async function fetchCPI() {

//     try {

//       const res = await api.post(
//         "/projects/calculate-cpi",
//         {
//           country: form.market,
//           ir: Number(form.incidence),
//           loi: Number(form.loi),
//         }
//       );

//       const cpi = res.data.cpi;

//       setForm(prev => ({
//         ...prev,
//         cpi,
//         totalCost: cpi * prev.targetCompletes,
//       }));

//     } catch (err) {
//       console.log(err);
//     }
//   }

//   if (
//     form.market &&
//     form.incidence &&
//     form.loi
//   ) {
//     fetchCPI();
//   }

// }, [
//   form.market,
//   form.incidence,
//   form.loi,
//   form.targetCompletes
// ]);
useEffect(() => {
  async function fetchCPI() {
    try {
      const res = await api.post(
        "/projects/calculate-cpi",
        {
          country: form.market,
          ir: Number(form.incidence),
          loi: Number(form.loi),
        }
      );

      const cpi = res.data.cpi;

      setForm(prev => ({
        ...prev,
        cpi,
        totalCost: cpi * prev.targetCompletes,
      }));

      // Clear CPI/market error after successful calculation
      setErrors(prev => ({
        ...prev,
        market: "",
        incidence: "",
        loi: "",
      }));

    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Unable to calculate CPI";

      setErrors(prev => ({
        ...prev,
        market: message,
      }));
    }
  }

  if (
    form.market &&
    form.incidence !== "" &&
    form.loi !== ""
  ) {
    fetchCPI();
  }

}, [
  form.market,
  form.incidence,
  form.loi,
  form.targetCompletes
]);

useEffect(() => {
  api
    .get("/profiles")
    .then((res) => {
      setProfileLibrary(res.data);
    })
    .catch(console.error);
}, []);
  const navigate = useNavigate();

// const handleSubmit = async () => {
//   try {

//     if (targetGroupId) {
// // console.log("SAVING PROFILES", selectedProfiles);

// // console.log({
// //   ...form,
// //   profiles: selectedProfiles,
// //   status: "DRAFT",
// // });
// // console.log("selectedProfiles", selectedProfiles);
//       await api.put(
//         `/projects/${projectId}/target-group/${targetGroupId}`,
//         {
//           ...form,
//           profiles: selectedProfiles,
//           status: "LIVE",
//         }
//       );

//     } else {

//       await api.post(
//   `/projects/${projectId}/target-groups`,
//   {
//     ...form,
//     profiles: selectedProfiles,
//     status: "LIVE",
//   }
// );

//     }

//     navigate(
//       `/business/dashboard/project/${projectId}/status`
//     );

//   } catch (err) {
//     console.log(err);
//   }
// };

const handleSubmit = async () => {
  setErrors({});

  try {
    const payload = {
      ...form,
      profiles: selectedProfiles,
      status: "LIVE",
    };

    let response;

    if (!isNew) {
      response = await api.put(
        `/projects/${projectId}/target-group/${targetGroupId}`,
        payload
      );
    } else {
      response = await api.post(
        `/projects/${projectId}/target-groups`,
        payload
      );
    }

    // Only navigate when backend accepts the request
    navigate(
      `/business/dashboard/project/${projectId}/status`
    );

  } catch (err) {
    const data = err.response?.data;

    console.log("VALIDATION RESPONSE:", data);

    // Backend returned field-specific errors
    if (data?.errors) {
      setErrors(data.errors);
      return;
    }

    // Backend returned one general error
    if (data?.message) {
      setErrors({
        general: data.message,
      });
      return;
    }

    setErrors({
      general: "Something went wrong. Please try again.",
    });
  }
};

// const saveAdvancedSettings = async () => {
  
//   try {
//     await api.put(
//       `/projects/${projectId}/target-group/${targetGroupId}`,
//       {
//         startDate: form.startDate,
//         endDate: form.endDate,
//         startTime: form.startTime,
//         endTime: form.endTime,
//         timezone: form.timezone,
//       }
//     );

//     setShowAdvanced(false);
//   } catch (err) {
//     console.log(err);
//   }
// };

const saveAdvancedSettings = async () => {
  if (isNew) {
    setShowAdvanced(false);
    return;
  }

  try {
    await api.put(
      `/projects/${projectId}/target-group/${targetGroupId}`,
      {
        advancedCalendar: {
          startDate: form.startDate,
          endDate: form.endDate,
          startTime: form.startTime,
          endTime: form.endTime,
          timezone: form.timezone,
          marketTimezone: marketTimezone,
        },
      }
    );

    setShowAdvanced(false);

  } catch (err) {
    console.log(err);
  }
};

// const handleSaveDraft = async () => {
//   try {

//     const token =
//       localStorage.getItem("token");

//     if (!isNew) {

//       await api.put(
//         `/projects/${projectId}/target-group/${targetGroupId}`,
//         {
//           ...form,
//           profiles: selectedProfiles,
//           status: "DRAFT",
//         },
//         {
//           headers: {
//             Authorization:
//               `Bearer ${token}`,
//           },
//         }
//       );

//     } else {

//       await api.post(
//         `/projects/${projectId}/target-groups`,
//         {
//           ...form,
//     profiles: selectedProfiles,
//     status: "DRAFT",
//         },
//         {
//           headers: {
//             Authorization:
//               `Bearer ${token}`,
//           },
//         }
//       );

//     }

//     navigate(
//       `/business/dashboard/project/${projectId}`
//     );

//   } catch (err) {
//     console.log(err);
//   }
// };
const handleSaveDraft = async () => {
  setErrors({});

  try {
    const payload = {
      ...form,
      profiles: selectedProfiles,
      status: "DRAFT",
    };

    console.log("SAVING TARGET GROUP DRAFT:", payload);

    let response;

    if (isNew) {
      response = await api.post(
        `/projects/${projectId}/target-groups`,
        payload
      );
    } else {
      response = await api.put(
        `/projects/${projectId}/target-group/${targetGroupId}`,
        payload
      );
    }

    console.log(
      "TARGET GROUP DRAFT SAVED:",
      response.data
    );

    navigate(
      `/business/dashboard/project/${projectId}`
    );

  } catch (err) {
    console.error(
      "SAVE DRAFT ERROR:",
      err
    );

    console.error(
      "BACKEND RESPONSE:",
      err.response?.data
    );

    const data = err.response?.data;

    if (data?.errors) {
      setErrors(data.errors);
      return;
    }

    setErrors({
      general:
        data?.message ||
        "Failed to save draft.",
    });
  }
};
const updateQuota = (
  profileId,
  conditionIndex,
  quota
) => {

  setSelectedProfiles(prev =>
    prev.map(profile => {

      if(profile._id !== profileId)
        return profile;

      const updated =
        [...profile.conditions];

      updated[conditionIndex].quota =
        quota;

      return {
        ...profile,
        conditions: updated
      };

    })
  );

};

// const saveDraft = async () => {
//   await api.put(
//     `/projects/${projectId}/target-group/${targetGroupId}`,
//     form
//   );
// };

const saveDraft = async () => {
  const payload = {
    ...form,
    profiles: selectedProfiles,
    status: "DRAFT",
  };

  if (isNew) {
    await api.post(
      `/projects/${projectId}/target-groups`,
      payload
    );
  } else {
    await api.put(
      `/projects/${projectId}/target-group/${targetGroupId}`,
      payload
    );
  }
};

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">

      {/* HEADER */}
      <div className="mb-8">
  <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
    Create Project
  </h1>

  <p className="text-slate-500 mt-2">
    Configure your research project and audience requirements.
  </p>
</div>

      {/* GRID */}
     <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold mb-4 text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            AUDIENCE
          </h3>
          <div className="flex gap-4">
              <div className="w-full">
              <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <Briefcase size={14} /> Sector
              </label>
              <select
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className="border rounded-lg px-3 py-2 w-full text-sm"
              >
                <option value="">Select sector</option>
                <option>Automobile</option>
                <option>Healthcare</option>
              </select>
            </div>



            <div className="w-full">
              <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <Globe size={14} /> Market
              </label>
             <select
  name="market"
  value={form.market}
  onChange={handleChange}
  className={`border rounded-lg px-3 py-2 w-full text-sm ${
    errors.market
      ? "border-red-500"
      : "border-slate-300"
  }`}
>
  {errors.market && (
  <p className="text-red-500 text-xs mt-1">
    {errors.market}
  </p>
)}
  <option value="">
    Select market
  </option>

  {countries.map((country) => (
    <option
      key={country.code}
      value={country.code}
    >
      {country.name}
    </option>
  ))}
</select>
            </div>
          </div>
          
<select
  value={form.language}
  onChange={handleChange}
  name="language"
  className={`border rounded-lg px-3 py-2 w-full text-sm ${
    errors.language
      ? "border-red-500"
      : "border-slate-300"
  }`}
>
  {errors.language && (
  <p className="text-red-500 text-xs mt-1">
    {errors.language}
  </p>
)}
  <option value="">
    Select Language
  </option>

  {languages.map((lang) => (
    <option
      key={lang}
      value={lang}
    >
      {lang}
    </option>
  ))}
</select>
          {/* <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1 block">
              Age range
            </label>

            <div className="flex items-center gap-3">
              
              <div>
  <input
    type="number"
    name="ageFrom"
    value={form.ageFrom}
    onChange={handleChange}
    className={`border rounded px-3 py-2 w-20 ${
      errors.ageFrom
        ? "border-red-500"
        : "border-slate-300"
    }`}
  />

  {errors.ageFrom && (
    <p className="text-red-500 text-xs mt-1">
      {errors.ageFrom}
    </p>
  )}
</div>

<span>to</span>

<div>
  <input
    type="number"
    name="ageTo"
    value={form.ageTo}
    onChange={handleChange}
    className={`border rounded px-3 py-2 w-20 ${
      errors.ageTo
        ? "border-red-500"
        : "border-slate-300"
    }`}
  />

  {errors.ageTo && (
    <p className="text-red-500 text-xs mt-1">
      {errors.ageTo}
    </p>
  )}
</div>
              <span className="text-xs text-gray-400">years</span>
            </div>
          </div> */}
<div className="mb-4">

  <label className="text-xs text-gray-500 mb-1 block">
    Age range
  </label>

  <div className="flex items-start gap-3">

    {/* AGE FROM */}
    <div>
      <input
        type="number"
        name="ageFrom"
        value={form.ageFrom}
        onChange={handleChange}
        className={`border rounded px-3 py-2 w-20 ${
          errors.ageFrom
            ? "border-red-500"
            : "border-slate-300"
        }`}
      />

      {errors.ageFrom && (
        <p className="text-red-500 text-xs mt-1 w-40">
          {errors.ageFrom}
        </p>
      )}
    </div>

    <span className="mt-2">
      to
    </span>

    {/* AGE TO */}
    <div>
      <input
        type="number"
        name="ageTo"
        value={form.ageTo}
        onChange={handleChange}
        className={`border rounded px-3 py-2 w-20 ${
          errors.ageTo
            ? "border-red-500"
            : "border-slate-300"
        }`}
      />

      {errors.ageTo && (
        <p className="text-red-500 text-xs mt-1 w-40">
          {errors.ageTo}
        </p>
      )}
    </div>

    <span className="text-xs text-gray-400 mt-2">
      years
    </span>

  </div>
</div>
          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1 block">
              Gender
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="border rounded-lg px-3 py-2 w-full text-sm"
            >
              <option>All</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          {/* DEVICES */}
          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-2 block">
              Device compatibility
            </label>

            <div className="flex gap-3">

              {[
                { key: "mobile", icon: Smartphone },
                { key: "desktop", icon: Monitor },
                { key: "tablet", icon: Tablet },
              ].map(({ key, icon: Icon }) => (
                <button
                 type="button"
                  key={key}
                  onClick={() => handleDevice(key)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all
                    ${
                      form.devices?.[key]
                        ? "bg-orange-50 border-orange-500 text-orange-600"
                        : "bg-white border-slate-200 text-slate-500"
                    }`}
                >
                  <Icon size={14} />
                  {key}
                </button>
              ))}

            </div>
          </div>

          <div className="flex items-center gap-2">
           <label className="text-xs text-gray-500">
              Open-ended questions
            </label>
            <input
              type="number"
              name="openEnded"
              value={form.openEnded}
              onChange={handleChange}
              className="border rounded px-3 py-2 w-24 mt-1"
            />
          </div>

        </div>

        {/* RIGHT */}
        {/* <div className="space-y-4">

         <div>
          <h3 className="text-xs font-semibold mb-4 text-gray-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            PROJECT PARAMETERS
          </h3>

          {[
            { label: "Target Completes", name: "targetCompletes", icon: Users },
            { label: "LOI (minutes)", name: "loi", icon: Clock },
            { label: "Incidence (%)", name: "incidence", icon: BarChart3 },
            { label: "Timeline (days)", name: "timeline", icon: Calendar },
          ].map(({ label, name, icon: Icon }) => (
            <div key={name} className="mb-4">
              <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
                <Icon size={14} />
                {label}
              </label>

              <input
  type="number"
  name={name}
  value={form[name]}
  onChange={handleChange}
  min={1}
  max={name === "loi" ? 45 : 100}
  className={`border rounded-lg px-3 py-2 w-full ${
    errors[name]
      ? "border-red-500"
      : "border-slate-300"
  }`}
/>

{errors[name] && (
  <p className="text-red-500 text-xs mt-1">
    {errors[name]}
  </p>
)}
            </div>
          ))}
        </div>

        </div> */}

        {/* RIGHT */}
<div className="space-y-4">

  <h3 className="text-xs font-semibold mb-4 text-gray-500 flex items-center gap-2">
    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
    PROJECT PARAMETERS
  </h3>

  {/* TARGET COMPLETES */}
  <div className="mb-4">

    <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
      <Users size={14} />
      Target Completes
    </label>

    <input
      type="number"
      name="targetCompletes"
      value={form.targetCompletes}
      onChange={handleChange}
      min={1}
      className={`border rounded-lg px-3 py-2 w-full ${
        errors.targetCompletes
          ? "border-red-500"
          : "border-slate-300"
      }`}
    />

    {errors.targetCompletes && (
      <p className="text-red-500 text-xs mt-1">
        {errors.targetCompletes}
      </p>
    )}

  </div>


  {/* AFTER TARGET COMPLETES */}
  <div className="mb-4">

    <label className="text-xs text-gray-500 block mb-1">
      After Target Completes
    </label>

    <select
      name="overQuotaAction"
      value={form.overQuotaAction || "QUOTA"}
      onChange={handleChange}
      className="border border-slate-300 rounded-lg px-3 py-2 w-full bg-white text-sm"
    >
      <option value="QUOTA">
        Quota Full
      </option>

      <option value="DISQUALIFIED">
        Disqualified
      </option>
    </select>

    <p className="text-xs text-gray-400 mt-1">
      Select what happens when the target completes are reached.
    </p>

  </div>


  {/* LOI */}
  <div className="mb-4">

    <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
      <Clock size={14} />
      LOI (minutes)
    </label>

    <input
      type="number"
      name="loi"
      value={form.loi}
      onChange={handleChange}
      min={1}
      max={45}
      className={`border rounded-lg px-3 py-2 w-full ${
        errors.loi
          ? "border-red-500"
          : "border-slate-300"
      }`}
    />

    {errors.loi && (
      <p className="text-red-500 text-xs mt-1">
        {errors.loi}
      </p>
    )}

  </div>


  {/* INCIDENCE */}
  <div className="mb-4">

    <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
      <BarChart3 size={14} />
      Incidence (%)
    </label>

    <input
      type="number"
      name="incidence"
      value={form.incidence}
      onChange={handleChange}
      min={1}
      max={100}
      className={`border rounded-lg px-3 py-2 w-full ${
        errors.incidence
          ? "border-red-500"
          : "border-slate-300"
      }`}
    />

    {errors.incidence && (
      <p className="text-red-500 text-xs mt-1">
        {errors.incidence}
      </p>
    )}

  </div>


  {/* TIMELINE */}
  <div className="mb-4">

    <label className="text-xs text-gray-500 flex items-center gap-1 mb-1">
      <Calendar size={14} />
      Timeline (days)
    </label>

    <input
      type="number"
      name="timeline"
      value={form.timeline}
      onChange={handleChange}
      min={1}
      max={100}
      className={`border rounded-lg px-3 py-2 w-full ${
        errors.timeline
          ? "border-red-500"
          : "border-slate-300"
      }`}
    />

    {errors.timeline && (
      <p className="text-red-500 text-xs mt-1">
        {errors.timeline}
      </p>
    )}

  </div>

</div>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-6">
        <label className="text-xs text-gray-500">
          Target audience description
        </label>

        <textarea
          name="description"
          value={form.description}
          maxLength={1000}
          placeholder="Describe your target audience, key characteristics, behaviors..."
          onChange={handleChange}
          className="w-full border rounded-xl p-3 mt-2 h-32"
        />

        <p className="text-right text-xs text-gray-400">
         {form.description?.length || 0}/1000
        </p>
      </div>

      <div className="mt-4">
  <label className="flex items-center gap-3 cursor-pointer">
    <input
      type="checkbox"
      checked={form.containsPII}
      onChange={(e) =>
        setForm({
          ...form,
          containsPII: e.target.checked,
        })
      }
      className="w-4 h-4"
    />

    <span className="text-sm">
      This survey collects personally identifiable information (PII)
    </span>
  </label>
</div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-8 border-t pt-6">

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    <div className="rounded-2xl bg-slate-50 p-6">
      <p className="text-slate-500 text-sm">
        CPI
      </p>

      <h2 className="text-4xl font-bold text-slate-900 mt-2">
        ${form.cpi || 0}
      </h2>
    </div>

    <div className="rounded-2xl bg-orange-50 p-6">
      <p className="text-orange-700 text-sm">
        Total Cost
      </p>

      <h2 className="text-4xl font-bold text-orange-600 mt-2">
        ${form.totalCost || 0}
      </h2>
    </div>

  </div>

<div className="flex flex-col sm:flex-row gap-3 mt-6">
  {errors.general && (
  <div className="mt-4 text-red-500 text-sm">
    {errors.general}
  </div>
)}
<button
  type="button"
  onClick={() => setShowAdvanced(true)}
  className="h-12
px-6
rounded-xl
border
border-slate-300
text-slate-700
font-medium"
>
  Advanced
</button>

 <button
    onClick={handleSaveDraft}
    className="
      h-12
      px-8
      rounded-xl
      border
      border-slate-300
      bg-white
      font-semibold
    "
  >
    Save Draft
  </button>

  <button
   type="button"
    onClick={handleSubmit}
    className="
     h-12
px-8
rounded-xl
bg-orange-500
hover:bg-orange-600
text-white
font-semibold
shadow-lg
shadow-orange-200
    "
  >
    Launch Project
  </button>
</div>
</div>

     {showAdvanced && (
 <>
  
    <div
      onClick={() => setShowAdvanced(false)}
      className="fixed inset-0 bg-black/30 z-40"
    />
 

  <div
    className={`
     fixed top-0 right-0
h-dvh
w-full
sm:max-w-[650px] p-5 sm:p-8
      bg-white z-50 shadow-2xl overflow-y-auto overscroll-contain
      transition-transform duration-300 ease-in-out
      ${showAdvanced ? "translate-x-0" : "translate-x-full"}
    `}
  >
      <div>

        <h2 className="text-2xl
sm:text-4xl
font-bold
text-slate-900
mb-6
sm:mb-10">
          Advanced Calendar
        </h2>

        {/* Date Range */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Start Date
          </label>

          <input
            type="date"
              
             className="
  w-full
  rounded-xl
  border
  border-slate-200
  px-4
  py-3
  "
            value={form.startDate}
  onChange={(e) =>
    setForm({
      ...form,
      startDate: e.target.value,
    })
  }
            
          />
        </div>

          <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            End Date
          </label>

          <input
  type="date"
   
   className="
  w-full
  rounded-xl
  border
  border-slate-200
  px-4
  py-3
  "
  value={form.endDate}
  onChange={(e) =>
    setForm({
      ...form,
      endDate: e.target.value,
    })
  }
/>
        </div>

        {/* Timezone */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            TIMEZONE
          </label>

          <select
  value={form.timezone}
  onChange={(e) =>
    setForm({
      ...form,
      timezone: e.target.value,
    })
  }
>
            {timezones.map((tz) => (
    <option key={tz} value={tz}>
      {tz}
    </option>
  ))}
          </select>
        </div>

        {/* Start / End Time */}
        <div className="grid
grid-cols-1
sm:grid-cols-2
gap-4
sm:gap-6
mb-8">

          <div>
            <label className="block text-sm font-medium mb-2">
              START TIME
            </label>

            <input
  type="time"
  className="
  w-full
  rounded-xl
  border
  border-slate-200
  px-4
  py-3
  "
  value={form.startTime}
  onChange={(e) =>
    setForm({
      ...form,
      startTime: e.target.value,
    })
  }
/>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              END TIME
            </label>

           <input
  type="time"
  className="
  w-full
  rounded-xl
  border
  border-slate-200
  px-4
  py-3
  "
  value={form.endTime}
  onChange={(e) =>
    setForm({
      ...form,
      endTime: e.target.value,
    })
  }
/>
          </div>

        </div>
       

<div className="mb-6 sm:mb-8">
  <label className="block text-sm font-medium mb-2">
    MARKET TIMEZONE
  </label>

  <select
    value={marketTimezone}
    onChange={(e) =>
      setMarketTimezone(e.target.value)
    }
    className="w-full
rounded-xl
border
border-slate-200
bg-white
px-4
py-3
text-sm
focus:border-orange-500
focus:ring-4
focus:ring-orange-100
outline-none
transition"
  >
    {marketTimezones.length === 0 ? (
      <option value="">
        Select market first
      </option>
    ) : (
      marketTimezones.map((tz) => (
        <option
          key={tz}
          value={tz}
        >
          {tz}
        </option>
      ))
    )}
  </select>

  <p className="text-xs text-gray-500 mt-1">
    Timezone used for the selected market country
  </p>
</div>
<h3 className="
text-lg
font-semibold
text-slate-900
mb-4
">
  Timezone Conversion
</h3>

<div className="overflow-x-auto mt-4">
<table className="w-full mt-4">
  <thead>
    <tr>
      <th></th>
      <th>{form.timezone}</th>
      <th>{marketTimezone}</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Start</td>
      <td>
  {form.startDate} {form.startTime}
</td>
      <td>{convertedStart || "-"}</td>
    </tr>

    <tr>
      <td>End</td>
     <td>
  {form.endDate} {form.endTime}
</td>
     <td>{convertedEnd || "-"}</td>
    </tr>
  </tbody>
</table>
</div>
        {/* Footer */}
        <div className="flex
  flex-col-reverse
  sm:flex-row
  justify-end
  gap-3
  mt-10">

          <button
          type="button"
            onClick={() => setShowAdvanced(false)}
            className="
              border
              border-purple-700
              px-6
              py-3
              rounded
            "
          >
            Cancel
          </button>

          <button
          type="button"
            onClick={saveAdvancedSettings}
            className="
              bg-purple-700
              text-white
              px-6
              py-3
              rounded
            "
          >
            Save
          </button>

        </div>

      </div>
    </div>
  </>
)}

<ProfilingSection
  targetCompletes={form.targetCompletes}
  selectedProfiles={selectedProfiles}
  setSelectedProfiles={setSelectedProfiles}
/>


<div className="mt-6">
  <label className="text-sm font-medium">
    Survey URL Builder
  </label>

 <BuildSurvey
  projectId={projectId}
  targetGroupId={isNew ? null : targetGroupId}
  targetGroupName={
    !isNew
      ? form.name
      : "New Target Group"
  }
  user={user}
  onApply={(url) =>
    setForm(prev => ({
      ...prev,
      surveyUrl: url,
    }))
  }
/>

  <textarea
    value={form.surveyUrl || ""}
    readOnly
    className="w-full border rounded-lg p-3 mt-3"
  />
</div>
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <div className="bg-white border p-4 rounded-xl shadow mb-3">
      <h3 className="font-semibold">
        {p.sector} - {p.market}
      </h3>

      <p className="text-sm text-gray-500">
        Age: {p.ageFrom} - {p.ageTo}
      </p>

      <p className="text-sm mt-1">
        Status: <span className="font-semibold">{p.status}</span>
      </p>
    </div>
  );
}