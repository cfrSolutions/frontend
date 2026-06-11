import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ProfilingSection() {
    const [search, setSearch] = useState("");
    const updateQuota = (
  profileId,
  conditionIndex,
  value
) => {

  setSelectedProfiles(prev =>
    prev.map(profile => {

      if (profile._id !== profileId)
        return profile;

      const conditions = [
        ...profile.conditions
      ];

      conditions[conditionIndex].quota =
        Number(value);

      return {
        ...profile,
        conditions
      };

    })
  );

};

const validateQuotas = () => {

  for (
    const profile of selectedProfiles
  ) {

    const total =
      profile.conditions.reduce(
        (sum, c) =>
          sum +
          Number(c.quota || 0),
        0
      );

    if (total !== 100) {

      alert(
        `${profile.code} quota must equal 100%`
      );

      return false;

    }

  }

  return true;

};

const getFeasibility = quota => {

  return Math.round(
    (form.targetCompletes * quota) /
    100
  );

};
    return(
        <div>
            <div className="mt-12">

  <div className="flex justify-between items-center">

    <h2 className="text-2xl font-semibold">
      Profiling
    </h2>

    <button
      onClick={() => setShowProfiles(true)}
      className="bg-purple-700 text-white px-4 py-2 rounded"
    >
      Add Profiling
    </button>

  </div>

<input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  placeholder="Search profiles"
  className="w-full border p-3 rounded-lg mb-4"
/>

  {/* Selected Profiles */}
 <div className="space-y-4">

  {selectedProfiles.map((profile, profileIndex) => (
    
  <div
  key={profile._id}
  className="
    bg-gray-50
    border
    rounded-xl
    p-6
  "
>

  <div className="flex justify-between">

    <div>

      <h3 className="
        text-purple-700
        text-2xl
        font-semibold
      ">
        {profile.code}
      </h3>

      <p className="text-gray-600">
        {profile.question}
      </p>

    </div>

    <button
      onClick={() =>
        setSelectedProfiles(prev =>
          prev.filter(
            p => p._id !== profile._id
          )
        )
      }
      className="text-red-500"
    >
      Delete
    </button>

  </div>

  <div className="mt-8">

    <div
      className="
        grid
        grid-cols-3
        border-b
        pb-3
        font-semibold
      "
    >
      <div>NAME</div>
      <div>QUOTA (%)</div>
      <div>FEASIBILITY</div>
    </div>

    {profile.conditions.map(
      (condition, index) => (

        <div
          key={index}
          className="
            grid
            grid-cols-3
            py-4
            border-b
          "
        >

          <div>

            {condition.min
              ? `${condition.min} to ${condition.max} years old`
              : condition.value}

          </div>

          <div>

            <input
              type="number"
              min="0"
              max="100"
              value={condition.quota}
              onChange={(e) =>
                updateQuota(
                  profile._id,
                  index,
                  e.target.value
                )
              }
              className="
                w-20
                border-b
                outline-none
              "
            />

            %

          </div>

          <div>
            {getFeasibility(
              condition.quota
            )}
          </div>

        </div>

      )
    )}

    <div
      className="
        grid
        grid-cols-3
        py-4
        font-bold
      "
    >

      <div>Total</div>

      <div>

        {profile.conditions.reduce(
          (sum, c) =>
            sum +
            Number(c.quota || 0),
          0
        )}
        %

      </div>

      <div>
        {form.targetCompletes}
      </div>

    </div>

  </div>

</div>
))}

</div>

</div>
 {showProfiles && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-6 rounded-xl w-[600px]">

      <h2 className="text-xl font-bold mb-4">
        Profile Library
      </h2>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">

  {filteredProfiles.map((profile) => (

    <div
      key={profile._id}
      onClick={() => {

  setActiveProfile(profile);

  setShowProfileCondition(true);

}}
      className="
      border
      rounded-lg
      p-4
      cursor-pointer
      hover:bg-gray-50
      "
    >

      <div className="flex justify-between">

        <div>

          <h3 className="font-semibold text-purple-700">
            {profile.code}
          </h3>

          <p className="text-sm text-gray-600">
            {profile.question}
          </p>

        </div>

        <span className="text-xs text-gray-400">
          {profile.type}
        </span>

      </div>

    </div>

  ))}

</div>

      <button
        onClick={() =>
          setShowProfiles(false)
        }
        className="ml-4 bg-purple-700 text-white px-4 py-2 rounded"
      >
        Close
      </button>

    </div>

  </div>
)}

{showProfileCondition && activeProfile && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-6 rounded-xl w-[500px]">

      <h2 className="text-xl font-bold mb-4">
        {activeProfile.code}
      </h2>

      <p className="text-gray-500 mb-6">
        {activeProfile.question}
      </p>

     {activeProfile.answerType === "range" && (
  <div className="space-y-4">

    <input
      type="number"
      placeholder="Min"
      value={profileCondition.min}
      onChange={(e)=>
        setProfileCondition({
          ...profileCondition,
          min:e.target.value
        })
      }
    />

    <input
      type="number"
      placeholder="Max"
      value={profileCondition.max}
      onChange={(e)=>
        setProfileCondition({
          ...profileCondition,
          max:e.target.value
        })
      }
    />

  </div>
)}
{activeProfile.answerType === "single" && (

  <div className="space-y-3">

    {activeProfile.options?.map(option => (

      <label
        key={option}
        className="flex items-center gap-2"
      >
        <input
          type="radio"
          name="singleAnswer"
          checked={
            profileCondition.value === option
          }
          onChange={() =>
            setProfileCondition({
              ...profileCondition,
              value: option
            })
          }
        />

        {option}

      </label>

    ))}

  </div>

)}

{activeProfile.answerType === "multi" && (

  <div className="space-y-3">

    {activeProfile.options?.map(option => (

      <label
        key={option}
        className="flex items-center gap-2"
      >
        <input
          type="checkbox"
          checked={
            profileCondition.values.includes(
              option
            )
          }
          onChange={(e) => {

            if (e.target.checked) {

              setProfileCondition({
                ...profileCondition,
                values: [
                  ...profileCondition.values,
                  option
                ]
              });

            } else {

              setProfileCondition({
                ...profileCondition,
                values:
                  profileCondition.values.filter(
                    v => v !== option
                  )
              });

            }

          }}
        />

        {option}

      </label>

    ))}

  </div>

)}
<button
  onClick={() => {

   const condition =
  activeProfile.answerType === "range"
    ? {
        min: profileCondition.min,
        max: profileCondition.max
      }
    : activeProfile.answerType === "single"
    ? {
        value: profileCondition.value
      }
    : {
        values: profileCondition.values
      };

setSelectedProfiles(prev => [

  ...prev,

  {
    ...activeProfile,

    conditions: [
      {
        ...condition,
        quota: 100
      }
    ]
  }

]);

    setShowProfileCondition(false);

    setProfileCondition({
      min: "",
      max: ""
    });

  }}
  className="bg-green-600 text-white px-4 py-2 rounded"
>
  Save
</button>
      <button
        onClick={() =>
          setShowProfileCondition(false)
        }
        className="mt-6 bg-purple-700 text-white px-4 py-2 rounded"
      >
        Close
      </button>
<button
  onClick={() => {

    if (!validateQuotas())
      return;

    handleNext();

  }}
>
  Next
</button>
    </div>

  </div>

)}


        </div>
    )
}