import { useEffect, useState } from "react";
import api from "../services/api";

const PROFESSIONS = [
  "ANY",
  "Doctor",
  "Nurse",
  "Pharmacist",
  "Dentist",
  "Developer",
  "IT Professional",
  "Software Engineer",
  "Data Scientist",
  "Data Analyst",
  "Cybersecurity Professional",
  "Civil Engineer",
  "Mechanical Engineer",
  "Electrical Engineer",
  "Teacher",
  "Professor",
  "Lawyer",
  "Accountant",
  "Banker",
  "Marketing Professional",
  "Sales Professional",
  "HR Professional",
  "Business Owner",
  "Entrepreneur",
  "Consultant",
  "Architect",
  "Designer",
  "Student",
  "Other",
];

const INITIAL_SPECIALTIES = {
  Doctor: [
    "General Physician",
    "Cardiologist",
    "Neurologist",
    "Dermatologist",
    "Pediatrician",
    "Psychiatrist",
    "Orthopedic",
    "Gynecologist",
    "Oncologist",
    "Radiologist",
    "Urologist",
    "Gastroenterologist",
    "Endocrinologist",
    "Ophthalmologist",
    "ENT Specialist",
    "Surgeon",
  ],

  Developer: [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Game Developer",
    "Web Developer",
  ],

  "IT Professional": [
    "System Administrator",
    "Network Administrator",
    "Cloud Engineer",
    "DevOps Engineer",
    "IT Support",
    "Database Administrator",
  ],

  "Software Engineer": [
    "Frontend Engineer",
    "Backend Engineer",
    "Full Stack Engineer",
    "Mobile Engineer",
    "Platform Engineer",
    "Embedded Engineer",
  ],

  "Data Scientist": [
    "Machine Learning",
    "Artificial Intelligence",
    "NLP",
    "Computer Vision",
  ],

  Lawyer: [
    "Corporate Law",
    "Criminal Law",
    "Civil Law",
    "Family Law",
    "Tax Law",
    "Intellectual Property",
  ],

  Teacher: [
    "Primary Teacher",
    "Secondary Teacher",
    "Mathematics",
    "Science",
    "English",
    "Computer Science",
  ],
};

const EMPLOYMENT_STATUS = [
  "ANY",
  "Employed",
  "Self Employed",
  "Unemployed",
  "Student",
  "Retired",
  "Homemaker",
];

function normalize(value) {
  return value.trim().toLowerCase();
}

