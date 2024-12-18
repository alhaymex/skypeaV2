const PrivacyNoticePage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Notice</h1>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground">
              We collect information you provide directly to us, such as when
              you create an account, create a blog, or contact us for support.
              This may include your name, email address, and any other
              information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground">
              We use the information we collect to provide, maintain, and
              improve our services, to communicate with you, and to comply with
              legal obligations. This includes personalizing your experience,
              analyzing usage patterns, and sending you important updates about
              our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              3. Information Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground">
              We do not share your personal information with third parties
              except as described in this privacy policy or with your consent.
              We may share information with service providers who perform
              services on our behalf, or when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              4. Data Security
            </h2>
            <p className="text-muted-foreground">
              We take reasonable measures to help protect your personal
              information from loss, theft, misuse, unauthorized access,
              disclosure, alteration, and destruction. However, no method of
              transmission over the Internet or electronic storage is 100%
              secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              5. Your Rights
            </h2>
            <p className="text-muted-foreground">
              You have the right to access, correct, or delete your personal
              information. You may also have the right to restrict or object to
              certain processing of your data. To exercise these rights, please
              contact us using the information provided at the end of this
              notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              6. Changes to this Privacy Notice
            </h2>
            <p className="text-muted-foreground">
              We may update this privacy notice from time to time. We will
              notify you of any changes by posting the new privacy notice on
              this page and updating the &quot;Last updated&quot; date at the
              top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">
              7. Contact Us
            </h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Notice, please
              contact us at{" "}
              <a
                href="mailto:support@skypea.com"
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

export default PrivacyNoticePage;
