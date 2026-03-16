import { FileText } from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="max-w-5xl space-y-6">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Terms & Conditions</h1>
        <p className="text-sm text-gray-500">
          Last updated: January 2026
        </p>
      </div>

      {/* TERMS CARD */}
      <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-6 space-y-6">
        {/* TITLE */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
            <FileText size={20} />
          </div>
          <h2 className="text-xl font-semibold">Terms of Service</h2>
        </div>

        {/* CONTENT */}
        <section className="space-y-4 text-gray-700 leading-relaxed">
          <div>
            <h3 className="font-semibold text-gray-900">
              1. Acceptance of Terms
            </h3>
            <p className="text-sm">
              By accessing and using SurveyPanel, you agree to be bound by these
              Terms and Conditions. If you do not agree with any part of these
              terms, please do not use our service.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              2. User Eligibility
            </h3>
            <p className="text-sm">
              You must be at least 18 years old to use this platform. By using
              SurveyPanel, you confirm that you meet this requirement.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              3. Survey Participation
            </h3>
            <p className="text-sm">
              Users agree to provide honest and accurate responses when
              participating in surveys. Fraudulent or misleading responses may
              result in account suspension.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              4. Points & Rewards
            </h3>
            <p className="text-sm">
              Points earned through survey completion can be redeemed according
              to our redemption policies. Points have no cash value until
              redeemed.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">
              5. Account Termination
            </h3>
            <p className="text-sm">
              We reserve the right to terminate accounts that violate these
              terms or engage in suspicious activity.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