export default function TargetGroupBuilder({
  targetGroups,
  setTargetGroups,
}) {
  const [catalog, setCatalog] = useState(
    INITIAL_SPECIALTIES
  );

  const [newSpecialty, setNewSpecialty] =
    useState({});

  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    try {
      const res = await api.get(
        "/admin/profession-catalog"
      );

      if (res.data?.length) {
        const dbCatalog = {};

        res.data.forEach((item) => {
          dbCatalog[item.profession] =
            item.specialties || [];
        });

        setCatalog({
          ...INITIAL_SPECIALTIES,
          ...dbCatalog,
        });
      }
    } catch (error) {
      console.error(
        "Failed to load profession catalog",
        error
      );
    }
  };

  const addTargetGroup = () => {
    setTargetGroups([
      ...targetGroups,
      {
        name: `Target Group ${
          targetGroups.length + 1
        }`,

        employmentStatus: "ANY",
        profession: "ANY",
        specialties: [],

        ageFrom: null,
        ageTo: null,

        gender: "All",
        country: "ALL",

        targetCompletes: 0,

        devices: {
          mobile: true,
          desktop: true,
          tablet: true,
        },
      },
    ]);
  };

  const removeTargetGroup = (index) => {
    setTargetGroups(
      targetGroups.filter(
        (_, i) => i !== index
      )
    );
  };

  const updateGroup = (
    index,
    field,
    value
  ) => {
    const updated = [...targetGroups];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setTargetGroups(updated);
  };

  const changeProfession = (
    index,
    profession
  ) => {
    const updated = [...targetGroups];

    updated[index] = {
      ...updated[index],

      profession,

      // Reset specialties when profession changes
      specialties: [],
    };

    setTargetGroups(updated);
  };

  const toggleSpecialty = (
    groupIndex,
    specialty
  ) => {
    const updated = [...targetGroups];

    const current =
      updated[groupIndex].specialties || [];

    const exists = current.some(
      (item) =>
        normalize(item) ===
        normalize(specialty)
    );

    updated[groupIndex] = {
      ...updated[groupIndex],

      specialties: exists
        ? current.filter(
            (item) =>
              normalize(item) !==
              normalize(specialty)
          )
        : [...current, specialty],
    };

    setTargetGroups(updated);
  };

  const addSpecialty = async (
    groupIndex
  ) => {
    const profession =
      targetGroups[groupIndex].profession;

    const value =
      newSpecialty[groupIndex]?.trim();

    if (!value || profession === "ANY") {
      return;
    }

    const existing =
      catalog[profession] || [];

    const alreadyExists =
      existing.some(
        (item) =>
          normalize(item) ===
          normalize(value)
      );

    // Already available
    if (alreadyExists) {
      toggleSpecialty(
        groupIndex,
        existing.find(
          (item) =>
            normalize(item) ===
            normalize(value)
        )
      );

      setNewSpecialty({
        ...newSpecialty,
        [groupIndex]: "",
      });

      return;
    }

    try {
      await api.post(
        "/admin/profession-catalog/specialty",
        {
          profession,
          specialty: value,
        }
      );

      setCatalog((prev) => ({
        ...prev,

        [profession]: [
          ...(prev[profession] || []),
          value,
        ],
      }));

      toggleSpecialty(
        groupIndex,
        value
      );

      setNewSpecialty({
        ...newSpecialty,
        [groupIndex]: "",
      });
    } catch (error) {
      console.error(error);
      alert(
        "Failed to add specialty"
      );
    }
  };

  return (
    <div className="border rounded-xl p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            Target Groups
          </h2>

          <p className="text-sm text-gray-500">
            Select which users should receive
            this survey.
          </p>
        </div>

        <button
          type="button"
          onClick={addTargetGroup}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Target Group
        </button>
      </div>

      {targetGroups.map(
        (group, index) => {
          const specialties =
            catalog[group.profession] ||
            [];

          return (
            <div
              key={index}
              className="border rounded-lg p-5 mb-5"
            >
              <div className="flex justify-between mb-5">
                <h3 className="font-semibold">
                  {group.name}
                </h3>

                {targetGroups.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeTargetGroup(
                        index
                      )
                    }
                    className="text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* NAME */}

              <div className="mb-5">
                <label className="block text-sm mb-2">
                  Target Group Name
                </label>

                <input
                  value={group.name}
                  onChange={(e) =>
                    updateGroup(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full border rounded p-3"
                />
              </div>

              {/* EMPLOYMENT */}

              <div className="mb-5">
                <label className="block text-sm mb-2">
                  Employment Status
                </label>

                <select
                  value={
                    group.employmentStatus
                  }
                  onChange={(e) =>
                    updateGroup(
                      index,
                      "employmentStatus",
                      e.target.value
                    )
                  }
                  className="w-full border rounded p-3"
                >
                  {EMPLOYMENT_STATUS.map(
                    (status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status === "ANY"
                          ? "Any Employment Status"
                          : status}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* PROFESSION */}

              <div className="mb-5">
                <label className="block text-sm mb-2">
                  Profession
                </label>

                <select
                  value={
                    group.profession
                  }
                  onChange={(e) =>
                    changeProfession(
                      index,
                      e.target.value
                    )
                  }
                  className="w-full border rounded p-3"
                >
                  {PROFESSIONS.map(
                    (profession) => (
                      <option
                        key={profession}
                        value={profession}
                      >
                        {profession ===
                        "ANY"
                          ? "Any Profession"
                          : profession}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* SPECIALTY */}

              {group.profession !==
                "ANY" && (
                <div className="mb-5">
                  <label className="block text-sm mb-2">
                    Specialty
                  </label>

                  <div className="border rounded-lg p-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {group.specialties?.map(
                        (specialty) => (
                          <span
                            key={specialty}
                            className="bg-gray-100 border px-3 py-1 rounded-full text-sm"
                          >
                            {specialty}

                            <button
                              type="button"
                              onClick={() =>
                                toggleSpecialty(
                                  index,
                                  specialty
                                )
                              }
                              className="ml-2 text-red-500"
                            >
                              ×
                            </button>
                          </span>
                        )
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
                      {specialties.map(
                        (specialty) => {
                          const selected =
                            group.specialties?.some(
                              (item) =>
                                normalize(
                                  item
                                ) ===
                                normalize(
                                  specialty
                                )
                            );

                          return (
                            <button
                              type="button"
                              key={
                                specialty
                              }
                              onClick={() =>
                                toggleSpecialty(
                                  index,
                                  specialty
                                )
                              }
                              className={`text-left border rounded p-2 ${
                                selected
                                  ? "bg-black text-white"
                                  : "bg-white"
                              }`}
                            >
                              {specialty}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <div className="flex gap-2">
                      <input
                        value={
                          newSpecialty[
                            index
                          ] || ""
                        }
                        onChange={(e) =>
                          setNewSpecialty(
                            (prev) => ({
                              ...prev,
                              [index]:
                                e.target
                                  .value,
                            })
                          )
                        }
                        onKeyDown={(e) => {
                          if (
                            e.key ===
                            "Enter"
                          ) {
                            e.preventDefault();
                            addSpecialty(
                              index
                            );
                          }
                        }}
                        placeholder={`Add new ${group.profession} specialty`}
                        className="flex-1 border rounded p-3"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          addSpecialty(
                            index
                          )
                        }
                        className="border px-4 rounded"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* AGE */}

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm mb-2">
                    Age From
                  </label>

                  <input
                    type="number"
                    value={
                      group.ageFrom ?? ""
                    }
                    onChange={(e) =>
                      updateGroup(
                        index,
                        "ageFrom",
                        e.target.value
                          ? Number(
                              e.target
                                .value
                            )
                          : null
                      )
                    }
                    className="w-full border rounded p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Age To
                  </label>

                  <input
                    type="number"
                    value={
                      group.ageTo ?? ""
                    }
                    onChange={(e) =>
                      updateGroup(
                        index,
                        "ageTo",
                        e.target.value
                          ? Number(
                              e.target
                                .value
                            )
                          : null
                      )
                    }
                    className="w-full border rounded p-3"
                  />
                </div>
              </div>

              {/* GENDER */}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">
                    Gender
                  </label>

                  <select
                    value={group.gender}
                    onChange={(e) =>
                      updateGroup(
                        index,
                        "gender",
                        e.target.value
                      )
                    }
                    className="w-full border rounded p-3"
                  >
                    <option value="All">
                      All
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-2">
                    Target Completes
                  </label>

                  <input
                    type="number"
                    value={
                      group.targetCompletes
                    }
                    onChange={(e) =>
                      updateGroup(
                        index,
                        "targetCompletes",
                        Number(
                          e.target.value
                        )
                      )
                    }
                    className="w-full border rounded p-3"
                  />
                </div>
              </div>
            </div>
          );
        }
      )}

      {!targetGroups.length && (
        <div className="text-center border border-dashed rounded-lg p-8 text-gray-500">
          No target group created.
          <br />
          Click "+ Add Target Group".
        </div>
      )}
    </div>
  );
}