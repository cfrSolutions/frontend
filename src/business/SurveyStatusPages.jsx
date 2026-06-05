export default function SurveyStatusPages() {
  const currentPath = window.location.pathname;

  if (currentPath.includes("thank-you")) {
    return <ThankYouPage />;
  }

  if (currentPath.includes("disqualified")) {
    return <DisqualifiedPage />;
  }

  if (currentPath.includes("quota-full")) {
    return <QuotaFullPage />;
  }

  return null;
}

function Layout({ children, badge, badgeColor }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="p-10 text-center">
          <div
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold mb-6 ${badgeColor}`}
          >
            {badge}
          </div>

          {children}

          <div className="mt-10 pt-6 border-t border-gray-100 text-sm text-gray-500">
            Powered by <span className="font-semibold text-gray-700">Inputify</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThankYouPage() {
  return (
    <Layout
      badge="Survey Completed"
      badgeColor="bg-green-100 text-green-700"
    >
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
        ✓
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Thank You!
      </h1>

      <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
        Your responses have been successfully submitted.
        We appreciate your time and participation in this survey.
      </p>

      <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-5 text-left">
        <h3 className="font-semibold text-green-800 mb-2">
          Submission Confirmed
        </h3>

        <p className="text-sm text-green-700 leading-relaxed">
          Your survey entry has been securely recorded in our system.
        </p>

        <a href="https://inputify.io/user/dashboard?st=com">click here</a>
      </div>
    </Layout>
  );
}

function DisqualifiedPage() {
  return (
    <Layout
      badge="Screened Out"
      badgeColor="bg-red-100 text-red-700"
    >
      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
        !
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Thank You For Your Interest
      </h1>

      <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
        Unfortunately, based on the survey criteria, you do not qualify for this study.
        We sincerely appreciate your time and participation.
      </p>

      <div className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-5 text-left">
        <h3 className="font-semibold text-red-800 mb-2">
          Why did this happen?
        </h3>

        <p className="text-sm text-red-700 leading-relaxed">
          Some surveys require very specific demographic or professional criteria.
          Not qualifying is completely normal and happens automatically based on survey requirements.
        </p>
      </div>
    </Layout>
  );
}

function QuotaFullPage() {
  return (
    <Layout
      badge="Quota Reached"
      badgeColor="bg-yellow-100 text-yellow-700"
    >
      <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
        ⏳
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Survey Quota Full
      </h1>

      <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
        The required number of responses for this survey has already been collected.
        Thank you for your interest and willingness to participate.
      </p>

      <div className="mt-8 bg-yellow-50 border border-yellow-100 rounded-2xl p-5 text-left">
        <h3 className="font-semibold text-yellow-800 mb-2">
          What does this mean?
        </h3>

        <p className="text-sm text-yellow-700 leading-relaxed">
          Survey quotas help ensure balanced and accurate research results.
          Once the target number of participants is reached, additional responses can no longer be accepted.
        </p>
      </div>
    </Layout>
  );
}
