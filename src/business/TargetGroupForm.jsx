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

  const [form, setForm] = useState({
    sector: "",
    market: "",
    language: "",
    targetCompletes: 90,
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

useEffect(() => {
  if (!targetGroupId) return;

  api
    .get(
      `/projects/${projectId}/target-group/${targetGroupId}`
    )
    .then((res) => {
      // setForm(res.data);
      setForm(prev => ({
  ...prev,
  ...res.data
}));
 setSelectedProfiles(
    res.data.profiles || []
  );
    });
}, []);

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

    } catch (err) {
      console.log(err);
    }
  }

  if (
    form.market &&
    form.incidence &&
    form.loi
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

//   const handleSubmit = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     let res;

//     if (targetGroupId) {
//       res = await api.put(
//         `/projects/${projectId}/target-group/${targetGroupId}`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } else {
//       res = await api.post(
//         `/projects/${projectId}/target-groups`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     }

//     navigate(
//       `/business/dashboard/project/${projectId}/status`
//     );

//   } catch (err) {
//     console.log(err);
//   }
// };

const handleSubmit = async () => {
  try {

    if (targetGroupId) {
console.log("SAVING PROFILES", selectedProfiles);

console.log({
  ...form,
  profiles: selectedProfiles,
  status: "DRAFT",
});
console.log("selectedProfiles", selectedProfiles);
      await api.put(
        `/projects/${projectId}/target-group/${targetGroupId}`,
        {
          ...form,
          profiles: selectedProfiles,
          status: "LIVE",
        }
      );

    } else {

      await api.post(
  `/projects/${projectId}/target-groups`,
  {
    ...form,
    profiles: selectedProfiles,
    status: "LIVE",
  }
);

    }

    navigate(
      `/business/dashboard/project/${projectId}/status`
    );

  } catch (err) {
    console.log(err);
  }
};

const saveAdvancedSettings = async () => {
  try {
    await api.put(
      `/projects/${projectId}/target-group/${targetGroupId}`,
      {
        startDate: form.startDate,
        endDate: form.endDate,
        startTime: form.startTime,
        endTime: form.endTime,
        timezone: form.timezone,
      }
    );

    setShowAdvanced(false);
  } catch (err) {
    console.log(err);
  }
};

const handleSaveDraft = async () => {
  try {

    const token =
      localStorage.getItem("token");

    if (targetGroupId) {

      await api.put(
        `/projects/${projectId}/target-group/${targetGroupId}`,
        {
          ...form,
          profiles: selectedProfiles,
          status: "DRAFT",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    } else {

      await api.post(
        `/projects/${projectId}/target-groups`,
        {
          ...form,
    profiles: selectedProfiles,
    status: "DRAFT",
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    }

    navigate(
      `/business/dashboard/project/${projectId}`
    );

  } catch (err) {
    console.log(err);
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

const saveDraft = async () => {
  await api.put(
    `/projects/${projectId}/target-group/${targetGroupId}`,
    form
  );
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
  className="border rounded-lg px-3 py-2 w-full text-sm"
>
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
  className="border rounded-lg px-3 py-2 w-full text-sm"
>
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
          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1 block">
              Age range
            </label>

            <div className="flex items-center gap-3">
              <input
                type="number"
                name="ageFrom"
                value={form.ageFrom}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-20"
              />
              <span>to</span>
              <input
                type="number"
                name="ageTo"
                value={form.ageTo}
                onChange={handleChange}
                className="border rounded px-3 py-2 w-20"
              />
              <span className="text-xs text-gray-400">years</span>
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
        <div className="space-y-4">

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
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
          ))}
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
   targetGroupName={
    targetGroupId
      ? form.name
      : "Target Group 1"
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