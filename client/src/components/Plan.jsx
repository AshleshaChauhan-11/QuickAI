import { PricingTable } from "@clerk/react";

const Plan = () => {
  return (
    <section className="bg-[#0B1120] py-24 px-6">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <div className="inline-block bg-[#1E293B] border border-[#334155] rounded-full px-5 py-2 mb-5">
            <span className="text-sm text-gray-300">
              Pricing
            </span>
          </div>

          <h2 className="text-5xl font-bold text-white">
            Choose Your Plan
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Start for free and scale up as you grow.
            <br />
            Find the perfect plan for your content creation needs.
          </p>

        </div>

        <div className="mt-16 rounded-3xl overflow-hidden shadow-2xl">
          <PricingTable />
        </div>

      </div>

    </section>
  );
};

export default Plan;