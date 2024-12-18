const RefundPolicyPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-primary">Refund Policy</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              1. Eligibility for Refunds
            </h2>
            <p className="text-muted-foreground">
              We offer a 14-day money-back guarantee for our paid plans. If you
              are not satisfied with our services, you can request a full refund
              within 14 days of your initial purchase or the latest renewal
              date, whichever is more recent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              2. How to Request a Refund
            </h2>
            <p className="text-muted-foreground">
              To request a refund, please contact our support team at{" "}
              <a
                href="mailto:support@skypea.net"
                className="text-primary hover:underline"
              >
                support@skypea.net
              </a>{" "}
              with your account details and reason for the refund request. We
              aim to process all refund requests within 3 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              3. Processing of Refunds
            </h2>
            <p className="text-muted-foreground">
              Refunds will be processed within 5-10 business days after
              approval. The refund will be issued to the original payment method
              used for the purchase. Please note that processing times may vary
              depending on your payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              4. Exceptions
            </h2>
            <p className="text-muted-foreground">
              Refunds may not be available for certain promotional offers or if
              we find evidence of fraud or abuse. We reserve the right to deny
              refund requests that do not comply with this policy. Refunds
              requested after the 14-day period will be considered on a
              case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              5. Cancellation of Service
            </h2>
            <p className="text-muted-foreground">
              Upon processing a refund, your paid plan will be cancelled, and
              your account will be downgraded to the free plan. You will retain
              access to your data, but premium features will no longer be
              available.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              6. Changes to this Refund Policy
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to modify this refund policy at any time.
              Changes will be effective immediately upon posting on our website.
              It is your responsibility to review this policy periodically for
              changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              7. Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about this Refund Policy, please contact
              us at{" "}
              <a
                href="mailto:support@skypea.net"
                className="text-primary hover:underline"
              >
                support@skypea.net
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RefundPolicyPage;
