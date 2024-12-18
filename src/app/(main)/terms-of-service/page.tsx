const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-primary">
          Terms of Service
        </h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground">
              By accessing and using Skypea&apos;s services, you agree to be
              bound by these Terms of Service. If you do not agree to these
              terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              2. Description of Service
            </h2>
            <p className="text-muted-foreground">
              Skypea provides a blog builder platform that allows users to
              create and manage their own blogs. Our services include blog
              creation, customization, and hosting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              3. User Obligations
            </h2>
            <p className="text-muted-foreground">
              Users are responsible for maintaining the confidentiality of their
              account information and for all activities that occur under their
              account. You agree to notify us immediately of any unauthorized
              use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              4. Content
            </h2>
            <p className="text-muted-foreground">
              Users retain all ownership rights to the content they post on
              Skypea. By posting content, users grant Skypea a non-exclusive
              license to use, modify, and display the content for the purpose of
              providing and improving our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              5. Prohibited Activities
            </h2>
            <p className="text-muted-foreground">
              Users may not use Skypea for any illegal or unauthorized purpose.
              This includes, but is not limited to, violating any intellectual
              property rights, distributing malware, or engaging in any activity
              that disrupts our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              6. Termination
            </h2>
            <p className="text-muted-foreground">
              Skypea reserves the right to terminate or suspend access to our
              services, without prior notice or liability, for any reason
              whatsoever, including, without limitation, if you breach the Terms
              of Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              7. Changes to Terms
            </h2>
            <p className="text-muted-foreground">
              Skypea reserves the right to modify or replace these Terms at any
              time. We will provide notice of any significant changes. Your
              continued use of the service after such modifications will
              constitute your acknowledgment of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              8. Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at{" "}
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

export default TermsOfServicePage;
